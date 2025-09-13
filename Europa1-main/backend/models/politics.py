from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class PoliticalPartyCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    ideology: str = Field(..., description="Political ideology")

class PoliticalParty(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    leader_id: str
    ideology: str
    members_count: int = Field(default=1)
    popularity: float = Field(default=10.0)
    founded_at: datetime = Field(default_factory=datetime.utcnow)

class PartyMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    username: str
    party_id: str
    role: str = Field(default="Member")  # Member, Officer, Leader
    joined_at: datetime = Field(default_factory=datetime.utcnow)

class Election(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    election_type: str = Field(description="Presidential, Congressional, Regional")
    country: str
    candidate_id: str
    candidate_name: str
    party_id: Optional[str] = None
    votes: int = Field(default=0)
    position: int = Field(default=1)
    status: str = Field(default="active")  # active, completed
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ends_at: datetime

class Proposal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., max_length=1000)
    author_id: str
    author_name: str
    party_id: Optional[str] = None
    votes_for: int = Field(default=0)
    votes_against: int = Field(default=0)
    status: str = Field(default="active")  # active, passed, rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)
    voting_ends_at: datetime

class Vote(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    proposal_id: Optional[str] = None
    election_id: Optional[str] = None
    voter_id: str
    vote_type: str = Field(description="for, against, candidate_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)