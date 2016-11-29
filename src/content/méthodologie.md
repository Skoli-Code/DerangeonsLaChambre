##MÉTHODOLOGIE

### Sources
Les données sont issues du Ministère de l’Intérieur et publiées sur le portail data.gouv.fr
Liens vers les données brutes (format .xls) :
[Données par circonscriptions](http://www.data.gouv.fr/fr/datasets/elections-legislatives-2012-resultats-572079/)
[Données agrégées à différentes échelles](http://www.data.gouv.fr/fr/datasets/elections-legislatives-2012-resultats-572077/)
### Les nuances politiques présentes
| Nuance | Libellé |
|:------:|:-------:|
| EXG    | Extrême gauche |
| FG     | Front de Gauche |
| SOC    | Parti Socialiste|
| RDG    | Parti Radical de Gauche|
| DVG    | Divers Gauche |
| VEC    | Europe Ecologie Les Verts|
| REG    | Régionalistes |
| ECO    | Ecologistes |
| AUT    | Autres |
| CEN    | Le Centre Pour la France |
| ALLI   | Alliance Centriste |
| PRV    | Parti Radical Valoisien |
| NCE    | Nouveau Centre |
| *LR*   | Les Républicains|
| DVD    | Divers Droite |
| FN     | Front National |
| EXD    | Extrême Droite |
| *ABS*  | *Abstention* |
| *VID*  | *Sièges vides*|
| *CIT*  | *Citoyens* |

NB : *En Italique* les éléments modifiés par rapport à la typologie établie par le Ministère de l'Intérieur et en vigueur lors des élections législatives de 2012. (Conformément à la décision du 28 mai 2015, l'*Union pour un Mouvement Populaire* est devenu *Les Républicains*, concernant les nuances *ABS*, *VID*, *CIT*, elles n'existent pas dans la typologie officielle et ont été ajoutées pour les besoins de la simulation.)

### Méthode de calcul par scrutin

**Préalable** :
Tous les calculs sont faits à partir des nuances politiques désignées par le Ministère de l'Intérieur. Seule “Union pour un Mouvement Populaire” (UMP) a été changé en “Les Républicains” (LR), selon le changement de nom opéré le 30 mai 2015.
En cas de proportionnelle, les résultats sont, sauf mention contraire, sans quorum d’éligibilité.
En cas de proportionnelle, les résultats sont arrondis selon les règles standards. En cas de total supérieur au nombre de places à attribuer, la donnée ayant subi l’arrondi vers la décimal supérieur ayant la plus grande magnitude est ramené à l’entier inférieur.  


#### Scrutin majoritaire uninominal à deux tours
Ces données sont disponibles dans les sources.

#### Scrutin uninominal majoritaire à 1 tour
Est réputé élu le candidat agrégeant le plus de suffrages sur son nom au premier tour.

#### Système mixte à finalité proportionnelle (uninominal majoritaire à un tour et proportionnelle plurinominale avec sièges "supplémentaires")
Il prévoit l'élection d'une première moitié d'élus au scrutin uninominal majoritaire à un tour, puis l'élection d'une seconde moitié au scrutin proportionnel plurinominal. L'élection de la seconde moitié dépend des résultats découlant de l'élection de la première : la part proportionnelle est répartie de manière à corriger la mauvaise transcription des voix en sièges de la part majoritaire.
Pour cette simulation, ces chiffres sont calculés de la manière suivante : agrégation des résultats d’une proportionnelle (avec seuil de 5%) et d’une élection uninominale majoritaire à un tour. Tant qu’un siège est obtenu lors du scrutin uninominal majoritaire à un tour, il n’est pas redistribué à la proportionnelle. Le résultat est ensuite ramené à 577 sièges.

#### Scrutin proportionnelle plurinominal à circonscription nationale avec prime au parti majoritaire (quotient de Hare, quorum fixé à 3%)
Si un parti obtient au moins 40% des voix au Premier Tour, il obtient 55% des sièges. Le reste est réparti à la proportionnelle. Si aucun parti n’agrège 40% des voix au premier tour, un deuxième tour est organisé entre les deux partis arrivés en tête pour déterminer qui obtiendra la prime à la majorité.
Le reste des sièges est réparti selon le Quotient de Hare :  Nombre de voix exprimées / nombre de sièges à pourvoir. Est ensuite utilisée la méthode du plus fort reste.
Le quorum d’éligibilité est fixé à 3%.

#### Scrutin à la proportionnelle plurinominale (méthode d'Hondt, quorum fixé à 3%) par circonscription départementale
Les résultats agrégés au niveau départemental sont issus des données publiées par le Ministère de l’Intérieur.
Un quorum d’éligibilité de 3% est appliqué.
Les sièges sont répartis selon la Méthode de Hondt :  “On calcule pour chaque liste le rapport voix/sièges. Le siège est attribué à la liste présentant la plus forte moyenne de voix par sièges”.

#### Scrutin à la proportionnelle plurinominale intégrale par circonscription nationale (méthode du quotient de Hare, pas de quorum d'éligibilité)
Les résultats agrégés au niveau national sont issus des données publiées par le Ministère de l’Intérieur.
Les sièges sont répartis selon le Quotient de Hare :  Nombre de voix exprimées / nombre de sièges à pourvoir. Est ensuite utilisée la méthode du plus fort reste.

#### Scrutin majoritaire uninominal à deux tours dans lequel l'abstention compte comme un parti politique
Seuls sont désignés élus les candidats ayant réuni le maximum de voix dans leur circonscription et dont le nombre de voix est supérieur au nombre des abstentions.
Les calculs sont opérés à partir des résultats du deuxième tour, par circonscription.
*Les 36 députés élus au premier tour qui n’ont pas réunis plus de voix que l’abstention n’ont pas bénéficié d’un second tour pour arriver à cet objectif. Leur score au premier tour ne leur permet pas d’être élus par rapport à l’abstention.*

#### Scrutin uninominal majoritaire à 2 tours avec quorum d’éligibilité de 50% du corps électoral.
Est élu député(e) le (la) candidat(e) qui remporte la majorité (absolue au 1e Tour) des suffrages dans sa circonscription, si le taux de participation est supérieur à 50% du corps électoral. Dans le cas contraire, son siège est laissé vide.
Scrutin majoritaire (des inscrits) uninominal à deux tours
Seuls sont désignés élus les candidats ayant réussi à agréger la majorité des inscrits de leur circonscription autour de leur nom.
Nous utilisons les nuances politiques du Ministère de l’Intérieur.
Les calculs sont opérés à partir des résultats du deuxième tour, par circonscription.
*Les 36 députés élus au premier tour n’ont pas réunis la majorité absolue des inscrits. Ils n’ont pas bénéficié d’un second tour pour arriver à cet objectif. Leur score au premier tour ne leur permet pas d’être élus.*

#### Stochocratie
Il s’agit ici d’une fiction, les données sont aléatoires et n’ont aucune assise réelle. Les règles du tirage au sort ne permettent par définition pas d’utiliser les données issues du vote.
La probabilité d’être tiré au sort pour un particulier est donc de 0,00000866007454. Soit 0,000866007454%.

### Visualisation
**Préalable**:
Les données sont visualisées selon un tri décroissant, le contingent le plus important est placé en haut à gauche, selon le sens de la lecture.
La position de gauche à droite est déterminée par la liste de nuances du Ministère de l’Intérieur.
L’indication “Majorité” spécifie le parti ayant la majorité simple, ou la majorité absolue.
**Les couleurs**
