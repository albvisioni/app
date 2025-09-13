from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class MarketItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., description="resources, consumables, equipment")
    quality: int = Field(..., ge=1, le=5, description="Quality level 1-5")
    price: float = Field(..., gt=0)
    quantity: int = Field(..., gt=0)

class MarketItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    quality: int
    price: float
    quantity: int
    seller_id: str
    seller_name: str
    icon: str = Field(default="📦")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MarketItemResponse(BaseModel):
    id: str
    name: str
    category: str
    quality: int
    price: float
    quantity: int
    seller_id: str
    seller_name: str
    icon: str
    created_at: datetime

class MarketTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    item_id: str
    buyer_id: str
    seller_id: str
    item_name: str
    quantity: int
    price_per_unit: float
    total_price: float
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BuyRequest(BaseModel):
    item_id: str
    quantity: int = Field(..., gt=0)

class ExchangeRate(BaseModel):
    from_currency: str
    to_currency: str
    rate: float
    change_percentage: str
    trend: str = Field(description="up or down")

class CurrencyExchange(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    from_currency: str
    to_currency: str
    amount: float
    rate: float
    total_received: float
    created_at: datetime = Field(default_factory=datetime.utcnow)