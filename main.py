from fastapi import FastAPI
from api.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Olympic Medal Prediction API",
    version="1.0.0",
    description="Predict Olympic medals and country strength.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Olympic Medal Prediction API", "status": "running"}


app.include_router(router, prefix="/api/v1")
