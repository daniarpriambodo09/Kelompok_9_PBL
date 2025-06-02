from fastapi import FastAPI
from . import routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Cuaca")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ganti sesuai origin React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)