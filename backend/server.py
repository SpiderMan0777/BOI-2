from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import random
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Bank of India BC Point API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name_en: str
    name_hi: str
    name_mr: str
    description_en: str
    description_hi: str
    description_mr: str
    icon: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    name_en: str
    name_hi: str
    name_mr: str
    description_en: str
    description_hi: str
    description_mr: str
    icon: str

class DailyContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # quote, tip, fact
    content_en: str
    content_hi: str
    content_mr: str
    author: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)

class DailyContentCreate(BaseModel):
    type: str
    content_en: str
    content_hi: str
    content_mr: str
    author: Optional[str] = None

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminUserCreate(BaseModel):
    username: str
    email: str
    role: str = "admin"

class AIQuery(BaseModel):
    query: str
    language: str = "en"

class AIResponse(BaseModel):
    response: str
    suggestions: List[str]

# Default services data
DEFAULT_SERVICES = [
    {
        "name_en": "PAN Card Services",
        "name_hi": "पैन कार्ड सेवाएं",
        "name_mr": "पॅन कार्ड सेवा",
        "description_en": "Apply for new PAN card or update existing PAN card details",
        "description_hi": "नया पैन कार्ड बनाने या मौजूदा पैन कार्ड विवरण अपडेट करने के लिए आवेदन करें",
        "description_mr": "नवीन पॅन कार्ड बनवण्यासाठी किंवा विद्यमान पॅन कार्ड तपशील अपडेट करण्यासाठी अर्ज करा",
        "icon": "credit-card"
    },
    {
        "name_en": "Xerox & Printing",
        "name_hi": "ज़ेरॉक्स और प्रिंटिंग",
        "name_mr": "झेरॉक्स व प्रिंटिंग",
        "description_en": "Document xerox, printing, and scanning services",
        "description_hi": "दस्तावेज़ ज़ेरॉक्स, प्रिंटिंग और स्कैनिंग सेवाएं",
        "description_mr": "दस्तऐवज झेरॉक्स, प्रिंटिंग आणि स्कॅनिंग सेवा",
        "icon": "printer"
    },
    {
        "name_en": "Electricity Bill Payment",
        "name_hi": "बिजली बिल भुगतान",
        "name_mr": "लाईट बिल भरणे",
        "description_en": "Pay your electricity bills online quickly and securely",
        "description_hi": "अपने बिजली बिल का भुगतान ऑनलाइन तुरंत और सुरक्षित रूप से करें",
        "description_mr": "तुमचे वीज बिल ऑनलाइन झटपट आणि सुरक्षितपणे भरा",
        "icon": "zap"
    },
    {
        "name_en": "E-Services Forms",
        "name_hi": "ई-सेवा फॉर्म",
        "name_mr": "ई-सेवा फॉर्म",
        "description_en": "Fill various government e-service forms online",
        "description_hi": "विभिन्न सरकारी ई-सेवा फॉर्म ऑनलाइन भरें",
        "description_mr": "विविध सरकारी ई-सेवा फॉर्म ऑनलाइन भरा",
        "icon": "file-text"
    },
    {
        "name_en": "Banking Services",
        "name_hi": "बैंकिंग सेवाएं",
        "name_mr": "बँकिंग सेवा",
        "description_en": "Morning 10 AM to 1 PM & Evening 6 PM to 9 PM",
        "description_hi": "सुबह 10 से 1 बजे और शाम 6 से 9 बजे",
        "description_mr": "सकाळी 10 ते 1 व सायंकाळ 6 ते 9",
        "icon": "building"
    }
]

# Default daily content
DEFAULT_DAILY_CONTENT = [
    {
        "type": "quote",
        "content_en": "Banking is about trust, and trust is about relationships.",
        "content_hi": "बैंकिंग भरोसे के बारे में है, और भरोसा रिश्तों के बारे में है।",
        "content_mr": "बँकिंग म्हणजे विश्वास, आणि विश्वास म्हणजे नातेसंबंध।",
        "author": "Bank of India"
    },
    {
        "type": "tip",
        "content_en": "Always keep your banking documents safe and secure.",
        "content_hi": "हमेशा अपने बैंकिंग दस्तावेज़ सुरक्षित रखें।",
        "content_mr": "तुमचे बँकिंग दस्तऐवज नेहमी सुरक्षित ठेवा।",
        "author": "Security Team"
    },
    {
        "type": "fact",
        "content_en": "Bank of India serves millions of customers across the country.",
        "content_hi": "बैंक ऑफ़ इंडिया पूरे देश में करोड़ों ग्राहकों की सेवा करता है।",
        "content_mr": "बँक ऑफ इंडिया देशभरात कोट्यवधी ग्राहकांना सेवा देते।",
        "author": "Bank of India"
    }
]

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Bank of India BC Point API", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({"active": True}).to_list(1000)
    if not services:
        # Insert default services if none exist
        for service_data in DEFAULT_SERVICES:
            service_obj = Service(**service_data)
            await db.services.insert_one(service_obj.dict())
        services = await db.services.find({"active": True}).to_list(1000)
    return [Service(**service) for service in services]

@api_router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate):
    service_obj = Service(**service.dict())
    await db.services.insert_one(service_obj.dict())
    return service_obj

@api_router.get("/daily-content")
async def get_daily_content():
    today = datetime.utcnow().date()
    content = await db.daily_content.find_one({
        "date": {
            "$gte": datetime.combine(today, datetime.min.time()),
            "$lt": datetime.combine(today + timedelta(days=1), datetime.min.time())
        }
    })
    
    if not content:
        # Create today's content if it doesn't exist
        random_content = random.choice(DEFAULT_DAILY_CONTENT)
        content_obj = DailyContent(**random_content)
        await db.daily_content.insert_one(content_obj.dict())
        content = content_obj.dict()
    
    return DailyContent(**content)

@api_router.post("/daily-content", response_model=DailyContent)
async def create_daily_content(content: DailyContentCreate):
    content_obj = DailyContent(**content.dict())
    await db.daily_content.insert_one(content_obj.dict())
    return content_obj

@api_router.post("/ai-query", response_model=AIResponse)
async def ai_query(query: AIQuery):
    # Simple AI-like responses for banking queries
    responses = {
        "en": {
            "account": "To open a new account, please visit our branch with required documents like Aadhar card, PAN card, and address proof.",
            "loan": "For loan applications, we offer personal loans, home loans, and business loans. Please contact our loan officer for more details.",
            "deposit": "We offer various deposit schemes including Fixed Deposits, Recurring Deposits, and Savings accounts with competitive interest rates.",
            "default": "Thank you for your query. Please visit our branch or contact our customer service for detailed information."
        },
        "hi": {
            "account": "नया खाता खोलने के लिए, कृपया आधार कार्ड, पैन कार्ड और पता प्रमाण जैसे आवश्यक दस्तावेजों के साथ हमारी शाखा में जाएं।",
            "loan": "ऋण आवेदन के लिए, हम व्यक्तिगत ऋण, गृह ऋण और व्यावसायिक ऋण प्रदान करते हैं। अधिक विवरण के लिए कृपया हमारे ऋण अधिकारी से संपर्क करें।",
            "deposit": "हम प्रतिस्पर्धी ब्याज दरों के साथ फिक्स्ड डिपॉज़िट, रेकरिंग डिपॉज़िट और सेविंग्स खाते सहित विभिन्न जमा योजनाएं प्रदान करते हैं।",
            "default": "आपके प्रश्न के लिए धन्यवाद। कृपया हमारी शाखा में जाएं या विस्तृत जानकारी के लिए हमारी ग्राहक सेवा से संपर्क करें।"
        },
        "mr": {
            "account": "नवीन खाते उघडण्यासाठी, कृपया आधार कार्ड, पॅन कार्ड आणि पत्त्याचा पुरावा यांसारख्या आवश्यक कागदपत्रांसह आमच्या शाखेत भेट द्या.",
            "loan": "कर्ज अर्जासाठी, आम्ही वैयक्तिक कर्ज, गृह कर्ज आणि व्यावसायिक कर्ज देतो. अधिक माहितीसाठी कृपया आमच्या कर्ज अधिकाऱ्याशी संपर्क साधा.",
            "deposit": "आम्ही स्पर्धात्मक व्याज दरांसह फिक्स्ड डिपॉझिट, रेकरिंग डिपॉझिट आणि सेविंग्स खाते यासह विविध ठेव योजना देतो.",
            "default": "तुमच्या प्रश्नाबद्दल धन्यवाद. कृपया आमच्या शाखेत भेट द्या किंवा तपशीलवार माहितीसाठी आमच्या ग्राहक सेवेशी संपर्क साधा."
        }
    }
    
    # Simple keyword matching for responses
    query_lower = query.query.lower()
    lang_responses = responses.get(query.language, responses["en"])
    
    if any(word in query_lower for word in ["account", "खाता", "खाते"]):
        response = lang_responses["account"]
    elif any(word in query_lower for word in ["loan", "ऋण", "कर्ज"]):
        response = lang_responses["loan"]
    elif any(word in query_lower for word in ["deposit", "जमा", "ठेव"]):
        response = lang_responses["deposit"]
    else:
        response = lang_responses["default"]
    
    suggestions = [
        "How to open a new account?",
        "What documents are required?",
        "What are the loan options?",
        "Interest rates information"
    ]
    
    return AIResponse(response=response, suggestions=suggestions)

@api_router.get("/admin/users", response_model=List[AdminUser])
async def get_admin_users():
    users = await db.admin_users.find().to_list(1000)
    return [AdminUser(**user) for user in users]

@api_router.post("/admin/users", response_model=AdminUser)
async def create_admin_user(user: AdminUserCreate):
    user_obj = AdminUser(**user.dict())
    await db.admin_users.insert_one(user_obj.dict())
    return user_obj

@api_router.get("/terms-policy")
async def get_terms_policy():
    return {
        "terms": {
            "en": "By using our services, you agree to our terms and conditions...",
            "hi": "हमारी सेवाओं का उपयोग करके, आप हमारे नियमों और शर्तों से सहमत हैं...",
            "mr": "आमच्या सेवा वापरून, तुम्ही आमच्या नियम आणि अटींशी सहमत आहात..."
        },
        "privacy": {
            "en": "We respect your privacy and protect your personal information...",
            "hi": "हम आपकी गोपनीयता का सम्मान करते हैं और आपकी व्यक्तिगत जानकारी की सुरक्षा करते हैं...",
            "mr": "आम्ही तुमच्या गोपनीयतेचा आदर करतो आणि तुमची वैयक्तिक माहिती सुरक्षित ठेवतो..."
        }
    }

# Include router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()