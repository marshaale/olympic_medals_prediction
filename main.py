from fastapi import FastAPI

app = FastAPI(
    title="Olympic Medal Prediction API",
    version="1.0.0",
    description="Predict Olympic medals and country strength.",
)

@app.get("/")
def root():
    return {
        "message": "Olympic Medal Prediction API",
        "status": "running"
    }
