from typing import List, Optional, Dict
from fastapi import HTTPException, status
from models.market import MarketItem, MarketItemCreate, MarketItemResponse, BuyRequest, MarketTransaction, ExchangeRate
from database.connection import get_database
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class MarketService:
    def __init__(self):
        # Item icons mapping
        self.item_icons = {
            "Steel": "🔩",
            "Food": "🍖", 
            "Weapons": "⚔️",
            "Oil": "🛢️",
            "Medical Kit": "🏥",
            "Tank": "🚗"
        }

    async def create_market_item(self, item_data: MarketItemCreate, seller_id: str, seller_name: str) -> MarketItemResponse:
        """Create new market item for sale"""
        db = await get_database()

        # Get icon for item
        icon = self.item_icons.get(item_data.name, "📦")

        new_item = MarketItem(
            name=item_data.name,
            category=item_data.category,
            quality=item_data.quality,
            price=item_data.price,
            quantity=item_data.quantity,
            seller_id=seller_id,
            seller_name=seller_name,
            icon=icon
        )

        # Insert to database
        result = await db.market_items.insert_one(new_item.model_dump())
        
        if result.inserted_id:
            return MarketItemResponse(**new_item.model_dump())
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create market item"
            )

    async def get_market_items(self, category: Optional[str] = None, search: Optional[str] = None, limit: int = 50) -> List[MarketItemResponse]:
        """Get market items with optional filtering"""
        db = await get_database()
        
        # Build query
        query = {"quantity": {"$gt": 0}}  # Only items with stock
        
        if category and category != "all":
            query["category"] = category
            
        if search:
            query["name"] = {"$regex": search, "$options": "i"}  # Case insensitive search

        items = []
        cursor = db.market_items.find(query).sort("created_at", -1).limit(limit)
        
        async for item_doc in cursor:
            items.append(MarketItemResponse(**item_doc))
        
        return items

    async def buy_item(self, buy_request: BuyRequest, buyer_id: str) -> dict:
        """Buy item from market"""
        db = await get_database()
        
        # Get item
        item = await db.market_items.find_one({"id": buy_request.item_id})
        
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found"
            )

        if item["quantity"] < buy_request.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Not enough quantity available"
            )

        if item["seller_id"] == buyer_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot buy your own items"
            )

        # Calculate total cost
        total_cost = item["price"] * buy_request.quantity

        # Get buyer
        buyer = await db.users.find_one({"id": buyer_id})
        if not buyer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Buyer not found"
            )

        if buyer["gold"] < total_cost:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient gold"
            )

        # Process transaction
        async with await db.client.start_session() as session:
            async with session.start_transaction():
                # Update item quantity
                new_quantity = item["quantity"] - buy_request.quantity
                if new_quantity == 0:
                    # Remove item if sold out
                    await db.market_items.delete_one({"id": buy_request.item_id}, session=session)
                else:
                    await db.market_items.update_one(
                        {"id": buy_request.item_id},
                        {"$set": {"quantity": new_quantity}},
                        session=session
                    )

                # Update buyer's gold
                await db.users.update_one(
                    {"id": buyer_id},
                    {"$inc": {"gold": -total_cost}},
                    session=session
                )

                # Update seller's gold
                await db.users.update_one(
                    {"id": item["seller_id"]},
                    {"$inc": {"gold": total_cost}},
                    session=session
                )

                # Add item to buyer's inventory
                await db.user_inventory.update_one(
                    {"user_id": buyer_id, "item_name": item["name"]},
                    {"$inc": {"quantity": buy_request.quantity}},
                    upsert=True,
                    session=session
                )

                # Create transaction record
                transaction = MarketTransaction(
                    item_id=buy_request.item_id,
                    buyer_id=buyer_id,
                    seller_id=item["seller_id"],
                    item_name=item["name"],
                    quantity=buy_request.quantity,
                    price_per_unit=item["price"],
                    total_price=total_cost
                )
                
                await db.market_transactions.insert_one(transaction.model_dump(), session=session)

        return {
            "message": f"Successfully bought {buy_request.quantity}x {item['name']} for {total_cost} gold",
            "transaction": transaction.model_dump()
        }

    async def get_user_inventory(self, user_id: str) -> List[dict]:
        """Get user's inventory"""
        db = await get_database()
        
        inventory = []
        cursor = db.user_inventory.find({"user_id": user_id})
        
        async for item in cursor:
            inventory.append({
                "id": item.get("_id", ""),
                "name": item["item_name"],
                "quantity": item["quantity"],
                "type": "consumable",  # Default type
                "icon": self.item_icons.get(item["item_name"], "📦")
            })
        
        return inventory

    async def get_exchange_rates(self) -> List[ExchangeRate]:
        """Get current exchange rates"""
        # Mock exchange rates for now - in real app this would come from external API or database
        rates = [
            ExchangeRate(
                from_currency="Gold",
                to_currency="USD",
                rate=1.25,
                change_percentage="+2.1%",
                trend="up"
            ),
            ExchangeRate(
                from_currency="Gold", 
                to_currency="EUR",
                rate=1.08,
                change_percentage="-0.8%",
                trend="down"
            ),
            ExchangeRate(
                from_currency="Gold",
                to_currency="GBP", 
                rate=0.95,
                change_percentage="+1.5%",
                trend="up"
            ),
            ExchangeRate(
                from_currency="Gold",
                to_currency="CNY",
                rate=8.45,
                change_percentage="+0.3%", 
                trend="up"
            )
        ]
        return rates

    async def exchange_currency(self, user_id: str, from_currency: str, to_currency: str, amount: float) -> dict:
        """Exchange currency"""
        db = await get_database()
        
        # Get user
        user = await db.users.find_one({"id": user_id})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get exchange rate (mock for now)
        rate = 1.25  # USD rate for example
        
        if from_currency == "Gold":
            if user["gold"] < amount:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Insufficient gold"
                )
            
            # Convert gold to USD
            received_amount = amount * rate
            
            # Update user's gold
            await db.users.update_one(
                {"id": user_id},
                {"$inc": {"gold": -amount}}
            )
            
            return {
                "message": f"Exchanged {amount} Gold for ${received_amount:.2f} USD",
                "amount_sent": amount,
                "amount_received": received_amount,
                "rate": rate
            }
        
        return {"message": "Exchange completed"}

# Create global market service instance
market_service = MarketService()