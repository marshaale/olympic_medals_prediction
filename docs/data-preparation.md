## Data processing

Implemented two step data processing first step [pre-clean](../dataset/processed/pre_clean.csv)simple handling age,height,weight missing value then feature extraction based year and season olympic event.

[File](../notebooks/preprocessing.ipynb)

List of features

```py
features_cols = [
  "noc",
  "season",
  "year",
  "athletes",
  "athletes_female_percentage",
  "avg_age",
  "agv_height",
  "avg_weight",
  "prev_medals",
  "prev_gold_medals",
  "sports",
  "events",
  "total_medals",
];
```

Second step [clean-dataset](../dataset/processed/clean_athlete_events.csv) handling missing models replace 0 because NA models equal to zero.
encoding categorical season feature with label/binary encoding.
tried iqr capping(handling outlier) and skipped due to medal features massive outliers.then inspect and save.

For scaling i will use RobustScaler which is good for handling massive outliers effectively.

[File](../notebooks/processing.ipynb)
