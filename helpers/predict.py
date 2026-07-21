import joblib
import pandas as pd

from sklearn.preprocessing import RobustScaler
from xgboost import XGBClassifier, XGBRegressor

from core.config import SCALER_PATH, CLASSIFICATION_MODEL_PATH, REGRESSION_MODEL_PATH
from schemas.user_input import UserInput, PredictionResponse
from .helpers import classification_result_decoder, season_encode

scaler: RobustScaler = joblib.load(SCALER_PATH)
regression: XGBRegressor = joblib.load(REGRESSION_MODEL_PATH)
classification: XGBClassifier = joblib.load(CLASSIFICATION_MODEL_PATH)


def predict_medals_noc_strength(data: UserInput) -> PredictionResponse:
    classification_features = classification_df(data)
    regression_features = regression_df(data)

    cluster = int(classification.predict(classification_features)[0])
    medals = int(regression.predict(regression_features)[0])

    return PredictionResponse(
        medals=medals,
        country_strength=classification_result_decoder(cluster),
    )


def classification_df(data: UserInput) -> pd.DataFrame:

    df = pd.DataFrame(
        {
            "athletes": data.athletes,
            "avg_age": data.avg_age,
            "agv_height": data.avg_height,
            "avg_weight": data.avg_weight,
            "prev_medals": data.prev_medals,
            "prev_gold_medals": data.prev_gold_medals,
            "sports": data.sports,
            "events": data.events,
        },
        index=[0],
    )

    return df


def regression_df(data: UserInput) -> pd.DataFrame:
    season = (season_encode(data.season),)
    df = pd.DataFrame(
        {
            "season": season,
            "year": data.year,
            "athletes": data.athletes,
            "avg_age": data.avg_age,
            "agv_height": data.avg_height,
            "avg_weight": data.avg_weight,
            "prev_medals": data.prev_medals,
            "prev_gold_medals": data.prev_gold_medals,
            "sports": data.sports,
            "events": data.events,
        },
        index=[0],
    )
    exclude_cols = ["season"]
    to_scale_cols = [x for x in df.columns.tolist() if x not in exclude_cols]
    df[to_scale_cols] = scaler.transform(df[to_scale_cols])
    return df
