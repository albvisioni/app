from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.company import CompanyCreate, CompanyResponse, CompanyUpdate
from services.company_service import company_service
from routes.auth import get_current_user_dependency
from models.user import UserResponse

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.post("/", response_model=CompanyResponse)
async def create_company(
    company_data: CompanyCreate,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Create new company"""
    return await company_service.create_company(company_data, current_user.id)

@router.get("/", response_model=List[CompanyResponse])
async def get_user_companies(
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get all companies owned by user"""
    return await company_service.get_user_companies(current_user.id)

@router.get("/{company_id}", response_model=CompanyResponse)
async def get_company(
    company_id: str,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Get company by ID"""
    company = await company_service.get_company_by_id(company_id, current_user.id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.put("/{company_id}", response_model=CompanyResponse)
async def update_company(
    company_id: str,
    update_data: CompanyUpdate,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Update company"""
    return await company_service.update_company(company_id, current_user.id, update_data)

@router.delete("/{company_id}")
async def delete_company(
    company_id: str,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Delete company"""
    success = await company_service.delete_company(company_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted successfully"}

@router.post("/{company_id}/work")
async def work_in_company(
    company_id: str,
    current_user: UserResponse = Depends(get_current_user_dependency)
):
    """Work in company to earn money"""
    return await company_service.work_in_company(company_id, current_user.id)