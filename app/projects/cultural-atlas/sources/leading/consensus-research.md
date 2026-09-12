# Mapping **Leading** to Country Scores

The strongest empirical basis for Erin Meyer’s **Leading** scale is to anchor it in existing country-level measures of **hierarchy vs egalitarianism** or **power distance**, then rescale to 0–99. The best direct sources are Schwartz’s country scores for **hierarchy** and **egalitarianism**, GLOBE’s **power distance** scores, and Hofstede-style **power distance** replications; qualitative supplements come from GLOBE rank/band tables and Meyer-specific interview studies; useful proxies include participative leadership, decentralization/management autonomy, and compensation or workplace inequality measures  (Schwartz, 2008; House et al., 2002; Beugelsdijk et al., 2015).

## Best Direct Measures

The closest 1:1 construct match is Schwartz’s culture-level **hierarchy vs egalitarianism** dimension, because it names the two poles the user wants and reports country cultural value scores intended for cross-national comparison  (Schwartz, 2008). A 2011 update reports society cultural value scores for 50 societies and explicitly includes the societal dimensions of **hierarchy** and **egalitarianism**, making it a practical modern database source  (Ralston et al., 2011).

Schwartz’s dataset is also reused as country-level numeric input by later papers, which confirms that the scores exist in tabular form and are being treated as macro-level country variables rather than only conceptual dimensions  (Lomazzi & Seddig, 2020). Other cross-national studies use the same hierarchy and egalitarianism country scores as predictors across 19, 25, and 13-country samples, which supports their portability into a database  (Masuda et al., 2019; Heim et al., 2017; Diallo, 2020).

A second strong direct source is GLOBE **power distance**, because it is a country-level cultural dimension about whether power is expected and accepted as unequally shared  (House et al., 2002; Javidan & Dastmalchian, 2009). GLOBE covers 61–62 societies and is based on large manager samples, which fits Meyer’s business-context framing better than many general-values surveys  (House et al., 2002; Kennedy & King, 2005).

A third direct source is Hofstede-style **power distance** when a ready-made 0–100 style score is preferred. A replication study gives an explicit rescaling formula for national **Power Distance** and notes that applying the same formula across cohorts can yield scores below 0 or above 100, so clipping or min–max normalization is needed if the target range must be 0–99  (Beugelsdijk et al., 2015).

## Recommended Source Tiers

Direct numerical sources differ in construct fidelity and ease of transformation.

| Source | Fit to Meyer “Leading” | Coverage | Scale readiness | Recommended use |
|---|---|---:|---|---|
| Schwartz hierarchy–egalitarianism | **Highest conceptual fit** | 50–84 countries | Needs normalization/inversion | Primary backbone  (Ralston et al., 2011)|
| GLOBE power distance | High fit | 61–62 societies | 7-point scale, easy rescale | Primary alternate  (House et al., 2002)|
| Hofstede power distance replication | High fit but older tradition | multi-country | Already formula-scaled near 0–100 | Convenient fallback  (Beugelsdijk et al., 2015)|
| GLOBE “should be” power distance | Medium-high fit | fewer reused tables | Numeric but normative | Use if valuing aspirational culture  (Waldman et al., 2006)|
| Schwartz-related WVS/ESS reconstructions | Medium fit | broader/variable | Requires interpretation | Secondary expansion  (Kaasa & Welzel, 2023)|

**Figure 1:** Best source families for leading-scale country scoring

If the goal is one single country score per country, Schwartz is the cleanest theoretical match and GLOBE power distance is the cleanest business-management complement  (Schwartz, 2008; Javidan & Dastmalchian, 2009). If the goal is maximum country coverage, a composite strategy is stronger than any single source because available samples vary from 13 to 84 countries depending on framework and downstream reuse  (Schwartz, 2008; House et al., 2002; Gaygısız & Lajunen, 2022).

## Scaling to 0–99

For Schwartz, the simplest transformation is to compute a unidirectional hierarchy score, either using **Hierarchy** directly or subtracting **Egalitarianism** from **Hierarchy**, then apply min–max normalization across all available countries to 0–99. This is justified because the source reports country-level societal scores on both poles and later studies treat the same dimension as a bipolar country-level variable  (Ralston et al., 2011; Masuda et al., 2019; Liñán & Fernández-Serrano, 2014).

For GLOBE power distance, rescale the 1–7 country mean to 0–99 with a linear transform. This is straightforward because country means are reported numerically, such as the 15-country table of “should be” scores and Egypt’s “as is” score of 5.43 against a GLOBE range of 5.8 to 3.25  (Waldman et al., 2006; Moneim, 2007).

For Hofstede-style power distance, the replication formula already produces country scores on a familiar national-dimension metric, but the authors warn that replicated scores may fall outside 0–100 in later cohorts, so the final database should either preserve raw replicated values in one column and a clipped 0–99 version in another, or renormalize by observed sample minimum and maximum  (Beugelsdijk et al., 2015).

A practical database design is to store three fields: `raw_source_score`, `normalized_0_99`, and `source_family`. That preserves comparability while avoiding false precision when mixing Schwartz, GLOBE, and Hofstede-derived values.

## Qualitative or Rank-Only Inputs

Several papers provide relative position rather than a directly usable scalar. A European GLOBE paper reports country **rankings from 1 to 61** for culture dimensions and states that South/East Europe ranks higher on **power distance** than North/West Europe, which is useful if raw means are unavailable for some countries  (Koopman et al., 1999).

GLOBE-based country studies also report interpretable relative position and bands. Egypt is described as comparatively high on power distance, with a mean of 5.43 and near the top of the GLOBE range, while Turkey replication work discusses dimensions shifting by **bands** rather than only raw means  (Moneim, 2007; Pagda et al., 2021).

Meyer-specific qualitative work exists but is weak as a scoring base. The Türkiye study places the country near the middle of most of Meyer’s eight continua using interviews with 17 executives, but the authors note that the qualitative design limits generalization and would need a much bigger dataset for comparable positioning  (Dinçer et al., 2023).

| Qualitative source | What it gives | How to convert |
|---|---|---|
| GLOBE ranks in Europe | Rank order 1–61 | Convert percentile to 0–99  (Koopman et al., 1999)|
| GLOBE bands / shifts | Relative movement by band | Assign band midpoints  (Pagda et al., 2021)|
| Meyer interview studies | Relative middle / far-from-middle position | Expert-coded ordinal score  (Dinçer et al., 2023)|
| Country case papers | “High” or “low” on power distance | Map to coarse bins 20/50/80  (Elsaid & Elsaid, 2012)|

**Figure 2:** Qualitative inputs that can be converted to leading scores

## Proxy Metrics

The best proxy is **participative leadership** or its opposite **autocratic/self-protective endorsement**, because GLOBE shows that participative leadership is culturally sensitive and varies by society  (Dorfman et al., 2012; Wilderom et al., 1999). Turkey’s replication found a higher current preference for **participative leadership**, which plausibly signals movement toward the egalitarian end even if it is not the same construct as power distance  (Pagda et al., 2021; Pagda, 2019).

A second proxy is **decentralization and management autonomy** from the World Management Survey. The WMS provides country average management scores and cross-country rankings, showing stable national differences in management practices, though it measures managerial quality and formalization more than hierarchy itself  (Scur et al., 2021). Hospital WMS extensions also provide comparable country rankings on a 1–5 scale after explicit score conversion procedures, which makes them technically easy to normalize, but conceptually they are only adjacent to Meyer’s leading scale  (Hu et al., 2021).

A third proxy family is **organizational inequality and elite distance**. CEO-worker pay dispersion varies across 54 countries as a function of institutional power structures, and between-workplace inequality varies strongly across 14 high-income countries, especially where employment protections are weaker  (Greckhamer, 2016; Tomaskovic-Devey et al., 2020). These are plausible hierarchy proxies, but they are much noisier because they mix labor-market institutions, governance, and inequality with culture.

A fourth proxy is **Inglehart/Welzel-style value dimensions**, but evidence here is weaker for the hierarchy–egalitarianism axis. One comparison study found that Inglehart’s traditional–secular dimension was near-zero correlated with Schwartz’s **Hierarchy-Mastery versus Egalitarianism-Harmony** at country level, so it should not be treated as a direct substitute  (Dobewall & Strack, 2014).

## Proxy Comparison

Not all proxies are equally defensible.

| Proxy | Conceptual closeness | Numeric availability | Main limitation |
|---|---|---|---|
| Participative leadership | High | Often means/ranks | Leadership ideal, not culture score  (Dorfman et al., 2012)|
| WMS autonomy/decentralization | Moderate | Good | Management quality confound  (Scur et al., 2021)|
| CEO-worker pay ratio | Moderate-low | Good | Institution and inequality confound  (Greckhamer, 2016)|
| Workplace inequality share | Low-moderate | Good | Not specific to authority relations  (Tomaskovic-Devey et al., 2020)|
| Inglehart dimensions | Low for this axis | Good | Poor alignment with Schwartz hierarchy–egalitarianism  (Dobewall & Strack, 2014)|

**Figure 3:** Comparison of proxy metrics for leading-scale approximation

Schwartz and Hofstede/GLOBE also converge conceptually enough to support proxying across frameworks. A 2021 paper states that Schwartz’s **egalitarianism vs hierarchy** dimension is similar to Hofstede’s **power distance**, though treated as a separate construct, and GLOBE defines power distance in near-identical authority-sharing terms  (Güss & Tuason, 2021; Javidan & Dastmalchian, 2009). Still, they are not interchangeable at high precision, because recent cross-model work warns that keyword mappings across frameworks can be inconsistent and that some labels may capture opposite poles depending on operationalization  (Kaasa & Welzel, 2023).

## Practical Build Strategy

A robust database should use a tiered decision rule rather than forcing one metric across all countries. Tier 1 should be Schwartz country scores on **hierarchy/egalitarianism** wherever available, because this is the closest theoretical match to Meyer’s wording and is repeatedly used as a country-level numerical variable in later research  (Schwartz, 2008; Lomazzi & Seddig, 2020; Diallo, 2020).

Tier 2 should fill gaps with GLOBE **power distance** country means or ranks, because GLOBE is explicitly business-facing, covers over 60 societies, and includes both “as is” and “should be” variants that can be stored separately  (House et al., 2002; Smith, 2005). Tier 3 should use Hofstede-style power distance replication where Schwartz and GLOBE are missing, especially because the replication formulas are transparent and contemporary values data can reproduce the dimension  (Beugelsdijk et al., 2015).

Tier 4 should apply proxies only when no direct metric exists. Among proxies, participative leadership is the strongest, WMS decentralization is second, and compensation or workplace inequality measures are third  (Dorfman et al., 2012; Scur et al., 2021; Tomaskovic-Devey et al., 2020).

The single most important shift in the evidence is that Meyer’s qualitative **egalitarian–hierarchical leading** idea can be operationalized with existing **country-level numeric culture datasets**, especially Schwartz and GLOBE, rather than inferred only from anecdotes  (Ralston et al., 2011; House et al., 2002). The biggest open question is not whether measurable data exist, but which construct should define the database canonically: **Schwartz hierarchy–egalitarianism**, **GLOBE power distance**, or a calibrated composite of the two.
 
_These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’ consent._
 
## References
 
Beugelsdijk, S., Maseland, R., & Hoorn, A. (2015). Are scores on Hofstede's dimensions of national culture stable over time? A cohort analysis. *Global Strategy Journal, 5*, 223-240. https://doi.org/10.1002/gsj.1098
 
Diallo, B. (2020). Do National Cultures Matter for External Audits? Evidence from Eastern Europe and the Middle East. *Journal of Business Ethics*, 1-13. https://doi.org/10.1007/s10551-020-04482-9
 
Dinçer, M., Yıldırım, M., & Dil, E. (2023). As an emerging market Turkish culture’s quest to be positioned on Meyer’s cultural map. *Review of International Business and Strategy*. https://doi.org/10.1108/ribs-03-2023-0023
 
Dobewall, H., & Strack, M. (2014). Relationship of Inglehart's and Schwartz's value dimensions revisited.. *International journal of psychology : Journal international de psychologie, 49 4*, 240-8. https://doi.org/10.1002/ijop.12004
 
Dorfman, P., Javidan, M., Hanges, P., Dastmalchian, A., & House, R. (2012). GLOBE: A twenty year journey into the intriguing world of culture and leadership. *Journal of World Business, 47*, 504-518. https://doi.org/10.1016/j.jwb.2012.01.004
 
Elsaid, E., & Elsaid, A. (2012). Culture and Leadership: Comparing Egypt to the GLOBE Study of 62 Societies. *Business and Management Research, 1*, 1-13. https://doi.org/10.5430/bmr.v1n2p1
 
Gaygısız, E., & Lajunen, T. (2022). Cultural values, national personality characteristics, and intelligence as correlates of corruption: A nation level analysis. *Heliyon, 8*. https://doi.org/10.1016/j.heliyon.2022.e09506
 
Greckhamer, T. (2016). CEO compensation in relation to worker compensation across countries: The configurational impact of country-level institutions. *Strategic Management Journal, 37*, 793-815. https://doi.org/10.1002/smj.2370
 
Güss, C. D., & Tuason, M. (2021). Individualism and Egalitarianism Can Kill: How Cultural Values Predict Coronavirus Deaths Across the Globe. *Frontiers in Psychology, 12*. https://doi.org/10.3389/fpsyg.2021.620490
 
Heim, E., Wegmann, I., & Maercker, A. (2017). Cultural values and the prevalence of mental disorders in 25 countries: A secondary data analysis.. *Social science & medicine, 189*, 96-104. https://doi.org/10.1016/j.socscimed.2017.07.024
 
House, R., Javidan, M., Hanges, P., & Dorfman, P. (2002). UNDERSTANDING CULTURES AND IMPLICIT LEADERSHIP THEORIES ACROSS THE GLOBE: AN INTRODUCTION TO PROJECT GLOBE. *Journal of World Business, 37*, 3-10. https://doi.org/10.1016/s1090-9516(01)00069-4
 
Hu, M., Chen, W., & Yip, W. (2021). Hospital management practices in county-level hospitals in rural China and international comparison. *BMC Health Services Research, 22*. https://doi.org/10.1186/s12913-021-07396-y
 
Javidan, M., & Dastmalchian, A. (2009). Managerial implications of the GLOBE project: A study of 62 societies. *Asia Pacific Journal of Human Resources, 47*, 41-58. https://doi.org/10.1177/1038411108099289
 
Kaasa, A., & Welzel, C. (2023). Elements of Schwartz’s Model in the WVS: How Do They Relate to Other Cultural Models?. *Cross-Cultural Research, 57*, 431 - 471. https://doi.org/10.1177/10693971231179792
 
Kennedy, J. F., & King, M. L. (2005). Culture , Leadership , and Organizations : The GLOBE Study of 62 Societies. https://doi.org/10.5860/choice.42-4132
 
Koopman, P., Hartog, D. N., Konrad, E., Akerblom, S., Audia, G., Bakacsi, G., Bendová, H., Bodega, D., Bodur, M., Booth, S., Bourantas, D. K., Brenk, K., Broadbeck, F., Frese, M., Gratchev, M. V., Gutiérrez, C., Holmberg, I., Jarmuz, S., Jesuino, J., . . . Wunderer, R. (1999). National Culture and Leadership Profiles in Europe: Some Results From the GLOBE Study. *European Journal of Work and Organizational Psychology, 8*, 503-520. https://doi.org/10.1080/135943299398131
 
Liñán, F., & Fernández-Serrano, J. (2014). National culture, entrepreneurship and economic development: different patterns across the European Union. *Small Business Economics, 42*, 685-701. https://doi.org/10.1007/s11187-013-9520-x
 
Lomazzi, V., & Seddig, D. (2020). Gender Role Attitudes in the International Social Survey Programme: Cross-National Comparability and Relationships to Cultural Values. *Cross-Cultural Research, 54*, 398 - 431. https://doi.org/10.1177/1069397120915454
 
Masuda, A. D., Sortheix, F. M., Beham, B., & Naidoo, L. J. (2019). Cultural value orientations and work–family conflict: The mediating role of work and family demands. *Journal of Vocational Behavior*. https://doi.org/10.1016/j.jvb.2019.04.001
 
Moneim, A. (2007). Towards The Understanding Of Societal Cultures And Leadership In Non-western Countries: An Exploratory Study On Egypt. *Academic Leadership: The Online Journal*. https://doi.org/10.58809/vqao9137
 
Pagda, Z., Bayraktar, S., & Jiménez, A. (2021). Exploring culture and leadership after 23 years: A replication of GLOBE project in Turkey. *Journal of International Management, 27*, 100822. https://doi.org/10.1016/j.intman.2021.100822
 
Pagda, Z. (2019). The Replication of the GLOBE Study in Turkey: Understanding the Effects of Social, Economical, and Political Changes on Cultural Dimensions and Leadership Ideals: A Mixed Methods Study. https://doi.org/10.22371/05.2019.014
 
Ralston, D., Egri, C., Reynaud, E., Srinivasan, N., Furrer, O., Brock, D., Alas, R., Wangenheim, F., Darder, F. L., Kuo, C., Potočan, V., Mockaitis, A. I., Szabo, E., Gutiérrez, J. R., Pekerti, A., Butt, A., Palmer, I., Naoumova, I., Lenartowicz, T., . . . Wallace, A. (2011). A Twenty-First Century Assessment of Values Across the Global Workforce. *Journal of Business Ethics, 104*, 1-31. https://doi.org/10.1007/s10551-011-0835-8
 
Schwartz, S. (2008). Cultural Value Orientations: Nature & Implications of National Differences. *Psychology. Journal of the Higher School of Economics, 5*, 37-67.
 
Scur, D., Sadun, R., Reenen, J. V., Lemos, R., & Bloom, N. (2021). The World Management Survey at 18: lessons and the way forward. *Oxford Review of Economic Policy*. https://doi.org/10.3386/w28524
 
Smith, P. B. (2005). Book Review: Culture, Leadership, and Organizations: The Globe Study of 62 Societies. *Journal of Cross-Cultural Psychology, 36*, 628 - 630. https://doi.org/10.1177/0022022105278546
 
Tomaskovic-Devey, D., Rainey, A., Avent-Holt, D., Bandelj, N., Boza, I., Cort, D. A., Godechot, O., Hajdu, G., Hällsten, M., Henriksen, L., Hermansen, A., Hou, F., Jung, J., Kanjuo-Mrčela, A., King, J., Kodama, N., Kristal, T., Křížková, A., Lippényi, Z., . . . Tufail, Z. (2020). Rising between-workplace inequalities in high-income countries. *Proceedings of the National Academy of Sciences of the United States of America, 117*, 9277 - 9283. https://doi.org/10.1073/pnas.1918249117
 
Waldman, D., De Luque, M. S., Washburn, N. T., House, R., Adetoun, B., Barrasa, A., Bobina, M., Bodur, M., Chen, Y.-J., Debbarma, S., Dorfman, P., Dzuvichu, R. R., Evcimen, I. V., Fu, P., Grachev, M., Duarte, R. G., Gupta, V., Hartog, D. D. N., De Hoogh, A. D., . . . Wilderom, C. (2006). Cultural and leadership predictors of corporate social responsibility values of top management: a GLOBE study of 15 countries. *Journal of International Business Studies, 37*, 823-837. https://doi.org/10.1057/palgrave.jibs.8400230
 
Wilderom, C., House, R., Hanges, P., Ruiz-Quintanilla, S., Dorfman, P., Javidan, M., & Dickson, M. (1999). Cultural influences on leadership and organizations : Project GLOBE. 171-233.
 
