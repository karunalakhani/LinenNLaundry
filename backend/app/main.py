from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import linen, department, laundry, analytics, inventory, reports
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Linen & Laundry Management System",
    description="API for managing hospital linen and laundry operations",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(linen.router, prefix="/api/v1/linens", tags=["linens"])
app.include_router(department.router, prefix="/api/v1/departments", tags=["departments"])
app.include_router(laundry.router, prefix="/api/v1/laundry", tags=["laundry"])
# app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["inventory"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["reports"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Linen & Laundry Management System API"}