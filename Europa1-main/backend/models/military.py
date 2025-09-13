from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class MilitaryUnitCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    motto: str = Field(..., max_length=200)

class MilitaryUnit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    leader_id: str
    motto: str
    members_count: int = Field(default=1)
    max_members: int = Field(default=50)
    level: int = Field(default=1)
    battles_fought: int = Field(default=0)
    victories: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MilitaryMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    username: str
    military_unit_id: str
    rank: str = Field(default="Private")
    total_damage: int = Field(default=0)
    battles_participated: int = Field(default=0)
    joined_at: datetime = Field(default_factory=datetime.utcnow)

class War(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    attacker_country: str
    defender_country: str
    region: str
    attacker_flag: str
    defender_flag: str
    attacker_damage: int = Field(default=0)
    defender_damage: int = Field(default=0)
    participants_count: int = Field(default=0)
    status: str = Field(default="active")  # active, finished
    winner: Optional[str] = None
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ends_at: datetime

class BattleRound(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    war_id: str
    round_number: int
    winner_side: str  # attacker or defender
    damage_dealt: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BattleParticipation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    war_id: str
    user_id: str
    side: str  # attacker or defender
    damage_dealt: int
    rounds_participated: int = Field(default=1)
    created_at: datetime = Field(default_factory=datetime.utcnow)