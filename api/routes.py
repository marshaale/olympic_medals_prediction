from helpers.predict import predict_medals_noc_strength
from schemas.user_input import UserInput, PredictionResponse
from fastapi import APIRouter, HTTPException

router = APIRouter()

# ----------------------------
# Routes
# ----------------------------


@router.post("/predict", response_model=PredictionResponse)
def predict(data: UserInput):
    try:
        return predict_medals_noc_strength(data)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
