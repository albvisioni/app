from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.military import War, BattleParticipation
from database.connection import get_database
from routes.auth import get_current_user_dependency
from models.user import UserResponse
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/wars", tags=["Wars"])

@router.get("/", response_model=List[dict])
async def get_active_wars(
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get all active wars"""
    db = await get_database()
    
    # Create some mock wars if none exist
    wars_count = await db.wars.count_documents({"status": "active"})
    
    if wars_count == 0:
        # Create initial wars
        mock_wars = [
            War(
                attacker_country="Germany",
                defender_country="France", 
                region="Alsace-Lorraine",
                attacker_flag="🇩🇪",
                defender_flag="🇫🇷",
                attacker_damage=2450000,
                defender_damage=1890000,
                participants_count=156,
                ends_at=datetime.utcnow() + timedelta(hours=4, minutes=23)
            ),
            War(
                attacker_country="Italy",
                defender_country="Switzerland",
                region="Ticino", 
                attacker_flag="🇮🇹",
                defender_flag="🇨🇭",
                attacker_damage=1230000,
                defender_damage=1890000,
                participants_count=89,
                ends_at=datetime.utcnow() + timedelta(hours=2, minutes=15)
            ),
            War(
                attacker_country="Spain",
                defender_country="Portugal",
                region="Porto",
                attacker_flag="🇪🇸", 
                defender_flag="🇵🇹",
                attacker_damage=3450000,
                defender_damage=1120000,
                participants_count=203,
                ends_at=datetime.utcnow() + timedelta(hours=6, minutes=45)
            )
        ]
        
        for war in mock_wars:
            await db.wars.insert_one(war.model_dump())
    
    # Get active wars
    wars = []
    cursor = db.wars.find({"status": "active"}).sort("started_at", -1)
    
    async for war_doc in cursor:
        # Calculate time left
        time_left = war_doc["ends_at"] - datetime.utcnow()
        hours = int(time_left.total_seconds() // 3600)
        minutes = int((time_left.total_seconds() % 3600) // 60)
        
        # Calculate percentages
        total_damage = war_doc["attacker_damage"] + war_doc["defender_damage"]
        attacker_percentage = 0 if total_damage == 0 else (war_doc["attacker_damage"] / total_damage) * 100
        
        # Determine status
        if attacker_percentage > 70:
            status = "overwhelming"
        elif attacker_percentage > 55:
            status = "advantage"
        elif attacker_percentage > 45:
            status = "balanced"
        else:
            status = "defensive"
        
        war_data = {
            "id": war_doc["id"],
            "attacker": war_doc["attacker_country"],
            "defender": war_doc["defender_country"],
            "region": war_doc["region"],
            "attackerFlag": war_doc["attacker_flag"],
            "defenderFlag": war_doc["defender_flag"],
            "attackerDamage": war_doc["attacker_damage"],
            "defenderDamage": war_doc["defender_damage"],
            "totalDamage": total_damage,
            "participants": war_doc["participants_count"],
            "timeLeft": f"{hours}h {minutes}m",
            "status": status,
            "battleRounds": [
                {"round": 1, "winner": "attacker", "damage": 125000},
                {"round": 2, "winner": "defender", "damage": 98000},
                {"round": 3, "winner": "attacker", "damage": 142000},
                {"round": 4, "winner": "attacker", "damage": 156000}
            ]
        }
        wars.append(war_data)
    
    return wars

@router.post("/{war_id}/fight")
async def fight_in_war(
    war_id: str,
    side: str,  # "attacker" or "defender"
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Participate in war battle"""
    db = await get_database()
    
    # Get war
    war = await db.wars.find_one({"id": war_id, "status": "active"})
    if not war:
        raise HTTPException(status_code=404, detail="War not found or not active")
    
    # Calculate damage based on user stats
    user_stats = current_user.stats
    base_damage = user_stats.strength * 10
    damage = random.randint(int(base_damage * 0.8), int(base_damage * 1.2))
    
    # Update war damage
    if side == "attacker":
        await db.wars.update_one(
            {"id": war_id},
            {"$inc": {"attacker_damage": damage, "participants_count": 1}}
        )
    else:
        await db.wars.update_one(
            {"id": war_id},
            {"$inc": {"defender_damage": damage, "participants_count": 1}}
        )
    
    # Update user stats
    await db.users.update_one(
        {"id": current_user.id},
        {"$inc": {"stats.total_damage": damage, "stats.battles_won": 1, "gold": 10}}
    )
    
    # Record participation
    participation = BattleParticipation(
        war_id=war_id,
        user_id=current_user.id,
        side=side,
        damage_dealt=damage
    )
    
    await db.battle_participation.insert_one(participation.model_dump())
    
    return {
        "message": f"You fought for {war[f'{side}_country']} and dealt {damage} damage!",
        "damage_dealt": damage,
        "gold_earned": 10,
        "side": side
    }

@router.get("/user/stats")
async def get_user_war_stats(
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get user's war statistics"""
    return {
        "totalDamage": current_user.stats.total_damage,
        "battlesWon": current_user.stats.battles_won,
        "battlesLost": current_user.stats.battles_lost,
        "rank": current_user.stats.rank,
        "medals": 7,  # Mock data
        "currentStrength": current_user.stats.strength
    }