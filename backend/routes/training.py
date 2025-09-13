from fastapi import APIRouter, HTTPException, Depends
from routes.auth import get_current_user_dependency
from models.user import UserResponse
from database.connection import get_database
import random

router = APIRouter(prefix="/training", tags=["Training"])

@router.get("/stats")
async def get_training_stats(
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get user's training statistics"""
    return {
        "strength": {
            "level": current_user.stats.strength,
            "xp": random.randint(300, 800),
            "maxXp": 1000
        },
        "leadership": {
            "level": random.randint(50, 150),
            "xp": random.randint(200, 600), 
            "maxXp": 800
        },
        "charisma": {
            "level": random.randint(80, 200),
            "xp": random.randint(100, 500),
            "maxXp": 600
        }
    }

@router.get("/options")
async def get_training_options():
    """Get available training options"""
    return [
        {
            "name": "Basic Training",
            "cost": 10,
            "strengthGain": 5,
            "time": "1 hour"
        },
        {
            "name": "Advanced Training", 
            "cost": 25,
            "strengthGain": 12,
            "time": "2 hours"
        },
        {
            "name": "Elite Training",
            "cost": 50, 
            "strengthGain": 25,
            "time": "4 hours"
        }
    ]

@router.post("/train/{skill}")
async def train_skill(
    skill: str,
    training_type: str = "basic",
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Train a specific skill"""
    db = await get_database()
    
    # Get training costs and gains
    training_costs = {
        "basic": {"cost": 10, "gain": 5},
        "advanced": {"cost": 25, "gain": 12},
        "elite": {"cost": 50, "gain": 25}
    }
    
    if training_type not in training_costs:
        raise HTTPException(status_code=400, detail="Invalid training type")
    
    cost = training_costs[training_type]["cost"]
    gain = training_costs[training_type]["gain"]
    
    # Check if user has enough gold
    if current_user.gold < cost:
        raise HTTPException(status_code=400, detail="Insufficient gold")
    
    # Update user stats
    update_fields = {"gold": -cost}
    
    if skill == "strength":
        update_fields["stats.strength"] = gain
    elif skill == "leadership": 
        # For now just add to strength as we don't have separate leadership field
        update_fields["stats.strength"] = gain // 2
    elif skill == "charisma":
        # For now just add to strength as we don't have separate charisma field  
        update_fields["stats.strength"] = gain // 3
    else:
        raise HTTPException(status_code=400, detail="Invalid skill")
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$inc": update_fields}
    )
    
    return {
        "message": f"Successfully trained {skill} with {training_type} training!",
        "skill": skill,
        "gain": gain,
        "cost": cost,
        "training_type": training_type
    }