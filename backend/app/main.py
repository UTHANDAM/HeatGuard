from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.endpoints import router

app = FastAPI(
    title="HeatGuard — Workforce Heat Risk Intelligence Platform",
    description="Backend API and Multi-Agent Guardian System for Abu Dhabi Climate-Resilient Occupational Safety",
    version="1.0.0"
)

# Enable CORS for local development and PWA clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
