from enum import Enum
from pydantic import BaseModel, Field


class Season(str, Enum):
    summer = "summer"
    winter = "winter"


class UserInput(BaseModel):
    season: Season = Field(..., description="Olympic season")
    year: int = Field(..., ge=1896, description="Olympic year")
    athletes: int = Field(..., ge=0, description="Number of athletes")
    avg_age: float = Field(..., gt=0, description="Average age of athletes")
    avg_height: float = Field(..., gt=0, description="Average height (cm)")
    avg_weight: float = Field(..., gt=0, description="Average weight (kg)")
    prev_medals: int = Field(..., ge=0, description="Previous total medals")
    prev_gold_medals: int = Field(..., ge=0, description="Previous gold medals")
    sports: int = Field(..., ge=0, description="Number of sports")
    events: int = Field(..., ge=0, description="Number of events")


class PredictionResponse(BaseModel):
    medals: int
    country_strength: str
