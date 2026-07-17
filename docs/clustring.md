## Clustering for grouping

Implement clustering with two attempt improvement and two algorithm kmeans and AgglomerativeClustering.

For feature scaling i used robust scaler which is good for massive outliers.

Pick n(k) number of clusters using elbow method the best usable is 3 so k=3.

Then both model train and predict then display performance metrics.

Metrics cases based on feature selection improvement.

With `athletes_female_percentage` feature.

```
Metrics of: Kmeans
Silhouette Score : 0.68 (closer to +1 is better)
Davies-Bouldin   : 0.67 (lower is better)
```

```
Metrics of: AgglomerativeClustering
Silhouette Score : 0.59 (closer to +1 is better)
Davies-Bouldin   : 0.78 (lower is better)
```

With out `athletes_female_percentage` feature.

```
Metrics of: Kmeans
Silhouette Score : 0.69 (closer to +1 is better)
Davies-Bouldin   : 0.67 (lower is better)
```

```
Metrics of: AgglomerativeClustering
Silhouette Score : 0.70 (closer to +1 is better)
Davies-Bouldin   : 0.63 (lower is better)
```

So kmeans always shines while AgglomerativeClustering is poor first and high after feature improvement.

So i choose kmeans because it's better than AgglomerativeClustering in grouping and performance metrics.

Inverse scaler kmeans centroids and display in meaningful apply cluster labels to dataset,sanity check and save.

## Groups

Clusters: 0 low(underdogs) noc, 1 middle noc, 2 top noc.

These groups used to classify country strength level / favorite candidates based on the historical data.
