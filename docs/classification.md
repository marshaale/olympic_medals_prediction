I trained three classification models using clustered dataset here are the steps.

- Dropping `'athletes_female_percentage','ag_cluster'` these features are not needed.
- Rename km_cluster to label and its the target feature
- Handling outliers using iqr range set default k3 because of medal cols massive outliers
- Split into train and test with `stratify=y` this balances the target value in train and test because our dataset is imbalance.
- Scale logistic regression model features train and test dataset using robust scaler
- Model training and prediction,inspect models test prediction,mistakes,correction ratio.

## Performance metrics

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

This concise how model learns the different classes.

```
XGB
              precision    recall  f1-score   support

           0       1.00      0.98      0.99       690
           1       0.78      0.90      0.84        69
           2       0.43      0.33      0.38         9

    accuracy                           0.97       768
   macro avg       0.74      0.74      0.73       768
weighted avg       0.97      0.97      0.97       768
```

```
RF
              precision    recall  f1-score   support

           0       1.00      0.98      0.99       690
           1       0.75      0.88      0.81        69
           2       0.42      0.56      0.48         9

    accuracy                           0.96       768
   macro avg       0.72      0.81      0.76       768
weighted avg       0.97      0.96      0.97       768
```

```
LR
              precision    recall  f1-score   support

           0       0.90      0.87      0.88       690
           1       0.11      0.10      0.10        69
           2       0.00      0.00      0.00         9

    accuracy                           0.79       768
   macro avg       0.34      0.32      0.33       768
weighted avg       0.82      0.79      0.80       768

```

The best model is random forest learns minority classes better than xgboost and higher f1 score.