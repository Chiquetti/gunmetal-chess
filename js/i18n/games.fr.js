// Traduction française de la bibliothèque de parties célèbres.
// Les clés des commentaires restent identiques à l'anglais.

export default {
  games: {
    "fools-mate": {
      title: "Le mat du fou",
      white: "Le Blanc malchanceux",
      black: "Le Noir chanceux",
      event: "La partie la plus courte possible",
      opening: "Mat du fou (1.f3 e5 2.g4)",
      intro: "Le mat le plus rapide des échecs : seulement deux coups des Noirs. Cela n'arrive que si les Blancs jouent les deux pires coups de l'échiquier, mais cela montre pourquoi il ne faut jamais ouvrir la diagonale de son propre roi.",
      lesson: "Chaque coup change les cases sûres autour de votre roi. Avant de déplacer un pion devant votre roi, demandez-vous quelle diagonale ou quelle colonne il ouvre.",
      story: [
        "Le mat du fou est le mat le plus court possible dans une partie où les deux camps jouent des coups légaux. Comme il exige une coopération totale des Blancs, il n'arrive presque jamais dans les vraies parties, mais on s'en sert depuis des siècles pour montrer aux débutants à quel point un roi peut être fragile.",
        "La clé est la diagonale affaiblie e1-h4. Après 1.f3 et 2.g4, plus rien ne protège le roi contre la dame qui arrive en h4.",
        "La version des Noirs, avec les rôles inversés, est un peu plus longue et s'appelle le coup du berger. Les deux enseignent la même idée : protégez votre roi et faites attention aux longues diagonales."
      ],
      comments: {
        "1.f3": "La première erreur. Ce coup de pion bloque la meilleure case du cavalier et ouvre la diagonale vers le roi.",
        "2.g4": "La deuxième erreur, fatale. Maintenant la diagonale de h4 à e1 est grande ouverte.",
        "2...Qh4#": "Échec et mat en deux coups. Le roi ne peut ni bouger, ni prendre la dame, et aucune pièce ne peut s'interposer."
      }
    },
    "scholars-mate": {
      title: "Le coup du berger",
      white: "L'Attaque rapide",
      black: "Le Défenseur imprudent",
      event: "Piège classique de débutant",
      opening: "Attaque de style italien sur f7",
      intro: "Le mat le plus rapide que la plupart des joueurs voient un jour. Il ne marche que si les Noirs ignorent la menace sur f7, mais apprendre à le parer enseigne deux grandes leçons : protégez votre case la plus faible, et ne sortez pas votre dame trop tôt toute seule.",
      lesson: "Défendez f7 avec ...g6, ...Qe7 ou ...Nh6 et l'attaque s'éteint. Si vous jouez vous-même ce piège, souvenez-vous qu'un bon adversaire punira une dame sortie trop tôt.",
      story: [
        "Presque tous les joueurs d'échecs tombent dans le coup du berger, ou l'essaient, pendant leurs premières semaines. On l'appelle ainsi parce que c'est le genre de piège que les écoliers se jouent entre eux.",
        "L'idée est simple : au début, le pion f7 n'est protégé que par le roi. Le fou et la dame visent tous deux cette case, et si les Noirs ne s'en aperçoivent pas, la partie se termine en quatre coups.",
        "Les bons joueurs le voient plus comme un avertissement que comme une arme. Même quand il ne marche pas, une dame sortie trop tôt peut être chassée : servez-vous-en pour apprendre le schéma, puis passez à un vrai développement."
      ],
      comments: {
        "1.e4": "Les Blancs prennent le centre et ouvrent des lignes pour le fou et la dame.",
        "2.Bc4": "Le fou vise f7. Au début, f7 n'est gardé que par le roi, ce qui en fait le point le plus faible du camp noir.",
        "3.Qh5": "La dame entre en jeu. Elle attaque le pion e5 et, avec le fou, menace Qxf7 mat.",
        "3...Nf6": "Les Noirs attaquent la dame, ce qui semble naturel, mais ils ignorent la vraie menace. ...g6 aurait chassé la dame sans danger.",
        "4.Qxf7#": "Échec et mat. La dame est protégée par le fou et le roi n'a aucune case de fuite."
      }
    },
    "legal-mate": {
      title: "Le mat de Légal",
      white: "Sire de Légal",
      black: "Saint Brie",
      event: "Paris (traditionnel)",
      opening: "Partie italienne, structure de style Philidor",
      intro: "L'un des plus anciens et des plus jolis pièges des échecs : les Blancs sacrifient la dame pour que trois pièces mineures donnent le mat. L'idée fonctionne chaque fois que les Noirs prennent la dame sans réfléchir avec un cavalier cloué.",
      lesson: "Avant de prendre une grosse pièce, demandez-vous pourquoi l'adversaire l'a permis. Une dame offerte est souvent un piège.",
      story: [
        "Ce piège porte le nom du Sire de Légal, un maître parisien du XVIIIe siècle qui, dit-on, aurait enseigné au grand François-André Danican Philidor. On lui attribue l'un des premiers sacrifices de dame célèbres de l'histoire des échecs.",
        "La mise en place est subtile. Le fou noir cloue le cavalier blanc à la dame, et les Noirs pensent donc gagner du matériel. Les Blancs ignorent simplement le clouage.",
        "Le tableau final, avec un cavalier et un fou qui donnent le mat pendant que les propres pièces des Noirs bloquent leur roi, est un modèle de mat « étouffé » que tout débutant devrait connaître."
      ],
      comments: {
        "3...Bg4": "Les Noirs clouent le cavalier f3 à la dame blanche. Cela paraît fort, mais cela retire un défenseur du centre.",
        "4...g6": "Une erreur. Les Noirs auraient dû d'abord s'occuper du cavalier c3 et du pion e5 mal protégé.",
        "5.Nxe5!": "La surprise. Les Blancs ignorent le clouage et offrent la dame. Si les Noirs la prennent, le piège se referme.",
        "5...Bxd1": "Les Noirs prennent la dame et tombent dans le piège.",
        "6.Bxf7+": "Le fou donne échec et force le roi à aller en e7.",
        "7.Nd5#": "Échec et mat avec le cavalier et le fou, tandis que les propres pièces des Noirs bloquent la fuite. Deux pièces mineures et un cavalier en e5 suffisent."
      }
    },
    "gibaud-lazard-1924": {
      title: "Gibaud contre Lazard",
      white: "Gibaud",
      black: "Lazard",
      event: "Paris",
      opening: "Pion dame, gambit de style Englund",
      intro: "Une miniature de six coups où les Noirs gagnent par un spectaculaire sacrifice de cavalier suivi d'un mat rapide à la dame. C'est un exemple favori de la façon dont une prise de pion gourmande peut faire perdre la partie instantanément.",
      lesson: "Quand un adversaire offre une pièce, examinez d'abord toutes les lignes forcées. Ici, la prise en e3 a obligé le pion blanc à ouvrir la diagonale du roi.",
      story: [
        "Cette courte partie jouée lors d'un tournoi à Paris en 1924 est l'une des miniatures les plus connues avec une fin sacrificielle. On l'utilise souvent pour enseigner, car toute la combinaison tient en quelques coups.",
        "Les Blancs prennent un pion et tentent de chasser le cavalier avec le h3, d'apparence naturelle. C'est l'erreur.",
        "Le sacrifice de cavalier des Noirs en e3 force les Blancs à reprendre avec le pion f, ce qui ouvre la diagonale e1-h4 et permet à la dame de donner le mat en g3."
      ],
      comments: {
        "2...e5": "Un gambit. Les Noirs offrent un pion pour obtenir une activité rapide des pièces et des chances contre le roi.",
        "3.dxe5": "Les Blancs acceptent le pion, mais c'est ici que le danger commence.",
        "3...Ng4": "Le cavalier attaque e5 et surveille les cases f2 et e3 près du roi blanc.",
        "4.h3?": "Un coup d'apparence naturelle qui attaque le cavalier, mais qui tombe dans un piège. Ngf3 était plus sûr.",
        "4...Ne3!!": "Le sacrifice brillant. Si les Blancs prennent le cavalier, le pion f quitte la diagonale du roi.",
        "5.fxe3": "Les Blancs prennent. Maintenant la diagonale e1-h4 est ouverte à la dame noire.",
        "5...Qh4+": "Échec. Les Blancs ne peuvent s'interposer ni avec le pion e ni avec le pion f.",
        "6.g3": "Le seul moyen de parer, mais le pion n'est pas assez protégé.",
        "6...Qxg3#": "Échec et mat. La dame prend le pion avec échec et le roi n'a aucune issue."
      }
    },
    "tartakower-reti-1910": {
      title: "Tartakower contre Réti",
      white: "Savielly Tartakower",
      black: "Richard Réti",
      event: "Vienne",
      opening: "Défense Caro-Kann",
      intro: "Une miniature de 11 coups célèbre pour un sacrifice de dame et un double échec. Le roi noir est poussé vers une position où deux pièces mineures donnent le mat.",
      lesson: "Les prises gourmandes peuvent perdre face à une séquence forcée. Ici, les Noirs ont pris un cavalier gratuit et n'ont pas vu le sacrifice de dame qui suit.",
      story: [
        "Savielly Tartakower et Richard Réti furent deux des maîtres majeurs du début du XXe siècle. Tous deux contribuèrent à façonner les échecs modernes, Tartakower par son esprit et Réti par les idées hypermodernes qu'il défendait.",
        "Dans cette partie jouée à Vienne, Réti adopta la défense Caro-Kann mais choisit un plan risqué qui ouvrit le centre trop tôt.",
        "Tartakower le punit par un ingénieux sacrifice de dame en d8, suivi d'un double échec qui ne laissa au roi qu'un seul coup. C'est devenu un exemple classique d'une combinaison que tout joueur devrait reconnaître."
      ],
      comments: {
        "1...c6": "La défense Caro-Kann, un choix solide qui prépare ...d5.",
        "5.Qd3": "Les Blancs développent la dame et surveillent l'échange sur le cavalier e4. Ce coup de dame prépare aussi des pièges futurs.",
        "5...e5?!": "Une rupture risquée. Elle ouvre le centre alors que les Noirs ne sont pas encore entièrement développés.",
        "6.dxe5": "Les Blancs ouvrent la colonne d. La dame noire devra donner échec puis prendre en e5.",
        "8.O-O-O": "Les Blancs font le grand roque, placent une tour sur la colonne d ouverte et créent une menace cachée.",
        "8...Nxe4": "La prise gourmande. On dirait que les Noirs gagnent une pièce, mais ils perdent par la force.",
        "9.Qd8+!!": "Le sacrifice de dame. Le roi doit prendre, et la colonne d s'ouvre pour la tour et le fou.",
        "10.Bg5+": "Un double échec du fou et de la tour. Le roi ne peut aller qu'en c7.",
        "11.Bd8#": "Échec et mat. Le fou en d8 est protégé par la tour, et les propres pièces des Noirs bloquent la fuite."
      }
    },
    "opera-game": {
      title: "La Partie de l'Opéra",
      white: "Paul Morphy",
      black: "Duc de Brunswick et comte Isouard",
      event: "Opéra de Paris",
      opening: "Défense Philidor",
      intro: "Jouée pendant une représentation à l'Opéra de Paris. Morphy, le plus grand joueur de son époque, donne une leçon parfaite : développez vite, luttez pour le centre et ouvrez les lignes tant que le roi adverse n'a pas roqué. C'est souvent la première partie célèbre qu'étudie un élève.",
      lesson: "Chaque coup de Morphy développe une pièce ou crée une menace. Quand ses adversaires étaient en retard de développement, il sacrifiait du matériel pour les punir.",
      story: [
        "En 1858, le jeune Américain Paul Morphy se trouvait à Paris et avait battu les meilleurs joueurs d'Europe. L'histoire raconte que le duc de Brunswick et le comte Isouard l'invitèrent à l'opéra, où ils jouèrent ensemble, alliés contre lui, dans une loge privée pendant une représentation de la Norma de Bellini.",
        "On dit que Morphy fut agacé par leur jeu lent et par le fait qu'ils prêtaient plus d'attention à l'opéra qu'à la partie. Il joua vite et avec détermination, et le duc et le comte ne purent suivre.",
        "La partie est aujourd'hui l'introduction classique à la stratégie aux échecs : développer avec des menaces, ouvrir le centre et sacrifier quand le roi adverse est coincé. Presque tous les livres d'échecs commencent par elle."
      ],
      comments: {
        "2...d6": "La défense Philidor. Elle est solide mais passive, et elle enferme les propres pièces des Noirs.",
        "3.d4": "Morphy conteste aussitôt le centre et prépare l'ouverture de la position.",
        "3...Bg4": "Les Noirs clouent le cavalier, mais développer le fou ainsi fait perdre du temps.",
        "5.Qxf3": "Après l'échange, la dame blanche sort avec un but : elle vise f7 et b7.",
        "6.Bc4": "La dame et le fou pèsent maintenant tous deux sur f7. Morphy bâtit des menaces à chaque coup.",
        "7.Qb3": "Une double attaque sur f7 et b7. Les Noirs ne peuvent facilement sauver que l'un des deux.",
        "7...Qe7": "Les Noirs défendent f7 et acceptent de laisser le pion b7.",
        "8.Nc3": "Morphy refuse le pion. Prendre b7 permettrait aux Noirs d'échanger les dames et de souffler. Il continue plutôt à développer.",
        "9.Bg5": "Un clouage : si le cavalier f6 bouge, la dame en e7 est attaquée.",
        "10.Nxb5!": "Le premier sacrifice. Le cavalier ouvre des lignes contre le roi noir et sur la colonne b.",
        "11.Bxb5+": "Le fou donne échec, et les pièces noires sont paralysées.",
        "12.O-O-O": "Le grand roque amène la dernière pièce, la tour a1, dans l'attaque, avec le roi en sécurité en c1.",
        "13.Rxd7!": "Un sacrifice de tour pour éliminer le défenseur du cavalier cloué.",
        "16.Qb8+!!": "Le célèbre sacrifice de dame. Les Noirs doivent prendre avec le cavalier, ce qui ouvre d8 pour le coup final.",
        "17.Rd8#": "Échec et mat. La tour le donne, protégée par le fou en g5."
      }
    },
    "lasker-thomas-1912": {
      title: "Lasker contre Thomas",
      white: "Edward Lasker",
      black: "Sir George Thomas",
      event: "Londres",
      opening: "Défense hollandaise",
      intro: "L'une des parties d'attaque les plus célèbres de tous les temps. Les Blancs sacrifient la dame en h7, puis pourchassent le roi noir sur tout l'échiquier jusqu'au mat en d2.",
      lesson: "La dame vaut plus que n'importe quelle autre pièce, mais pas plus qu'un mat forcé. Cherchez les échecs forcés quand le roi a peu de défenseurs.",
      story: [
        "Edward Lasker, ingénieur germano-américain et bon joueur de go, n'avait aucun lien de parenté avec le champion du monde Emanuel Lasker. Son adversaire, Sir George Thomas, était un baronnet anglais qui excellait aussi au badminton et au tennis.",
        "Thomas choisit la défense hollandaise et affaiblit lui-même son aile roi par ses coups de pions. Lasker était prêt.",
        "Après le sacrifice de dame en h7, le roi noir marche de h7 jusqu'en g1, harcelé par des échecs à chaque pas. La partie est chère aux auteurs d'échecs pour cette image précisément : un roi pourchassé à travers tout l'échiquier."
      ],
      comments: {
        "2...f5": "La défense hollandaise. Elle lutte pour e4 mais affaiblit la position du roi noir.",
        "5.Bxf6": "Les Blancs échangent le cavalier, éliminant un défenseur clé de l'aile roi.",
        "8.Ne5": "Un puissant cavalier central. Il soutient l'attaque sur h7 et g6.",
        "10.Qh5": "La dame rejoint l'attaque et vise h7, où le cavalier et le fou visent déjà.",
        "11.Qxh7+!!": "Le légendaire sacrifice de dame. Le roi noir est arraché de son abri.",
        "12.Nxf6+": "Le cavalier prend avec échec, forçant le roi en h6.",
        "14.h4+": "Le pion se joint à la chasse. Il ne reste plus de case sûre au roi.",
        "16.Be2+": "Le fou donne échec au roi en f3 et le force en g2.",
        "17.Rh2+": "La tour ajoute un autre échec. Le roi noir doit aller en g1.",
        "18.Kd2#": "Un coup de roi d'apparence tranquille qui donne le mat : il découvre un échec de la tour le long de la première rangée, et le roi noir n'a aucune issue."
      }
    },
    "rotlewi-rubinstein-1907": {
      title: "L'Immortelle de Rubinstein",
      white: "Georg Rotlewi",
      black: "Akiba Rubinstein",
      event: "Łódź",
      opening: "Gambit dame (style Tarrasch)",
      intro: "Connue comme l'Immortelle de Rubinstein. Les Noirs sacrifient une dame, une tour puis une autre tour, et gagnent par un coup de tour tranquille qui décide la partie sur-le-champ.",
      lesson: "Il ne faut pas garder ses pièces à tout prix. Si leur activité est écrasante, même de gros sacrifices peuvent laisser votre adversaire impuissant.",
      story: [
        "Akiba Rubinstein fut l'un des plus forts joueurs du monde au début du XXe siècle, un génie des finales de tours qui n'obtint jamais de match pour le titre mondial. Cette partie de Łódź en 1907 est souvent choisie comme sa meilleure performance d'attaque.",
        "Rotlewi joua agressivement contre le dispositif de Rubinstein, mais celui-ci était prêt avec une série étonnante de sacrifices.",
        "L'idée clé est le sacrifice de tour en c3, suivi d'un saut de tour en d2. La dame blanche n'a aucune bonne case et les Blancs se retrouvent face à des menaces de mat tout en étant en infériorité matérielle."
      ],
      comments: {
        "6.dxc5": "Les Blancs gagnent le pion mais donnent aux fous noirs des cases actives et du temps pour se développer.",
        "8.b4": "Les Blancs essaient de chasser le fou, mais cela affaiblit l'aile dame.",
        "12...b5": "Les Noirs gagnent de l'espace et chassent le fou. Leurs pièces sont maintenant prêtes à l'action.",
        "16...Bxe5": "Les Noirs reprennent avec le fou, qui surveille maintenant la diagonale a1-h8 et le roi blanc.",
        "19.e5": "Les Blancs gagnent de l'espace et ferment la diagonale du fou, mais cela ouvre la diagonale a7-g1 vers leur propre roi.",
        "19...Bb6+": "Échec. Le fou force le roi blanc vers le coin.",
        "21...Qh4": "Un coup tranquille mais mortel. La dame menace de prendre en h2 et le cavalier en g4 soutient l'attaque.",
        "22...Rxc3!!": "Le stupéfiant sacrifice de tour. Si les Blancs prennent, leur roi est exposé à des menaces imparables.",
        "23...Rd2!!": "Un autre coup tranquille. La tour ne peut être prise sans perdre la dame sur une attaque à la découverte.",
        "24...Bxe4+": "Le fou prend avec échec, et la dame blanche doit s'interposer en g2, où elle sera clouée.",
        "25...Rh3": "La tour ne peut être prise car la dame en g2 est clouée par le fou. Les Blancs abandonnent."
      }
    },
    "immortal-game": {
      title: "La Partie immortelle",
      white: "Adolf Anderssen",
      black: "Lionel Kieseritzky",
      event: "Londres, partie amicale",
      opening: "Gambit du Roi accepté",
      intro: "Jouée à Londres pendant le premier tournoi international, cette partie est le symbole de l'ère romantique des échecs. Anderssen sacrifie un fou, les deux tours et sa dame, puis donne le mat avec les trois pièces qui lui restent.",
      lesson: "Le matériel n'est qu'un moyen. Si vos pièces sont plus actives et que le roi adverse est exposé, on peut céder du matériel pour donner le mat.",
      story: [
        "En 1851, Londres accueillit le premier tournoi international d'échecs, et Adolf Anderssen, professeur de mathématiques de Breslau, finit par le remporter. Pendant l'événement, il joua cette partie amicale contre Lionel Kieseritzky, un joueur d'origine estonienne vivant à Paris.",
        "On dit que Kieseritzky était fier de cette partie bien qu'il l'ait perdue, et elle fut publiée dans une revue d'échecs parisienne. Le nom de « Partie immortelle » lui fut donné plus tard, dans les années 1850.",
        "Elle devint l'exemple le plus célèbre du style romantique, qui valorisait la brillance de l'attaque et le sacrifice plutôt que le jeu prudent. Les ordinateurs modernes disent que les Noirs ont manqué de bonnes chances, mais la beauté du final n'a pas pâli."
      ],
      comments: {
        "2.f4": "Le gambit du Roi. Les Blancs offrent un pion pour un développement rapide et une colonne f ouverte, une ouverture très populaire au XIXe siècle.",
        "3...Qh4+": "La dame noire donne échec et force les Blancs à perdre le droit de roquer.",
        "4.Kf1": "Les Blancs acceptent de perdre le droit au roque et misent sur l'activité des pièces.",
        "4...b5": "Un contre-gambit. Les Noirs offrent un pion pour éloigner le fou de c4.",
        "10.g4": "Anderssen continue d'attaquer avec ses pions au lieu de battre en retraite, un choix extrêmement audacieux.",
        "11.Rg1!?": "Au lieu de sauver son fou, les Blancs ouvrent la colonne g. Les deux camps courent vers le roi adverse.",
        "17.Nd5": "Un puissant cavalier central. Il menace la dame noire et prépare les idées Nxg7+ et Qf6.",
        "17...Qxb2": "Gourmand. Les Noirs prennent un pion et envoient la dame loin de leur propre roi.",
        "18.Bd6!": "Le magnifique coup de fou. Il coupe la dame noire de la défense et prépare l'attaque finale.",
        "19.e5!": "Un autre coup tranquille. Les Blancs ignorent la tour en prise en g1 et resserrent le filet.",
        "20.Ke2": "Le roi blanc s'écarte. Les Noirs ont une dame et une tour de plus mais aucun moyen d'arrêter l'attaque.",
        "21.Nxg7+": "L'échec du cavalier entraîne le roi en d8.",
        "22.Qf6+!!": "L'immortel sacrifice de dame. Le cavalier noir doit prendre, fermant la fuite du roi.",
        "23.Be7#": "Échec et mat, avec seulement un fou et deux cavaliers. Les Blancs ont sacrifié la dame et les deux tours."
      }
    },
    "evergreen-game": {
      title: "La Partie toujours verte",
      white: "Adolf Anderssen",
      black: "Jean Dufresne",
      event: "Berlin, partie amicale",
      opening: "Gambit Evans",
      intro: "Un autre chef-d'œuvre d'Anderssen. Elle tire son nom du fait qu'elle reste toujours fraîche et passionnante. Les Blancs ouvrent par le gambit Evans, puis jouent l'une des combinaisons les plus profondes de l'époque.",
      lesson: "Sacrifier du matériel pour le développement fonctionne mieux quand on peut ouvrir des lignes vers le roi. Comptez vos attaquants et vos lignes ouvertes avant de sacrifier.",
      story: [
        "Un an après son triomphe à Londres, Anderssen joua cette partie amicale à Berlin contre Jean Dufresne, un jeune maître allemand. La partie fut publiée puis admirée par le premier champion du monde officiel, Wilhelm Steinitz, qui lui donna le nom de « toujours verte ».",
        "Les Blancs ouvrent avec le gambit Evans, cédant un pion pour un développement rapide. Le roi noir ne trouve jamais vraiment de sécurité.",
        "La partie se termine par une avalanche de sacrifices, dont celui de la dame en d7, qui laisse les Noirs face à un mat au centre. On la place souvent à côté de la Partie immortelle comme la meilleure de l'ère romantique."
      ],
      comments: {
        "4.b4": "Le gambit Evans. Les Blancs offrent un pion pour gagner du temps et le contrôle du centre.",
        "6.d4": "Les Blancs ouvrent le centre et profitent du temps d'avance pour attaquer.",
        "7...d3": "Les Noirs poussent le pion en d3 pour gêner les Blancs. Ceux-ci le regagneront plus tard avec Bxd3.",
        "9.e5": "Le pion e avance, repousse la dame noire et empêche les pièces noires de se développer.",
        "11.Ba3": "Le fou couvre e7 et garde le roi noir coincé au centre.",
        "17.Nf6+!": "Le premier sacrifice. L'échec du cavalier disloque l'aile roi noire.",
        "18.exf6": "Le pion en f6 gêne les Noirs. Les menaces de mat commencent à s'accumuler.",
        "19.Rad1": "Anderssen amène sa dernière pièce en jeu et ignore l'attaque sur sa dame.",
        "20.Rxe7+!": "Un sacrifice de tour pour détourner le défenseur.",
        "21.Qxd7+!!": "Le sacrifice de dame. Le roi est attiré à découvert.",
        "22.Bf5+": "Le fou commence à pourchasser le roi, échec après échec.",
        "24.Bxe7#": "Échec et mat. Les Blancs ont sacrifié les deux tours et la dame, et finissent avec des pièces mineures."
      }
    },
    "deep-blue-kasparov-1997-g6": {
      title: "Deep Blue contre Kasparov, partie 6",
      white: "Deep Blue (IBM)",
      black: "Garry Kasparov",
      event: "Revanche, New York",
      opening: "Défense Caro-Kann",
      intro: "La dernière partie de la revanche de 1997. Ce fut la première fois qu'un ordinateur battit un champion du monde en titre dans un match à cadence standard. Kasparov joue une variante risquée, se trompe dans l'ordre des coups et tombe sur un sacrifice de cavalier.",
      lesson: "Connaissez bien votre variante d'ouverture. Un seul mauvais ordre de coups peut transformer une bonne ouverture en défaite, même face à une simple machine.",
      story: [
        "En 1996, Garry Kasparov battit le Deep Blue d'IBM 4-2 à Philadelphie, bien que l'ordinateur ait gagné la première partie. En 1997, un Deep Blue amélioré et plus fort vint à New York pour une revanche.",
        "Le match alla jusqu'à la dernière partie, avec une égalité à 2,5 points partout. Kasparov choisit la défense Caro-Kann et joua un ordre de coups inhabituel qui tourna mal au 7e coup.",
        "Deep Blue sacrifia un cavalier en e6 et Kasparov abandonna après seulement 19 coups. Il dit plus tard avoir senti quelque chose d'intelligent derrière les coups de l'ordinateur. Cela reste l'un des moments les plus discutés de l'histoire de l'intelligence artificielle."
      ],
      comments: {
        "1...c6": "Kasparov choisit la solide défense Caro-Kann.",
        "5.Ng5": "Un essai d'attaque connu. Le cavalier vise f7 et e6.",
        "7...h6?": "Une erreur. Le bon coup était 7...Bd6. Kasparov a confondu ses variantes.",
        "8.Nxe6!": "Le sacrifice de cavalier. Les Blancs cèdent une pièce pour déchirer le roi noir.",
        "8...Qe7": "La dame noire s'écarte. Après le roque des Blancs, les Noirs gagneront le cavalier par ...fxe6, mais leur roi est coincé au centre.",
        "10.Bg6+": "L'échec du fou chasse le roi en d8.",
        "14.Bg3": "Les Blancs maintiennent la pression tandis que les pièces noires sont bloquées.",
        "16.Qd3": "La dame passe à l'attaque et prépare un sacrifice décisif.",
        "17.Bf5": "Un dernier sacrifice de fou pour ouvrir des lignes vers le roi noir.",
        "18.Rxe7": "Les Blancs gagnent la dame et conservent un grand avantage positionnel.",
        "19.c4": "Kasparov abandonna. Le match revint à Deep Blue, 3,5 à 2,5."
      }
    },
    "game-of-the-century": {
      title: "La Partie du siècle",
      white: "Donald Byrne",
      black: "Bobby Fischer",
      event: "Mémorial Rosenwald, New York",
      opening: "Défense Grünfeld",
      intro: "Bobby Fischer, treize ans, avec les Noirs contre un maître international, sacrifie sa dame pour bâtir une attaque dévastatrice. Elle fut nommée Partie du siècle par Hans Kmoch et rendit Fischer célèbre.",
      lesson: "Fischer a compris que la dame comptait moins que l'activité de toutes ses autres pièces. Parfois, le bon échange consiste à céder de la qualité contre du temps et de la position.",
      story: [
        "En octobre 1956, au Marshall Chess Club de New York, un Bobby Fischer de 13 ans s'assit face à Donald Byrne, un solide maître international américain. Peu de gens attendaient du garçon plus qu'une résistance honorable.",
        "Fischer laissa son adversaire accumuler de la pression, puis joua l'étonnant 17...Be6!, une offre de sa dame. Après que les Blancs l'eurent prise, une série d'échecs de cavalier et une retraite tranquille du fou laissèrent les pièces blanches empêtrées.",
        "L'auteur d'échecs Hans Kmoch l'appela la Partie du siècle. Fischer devint le plus jeune grand maître de l'époque, puis champion du monde en 1972."
      ],
      comments: {
        "4...O-O": "Fischer roque dans un dispositif de style Grünfeld : pièces prêtes, fou fianchetté, pression sur le centre.",
        "6.Qb3": "Les Blancs attaquent d5 et b7. Les Noirs prennent le pion et défient la dame.",
        "10.Qc5": "La dame blanche part à la chasse et perd du temps. Fischer exploitera le manque de développement.",
        "11...Na4!": "Un puissant saut de cavalier. Il attaque la dame et lance une série de coups forcés.",
        "13...Nxe4!": "Fischer sacrifie une pièce pour lâcher ses pièces contre le roi au centre.",
        "14.Bxe7": "Byrne prend du matériel. Fischer a une surprise en réserve.",
        "17...Be6!!": "Le coup célèbre. Fischer offre sa dame : si les Blancs la prennent, les pièces noires gagnent par la force avec les cavaliers et le fou.",
        "18.Bxb6": "Les Blancs prennent la dame, mais il est trop tard pour se défendre.",
        "19...Ne2+": "Une série d'échecs de cavalier commence. Le roi blanc fait la navette entre f1 et g1.",
        "23...axb6": "Fischer a sacrifié sa dame, mais ses tours, son fou et son cavalier sont tous actifs tandis que les pièces blanches sont immobilisées.",
        "41...Rc2#": "Échec et mat. La tour, les cavaliers et le fou noirs se sont parfaitement coordonnés."
      }
    },
    "fischer-spassky-1972-g6": {
      title: "Fischer contre Spassky, partie 6",
      white: "Bobby Fischer",
      black: "Boris Spassky",
      event: "Championnat du monde, Reykjavik",
      opening: "Gambit dame refusé",
      intro: "Dans cette célèbre partie, Fischer ouvrit par 1.c4, un coup qu'il n'avait presque jamais joué. Elle est considérée comme l'une des mieux jouées de l'histoire des championnats du monde, si fluide que Spassky applaudit son adversaire.",
      lesson: "Un plan clair bat un plan spectaculaire. Fischer améliora sa position pas à pas, puis fit sauter le centre de l'échiquier exactement au bon moment.",
      story: [
        "Le championnat du monde de 1972 à Reykjavik, en Islande, opposa l'Américain Bobby Fischer au champion soviétique Boris Spassky au plus fort de la guerre froide. Ce fut le match d'échecs le plus médiatisé de l'histoire.",
        "Fischer avait perdu la première partie et perdu la deuxième par forfait, puis gagné la partie 3 et fait match nul dans d'autres. Dans la partie 6, il surprit Spassky en ouvrant par 1.c4 au lieu de son habituel 1.e4, une ouverture qu'il avait presque jamais jouée.",
        "Fischer gagna la partie par un jeu tranquille et puissant, et l'on raconte que Spassky l'applaudit à la fin. Fischer remporta le match 12,5 à 8,5 et devint le 11e champion du monde, mettant fin à une longue période de domination soviétique."
      ],
      comments: {
        "1.c4": "L'ouverture anglaise. Fischer a surpris le monde : jusqu'à cette partie, il jouait presque toujours 1.e4.",
        "3.d4": "Les Blancs transposent dans un gambit dame refusé, une structure bien connue.",
        "9.Bxe7": "Un échange classique des fous de cases noires. Les Blancs veulent une emprise positionnelle durable.",
        "10.Nxd5": "Les Blancs simplifient et laissent aux Noirs un pion isolé en d5.",
        "12.Qa4": "La dame fait pression sur la colonne c et surveille les points faibles.",
        "16.O-O": "Les Blancs roquent et gardent tout coordonné.",
        "19.Nxe6": "Un échange qui fixe la structure de pions noire et affaiblit le pion d5-d4.",
        "20.e4": "Les Blancs frappent au centre, verrouillant la position.",
        "22.e5": "Les Blancs gagnent de l'espace et attaquent. Les pièces noires ont peu à faire.",
        "26.f5!": "La percée. Fischer ouvre la colonne f pour ses tours.",
        "31.e6!": "La poussée de pion décisive. Elle fend la défense noire et gagne du matériel.",
        "41.Qf4": "Les Noirs abandonnent. C'est un parfait exemple de domination stratégique."
      }
    },
    "kasparov-topalov-1999": {
      title: "L'Immortelle de Kasparov",
      white: "Garry Kasparov",
      black: "Veselin Topalov",
      event: "Hoogovens, Wijk aan Zee",
      opening: "Défense Pirc",
      intro: "Beaucoup la considèrent comme la plus grande partie d'attaque de l'ère moderne. Kasparov, alors numéro un mondial, lance au 24e coup un sacrifice de tour qui mène le roi noir dans une longue marche à travers tout l'échiquier.",
      lesson: "Quand le roi adverse n'a aucun abri sûr et que vous avez des pièces plus actives, un sacrifice peut créer une attaque décisive qu'on ne peut arrêter.",
      story: [
        "En janvier 1999, le tournoi Hoogovens de Wijk aan Zee, aux Pays-Bas, réunit Garry Kasparov et le jeune Bulgare Veselin Topalov. Topalov allait remporter le championnat du monde de la FIDE en 2005.",
        "Kasparov bâtit une position solide avec les Blancs puis joua 24.Rxd4!!, un sacrifice de tour qui exposa le roi noir à une longue attaque forcée. La calculer entièrement à l'échiquier était extraordinaire.",
        "Kasparov lui-même la jugeait parmi ses meilleures parties, et elle est régulièrement élue parmi les plus grandes parties jamais jouées. Sa principale leçon : un roi à découvert peut être traqué par des pièces venues de toutes parts."
      ],
      comments: {
        "1.e4": "Kasparov ouvre du pion roi, et Topalov répond par la défense Pirc.",
        "4.Be3": "Les Blancs adoptent l'attaque des 150 avec Be3, Qd2 et Bh6, visant l'aile roi noire.",
        "8.Bh6": "Les Blancs échangent le puissant fou noir pour affaiblir les cases noires autour du roi.",
        "11.O-O-O": "Les Blancs font le grand roque. Les deux rois seront bientôt en danger.",
        "13...O-O-O": "Les Noirs font aussi le grand roque, ce qui se révèle risqué.",
        "17...Kb8": "Les Noirs tentent d'améliorer leur roi, mais il n'est toujours pas en sécurité.",
        "18.Na5!": "Un puissant saut de cavalier qui attaque l'abri du roi et le fou b7.",
        "20.Qf4+": "La dame donne échec et force le roi en a7, où il sera traqué jusqu'à la fin de la partie.",
        "22.Nd5!!": "Un sacrifice profond. Si les Noirs prennent, les tours blanches accèdent à la colonne d ouverte.",
        "24.Rxd4!!": "Le grand sacrifice. La tour va en d4 et lance une combinaison qui envoie le roi noir à découvert.",
        "25.Re7+": "Un échec de tour pousse le roi vers l'avant, dans l'attaque.",
        "26.Qxd4+": "La dame rejoint la chasse.",
        "29.Ra7": "La tour menace de mat et retire le dernier défenseur noir.",
        "36.Bf1!": "Un coup tranquille qui décide la partie. Il menace de mat et éteint tout le jeu de contre-attaque noir.",
        "39.Qxh8": "Les Blancs gagnent une tour alors que le roi noir est coincé loin de ses pièces.",
        "44.Qa7": "Les Noirs abandonnent. La chasse au roi de Kasparov est terminée."
      }
    }
  },
  collections: {
    "traps": { title: "Mats rapides et pièges", blurb: "Des parties courtes qui finissent vite. Parfaites pour apprendre ce qu'il faut surveiller." },
    "romantic": { title: "L'ère romantique", blurb: "Quand les échecs étaient un duel d'attaques audacieuses et de sacrifices spectaculaires." },
    "queen-sacs": { title: "Sacrifices de dame", blurb: "Abandonner la pièce la plus puissante pour gagner la partie." },
    "champions": { title: "Champions du monde", blurb: "Des parties de Fischer et de Kasparov, deux des plus grands joueurs de tous les temps." },
    "brilliancies": { title: "Parties brillantes", blurb: "Des parties restées célèbres pour la beauté de leurs combinaisons." }
  },
  legends: {
    "Paul Morphy": { years: "1837-1884", from: "La Nouvelle-Orléans, États-Unis", line: "Le prodige de La Nouvelle-Orléans", bio: "Un jeune Américain qui traversa l'Atlantique en 1858 et battit les meilleurs joueurs d'Europe, dont Adolf Anderssen. Il enseigna au monde à développer vite et à ouvrir des lignes, puis quitta les échecs de compétition et reprit sa carrière d'avocat." },
    "Adolf Anderssen": { years: "1818-1879", from: "Breslau, Allemagne", line: "Le maître du sacrifice", bio: "Un professeur de mathématiques qui remporta le premier tournoi international à Londres en 1851. Ses parties d'attaque, l'Immortelle et la Toujours verte, sont les symboles de l'ère romantique." },
    "Edward Lasker": { years: "1885-1981", from: "Allemagne et États-Unis", line: "Ingénieur, maître et joueur de go", bio: "Un ingénieur américain d'origine allemande qui atteignit le niveau de maître aux échecs et était aussi un joueur passionné de go. Il n'avait aucun lien de parenté avec le champion du monde Emanuel Lasker." },
    "Akiba Rubinstein": { years: "1880-1961", from: "Pologne", line: "L'un des plus grands à n'avoir jamais été champion", bio: "Un génie des finales de tours et l'un des plus forts joueurs du début du XXe siècle, dont le chef-d'œuvre d'attaque contre Rotlewi est appelé l'Immortelle de Łódź." },
    "Savielly Tartakower": { years: "1887-1956", from: "Pologne et France", line: "L'esprit du monde des échecs", bio: "Un grand maître, écrivain et maître de la repartie. Il joua des centaines de tournois et laissa des maximes que les joueurs d'échecs répètent encore." },
    "Richard Réti": { years: "1889-1929", from: "Tchécoslovaquie et Autriche", line: "Chef de file de l'école hypermoderne", bio: "Un maître fort et un écrivain qui prônait de contrôler le centre à distance avec les pièces plutôt que de l'occuper avec des pions. L'ouverture Réti porte son nom." },
    "Bobby Fischer": { years: "1943-2008", from: "Chicago, États-Unis", line: "Le 11e champion du monde", bio: "Un prodige devenu grand maître à 15 ans, qui battit Boris Spassky en 1972 pour devenir champion du monde. Il fit des échecs un phénomène mondial." },
    "Boris Spassky": { years: "né en 1937", from: "Léningrad, URSS", line: "Le 10e champion du monde", bio: "Un joueur universel qui détint le titre de champion du monde de 1969 à 1972, et qui le perdit de façon célèbre face à Bobby Fischer à Reykjavik." },
    "Garry Kasparov": { years: "né en 1963", from: "Bakou, URSS", line: "Champion du monde 1985-2000", bio: "Champion du monde à 22 ans et joueur le mieux classé au monde pendant presque vingt ans. Il perdit un match historique contre le Deep Blue d'IBM en 1997." },
    "Veselin Topalov": { years: "né en 1975", from: "Bulgarie", line: "Champion du monde FIDE 2005", bio: "Un grand maître bulgare combatif et tactique, qui atteignit le sommet du jeu et fut l'adversaire de la célèbre attaque de Kasparov en 1999." },
    "Deep Blue": { years: "1997", from: "IBM", line: "La machine qui a battu un champion", bio: "Un superordinateur spécialisé aux échecs construit par IBM. En 1997, il devint le premier ordinateur à battre un champion du monde en titre dans un match en conditions de tournoi." }
  }
};
