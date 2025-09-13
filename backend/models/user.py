from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    country: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserStats(BaseModel):
    strength: int = Field(default=100)
    experience: int = Field(default=0)
    wellness: int = Field(default=100)
    total_damage: int = Field(default=0)
    battles_won: int = Field(default=0)
    battles_lost: int = Field(default=0)
    rank: str = Field(default="Private")

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: EmailStr
    password_hash: str
    country: str
    gold: int = Field(default=50)
    coins: int = Field(default=1000)
    level: int = Field(default=1)
    avatar: Optional[str] = Field(default="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face")
    stats: UserStats = Field(default_factory=UserStats)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    country: str
    gold: int
    coins: int
    level: int
    avatar: Optional[str]
    stats: UserStats
    created_at: datetime
    last_login: Optional[datetime] = None

class UserUpdate(BaseModel):
    username: Optional[str] = None
    country: Optional[str] = None
    avatar: Optional[str] = None