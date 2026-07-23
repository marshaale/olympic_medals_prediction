# Machine Learning Project Report Template

## 1. Project Title

_Olympic Medals Prediction and Country Strength Classification_

### Project Description

A Multi modal machine learning predicting how many medals a country will win and classifies it's strength using historical data.

The benefits is predicting medals winners and favorite candidates.

---

# 2. Dataset Details

- **Source:** [120 years of Olympic history: athletes and results](https://www.kaggle.com/datasets/heesoo37/120-years-of-olympic-history-athletes-and-results?select=athlete_events.csv) (basic bio data on athletes and medal results from Athens 1896 to Rio 2016).
- **Size:** ~271116 rows, 15 columns.

The dataset has one athlete result per row. so the features will be engineered from.

- ID - Unique number for each athlete
- Name - Athlete's name
- Sex - M or F
- Age - Integer
- Height - In centimeters
- Weight - In kilograms
- Team - Team name
- NOC - National Olympic Committee 3-letter code
- Games - Year and season
- Year - Integer
- Season - Summer or Winter
- City - Host city
- Sport - Sport
- Event - Event
- Medal - Gold, Silver, Bronze, or NA

- **Target:** `total_medals` and `country_strength`.

Expected features after engineering

- **Main features:**
  - `athletes` — number of athletes to participate
  - `athletes_female_percentage` — Percentage of female athletes
  - `prev_medals` — number of previous/last year medals win.
  - `avg_age` — avg age for athletes
  - `agv_height` — avg height for athletes
  - `avg_weight` — avg weight for athletes
  - `prev_gold_medals` — number of gold medals win.
  - `sports` — how many different sports the country participates in.
  - `events` — how many individual events the country enters.
  - `season` — summer or winter will be categorical binary encoding

**Preprocessing plan:** standardize features,impute missing values,feature engineering,outlier handling,scale numeric features, stratified train/test split (80/20).

---

# 3. Algorithms Used

### Clustering

- Kmeans
- AgAgglomerativeClustering

### Classification

- Logistic Regression
- Random Forest
- XGBoost

### Regression

- Linear Regression
- Random Forest
- XGBoost

---

# 4. Model Comparison

### Classification

```
XGboost Performance:
  Accuracy : 0.969
  Precision: 0.736
  Recall   : 0.739
  F1-Score : 0.734

Random forest Performance:
  Accuracy : 0.964
  Precision: 0.723
  Recall   : 0.805
  F1-Score : 0.759

Logistic regression Performance:
  Accuracy : 0.915
  Precision: 0.577
  Recall   : 0.785
  F1-Score : 0.618
```

### Regression

```
LinearRegression Performance:
  R²   : 0.783
  MAE  : 3
  MSE  : 55
  RMSE : 7

Xgboost Performance:
  R²   : 0.860
  MAE  : 2
  MSE  : 35
  RMSE : 6

RandomForest Performance:
  R²   : 0.833
  MAE  : 2
  MSE  : 42
  RMSE : 6
```

### Clustering

```
Metrics of: Kmeans
Silhouette Score : 0.69 (closer to +1 is better)
Davies-Bouldin   : 0.67 (lower is better)

Metrics of: AgglomerativeClustering
Silhouette Score : 0.70 (closer to +1 is better)
Davies-Bouldin   : 0.63 (lower is better)
```

### Best Performing Model

**Winner:** Random forest for classification and Xgboost for regression

### Why It Won

- Highest evaluation metric(s)
- Better generalization

---

# 5. Commands

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Start the API

```bash
uvicorn main:app --reload
```

---

# 6. API Usage

### Request

```bash
curl -X POST 'http://127.0.0.1:8000/api/v1/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "season": "summer",
    "year": 2024,
    "athletes": 120,
    "avg_age": 25.5,
    "avg_height": 178,
    "avg_weight": 74,
    "prev_medals": 10,
    "prev_gold_medals": 3,
    "sports": 15,
    "events": 40
  }'
```

### Response

```json
{
  "medals": 14,
  "country_strength": "Competitive Nation 🥈"
}
```

---

# 7. Results Summary

> Three machine learning models for each classification and regression. Random Forest achieved the highest overall performance in classification and Xgboost achieved the highest overall performance in regression.
