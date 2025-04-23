[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / @envisim/estimate

# @envisim/estimate

## Estimator

| Function                                                            | theme_description                                                                                                                                                                                    |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---- |
| [hansenHurwitz](functions/hansenHurwitz.md)                         | Multiple count Hansen-Hurwitz estimator. $$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\mu_i}S_i , $$ $$ n =                                                                                               | S   | . $$ |
| [horvitzThompson](functions/horvitzThompson.md)                     | Single count Horvitz-Thompson estimator of the total $$ \hat{Y} = \sum\_{i \in S} \frac{y_i}{\pi_i} , $$ $$ n =                                                                                      | S   | . $$ |
| [nearestNeighbourEstimator](functions/nearestNeighbourEstimator.md) | $$ \hat{Y} = \sum\_{i \in S} y_i n_i , $$ where $n_i$ is the number of units in the population closer to unit $i$ than to any other unit.                                                            |
| [ratioEstimator](functions/ratioEstimator.md)                       | Ratio estimator, where a true total $X$ is available for the population. $$ \hat{T} = \frac{ \hat{Y} }{ \hat{X} } X , $$ where $\hat{Y}, \hat{X}$ are [HT-estimators](functions/horvitzThompson.md). |
| [wrEstimator](functions/wrEstimator.md)                             | $$ \hat{Y} = \sum\_{i=1}^n \frac{y_i}{n p_i} $$                                                                                                                                                      |

## Spatial balance measure

| Function                                          | theme_description |
| ------------------------------------------------- | ----------------- |
| [spatialBalanceSS](functions/spatialBalanceSS.md) | -                 |
| [spatialBalanceVO](functions/spatialBalanceVO.md) | -                 |

## Variance estimator

| Function                                    | theme_description                                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [hhVariance](functions/hhVariance.md)       | $$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\mu_i \mu_j} S_i S_j \frac{\mu*{ij} - \mu*i \mu_j}{\mu*{ij}} $$ |
| [htVariance](functions/htVariance.md)       | $$ \hat{V}(\hat{Y}) = \sum*{i \in S} \sum*{j \in S} \frac{y*i y_j}{\pi_i \pi_j} \frac{\pi*{ij} - \pi*i \pi_j}{\pi*{ij}} $$         |
| [htVarianceD](functions/htVarianceD.md)     | -                                                                                                                                  |
| [htVarianceGS](functions/htVarianceGS.md)   | -                                                                                                                                  |
| [htVarianceSYG](functions/htVarianceSYG.md) | Sen-Yates-Grundy HT-variance estimator of a fixed sample size                                                                      |
| [wrVariance](functions/wrVariance.md)       | -                                                                                                                                  |
