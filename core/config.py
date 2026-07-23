from pathlib import Path

# DIRECTORIES
ROOT = Path(__file__).parent.parent

UTILS_PATH = ROOT / "utils"
MODELS_PATH = ROOT / "models"

# MODEL FILES
CLASSIFICATION_MODEL_PATH = MODELS_PATH / "rf_classification_model.joblib"
REGRESSION_MODEL_PATH = MODELS_PATH / "xgb_regression_model.joblib"

# UTILITY FILES
SCALER_PATH = UTILS_PATH / "RobustScaler.joblib"
CLASSIFICATION_MODEL_COLUMNS_PATH = UTILS_PATH / "classification_columns.json"
REGRESSION_MODEL_COLUMNS_PATH = UTILS_PATH / "regression_columns.json"

if __name__ == "__main__":
    print(ROOT)
    print(MODELS_PATH)
    print(UTILS_PATH)
    print(CLASSIFICATION_MODEL_PATH)
    print(REGRESSION_MODEL_PATH)
    print(SCALER_PATH)
    print(CLASSIFICATION_MODEL_COLUMNS_PATH)
    print(REGRESSION_MODEL_COLUMNS_PATH)
