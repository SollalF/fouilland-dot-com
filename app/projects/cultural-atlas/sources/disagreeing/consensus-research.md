# Best **Country-Level Data** for Meyer’s **Disagreeing** Scale

Erin Meyer’s “Disagreeing” scale can be operationalized, but the best empirical sources are mostly **proxies** rather than direct 0–99 confrontation scores. The strongest quantitative candidate is **GLOBE assertiveness**, because it is a country-level measure available for 62 societies on a 1–7 scale and its items directly ask whether people in a society are assertive, dominant, and tough versus the reverse  (Bonjeer & Vonkova, 2023; Venaik & Brewer, 2016). The next-best direct quantitative source is **country-level verbal confrontation appropriateness** from 57 societies, where country means were calculated for confrontation responses to norm violations and reported in supplementary tables  (Eriksson et al., 2021). After that, the literature becomes more indirect: conflict-style means, direct-versus-indirect communication preferences, and tightness-looseness indices all capture adjacent constructs rather than Meyer’s exact one  (Croucher et al., 2012; Ge et al., 2022; Uz, 2015).

## Direct Numeric Sources

The best 1:1 mappable variable is **GLOBE assertiveness practices**. GLOBE collected country scores for 62 societies, and those national scores are public, measured on a 1–7 scale  (Bonjeer & Vonkova, 2023). Its item wording is unusually close to Meyer’s construct: societies are rated on whether people are assertive versus non-assertive, dominant versus non-dominant, and tough versus tender  (Venaik & Brewer, 2016).

A simple database transformation is defensible: `Disagreeing_0_99 = round((Assertiveness_1_7 - 1) / 6 * 99)`. That preserves country rank order and maps the empirical minimum to 0 and maximum to 99 because the original scale is interval-like and explicitly bounded  (Bonjeer & Vonkova, 2023; Venaik & Brewer, 2016).

GLOBE also gives qualitative rank anchors useful for validation. Japan is described as the **second lowest** country on assertiveness, Iran as **uniquely high** on assertiveness, Pakistan as **low** on assertiveness, and Egypt as in the **lower range** on assertiveness, with one report stating it was the lowest in the 62-country sample  (Javidan & Dastmalchian, 2009; Nadeem & Luque, 2020; Moneim, 2007).

The second direct numeric source is the **57-society metanorm study**. It computed country measures for verbal confrontation by averaging country-mean appropriateness ratings across scenarios, adjusted for how inappropriate the underlying norm violations were, and reported all country measures in a supplementary table  (Eriksson et al., 2021). That produces a directly usable country score for “how appropriate is verbal confrontation here,” which is not identical to Meyer’s business-disagreement construct but is close enough to scale to 0–99.

The third direct numeric source is **country mean use of confrontation and avoidance sanctions** from the same 57-society project. Participants rated how often confrontation, gossip, and avoidance are used on a five-point scale, and the study used country means  (Eriksson et al., 2021). If the supplementary data are accessible, these means can generate a composite such as `confrontation - avoidance` before normalization to 0–99.

## Country Comparisons You Can Interpret

Several studies give **cross-country mean differences in conflict style** that are not full global rankings but are still valuable anchors. In a four-country manager survey, Chinese managers relied more on avoiding, while U.S. managers relied more on competing; the study also included India and the Philippines  (Morris et al., 1998). That supports placing the U.S. more toward “confrontational” and China more toward “avoids confrontation.”

In five cultures, U.S. respondents used more dominating conflict style than Japanese and Korean respondents, while Chinese and Taiwanese respondents used more obliging and avoiding styles than U.S. respondents  (Ting-Toomey et al., 1991). This is especially useful because it separates several East Asian societies instead of treating them as one bloc.

A later four-nation study found significant national differences across avoiding, dominating, integrating, obliging, and compromising, with the United States, Canada, Australia, and New Zealand all relatively high on solution-oriented styles  (Croucher et al., 2024). This is less useful for the confrontational pole itself, but it helps distinguish countries Meyer often groups as similarly direct.

Another study found that high-context nations, specifically India and Thailand, preferred avoiding and obliging more than low-context nations, specifically Ireland and the United States, while low-context nations preferred dominating more  (Croucher et al., 2012). That provides a good bridge between communication-context theory and conflict behavior.

A Serbia–Germany study gives actual means by style and status, though only in one organizational setting. Germans used an integrating style more than Serbians in some situations, while Serbians showed higher avoiding with subordinates and lower dominating with superiors  (Ristic et al., 2020). These are too context-specific for a national rank, but they are useful calibration cases.

China is not uniformly conflict-avoidant across all disagreement constructs. One argumentation study found that Chinese and U.S. respondents differed in complex ways but did **not** show Chinese respondents to be more avoidant, and Chinese respondents were described as more sensitive to the constructive possibilities of face-to-face disagreement  (Xie et al., 2015). That is a strong warning against equating “East Asian” with “avoidant” without checking which instrument is being used.

## Proxy Metrics

The best proxy after GLOBE is **direct versus indirect communication**. Across romantic-relationship studies, Chinese participants preferred indirect communication more than European Americans, and culturally preferred communication style predicted expected relationship satisfaction  (Ge et al., 2022). In Sino-American negotiation work, Chinese culture favored euphemistic and indirect communication, whereas U.S. culture favored direct and unreserved expression  (Liu, 2024).

A second proxy is **employee silence or voice**, because withholding views is near the “avoids confrontation” end of Meyer’s construct. In U.S. and Korea samples, conflict avoidance was negatively related to employee voice, and high conflict avoidance weakened the positive relationship between leader-member exchange and voice in Korea  (Park & Nawakitphaitoon, 2017). Across 33 countries, the silence literature explicitly frames assertiveness as whether societies deal with issues in a confrontational versus harmonious style, linking direct/open communication to low-context cultures and indirect communication to high-context cultures  (Knoll et al., 2021).

A third proxy is **tightness-looseness**, but it is weaker conceptually. Tight cultures have strong norms and low tolerance for deviance, and one 68-country index reports country scores explicitly, while the 33-nation Science study validated a six-item national tightness scale  (Uz, 2015; Gelfand et al., 2011). However, tightness is about norm strength and sanctioning, not specifically whether disagreement is voiced directly, so it should be treated as a secondary predictor only.

A fourth proxy is **Schwartz mastery versus harmony**, because it maps loosely onto assertive versus accommodating social orientation. Society scores are available across 50 societies in a modern manager/professional sample  (Ralston et al., 2011). But later critiques argue that Schwartz’s mastery-harmony dimension has weak predictive properties or keyword ambiguities, so it is a less secure proxy than GLOBE assertiveness  (Minkov & Kaasa, 2024; Kaasa & Welzel, 2023).

## Practical Scoring Strategy

A practical database should use a **tiered evidence model** rather than pretending all countries have equally direct evidence. Tier 1 should be GLOBE assertiveness country scores for the 62 societies because the construct is close, the scale is numeric, and the items directly tap assertive versus non-assertive, dominant versus non-dominant, and tough versus tender  (Bonjeer & Vonkova, 2023; Venaik & Brewer, 2016).

Tier 2 should use the 57-society confrontation-appropriateness and confrontation-frequency means as an alternate direct measure where GLOBE is unavailable  (Eriksson et al., 2021). These can be normalized separately and then aligned to the GLOBE-based scale using overlapping countries.

Tier 3 should use conflict-style studies for pairwise ordering. The most stable pattern across studies is that the U.S. scores more toward dominating/competing than China, Japan, Korea, Thailand, and often India, whereas Chinese, Taiwanese, Japanese, and Korean samples show more avoiding, obliging, or indirect strategies in at least some settings  (Ting-Toomey et al., 1991; Morris et al., 1998; Croucher et al., 2012; Liu, 2024).

Tier 4 should use proxies only when direct measures are absent. Directness/indirectness is the strongest proxy, employee silence/voice is next, and tightness-looseness or mastery-harmony are weaker backups  (Ge et al., 2022; Knoll et al., 2021; Park & Nawakitphaitoon, 2017; Uz, 2015; Ralston et al., 2011).

Two cautions matter. First, several reviews argue that Hofstede and GLOBE country scores have validity problems and should not be overinterpreted at the individual level  (Venaik & Brewer, 2013; Venaik & Brewer, 2016). Second, the conflict-style literature itself is methodologically thin, with many studies relying on few countries or secondary culture scores rather than direct measurement  (Gunkel et al., 2016).

## Recommended Inputs

For your database, the best primary variable is **GLOBE assertiveness practices rescaled to 0–99**. The best secondary variable is **verbal confrontation appropriateness/frequency** from the 57-society metanorm study  (Bonjeer & Vonkova, 2023; Eriksson et al., 2021).

The best qualitative anchor papers are the five-culture face-negotiation study and the four-country manager conflict-style study, because both show interpretable country ordering on avoiding versus dominating  (Ting-Toomey et al., 1991; Morris et al., 1998). The best proxy papers are the direct-versus-indirect communication studies and the employee voice/silence literature linking assertiveness, conflict avoidance, and withholding views  (Ge et al., 2022; Liu, 2024; Park & Nawakitphaitoon, 2017; Knoll et al., 2021).

The single most important shift in the evidence is that **GLOBE assertiveness** gives a numeric, country-level measure closest to Meyer’s “Disagreeing” construct, making a 0–99 database feasible. The biggest open question is whether Meyer’s business-specific notion of “safe, productive open disagreement” is better captured by assertiveness, directness, or conflict-style dominance, because the literature shows these constructs overlap but are not identical.
 
_These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’ consent._
 
## References
 
Bonjeer, T., & Vonkova, H. (2023). Relationships Between Response Styles and the Hofstede and GLOBE Dimensions of Culture in a Sample of Adolescents From 33 Countries. *Cross-Cultural Research, 58*, 180 - 207. https://doi.org/10.1177/10693971231203759
 
Croucher, S., Bruno, A., McGrath, P., Adams, C., McGahan, C., Suits, A., & Huckins, A. (2012). Conflict Styles and High–Low Context Cultures: A Cross-Cultural Extension. *Communication Research Reports, 29*, 64 - 73. https://doi.org/10.1080/08824096.2011.640093
 
Croucher, S. M., Kelly, S., Ashwell, D., & Condon, S. (2024). Conflict styles within individualistic, low power distance, and low context nations: a four nation comparison. *Communication Research Reports, 41*, 232 - 242. https://doi.org/10.1080/08824096.2024.2396293
 
Eriksson, K., Strimling, P., Gelfand, M., Wu, J., Abernathy, J., Akotia, C., Aldashev, A., Andersson, P. A., Andrighetto, G., Anum, A., Arıkan, G., Aycan, Z., Bagherian, F., Barrera, D., Basnight-Brown, D., Batkeyev, B., Belaus, A., Berezina, E., Björnstjerna, M., . . . Van Lange, P. V. (2021). Perceptions of the appropriate response to norm violation in 57 societies. *Nature Communications, 12*. https://doi.org/10.1038/s41467-021-21602-9
 
Ge, F., Park, J., & Pietromonaco, P. (2022). How You Talk About It Matters: Cultural Variation in Communication Directness in Romantic Relationships. *Journal of Cross-Cultural Psychology, 53*, 583 - 602. https://doi.org/10.1177/00220221221088934
 
Gelfand, M., Raver, J. L., Nishii, L., Leslie, L. M., Lun, J., Lim, B.-C., Duan, L., Almaliach, A., Ang, S., Arnadottir, J., Aycan, Z., Boehnke, K., Boski, P., Cabecinhas, R., Chan, D., Chhokar, J., D'Amato, A., Ferrer, M., Fischlmayr, I., . . . Yamaguchi, S. (2011). Differences Between Tight and Loose Cultures: A 33-Nation Study. *Science, 332*, 1100 - 1104. https://doi.org/10.1126/science.1197754
 
Gunkel, M., Schlaegel, C., & Taras, V. (2016). Cultural values, emotional intelligence, and conflict handling styles: A global study. *Journal of World Business, 51*, 568-585. https://doi.org/10.1016/j.jwb.2016.02.001
 
Javidan, M., & Dastmalchian, A. (2009). Managerial implications of the GLOBE project: A study of 62 societies. *Asia Pacific Journal of Human Resources, 47*, 41-58. https://doi.org/10.1177/1038411108099289
 
Kaasa, A., & Welzel, C. (2023). Elements of Schwartz’s Model in the WVS: How Do They Relate to Other Cultural Models?. *Cross-Cultural Research, 57*, 431 - 471. https://doi.org/10.1177/10693971231179792
 
Knoll, M., Götz, M., Adriasola, E., Al-Atwi, A. A., Arenas, A., Atitsogbe, K., Barrett, S., Bhattacharjee, A., Blanco, D. C. N., Bogilović, S., Bollmann, G., Bosak, J., Bulut, Ç., Carter, M. M., Černe, M., Chui, S. L. M., Di Marco, D., Duden, G., Elsey, V., . . . Zacher, H. (2021). International differences in employee silence motives: Scale validation, prevalence, and relationships with culture characteristics across 33 countries. *Journal of Organizational Behavior, 42*, 619-648. https://doi.org/10.1002/job.2512
 
Liu, H. (2024). Cross-Cultural Negotiation Language Practices: A Comparative Analysis of Implicit and Explicit Communication – A Case Study of Sino-American Negotiations. *Finance &amp; Economics*. https://doi.org/10.61173/vpqavb62
 
Minkov, M., & Kaasa, A. (2024). Aligning Schwartz’s model of culture with that of Minkov-Hofstede. *International Journal of Cross Cultural Management, 24*, 129 - 148. https://doi.org/10.1177/14705958241235021
 
Moneim, A. (2007). Towards The Understanding Of Societal Cultures And Leadership In Non-western Countries: An Exploratory Study On Egypt. *Academic Leadership: The Online Journal*. https://doi.org/10.58809/vqao9137
 
Morris, M., Williams, K., Leung, K., Larrick, R. P., Mendoza, M., Bhatnagar, D., Li, J., Kondo, M., Luo, J., & Hu, J.-C. (1998). Conflict Management Style: Accounting for Cross-National Differences. *Journal of International Business Studies, 29*, 729-747. https://doi.org/10.1057/palgrave.jibs.8490050
 
Nadeem, S., & Luque, M. S. D. (2020). Developing an understanding of the human resource (HR) complexities in Pakistan with a GLOBE cultural lens. *Journal of Management & Organization, 26*, 483-501. https://doi.org/10.1017/jmo.2017.79
 
Park, J., & Nawakitphaitoon, K. (2017). The cross‐cultural study of LMX and individual employee voice: The moderating role of conflict avoidance. *Human Resource Management Journal, 28*, 14-30. https://doi.org/10.1111/1748-8583.12158
 
Ralston, D., Egri, C., Reynaud, E., Srinivasan, N., Furrer, O., Brock, D., Alas, R., Wangenheim, F., Darder, F. L., Kuo, C., Potočan, V., Mockaitis, A. I., Szabo, E., Gutiérrez, J. R., Pekerti, A., Butt, A., Palmer, I., Naoumova, I., Lenartowicz, T., . . . Wallace, A. (2011). A Twenty-First Century Assessment of Values Across the Global Workforce. *Journal of Business Ethics, 104*, 1-31. https://doi.org/10.1007/s10551-011-0835-8
 
Ristic, M., Ljepava, N., Qureshi, T., & Milla, A. (2020). A Cross-Cultural Comparison of Conflict Management Styles in Multinational Organisations: Empirical Evidence from Serbia. *Journal for East European Management Studies, 25*, 418-447. https://doi.org/10.5771/0949-6181-2020-3-418
 
Ting-Toomey, S., Gao, G., Trubisky, P., Yang, Z., Kim, H.-S., Lin, S.-L., & Nishida, T. (1991). CULTURE, FACE MAINTENANCE, AND STYLES OF HANDLING INTERPERSONAL CONFLICT: A STUDY IN FIVE CULTURES. *International Journal of Conflict Management, 2*, 275-296. https://doi.org/10.1108/eb022702
 
Uz, I. (2015). The Index of Cultural Tightness and Looseness Among 68 Countries. *Journal of Cross-Cultural Psychology, 46*, 319 - 335. https://doi.org/10.1177/0022022114563611
 
Venaik, S., & Brewer, P. (2016). National culture dimensions: The perpetuation of cultural ignorance. *Management Learning, 47*, 563 - 589. https://doi.org/10.1177/1350507616629356
 
Venaik, S., & Brewer, P. (2013). Critical issues in the Hofstede and GLOBE national culture models. *International Marketing Review, 30*, 469-482. https://doi.org/10.1108/imr-03-2013-0058
 
Xie, Y., Hample, D., & Wang, X. (2015). A Cross-Cultural Analysis of Argument Predispositions in China: Argumentativeness, Verbal Aggressiveness, Argument Frames, and Personalization of Conflict. *Argumentation, 29*, 265-284. https://doi.org/10.1007/s10503-015-9352-8
 
