import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
import logging

logger = logging.getLogger(__name__)

class DatabaseConnection:
    client: AsyncIOMotorClient = None
    database = None

db_connection = DatabaseConnection()

async def connect_to_mongo():
    """Connect to MongoDB"""
    try:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME')
        
        logger.info(f"Connecting to MongoDB at {mongo_url}")
        
        db_connection.client = AsyncIOMotorClient(mongo_url)
        db_connection.database = db_connection.client[db_name]
        
        # Test the connection
        await db_connection.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        # Create indexes for better performance
        await create_indexes()
        
    except ConnectionFailure as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close MongoDB connection"""
    if db_connection.client:
        db_connection.client.close()
        logger.info("Disconnected from MongoDB")

async def get_database():
    """Get database instance"""
    return db_connection.database

async def create_indexes():
    """Create database indexes for better performance"""
    if db_connection.database is None:
        return
    
    try:
        # User indexes
        await db_connection.database.users.create_index("email", unique=True)
        await db_connection.database.users.create_index("username", unique=True)
        
        # Company indexes
        await db_connection.database.companies.create_index("owner_id")
        await db_connection.database.companies.create_index("location")
        
        # Market indexes
        await db_connection.database.market_items.create_index("category")
        await db_connection.database.market_items.create_index("seller_id")
        await db_connection.database.market_items.create_index("price")
        
        # Military indexes
        await db_connection.database.military_units.create_index("leader_id")
        await db_connection.database.military_members.create_index("user_id")
        await db_connection.database.military_members.create_index("military_unit_id")
        
        # War indexes
        await db_connection.database.wars.create_index("status")
        await db_connection.database.wars.create_index("started_at")
        
        # Politics indexes
        await db_connection.database.political_parties.create_index("leader_id")
        await db_connection.database.elections.create_index("status")
        await db_connection.database.proposals.create_index("status")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")