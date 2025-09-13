from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager

# Import database connection
from database.connection import connect_to_mongo, close_mongo_connection

# Import routes
from routes.auth import router as auth_router
from routes.companies import router as companies_router
from routes.market import router as market_router
from routes.wars import router as wars_router
from routes.training import router as training_router

# Import services
from services.auth_service import auth_service
from services.company_service import company_service
from services.market_service import market_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    logger.info("Europa backend started successfully!")
    yield
    # Shutdown
    await close_mongo_connection()
    logger.info("Europa backend shutdown complete")

# Create the main app
app = FastAPI(
    title="Europa API",
    description="Backend API for Europa - Political & Military Strategy Game",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Europa API is running!", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "Europa Backend",
        "version": "1.0.0"
    }

# Include all routers
api_router.include_router(auth_router)
api_router.include_router(companies_router)
api_router.include_router(market_router)
api_router.include_router(wars_router)
api_router.include_router(training_router)

# Include the router in the main app
app.include_router(api_router)