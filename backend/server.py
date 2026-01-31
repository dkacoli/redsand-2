from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class PropertyType(str, Enum):
    INVESTMENT = "investment"
    RESIDENTIAL = "residential"

class PropertyStatus(str, Enum):
    AVAILABLE = "available"
    SOLD = "sold"
    PENDING = "pending"

# Define Models
class PropertyBase(BaseModel):
    title: str
    description: str
    price: float
    location: str
    area: str
    bedrooms: int
    bathrooms: int
    sqft: float
    property_type: PropertyType
    status: PropertyStatus = PropertyStatus.AVAILABLE
    features: List[str] = []
    images: List[str] = []
    roi: Optional[float] = None  # For investment properties
    rental_yield: Optional[float] = None  # For investment properties

class PropertyCreate(PropertyBase):
    pass

class Property(PropertyBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    location: Optional[str] = None
    area: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    sqft: Optional[float] = None
    property_type: Optional[PropertyType] = None
    status: Optional[PropertyStatus] = None
    features: Optional[List[str]] = None
    images: Optional[List[str]] = None
    roi: Optional[float] = None
    rental_yield: Optional[float] = None

class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    property_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactInquiryCreate(BaseModel):
    name: str
    email: str
    message: str
    property_id: Optional[str] = None

class AdminLogin(BaseModel):
    username: str
    password: str

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "REDSAND Real Estate API"}

# Property endpoints
@api_router.post("/properties", response_model=Property)
async def create_property(property_data: PropertyCreate):
    property_obj = Property(**property_data.model_dump())
    doc = property_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.properties.insert_one(doc)
    return property_obj

@api_router.get("/properties", response_model=List[Property])
async def get_properties(
    property_type: Optional[PropertyType] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    area: Optional[str] = None,
    status: Optional[PropertyStatus] = None,
    limit: int = Query(default=50, le=100),
    skip: int = 0
):
    query = {}
    if property_type:
        query['property_type'] = property_type.value
    if min_price is not None:
        query['price'] = {'$gte': min_price}
    if max_price is not None:
        if 'price' in query:
            query['price']['$lte'] = max_price
        else:
            query['price'] = {'$lte': max_price}
    if bedrooms is not None:
        query['bedrooms'] = bedrooms
    if area:
        query['area'] = area
    if status:
        query['status'] = status.value
    
    properties = await db.properties.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    
    for prop in properties:
        if isinstance(prop.get('created_at'), str):
            prop['created_at'] = datetime.fromisoformat(prop['created_at'])
        if isinstance(prop.get('updated_at'), str):
            prop['updated_at'] = datetime.fromisoformat(prop['updated_at'])
    
    return properties

@api_router.get("/properties/featured", response_model=List[Property])
async def get_featured_properties(limit: int = 6):
    properties = await db.properties.find(
        {"status": "available"}, 
        {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    for prop in properties:
        if isinstance(prop.get('created_at'), str):
            prop['created_at'] = datetime.fromisoformat(prop['created_at'])
        if isinstance(prop.get('updated_at'), str):
            prop['updated_at'] = datetime.fromisoformat(prop['updated_at'])
    
    return properties

@api_router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    property_doc = await db.properties.find_one({"id": property_id}, {"_id": 0})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    if isinstance(property_doc.get('created_at'), str):
        property_doc['created_at'] = datetime.fromisoformat(property_doc['created_at'])
    if isinstance(property_doc.get('updated_at'), str):
        property_doc['updated_at'] = datetime.fromisoformat(property_doc['updated_at'])
    
    return property_doc

@api_router.put("/properties/{property_id}", response_model=Property)
async def update_property(property_id: str, property_update: PropertyUpdate):
    existing = await db.properties.find_one({"id": property_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Property not found")
    
    update_data = {k: v for k, v in property_update.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.properties.update_one({"id": property_id}, {"$set": update_data})
    
    updated = await db.properties.find_one({"id": property_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    
    return updated

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str):
    result = await db.properties.delete_one({"id": property_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted successfully"}

# Contact inquiry endpoints
@api_router.post("/inquiries", response_model=ContactInquiry)
async def create_inquiry(inquiry_data: ContactInquiryCreate):
    inquiry_obj = ContactInquiry(**inquiry_data.model_dump())
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiries.insert_one(doc)
    return inquiry_obj

@api_router.get("/inquiries", response_model=List[ContactInquiry])
async def get_inquiries(limit: int = Query(default=50, le=100), skip: int = 0):
    inquiries = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    for inquiry in inquiries:
        if isinstance(inquiry.get('created_at'), str):
            inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
    
    return inquiries

@api_router.delete("/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str):
    result = await db.inquiries.delete_one({"id": inquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Inquiry deleted successfully"}

# Stats for admin dashboard
@api_router.get("/stats")
async def get_stats():
    total_properties = await db.properties.count_documents({})
    available_properties = await db.properties.count_documents({"status": "available"})
    investment_count = await db.properties.count_documents({"property_type": "investment"})
    residential_count = await db.properties.count_documents({"property_type": "residential"})
    total_inquiries = await db.inquiries.count_documents({})
    
    return {
        "total_properties": total_properties,
        "available_properties": available_properties,
        "investment_count": investment_count,
        "residential_count": residential_count,
        "total_inquiries": total_inquiries
    }

# Get unique areas for filtering
@api_router.get("/areas")
async def get_areas():
    areas = await db.properties.distinct("area")
    return areas

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
