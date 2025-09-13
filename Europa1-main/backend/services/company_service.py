from typing import List, Optional
from fastapi import HTTPException, status
from models.company import Company, CompanyCreate, CompanyResponse, CompanyUpdate
from database.connection import get_database
import logging

logger = logging.getLogger(__name__)

class CompanyService:
    def __init__(self):
        pass

    async def create_company(self, company_data: CompanyCreate, owner_id: str) -> CompanyResponse:
        """Create new company"""
        db = await get_database()
        
        # Check if user already has a company with the same name
        existing_company = await db.companies.find_one({
            "owner_id": owner_id,
            "name": company_data.name
        })
        
        if existing_company:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You already have a company with this name"
            )

        # Create new company
        new_company = Company(
            name=company_data.name,
            company_type=company_data.company_type,
            owner_id=owner_id,
            location=company_data.location
        )

        # Calculate initial values based on company type
        if "Steel" in company_data.company_type:
            new_company.daily_revenue = 150
            new_company.max_employees = 10
        elif "Food" in company_data.company_type:
            new_company.daily_revenue = 120
            new_company.max_employees = 8
        else:
            new_company.daily_revenue = 100
            new_company.max_employees = 5

        # Insert to database
        result = await db.companies.insert_one(new_company.model_dump())
        
        if result.inserted_id:
            return CompanyResponse(**new_company.model_dump())
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create company"
            )

    async def get_user_companies(self, owner_id: str) -> List[CompanyResponse]:
        """Get all companies owned by user"""
        db = await get_database()
        
        companies = []
        cursor = db.companies.find({"owner_id": owner_id})
        
        async for company_doc in cursor:
            companies.append(CompanyResponse(**company_doc))
        
        return companies

    async def get_company_by_id(self, company_id: str, owner_id: str) -> Optional[CompanyResponse]:
        """Get company by ID (only if owned by user)"""
        db = await get_database()
        
        company_doc = await db.companies.find_one({
            "id": company_id,
            "owner_id": owner_id
        })
        
        if company_doc:
            return CompanyResponse(**company_doc)
        return None

    async def update_company(self, company_id: str, owner_id: str, update_data: CompanyUpdate) -> CompanyResponse:
        """Update company"""
        db = await get_database()
        
        # Check if company exists and is owned by user
        existing_company = await db.companies.find_one({
            "id": company_id,
            "owner_id": owner_id
        })
        
        if not existing_company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found or you don't own it"
            )

        # Update only provided fields
        update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
        
        if update_dict:
            await db.companies.update_one(
                {"id": company_id},
                {"$set": update_dict}
            )

        # Return updated company
        updated_company = await db.companies.find_one({"id": company_id})
        return CompanyResponse(**updated_company)

    async def delete_company(self, company_id: str, owner_id: str) -> bool:
        """Delete company"""
        db = await get_database()
        
        result = await db.companies.delete_one({
            "id": company_id,
            "owner_id": owner_id
        })
        
        return result.deleted_count > 0

    async def work_in_company(self, company_id: str, owner_id: str) -> dict:
        """Work in company to earn money"""
        db = await get_database()
        
        # Get company
        company = await db.companies.find_one({
            "id": company_id,
            "owner_id": owner_id
        })
        
        if not company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )

        # Calculate earnings based on company level and productivity
        base_earnings = company["daily_revenue"] // 10
        productivity_bonus = int(base_earnings * (company["productivity"] / 100))
        total_earnings = base_earnings + productivity_bonus

        # Update user's coins
        await db.users.update_one(
            {"id": owner_id},
            {"$inc": {"coins": total_earnings}}
        )

        return {
            "earnings": total_earnings,
            "message": f"You worked in {company['name']} and earned {total_earnings} coins!"
        }

# Create global company service instance
company_service = CompanyService()