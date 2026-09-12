# **Country-Level Data** for Meyer’s **Persuading** Scale

Erin Meyer’s **Persuading** scale does not yet have a strong direct country-level quantitative literature, so the best evidence is a tiered build: a few datasets can be rescaled into a 0–99 index, several studies give ordinal or qualitative country positions, and a third group offers usable proxies that are adjacent rather than equivalent.

## Best Direct Numeric Inputs

The strongest numeric candidates are datasets that already report country scores or country-level means on constructs close to “principles first” versus “application first.” Hofstede-style and WVS-based culture datasets are attractive because they already provide downloadable country scores for large country sets, but they are only indirect proxies for persuasion style rather than direct measures of argument structure  (Beugelsdijk & Welzel, 2018; Venaik & Brewer, 2016). The most useful of these is Schwartz’s societal value dataset across 50 societies, which reports country scores for embeddedness, hierarchy, mastery, affective autonomy, intellectual autonomy, egalitarianism, and harmony and was explicitly presented for use in international business research  (Ralston et al., 2011).

A second numeric source is the WVS/Schwartz integration work, which reports country-level item means on a 1–6 scale and averages scores across waves where possible to reduce fluctuation  (Kaasa & Welzel, 2023). That matters because a 1–6 item mean can be linearly rescaled to 0–99 with minimal transformation, making it operationally convenient for a database even if conceptually indirect  (Kaasa & Welzel, 2023). The most relevant items for a persuading-style proxy are those linked to intellectual autonomy, creativity, risk, tradition, proper behavior, and conformity, because they distinguish abstract self-direction from norm-bound reasoning styles  (Kaasa & Welzel, 2023; Dobewall & Rudnev, 2014).

A third numeric source is corpus-based persuasion explicitness across 55 countries over 1970–2020. That study operationalized “explicitness of persuasion” as a synthesized variable from six linguistic features in 2,518 speeches and reports ranked country comparisons in descending order  (Shen, 2022). This is not the same construct as principles-first versus application-first, but it is one of the closest country-level numerical persuasion measures in the supplied literature and can be normalized to 0–99 directly from ranks or raw scores if obtained  (Shen, 2022).

Country-level cognitive-style data are weaker but still usable. A recent 11-country preregistered study estimated analytic and holistic cognitive styles from perceptual tasks and found notable cross-cultural variation, though the pattern did not align cleanly with classic East-versus-West predictions  (Lacko et al., 2024). Because “principles first” plausibly overlaps with analytic, rule-based reasoning and “application first” with contextual or holistic reasoning, these scores can be used as a low-confidence numeric input, but the study itself warns against straightforward cultural mapping  (Lacko et al., 2024).

## Recommended Numeric Sources

| Evidence Type | Dataset / Study | Coverage | Why It Helps | Transformation to 0–99 |
|---|---|---|---|---|
| High-moderate | Schwartz societal values | 50 societies | Direct country scores on autonomy/embeddedness-style value structure  (Ralston et al., 2011)| Min-max rescale chosen dimension |
| High-moderate | WVS Schwartz items | Multi-country | Country item means on 1–6 scale  (Kaasa & Welzel, 2023)| Linear rescale from 1–6 to 0–99 |
| Moderate | UN persuasion explicitness corpus | 55 countries | Closest direct numeric persuasion measure  (Shen, 2022)| Rescale raw score or rank |
| Moderate-weak | Inglehart/WVS country dimensions | 47+ countries | Broad macro-cultural map aligned with other value models  (Dobewall & Strack, 2014; Minkov & Kaasa, 2024)| Rescale factor scores |
| Weak | Analytic/holistic cognition tasks | 11 countries | Adjacent reasoning-style signal  (Lacko et al., 2024)| Z-score then 0–99 rescale |

**Figure 1:** Best numeric candidates for a persuading-scale database

## Qualitative and Ordinal Evidence

The direct literature on rhetorical organization gives clearer substantive meaning than the macro culture indices, but it rarely offers country scores. Several contrastive-rhetoric studies place countries or language groups along direct–indirect, deductive–inductive, or explicit–implicit dimensions, which can be converted into ordinal placements. Taiwanese students in one large study mostly used a direct approach in both Chinese and English expository writing, and the author argued that deductive thinking patterns were not difficult for Chinese students in Taiwan  (Chien, 2011). That directly challenges the common assumption that all Sinitic contexts are strongly “application first.”

The evidence on Chinese writing is mixed rather than one-directional. One university study found Chinese students favored a direct or deductive approach while native English writers more often adopted an indirect or inductive one  (Furneaux, 2014). Yet textbook comparisons found both Chinese and English materials recommend both deductive and inductive reasoning, while differing more in support strategies such as Toulmin reasoning in English and appeals to history, morality, analogy, and proverbs in Chinese materials  (Liao & Chen, 2009).

Japanese evidence is also more nuanced than the stereotype. A classic study reports that many earlier studies had described Japanese writers as preferring inductive style, but its own results found only about half of writers used similar L1 and L2 patterns and found no negative transfer of culturally unique rhetorical patterns  (Kubota, 1998). Iranian and Persian writing studies do show more reader-responsible and less explicitly signposted organization, which fits a more implicit or less directly deductive end of the continuum  (Koosha, 2019; Zaini & Ollerhead, 2019).

The strongest caution is that some recent controlled comparisons found little between-culture separation at all. Arab ESL versus US native-English graduate writers showed no statistically significant differences on rhetorical performance measures, and within-group variation exceeded between-group variation  (Ismail, 2025). Moroccan advanced EFL writers and US counterparts likewise appeared to share more rhetorical problems than differences  (Khartite et al., 2021).

## Qualitative Inputs to Code

| Source Type | Countries / Groups | Signal for Meyer Scale | Coding Use |
|---|---|---|---|
| Student writing study | Taiwan | More direct/deductive than expected  (Chien, 2011)| Move Taiwan toward midpoint or principles-first |
| Comparative writing study | China vs English writers | Chinese more direct; English more indirect in this sample  (Furneaux, 2014)| Do not hard-code China as application-first |
| Textbook comparison | China vs English | Both use deductive and inductive; differ in support style  (Liao & Chen, 2009)| Use support-style subscore, not just structure |
| Japanese writing study | Japan | Inductive stereotype only partly supported  (Kubota, 1998)| Treat Japan as mixed, not extreme |
| Persian/Iranian studies | Iran | Reader-responsible, less explicit transitions  (Koosha, 2019)| Shift toward application/context side |

**Figure 2:** Qualitative studies usable for ordinal country coding

## Best Proxy Metrics

If the goal is a scalable country database, the most practical proxies are value dimensions that map onto abstract-rule reasoning versus contextual-pragmatic reasoning. Schwartz’s embeddedness–autonomy family is the cleanest candidate because autonomy-related items include creativity, risk, and self-direction, whereas embeddedness/conformity/tradition items stress proper behavior and tradition  (Dobewall & Rudnev, 2014). That contrast is not Meyer’s construct, but it is conceptually closer to theory-first versus context-first persuasion than most other standard culture metrics.

Inglehart-style secular-rational and self-expression measures are also plausible second-order proxies because they align substantially with Schwartz autonomy at the country level after rotation  (Dobewall & Strack, 2014; Dobewall & Rudnev, 2014). But their measurement validity is contested. Some papers argue survey-based cultural dimensions change across waves and may reflect current socioeconomic conditions, not stable culture  (Shoham, 2022). Another critique finds little evidence for stable traditional–secular or survival–self-expression value orientations outside a limited set of advanced democracies  (Alemán & Woods, 2016).

Hofstede and GLOBE can help only as rough auxiliary proxies. Hofstede provides country scores for many countries and GLOBE for 61 countries across nine dimensions  (Venaik & Brewer, 2016; House et al., 2002). Yet critiques are substantial: analogous dimensions across Hofstede and GLOBE are often unrelated or even negatively related, and uncertainty avoidance in particular appears to measure different constructs across models  (Venaik & Brewer, 2016; Venaik & Brewer, 2010). That makes them poor choices for a single-score persuading index unless used only in a composite with lower weight.

Negotiation-style research gives one more adjacent proxy. Competitive versus cooperative style relates to masculinity, power distance, uncertainty avoidance, and collectivism at the individual level, and country-level studies distinguish American, Italian, Turkish, and Chinese negotiation patterns  (Caputo et al., 2019; Benetti et al., 2021; Demiral, 2018; Ajeakoh et al., 2025). This is useful for validation, but negotiation style is not equivalent to argument-order preference.

## Practical Build Strategy

A workable database would use a weighted composite rather than pretend one paper gives a direct 1:1 country score. A defensible starting model is: **50% direct persuasion-related numeric data**, **30% rhetorical-organization qualitative coding**, and **20% macro-cultural proxies**. Direct numeric data would include UN persuasion explicitness where available and any country-level means from rhetorical or writing measures; qualitative coding would use direct/indirect, deductive/inductive, explicit/implicit placements from country studies; proxies would use Schwartz autonomy–embeddedness and only secondarily Inglehart or Hofstede/GLOBE  (Shen, 2022; Kaasa & Welzel, 2023; Ralston et al., 2011).

For scaling, convert each source to a common 0–99 metric with direction fixed so higher values always mean more **Principles First**. Raw 1–6 means can be linearly rescaled; ranks can be percentile-mapped; factor scores can be min-max scaled; qualitative bins can be coded as anchor values such as 20, 40, 60, and 80  (Kaasa & Welzel, 2023; Shen, 2022; Alemán & Woods, 2016).

The biggest validity risk is construct drift. “Explicit persuasion,” “analytic cognition,” “autonomy,” “low-context communication,” and “deductive writing” overlap with Meyer’s persuading dimension, but none is identical to it  (Shen, 2022; Lacko et al., 2024; Szkudlarek et al., 2020). The literature also repeatedly shows that broad national stereotypes can fail in controlled comparisons and can shift over time  (Ismail, 2025; Shoham, 2022; Beugelsdijk & Welzel, 2018).

## Priority List for Your Database

| Priority | Use | Best Papers | Why |
|---|---|---|---|
| 1 | Numeric core | Shen 2022; Ralston et al. 2011; Kaasa & Welzel 2023  (Shen, 2022; Ralston et al., 2011; Kaasa & Welzel, 2023)| Actual cross-country numeric values or ranked outputs |
| 2 | Qualitative coding | Chien 2011; Furneaux 2014; Kubota 1998; Liao & Chen 2009  (Chien, 2011; Furneaux, 2014; Kubota, 1998; Liao & Chen, 2009)| Closest direct evidence on argument order and rhetorical style |
| 3 | Proxy validation | Dobewall & Rudnev 2014; Venaik & Brewer 2010; House et al. 2002; de Oliveira & Nisbett 2017  (Dobewall & Rudnev, 2014; Venaik & Brewer, 2010; House et al., 2002; De Oliveira & Nisbett, 2017)| Adjacent constructs for fill-in and sensitivity checks |

The bottom line is that no supplied paper gives a ready-made 0–99 cross-country ranking for Meyer’s **Persuading** scale. The best empirical route is to build a composite anchored first in **country-level persuasion explicitness and Schwartz/WVS numeric values**, then refine it with **direct qualitative evidence on deductive versus inductive rhetorical organization**, and use **Hofstede/GLOBE/Inglehart/cognitive-style measures only as lower-weight proxies**. The most important shift in the evidence is that classic national stereotypes about persuasion style often weaken under newer, better-controlled studies. The biggest open question is whether “principles first versus application first” is a stable national trait at all, or a context-dependent communication pattern that only partly tracks country culture.
 
_These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’ consent._
 
## References
 
Ajeakoh, C. A., Yeşilada, F., & Ahmed, J. N. (2025). Cross-cultural negotiation styles in Shandong province, China: the role of cultural and emotional intelligence. *Future Business Journal, 11*. https://doi.org/10.1186/s43093-025-00605-8
 
Alemán, J., & Woods, D. (2016). Value Orientations From the World Values Survey. *Comparative Political Studies, 49*, 1039 - 1067. https://doi.org/10.1177/0010414015600458
 
Benetti, S., Ogliastri, E., & Caputo, A. (2021). Distributive/integrative negotiation strategies in cross-cultural contexts: a comparative study of the USA and Italy. *Journal of Management & Organization*. https://doi.org/10.1017/jmo.2020.47
 
Beugelsdijk, S., & Welzel, C. (2018). Dimensions and Dynamics of National Culture: Synthesizing Hofstede With Inglehart. *Journal of Cross-Cultural Psychology, 49*, 1469 - 1505. https://doi.org/10.1177/0022022118798505
 
Caputo, A., Ayoko, O. B., Amoo, N., & Menke, C. (2019). The relationship between cultural values, cultural intelligence and negotiation styles. *Journal of Business Research*. https://doi.org/10.1016/j.jbusres.2019.02.011
 
Chien, S.-C. (2011). Discourse Organization in High School Students' Writing and Their Teachers' Writing Instruction: The Case of Taiwan.. *Foreign Language Annals, 44*, 417-435. https://doi.org/10.1111/j.1944-9720.2011.01131.x
 
De Oliveira, S., & Nisbett, R. (2017). Beyond East and West: Cognitive Style in Latin America. *Journal of Cross-Cultural Psychology, 48*, 1554 - 1577. https://doi.org/10.1177/0022022117730816
 
Demiral, Ö. (2018). A Research On The Differences Between Business Negotiation Styles Of Turkish And American Managers. *Ege Academic Review, 18*, 273-288. https://doi.org/10.21121/eab.2018237355
 
Dobewall, H., & Rudnev, M. (2014). Common and Unique Features of Schwartz’s and Inglehart’s Value Theories at the Country and Individual Levels. *Cross-Cultural Research, 48*, 45 - 77. https://doi.org/10.1177/1069397113493584
 
Dobewall, H., & Strack, M. (2014). Relationship of Inglehart's and Schwartz's value dimensions revisited.. *International journal of psychology : Journal international de psychologie, 49 4*, 240-8. https://doi.org/10.1002/ijop.12004
 
Furneaux, C. (2014). A multidimensional comparison of discourse organization in English and Chinese university students' argumentative writing. *International Journal of Applied Linguistics, 24*, 74-96. https://doi.org/10.1111/ijal.12013
 
House, R., Javidan, M., Hanges, P., & Dorfman, P. (2002). UNDERSTANDING CULTURES AND IMPLICIT LEADERSHIP THEORIES ACROSS THE GLOBE: AN INTRODUCTION TO PROJECT GLOBE. *Journal of World Business, 37*, 3-10. https://doi.org/10.1016/s1090-9516(01)00069-4
 
Ismail, S. (2025). Re‑examining Contrastive Rhetoric: A Quantitative Study of Arab ESL Graduate Students' Persuasive Discourse. *International Journal of Linguistics, Literature and Translation*. https://doi.org/10.32996/ijllt.2025.8.5.11
 
Kaasa, A., & Welzel, C. (2023). Elements of Schwartz’s Model in the WVS: How Do They Relate to Other Cultural Models?. *Cross-Cultural Research, 57*, 431 - 471. https://doi.org/10.1177/10693971231179792
 
Khartite, B., Nadif, B., & Benfilali, I. (2021). Investigating the Persuasive Writing Performance of Moroccan Advanced EFL Students: Is it a problem of “Language” or ‘Reasoning” Acquisition Device?. *International Journal of Linguistics, Literature and Translation*. https://doi.org/10.32996/ijllt.2021.4.5.6
 
Koosha, M. (2019). A Descriptive Study of the Rhetoric in Persian Expository Writings:.
 
Kubota, R. (1998). An investigation of L1–L2 transfer in writing among Japanese university students: Implications for contrastive rhetoric. *Journal of Second Language Writing, 7*, 69-100. https://doi.org/10.1016/s1060-3743(98)90006-6
 
Lacko, D., Čeněk, J., Arıkan, A., Dresler, T., Galang, A. J. R., Stachon, Z., Šašinková, A., Tsai, J.-L., Prošek, T., Ugwitz, P., & Šašinka, Č. (2024). Investigating the geography of thought across 11 countries: Cross-cultural differences in analytic and holistic cognitive styles using simple perceptual tasks and reaction time modeling.. *Journal of experimental psychology. General*. https://doi.org/10.1037/xge0001685
 
Liao, M.-T., & Chen, C.-H. (2009). Rhetorical Strategies in Chinese and English: A Comparison of L1 Composition Textbooks. *Foreign Language Annals, 42*, 695-720. https://doi.org/10.1111/j.1944-9720.2009.01050.x
 
Minkov, M., & Kaasa, A. (2024). Aligning Schwartz’s model of culture with that of Minkov-Hofstede. *International Journal of Cross Cultural Management, 24*, 129 - 148. https://doi.org/10.1177/14705958241235021
 
Ralston, D., Egri, C., Reynaud, E., Srinivasan, N., Furrer, O., Brock, D., Alas, R., Wangenheim, F., Darder, F. L., Kuo, C., Potočan, V., Mockaitis, A. I., Szabo, E., Gutiérrez, J. R., Pekerti, A., Butt, A., Palmer, I., Naoumova, I., Lenartowicz, T., . . . Wallace, A. (2011). A Twenty-First Century Assessment of Values Across the Global Workforce. *Journal of Business Ethics, 104*, 1-31. https://doi.org/10.1007/s10551-011-0835-8
 
Shen, L. (2022). Culture and Explicitness of Persuasion: Linguistic Evidence From a 51-Year Corpus-Based Cross-Cultural Comparison of the United Nations General Debate Speeches Across 55 Countries (1970-2020). *Cross-Cultural Research, 57*, 166 - 192. https://doi.org/10.1177/10693971221139523
 
Shoham, A. (2022). The Fundamental Endogeneity of Survey‐Based Cultural Dimension. *British Journal of Management*. https://doi.org/10.1111/1467-8551.12599
 
Szkudlarek, B., Osland, J., Nardon, L., & Zander, L. (2020). Communication and culture in international business – Moving the field forward. *Journal of World Business*. https://doi.org/10.1016/j.jwb.2020.101126
 
Venaik, S., & Brewer, P. (2016). National culture dimensions: The perpetuation of cultural ignorance. *Management Learning, 47*, 563 - 589. https://doi.org/10.1177/1350507616629356
 
Venaik, S., & Brewer, P. (2010). Avoiding uncertainty in Hofstede and GLOBE. *Journal of International Business Studies, 41*, 1294-1315. https://doi.org/10.1057/jibs.2009.96
 
Zaini, A., & Ollerhead, S. (2019). Reverse contrastive rhetoric in expository writing: Transfer and power relations at work. *Southern African Linguistics and Applied Language Studies, 37*, 41 - 61. https://doi.org/10.2989/16073614.2019.1609364
 
