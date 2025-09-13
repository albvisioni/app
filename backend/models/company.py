from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class CompanyCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    company_type: str = Field(..., description="Type of company (Steel Production, Food Production, etc.)")
    location: str

class Company(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company_type: str
    owner_id: str
    location: str
    level: int = Field(default=1)
    employees: int = Field(default=0)
    max_employees: int = Field(default=5)
    productivity: float = Field(default=50.0)
    daily_revenue: int = Field(default=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_production: Optional[datetime] = None

class CompanyResponse(BaseModel):
    id: str
    name: str
    company_type: str
    owner_id: str
    location: str
    level: int
    employees: int
    max_employees: int
    productivity: float
    daily_revenue: int
    created_at: datetime
    last_production: Optional[datetime] = None

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    level: Optional[int] = None
    productivity: Optional[float] = None