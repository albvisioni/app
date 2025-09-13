from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from models.market import MarketItemCreate, MarketItemResponse, BuyRequest, ExchangeRate
from services.market_service import market_service
from routes.auth import get_current_user_dependency
from models.user import UserResponse

router = APIRouter(prefix="/market", tags=["Market"])

@router.post("/items", response_model=MarketItemResponse)
async def create_market_item(
    item_data: MarketItemCreate,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Create new market item for sale"""
    return await market_service.create_market_item(item_data, current_user.id, current_user.username)

@router.get("/items", response_model=List[MarketItemResponse])
async def get_market_items(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in item names"),
    limit: int = Query(50, ge=1, le=100, description="Number of items to return"),
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get market items with optional filtering"""
    return await market_service.get_market_items(category, search, limit)

@router.post("/buy")
async def buy_item(
    buy_request: BuyRequest,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Buy item from market"""
    return await market_service.buy_item(buy_request, current_user.id)

@router.get("/inventory")
async def get_user_inventory(
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get user's inventory"""
    return await market_service.get_user_inventory(current_user.id)

@router.get("/exchange-rates", response_model=List[ExchangeRate])
async def get_exchange_rates():
    """Get current exchange rates"""
    return await market_service.get_exchange_rates()

@router.post("/exchange")
async def exchange_currency(
    from_currency: str,
    to_currency: str,
    amount: float,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Exchange currency"""
    return await market_service.exchange_currency(
        current_user.id, from_currency, to_currency, amount
    )