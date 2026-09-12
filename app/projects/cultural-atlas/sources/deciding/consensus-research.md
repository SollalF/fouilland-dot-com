# **Country Measures** for **Deciding** Scale

Erin Meyer’s **Deciding** scale can be approximated with empirical country data, but the literature does not offer one direct global 0–99 “consensual ↔ top-down” index. The strongest approach is a **composite**: use direct country scores on participative decision-making or participative leadership where available, then backfill with validated proxies such as **power distance**, **hierarchy/egalitarianism**, and **centralization/decentralization**  (Valverde-Moreno et al., 2020; Javidan & Dastmalchian, 2009; Shi & Wang, 2011).

## Best Numeric Sources

The most direct numeric source in this set is the European participative decision-making study across 31 countries, which explicitly computed a **mean PDM by country** and produced a **country ranking**  (Valverde-Moreno et al., 2020). Its top participative countries were **Finland, Denmark, Norway, Ireland, and the Netherlands**, while **Lithuania, Slovakia, Germany, Portugal, Bulgaria, and Greece** ranked lowest  (Valverde-Moreno et al., 2020).

This is highly usable for a 0–99 Meyer-style scale because the study’s direct employee PDM variable is already bounded from **0 to 1**, so a simple transform of `score × 99` yields a country score where higher values map naturally to more **consensual/participative** deciding  (Valverde-Moreno et al., 2020). The study is also large, using almost **25,000 workers in 31 European countries**, which makes it the strongest direct quantitative source here for Europe  (Valverde-Moreno et al., 2020).

A second strong numeric source is GLOBE. GLOBE studied leadership and culture across **61–62 societies**, and its leadership model includes a **Participative** dimension defined partly as the reverse of **autocratic** and **non-participative** leadership  (House et al., 2002; Pagda, 2019). GLOBE reports country or society scores and rankings on leadership dimensions, and later summaries state that there are substantial cross-society differences in how strongly participative leadership is endorsed  (Smith, 2005; Koopman et al., 1999).

For Europe, GLOBE is directly interpretable on the deciding axis because participative leadership means subordinates should contribute to decision-making, debate is legitimate, and followers are given discretion  (Mączyński & Sułkowski, 2017). In comparative results, participative leadership is rated more positively in the **United States, Germany, and Austria** than in **Russia, Poland, Taiwan, and China**  (Mączyński & Sułkowski, 2017). For Turkey specifically, a GLOBE replication reports a **Participative leadership score of 5.36** on a 7-point scale, which can be normalized to 0–99 by `(score−1)/6 × 99` if using the raw GLOBE scale  (Pagda, 2019).

Hofstede is the broadest ready-made numeric source. Hofstede’s national culture dimensions provide **0–100 country scores**, including **Power Distance**, and those scores are explicitly designed as country positions on a comparative index  (Kotera et al., 2025; Shi & Wang, 2011). Because high power distance is repeatedly associated with more **clinician-led**, **authoritative**, and **less participative** decision-making, Hofstede PDI is the cleanest global proxy to invert into a Meyer deciding score  (Kotera et al., 2025; Janićijević & Marinković, 2015).

A practical transform is `Deciding_consensual = 99 − PDI`, optionally rescaled if you want exact 0–99 coverage. This mapping is evidence-grounded because high-PDI countries in several studies favor clinician-led, authoritative, or centralized decisions, while low-PDI countries favor democratic or participative approaches  (Kotera et al., 2025; Janićijević & Marinković, 2015; Ducu, 2022).

## Numeric Sources Compared

| Source | Coverage | Measured Construct | Native Scale | Mapping to Meyer Deciding | Best Use |
|---|---|---|---|---|---|
| Valverde-Moreno et al. 2020 | 31 European countries | Direct employee participative decision-making | 0–1 country mean  (Valverde-Moreno et al., 2020)| `PDM × 99` | Best direct Europe score |
| GLOBE leadership studies | 61–62 societies | Participative leadership endorsement | 1–7 means / rankings  (Koopman et al., 1999; Pagda, 2019)| Normalize to 0–99 | Best broad direct-ish cross-societal score |
| Hofstede VSM / PDI | 111 countries | Power distance | 0–100  (Kotera et al., 2025)| invert: `99 − PDI` | Best global proxy |
| Schwartz SVS society scores | 50 societies | Hierarchy / egalitarianism | society scores  (Ralston et al., 2011)| higher hierarchy = more top-down | Secondary proxy |
| European HR decentralization study | Europe | shared vs individualized HR decisions | study-specific dimensions  (Meyer & Hammerschmid, 2010)| more shared decision = more consensual | Institutional proxy |

**Figure 1:** Quantitative sources for mapping countries onto deciding styles

## Qualitative Sources Needing Interpretation

Several papers are useful but require interpretation rather than direct scaling. A Turkey study explicitly applied Meyer’s own eight-dimension framework through interviews with 17 senior executives and concluded that **communication, deciding, and trusting** were the three Turkish dimensions furthest from the midpoint, with Turkey otherwise near the middle overall  (Dinçer et al., 2023). That is directly relevant to Meyer’s construct, but it is qualitative and country-specific.

Japan is another strong qualitative anchor. One paper states that in Japan, **decision making by consensus is generally the norm**, and distinguishes **traditional power**, **compromise**, and **consensus** patterns, explicitly noting that Japanese decision-making does not follow the usual American top-to-bottom style  (Price, 2020). A second Japan-focused paper describes consensus-building mechanisms such as **nemawashi** and **ringi-sho**, emphasizing inclusivity and broad support, albeit with slower decisions and possible groupthink  (Kawaguchi, 2024).

Cross-national qualitative comparisons also help order countries even when they do not yield numeric values. A five-country student study reports that Japanese, Chinese, and Korean cultures are commonly described as preferring **group decision by consensus** with cooperation and harmony, whereas individualistic cultures are described as preferring **majority vote** and prioritizing individual interests when unanimity is unattainable  (Yi & Park, 2003). That is not a country score, but it is useful for setting directional priors.

GLOBE’s European results are also interpretable qualitatively because they use rankings rather than always reporting means. North/West and South/East Europe differ systematically, and South/East Europe shows higher rankings on **Autocratic** leadership-related aspects, while participative endorsement is stronger in some western countries  (Koopman et al., 1999). That can help infer relative location on the deciding axis when raw country means are unavailable.

## Proxy Metrics

The best proxy family is **power distance / hierarchy**. Across 38 European countries, higher Hofstede **Power Distance** was associated with more **clinician-led decision-making**, while lower-power-distance countries aligned more with shared decision-making norms  (Kotera et al., 2025). In four-country leadership research, **Serbia and France** preferred authoritative styles, while **the Netherlands and Denmark** preferred democratic styles, and this pattern tracked power distance closely  (Janićijević & Marinković, 2015).

A second proxy family is **decentralization and shared decision structure**. In European public HRM, decentralized decision-making often went together with **higher shared decision-making**, showing that decentralization alone is not the endpoint; the important contrast is individualized single-decider authority versus distributed/shared authority  (Meyer & Hammerschmid, 2010). In multinational firms, home-country individualism and host-country uncertainty avoidance significantly influenced decentralization decisions  (Williams & Triest, 2009).

A third proxy family is **Schwartz hierarchy versus egalitarianism**. Schwartz-based datasets report society-level scores for **hierarchy** and **egalitarianism** across 50 societies, specifically for use as macro-level cultural predictors  (Ralston et al., 2011). Related work finds that traditional gender-role attitudes are stronger in societies emphasizing **hierarchy** and **embeddedness**, while more progressive attitudes are stronger in **egalitarian** societies, reinforcing hierarchy as a broader marker of vertical authority structures  (Lomazzi & Seddig, 2020).

A fourth, weaker proxy is **institutional collectivism plus participative leadership** from GLOBE. Participative leadership is culturally sensitive rather than universal, and Anglo countries endorse it more strongly than Confucian and Southern Asian clusters  (Dorfman et al., 2012; Ashkanasy, 2002). That makes cluster-level GLOBE patterns useful when country-level means are unavailable, but less clean than PDM or PDI.

## Recommended Build Strategy

For a database, the strongest operational design is a **tiered score** rather than pretending one paper directly measures Meyer’s scale globally. Tier 1 should use direct country-level **PDM** or **participative leadership** scores where available, because these are nearest to “consensual vs top-down” in substance  (Valverde-Moreno et al., 2020; Mączyński & Sułkowski, 2017).

Tier 2 should use **Hofstede PDI** as the default global backfill because it already covers over 100 countries on a 0–100 metric and repeatedly predicts authoritative versus democratic decision styles  (Kotera et al., 2025; Janićijević & Marinković, 2015). This is the simplest way to achieve global 0–99 coverage, even though it is a proxy rather than a direct measure.

Tier 3 should refine or challenge the PDI estimate with **GLOBE participative leadership**, **Schwartz hierarchy/egalitarianism**, and **shared-versus-individualized decision** evidence where those are available  (Javidan & Dastmalchian, 2009; Ralston et al., 2011; Meyer & Hammerschmid, 2010). For countries like Japan or Türkiye, qualitative Meyer-aligned studies can then override or annotate the numeric estimate when the proxy clearly misses known consensus practices  (Dinçer et al., 2023; Price, 2020).

A practical schema is:

| Variable | Type | Suggested Transformation |
|---|---|---|
| Direct PDM country mean | primary | `round(PDM × 99)` |
| GLOBE participative mean | primary/secondary | `round(((x−1)/6) × 99)` |
| Hofstede PDI | fallback proxy | `round(99 − PDI)` |
| Schwartz hierarchy | proxy | min-max to 0–99, then invert if defining higher as consensual |
| Qualitative consensus evidence | annotation | override flag or confidence note |

**Figure 2:** Tiered scoring design for a Culture Map deciding database

## Caveats and Best Answer

The evidence supports building a credible **Deciding** database, but not by treating any single published index as a perfect 1:1 measure of Meyer’s scale. The closest direct measures are **participative decision-making** rankings in Europe and **GLOBE participative leadership** scores across many societies; the best global fallback is inverted **Hofstede power distance**  (Valverde-Moreno et al., 2020; Smith, 2005; Kotera et al., 2025).

The biggest methodological caveat is construct mismatch. “Consensual vs top-down” blends participation, hierarchy, authority legitimacy, and process structure, and the literature measures these with different instruments that are not perfectly equivalent across countries  (Jepson, 2009; Alemán & Woods, 2016). The single most important shift in the evidence is from using vague cultural stereotypes to using **country-level quantitative decision or authority measures** that can be normalized. The biggest open question is whether a future study will directly validate a **global country-level consensual ↔ top-down index** against Meyer’s exact construct rather than adjacent proxies.
 
_These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’ consent._
 
## References
 
Alemán, J., & Woods, D. (2016). Value Orientations From the World Values Survey. *Comparative Political Studies, 49*, 1039 - 1067. https://doi.org/10.1177/0010414015600458
 
Ashkanasy, N. M. (2002). LEADERSHIP IN THE ASIAN CENTURY: LESSONS FROM GLOBE. 150-163.
 
Dinçer, M., Yıldırım, M., & Dil, E. (2023). As an emerging market Turkish culture’s quest to be positioned on Meyer’s cultural map. *Review of International Business and Strategy*. https://doi.org/10.1108/ribs-03-2023-0023
 
Dorfman, P., Javidan, M., Hanges, P., Dastmalchian, A., & House, R. (2012). GLOBE: A twenty year journey into the intriguing world of culture and leadership. *Journal of World Business, 47*, 504-518. https://doi.org/10.1016/j.jwb.2012.01.004
 
Ducu, A.-G. (2022). POWER DISTANCE INDEX AND ITS ROLE IN THE EFFICIENT FUNCTIONING OF MULTINATIONAL ORGANIZATIONS. *SCIENTIFIC RESEARCH AND EDUCATION IN THE AIR FORCE*. https://doi.org/10.19062/2247-3173.2021.22.9
 
House, R., Javidan, M., Hanges, P., & Dorfman, P. (2002). UNDERSTANDING CULTURES AND IMPLICIT LEADERSHIP THEORIES ACROSS THE GLOBE: AN INTRODUCTION TO PROJECT GLOBE. *Journal of World Business, 37*, 3-10. https://doi.org/10.1016/s1090-9516(01)00069-4
 
Janićijević, N., & Marinković, I. (2015). Empirical testing of Hofstede's measures of national culture and their impact on leadership in four countries. 264-278. https://doi.org/10.5937/ekopre1506264j
 
Javidan, M., & Dastmalchian, A. (2009). Managerial implications of the GLOBE project: A study of 62 societies. *Asia Pacific Journal of Human Resources, 47*, 41-58. https://doi.org/10.1177/1038411108099289
 
Jepson, D. (2009). Studying Leadership at Cross-Country Level: A Critical Analysis. *Leadership, 5*, 61 - 80. https://doi.org/10.1177/1742715008098310
 
Kawaguchi, S. (2024). The Effect of Cultural Norms on Group Decision-Making in Japanese Corporations. *Frontiers in Management Science*. https://doi.org/10.56397/fms.2024.10.07
 
Koopman, P., Hartog, D. N., Konrad, E., Akerblom, S., Audia, G., Bakacsi, G., Bendová, H., Bodega, D., Bodur, M., Booth, S., Bourantas, D. K., Brenk, K., Broadbeck, F., Frese, M., Gratchev, M. V., Gutiérrez, C., Holmberg, I., Jarmuz, S., Jesuino, J., . . . Wunderer, R. (1999). National Culture and Leadership Profiles in Europe: Some Results From the GLOBE Study. *European Journal of Work and Organizational Psychology, 8*, 503-520. https://doi.org/10.1080/135943299398131
 
Kotera, Y., Newby, C., Kuzman, M., Gorwood, P., Fiorillo, A., & Slade, M. (2025). Cultural impacts on shared decision-making: A cross-European study of psychiatrist preferences in 38 countries. *European Psychiatry, 68*. https://doi.org/10.1192/j.eurpsy.2025.10082
 
Lomazzi, V., & Seddig, D. (2020). Gender Role Attitudes in the International Social Survey Programme: Cross-National Comparability and Relationships to Cultural Values. *Cross-Cultural Research, 54*, 398 - 431. https://doi.org/10.1177/1069397120915454
 
Mączyński, J., & Sułkowski, Ł. (2017). A Seven Nations Study of Leadership Attributes. *Polish Psychological Bulletin, 48*, 307-314. https://doi.org/10.1515/ppb-2017-0035
 
Meyer, R. E., & Hammerschmid, G. (2010). THE DEGREE OF DECENTRALIZATION AND INDIVIDUAL DECISION MAKING IN CENTRAL GOVERNMENT HUMAN RESOURCE MANAGEMENT: A EUROPEAN COMPARATIVE PERSPECTIVE. *Public Administration, 88*, 455-478. https://doi.org/10.1111/j.1467-9299.2009.01798.x
 
Pagda, Z. (2019). The Replication of the GLOBE Study in Turkey: Understanding the Effects of Social, Economical, and Political Changes on Cultural Dimensions and Leadership Ideals: A Mixed Methods Study. https://doi.org/10.22371/05.2019.014
 
Price, D. Z. (2020). Decision Making in Japan. 21-27. https://doi.org/10.1201/9781003075172-3
 
Ralston, D., Egri, C., Reynaud, E., Srinivasan, N., Furrer, O., Brock, D., Alas, R., Wangenheim, F., Darder, F. L., Kuo, C., Potočan, V., Mockaitis, A. I., Szabo, E., Gutiérrez, J. R., Pekerti, A., Butt, A., Palmer, I., Naoumova, I., Lenartowicz, T., . . . Wallace, A. (2011). A Twenty-First Century Assessment of Values Across the Global Workforce. *Journal of Business Ethics, 104*, 1-31. https://doi.org/10.1007/s10551-011-0835-8
 
Shi, X., & Wang, J. (2011). Interpreting Hofstede Model and GLOBE Model: Which Way to Go for Cross-Cultural Research?. *International Journal of Biometrics, 6*, 93. https://doi.org/10.5539/ijbm.v6n5p93
 
Smith, P. B. (2005). Book Review: Culture, Leadership, and Organizations: The Globe Study of 62 Societies. *Journal of Cross-Cultural Psychology, 36*, 628 - 630. https://doi.org/10.1177/0022022105278546
 
Valverde-Moreno, M., Torres-Jiménez, M., & Lucia-Casademunt, A. M. (2020). Participative decision-making amongst employees in a cross-cultural employment setting: evidence from 31 European countries. *European Journal of Training and Development*. https://doi.org/10.1108/ejtd-10-2019-0184
 
Williams, C., & Triest, S. (2009). The impact of corporate and national cultures on decentralization in multinational corporations. *International Business Review, 18*, 156-167. https://doi.org/10.1016/j.ibusrev.2009.01.003
 
Yi, J., & Park, S. (2003). Cross-cultural differences in decision-making styles: A study of college students in five countries. *Social Behavior and Personality, 31*, 35-48. https://doi.org/10.2224/sbp.2003.31.1.35
 
