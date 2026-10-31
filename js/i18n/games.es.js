// Biblioteca de partidas famosas en español latinoamericano neutro.
// Las claves de los comentarios son idénticas a las del archivo en inglés.

export default {
  games: {
    'fools-mate': {
      title: "El mate del loco",
      white: "El Blanco Desafortunado", black: "El Negro Afortunado",
      event: "La partida más corta posible",
      opening: "Mate del loco (1.f3 e5 2.g4)",
      intro: "El jaque mate más rápido del ajedrez: solo dos jugadas de las negras. Únicamente ocurre si las blancas hacen las dos peores jugadas del tablero, pero muestra por qué nunca debes abrir la diagonal de tu propio rey.",
      lesson: "Cada jugada cambia qué casillas alrededor de tu rey son seguras. Antes de mover un peón delante de tu rey, pregúntate qué diagonal o columna abre.",
      story: [
        "El mate del loco es el jaque mate más corto posible en una partida donde ambos bandos hacen jugadas legales. Como necesita que las blancas colaboren por completo, casi nunca sucede en partidas reales, pero se usa desde hace siglos para mostrar a los principiantes lo frágil que puede ser un rey.",
        "La clave es la diagonal debilitada e1-h4. Después de 1.f3 y 2.g4, nada protege al rey de la dama que llega a h4.",
        "La versión de las negras, con los papeles invertidos, es un poco más larga y se llama el mate del pastor. Ambas enseñan la misma idea: protege a tu rey y presta atención a las diagonales largas."
      ],
      comments: {
        '1.f3': "El primer error. Esta jugada de peón bloquea la mejor casilla del caballo y abre la diagonal hacia el rey.",
        '2.g4': "El segundo error, fatal. Ahora la diagonal de h4 a e1 está completamente abierta.",
        '2...Qh4#': "Jaque mate en dos jugadas. El rey no puede moverse, no puede capturar la dama y ninguna pieza puede bloquear."
      }
    },
    'scholars-mate': {
      title: "El mate del pastor",
      white: "El Ataque Rápido", black: "El Defensor Descuidado",
      event: "Trampa clásica para principiantes",
      opening: "Ataque a f7 al estilo italiano",
      intro: "El jaque mate más rápido que la mayoría de los jugadores llega a ver. Solo funciona cuando las negras ignoran la amenaza sobre f7, pero aprender a detenerlo enseña dos grandes lecciones: protege tu casilla más débil y no saques la dama sola demasiado pronto.",
      lesson: "Defiende f7 con ...g6, ...Qe7 o ...Nh6 y el ataque se desinfla. Si tú mismo usas el truco, recuerda que un buen rival castigará una dama que sale temprano.",
      story: [
        "Casi todo jugador de ajedrez cae en el mate del pastor, o lo intenta, en sus primeras semanas. Se llama así porque es el tipo de trampa que los escolares (los «scholars») se hacen entre sí.",
        "La idea es sencilla: al comienzo, el peón de f7 está protegido solo por el rey. El alfil y la dama apuntan ahí, y si las negras no lo notan, la partida termina en cuatro jugadas.",
        "Los jugadores fuertes lo ven más como una advertencia que como un arma. Aun cuando no funciona, una dama que sale temprano puede ser perseguida, así que úsalo para aprender el patrón y luego pasa al desarrollo de verdad."
      ],
      comments: {
        '1.e4': "Las blancas toman el centro y abren líneas para el alfil y la dama.",
        '2.Bc4': "El alfil apunta a f7. Al inicio, f7 está protegida solo por el rey, lo que la convierte en el punto más débil del campo negro.",
        '3.Qh5': "La dama entra en acción. Ataca el peón de e5 y, junto con el alfil, amenaza Qxf7 jaque mate.",
        '3...Nf6': "Las negras atacan la dama, lo cual parece natural, pero ignoran la amenaza real. ...g6 habría expulsado a la dama sin riesgo.",
        '4.Qxf7#': "Jaque mate. La dama está protegida por el alfil y el rey no tiene casillas de escape."
      }
    },
    'legal-mate': {
      title: "El mate de Légal",
      white: "Sire de Légal", black: "Saint Brie",
      event: "París (tradicional)",
      opening: "Partida italiana, estructura al estilo Philidor",
      intro: "Una de las trampas más antiguas y bonitas del ajedrez: las blancas entregan la dama para que tres piezas menores den el jaque mate. La idea funciona siempre que las negras capturan la dama sin cuidado con un caballo clavado.",
      lesson: "Antes de capturar una pieza grande, pregúntate por qué el rival lo permitió. Una dama gratis suele ser una trampa.",
      story: [
        "La trampa lleva el nombre de Sire de Légal, un maestro parisino del siglo XVIII que, según se dice, enseñó al gran François-André Danican Philidor. Se la considera uno de los primeros sacrificios de dama famosos de la historia del ajedrez.",
        "El montaje es sutil. El alfil negro clava el caballo blanco contra la dama, y las negras creen que ganarán material. Las blancas simplemente ignoran la clavada.",
        "La posición final, con un caballo y un alfil dando el mate y las propias piezas negras bloqueando al rey, es un modelo de jaque mate «ahogado» que todo principiante debería conocer."
      ],
      comments: {
        '3...Bg4': "Las negras clavan el caballo de f3 contra la dama blanca. Parece fuerte, pero quita un defensor del centro.",
        '4...g6': "Un error. Las negras debieron ocuparse primero del caballo de c3 y del peón suelto de e5.",
        '5.Nxe5!': "La sorpresa. Las blancas ignoran la clavada y ofrecen la dama. Si las negras la toman, la trampa se cierra.",
        '5...Bxd1': "Las negras toman la dama y caen en la trampa.",
        '6.Bxf7+': "El alfil da jaque al rey y lo obliga a moverse a e7.",
        '7.Nd5#': "Jaque mate con caballo y alfil, y con las propias piezas negras bloqueando la huida. Dos piezas menores y un caballo en e5 es todo lo que hace falta."
      }
    },
    'gibaud-lazard-1924': {
      title: "Gibaud vs Lazard",
      white: "Gibaud", black: "Lazard",
      event: "París",
      opening: "Peón de dama, gambito al estilo Englund",
      intro: "Una miniatura de seis jugadas en la que las negras ganan con un espectacular sacrificio de caballo seguido de un rápido mate de dama. Es un ejemplo favorito de cómo una captura codiciosa de un peón puede perder la partida al instante.",
      lesson: "Cuando un rival ofrece una pieza, revisa primero todas las líneas forzadas. Aquí, la captura en e3 obligó al peón blanco a abrir la diagonal del rey.",
      story: [
        "Esta corta partida de un evento en París en 1924 es una de las miniaturas más conocidas con un final de sacrificio. Se usa mucho para enseñar porque toda la combinación cabe en pocas jugadas.",
        "Las blancas capturan un peón e intentan echar al caballo con la natural h3. Ese es el error.",
        "El sacrificio de caballo de las negras en e3 obliga a las blancas a recapturar con el peón f, lo que abre la diagonal e1-h4 y permite que la dama dé mate en g3."
      ],
      comments: {
        '2...e5': "Un gambito. Las negras ofrecen un peón para lograr rápida actividad de piezas y posibilidades contra el rey.",
        '3.dxe5': "Las blancas aceptan el peón, pero aquí empieza el peligro.",
        '3...Ng4': "El caballo ataca e5 y vigila las casillas f2 y e3 cerca del rey blanco.",
        '4.h3?': "Una jugada de apariencia natural que ataca al caballo, pero cae en una trampa. Ngf3 era más seguro.",
        '4...Ne3!!': "El brillante sacrificio. Si las blancas toman el caballo, el peón f deja la diagonal del rey.",
        '5.fxe3': "Las blancas capturan. Ahora la diagonal e1-h4 está abierta para la dama negra.",
        '5...Qh4+': "Jaque. Las blancas no pueden bloquear con el peón e ni con el peón f.",
        '6.g3': "La única forma de bloquear, pero el peón no está suficientemente protegido.",
        '6...Qxg3#': "Jaque mate. La dama toma el peón con jaque y el rey no tiene escapatoria."
      }
    },
    'tartakower-reti-1910': {
      title: "Tartakower vs Réti",
      white: "Savielly Tartakower", black: "Richard Réti",
      event: "Viena",
      opening: "Defensa Caro-Kann",
      intro: "Una miniatura de 11 jugadas famosa por un sacrificio de dama y un jaque doble. El rey negro es llevado a una posición donde dos piezas menores dan el jaque mate.",
      lesson: "Las capturas codiciosas pueden perder ante una secuencia forzada. Aquí las negras tomaron un caballo gratis y no vieron el sacrificio de dama que sigue.",
      story: [
        "Savielly Tartakower y Richard Réti fueron dos de los maestros más destacados de principios del siglo XX. Ambos ayudarían a dar forma al ajedrez moderno, Tartakower con su ingenio y Réti con las ideas hipermodernas que promovió.",
        "En esta partida de Viena, Réti jugó la Defensa Caro-Kann pero eligió un plan arriesgado que abrió el centro demasiado pronto.",
        "Tartakower lo castigó con un ingenioso sacrificio de dama en d8, seguido de un jaque doble que dejó al rey con una sola jugada. Se convirtió en un ejemplo clásico de una combinación que todo jugador debería reconocer."
      ],
      comments: {
        '1...c6': "La Defensa Caro-Kann, una elección sólida que prepara ...d5.",
        '5.Qd3': "Las blancas desarrollan la dama y vigilan el cambio del caballo de e4. Esta jugada de dama también prepara trucos posteriores.",
        '5...e5?!': "Una ruptura arriesgada. Abre el centro cuando las negras aún no han terminado de desarrollarse.",
        '6.dxe5': "Las blancas abren la columna d. La dama negra tendrá que dar jaque y luego tomar en e5.",
        '8.O-O-O': "Las blancas enrocan largo, colocando una torre en la columna d abierta y creando una amenaza oculta.",
        '8...Nxe4': "La captura codiciosa. Parece que las negras ganan una pieza, pero pierden por la fuerza.",
        '9.Qd8+!!': "El sacrificio de dama. El rey debe tomar, y la columna d queda abierta para la torre y el alfil.",
        '10.Bg5+': "Un jaque doble del alfil y la torre. El rey solo puede ir a c7.",
        '11.Bd8#': "Jaque mate. El alfil en d8 está protegido por la torre, y las propias piezas negras bloquean la huida."
      }
    },
    'opera-game': {
      title: "La Partida de la Ópera",
      white: "Paul Morphy", black: "Duque de Brunswick y conde Isouard",
      event: "Ópera de París",
      opening: "Defensa Philidor",
      intro: "Jugada durante una función en la Ópera de París. Morphy, el mejor jugador de su época, da una lección perfecta: desarrolla rápido, lucha por el centro y abre líneas cuando el rey enemigo todavía no ha enrocado. A menudo es la primera partida famosa que estudia un alumno.",
      lesson: "Cada jugada de Morphy desarrolla una pieza o crea una amenaza. Cuando sus rivales se retrasaban en el desarrollo, sacrificaba material para castigarlos.",
      story: [
        "En 1858 el joven estadounidense Paul Morphy estaba en París y había vencido a los mejores jugadores de Europa. Cuenta la historia que el duque de Brunswick y el conde Isouard lo invitaron a la ópera, y que jugaron juntos como aliados contra él en un palco privado durante una función de Norma, de Bellini.",
        "Se dice que a Morphy le molestó su juego lento y que prestaban más atención a la ópera que a la partida. Jugó rápido y con propósito, y el duque y el conde no pudieron seguirle el ritmo.",
        "Hoy la partida es la introducción estándar a la estrategia del ajedrez: desarrollar con amenazas, abrir el centro y sacrificar cuando el rey rival está atrapado. Casi todos los libros de ajedrez empiezan con ella."
      ],
      comments: {
        '2...d6': "La Defensa Philidor. Es sólida pero pasiva, y encierra las propias piezas de las negras.",
        '3.d4': "Morphy desafía el centro de inmediato y prepara la apertura de la posición.",
        '3...Bg4': "Las negras clavan el caballo, pero desarrollar el alfil de esta manera cuesta tiempo.",
        '5.Qxf3': "Tras el cambio, la dama blanca sale con un propósito: apunta a f7 y b7.",
        '6.Bc4': "La dama y el alfil presionan ahora f7. Morphy construye amenazas con cada jugada.",
        '7.Qb3': "Doble ataque a f7 y b7. Las negras solo pueden salvar fácilmente una de las dos.",
        '7...Qe7': "Las negras defienden f7 y ofrecen entregar el peón de b7.",
        '8.Nc3': "Morphy rechaza el peón. Tomar b7 permitiría a las negras cambiar damas y relajarse. En cambio, sigue desarrollando.",
        '9.Bg5': "Una clavada: si el caballo de f6 se mueve, la dama de e7 queda atacada.",
        '10.Nxb5!': "El primer sacrificio. El caballo abre líneas contra el rey negro y la columna b.",
        '11.Bxb5+': "El alfil da jaque, y las piezas negras quedan inmovilizadas.",
        '12.O-O-O': "El enroque trae a la última pieza, la torre de a1, al ataque con el rey a salvo en c1.",
        '13.Rxd7!': "Un sacrificio de torre para eliminar al defensor del caballo clavado.",
        '16.Qb8+!!': "El famoso sacrificio de dama. Las negras deben capturar con el caballo, lo que abre d8 para el golpe final.",
        '17.Rd8#': "Jaque mate. La da la torre, protegida por el alfil de g5."
      }
    },
    'lasker-thomas-1912': {
      title: "Lasker vs Thomas",
      white: "Edward Lasker", black: "Sir George Thomas",
      event: "Londres",
      opening: "Defensa holandesa",
      intro: "Una de las partidas de ataque más famosas de todos los tiempos. Las blancas sacrifican la dama en h7 y luego persiguen al rey negro por todo el tablero hasta el jaque mate en d2.",
      lesson: "La dama vale más que cualquier otra pieza, pero no más que un mate forzado. Busca jaques forzados cuando el rey tiene pocos defensores.",
      story: [
        "Edward Lasker, un ingeniero germano-estadounidense y buen jugador de Go, no tenía parentesco con el campeón mundial Emanuel Lasker. Su rival, Sir George Thomas, era un baronet inglés que también sobresalía en bádminton y tenis.",
        "Thomas eligió la Defensa holandesa y debilitó su propio flanco de rey con sus jugadas de peón. Lasker estaba preparado.",
        "Tras el sacrificio de dama en h7, el rey negro camina desde h7 hasta g1, acosado por jaques en cada paso. La partida es una favorita de los escritores de ajedrez precisamente por esa imagen: un rey perseguido por todo el tablero."
      ],
      comments: {
        '2...f5': "La Defensa holandesa. Lucha por e4 pero debilita la posición del rey negro.",
        '5.Bxf6': "Las blancas cambian el caballo y eliminan a un defensor clave del flanco de rey.",
        '8.Ne5': "Un poderoso caballo central. Apoya el ataque a h7 y g6.",
        '10.Qh5': "La dama se une al ataque y vigila h7, con el caballo y el alfil ya apuntando ahí.",
        '11.Qxh7+!!': "El legendario sacrificio de dama. El rey negro es sacado de su refugio.",
        '12.Nxf6+': "El caballo toma con jaque y obliga al rey a ir a h6.",
        '14.h4+': "El peón se une a la cacería. Al rey no le quedan casillas seguras.",
        '16.Be2+': "El alfil da jaque al rey en f3 y lo obliga a ir a g2.",
        '17.Rh2+': "La torre añade otro jaque. El rey negro tiene que ir a g1.",
        '18.Kd2#': "Una jugada de rey de aspecto tranquilo que da jaque mate: descubre un jaque de la torre a lo largo de la primera fila, y el rey negro no tiene escapatoria."
      }
    },
    'rotlewi-rubinstein-1907': {
      title: "La Inmortal de Rubinstein",
      white: "Georg Rotlewi", black: "Akiba Rubinstein",
      event: "Łódź",
      opening: "Gambito de dama (al estilo Tarrasch)",
      intro: "Conocida como la Inmortal de Rubinstein. Las negras entregan una dama, una torre y luego otra torre, y ganan con una tranquila jugada de torre que decide la partida en el acto.",
      lesson: "No hace falta conservar las piezas a toda costa. Si su actividad es abrumadora, incluso los grandes sacrificios pueden dejar indefenso al rival.",
      story: [
        "Akiba Rubinstein fue uno de los jugadores más fuertes del mundo a principios del siglo XX, un genio de los finales de torres que nunca consiguió un match por el título mundial. Esta partida de Łódź en 1907 suele elegirse como su mejor actuación de ataque.",
        "Rotlewi jugó agresivamente contra el planteamiento de Rubinstein, pero este estaba preparado con una asombrosa serie de sacrificios.",
        "La idea clave es el sacrificio de torre en c3, seguido de un salto de torre a d2. La dama blanca no tiene buena casilla y las blancas terminan enfrentando amenazas de mate con material de menos."
      ],
      comments: {
        '6.dxc5': "Las blancas ganan el peón pero dan a los alfiles negros casillas activas y tiempo para desarrollarse.",
        '8.b4': "Las blancas intentan echar al alfil, pero debilitan el flanco de dama.",
        '12...b5': "Las negras ganan espacio y echan al alfil. Sus piezas ya están listas para la acción.",
        '16...Bxe5': "Las negras recapturan con el alfil, que ahora vigila la diagonal a1-h8 y al rey blanco.",
        '19.e5': "Las blancas ganan espacio y cierran la diagonal del alfil, pero esto abre la diagonal a7-g1 hacia su propio rey.",
        '19...Bb6+': "Jaque. El alfil obliga al rey blanco a irse a la esquina.",
        '21...Qh4': "Una jugada tranquila pero mortal. La dama amenaza tomar en h2 y el caballo de g4 apoya el ataque.",
        '22...Rxc3!!': "El asombroso sacrificio de torre. Si las blancas toman, su rey queda expuesto a amenazas imparables.",
        '23...Rd2!!': "Otra jugada tranquila. La torre no puede ser capturada sin perder la dama por un ataque descubierto.",
        '24...Bxe4+': "El alfil captura con jaque, y la dama blanca debe bloquear en g2, donde quedará clavada.",
        '25...Rh3': "La torre no puede ser capturada porque la dama en g2 está clavada por el alfil. Las blancas se rindieron."
      }
    },
    'immortal-game': {
      title: "La Partida Inmortal",
      white: "Adolf Anderssen", black: "Lionel Kieseritzky",
      event: "Londres, partida informal",
      opening: "Gambito de rey aceptado",
      intro: "Jugada en Londres durante el primer torneo internacional, esta partida es el símbolo de la era romántica del ajedrez. Anderssen sacrifica un alfil, las dos torres y su dama, y luego da jaque mate con las tres piezas que le quedan.",
      lesson: "El material es solo un medio para un fin. Si tus piezas están más activas y el rey enemigo está expuesto, puedes entregar material para dar mate.",
      story: [
        "En 1851 Londres fue sede del primer torneo internacional de ajedrez, y Adolf Anderssen, un profesor de matemáticas de Breslavia, terminó ganándolo. Durante el evento jugó esta partida informal contra Lionel Kieseritzky, un jugador nacido en Estonia que vivía en París.",
        "Se dice que Kieseritzky se sentía orgulloso de la partida a pesar de haberla perdido, y se publicó en una revista de ajedrez de París. El nombre de «Partida Inmortal» se le dio después, en la década de 1850.",
        "Se convirtió en el ejemplo más celebrado del estilo romántico, que valoraba la brillantez en el ataque y el sacrificio por encima del juego cauteloso. Las computadoras modernas dicen que las negras desaprovecharon buenas oportunidades, pero la belleza del final no se ha desvanecido."
      ],
      comments: {
        '2.f4': "El Gambito de rey. Las blancas ofrecen un peón a cambio de desarrollo rápido y una columna f abierta, una apertura muy popular en el siglo XIX.",
        '3...Qh4+': "La dama negra da jaque y obliga a las blancas a perder el derecho a enrocar.",
        '4.Kf1': "Las blancas aceptan perder el derecho a enrocar y confían en la actividad de sus piezas.",
        '4...b5': "Un contragambito. Las negras ofrecen un peón para alejar al alfil de c4.",
        '10.g4': "Anderssen sigue atacando con peones en lugar de retroceder, una decisión extremadamente audaz.",
        '11.Rg1!?': "En lugar de salvar su alfil, las blancas abren la columna g. Ambos bandos corren hacia el rey contrario.",
        '17.Nd5': "Un poderoso caballo central. Amenaza a la dama negra y prepara las ideas de Nxg7+ y Qf6.",
        '17...Qxb2': "Codicioso. Las negras toman un peón y envían la dama lejos de su propio rey.",
        '18.Bd6!': "La hermosa jugada de alfil. Aísla a la dama negra de la defensa y prepara el ataque final.",
        '19.e5!': "Otra jugada tranquila. Las blancas ignoran la torre colgada en g1 y estrechan la red.",
        '20.Ke2': "El rey blanco se aparta. Las negras tienen una dama y una torre de más pero no pueden detener el ataque.",
        '21.Nxg7+': "El jaque del caballo arrastra al rey hasta d8.",
        '22.Qf6+!!': "El inmortal sacrificio de dama. El caballo negro debe tomar, cerrando la salida del rey.",
        '23.Be7#': "Jaque mate, con solo un alfil y dos caballos. Las blancas han entregado la dama y las dos torres."
      }
    },
    'evergreen-game': {
      title: "La Partida Siempreviva",
      white: "Adolf Anderssen", black: "Jean Dufresne",
      event: "Berlín, partida casual",
      opening: "Gambito Evans",
      intro: "Otra obra maestra de Anderssen. Recibe su nombre porque se mantiene fresca y emocionante. Las blancas abren con el Gambito Evans y luego juegan una de las combinaciones más profundas de la época.",
      lesson: "Sacrificar material por desarrollo funciona mejor cuando puedes abrir líneas hacia el rey. Cuenta tus atacantes y tus líneas abiertas antes de sacrificar.",
      story: [
        "Un año después de su triunfo en Londres, Anderssen jugó esta partida casual en Berlín contra Jean Dufresne, un joven maestro alemán. La partida se publicó y más tarde fue admirada por el primer campeón mundial oficial, Wilhelm Steinitz, quien le dio el nombre de Siempreviva.",
        "Las blancas abren con el Gambito Evans, dando un peón a cambio de un rápido desarrollo. El rey negro nunca llega a encontrar seguridad.",
        "La partida termina con una ráfaga de sacrificios, incluida la dama en d7, que deja a las negras frente a un jaque mate en el centro. A menudo se coloca junto a la Partida Inmortal como lo mejor de la era romántica."
      ],
      comments: {
        '4.b4': "El Gambito Evans. Las blancas ofrecen un peón para ganar tiempo y control del centro.",
        '6.d4': "Las blancas abren el centro y aprovechan el tiempo extra para atacar.",
        '7...d3': "Las negras empujan el peón a d3 para estrechar a las blancas. Las blancas lo recuperarán después con Bxd3.",
        '9.e5': "El peón e avanza, expulsando a la dama negra e impidiendo que las piezas negras se desarrollen.",
        '11.Ba3': "El alfil cubre e7 y mantiene al rey negro atrapado en el centro.",
        '17.Nf6+!': "El primer sacrificio. El jaque del caballo desarma el flanco de rey negro.",
        '18.exf6': "El peón en f6 aprisiona a las negras. Empiezan a acumularse amenazas de mate.",
        '19.Rad1': "Anderssen trae a su última pieza al juego e ignora el ataque a su dama.",
        '20.Rxe7+!': "Un sacrificio de torre para desviar al defensor.",
        '21.Qxd7+!!': "El sacrificio de dama. El rey es arrastrado a campo abierto.",
        '22.Bf5+': "El alfil empieza a perseguir al rey con jaque tras jaque.",
        '24.Bxe7#': "Jaque mate. Las blancas han sacrificado las dos torres y la dama y terminan con piezas menores."
      }
    },
    'deep-blue-kasparov-1997-g6': {
      title: "Deep Blue vs Kasparov, Partida 6",
      white: "Deep Blue (IBM)", black: "Garry Kasparov",
      event: "Revancha, Nueva York",
      opening: "Defensa Caro-Kann",
      intro: "La última partida de la revancha de 1997. Fue la primera vez que una computadora venció a un campeón mundial en ejercicio en un match con controles de tiempo estándar. Kasparov juega una línea arriesgada, se confunde con el orden de jugadas y cae ante un sacrificio de caballo.",
      lesson: "Conoce bien tu línea de apertura. Un solo orden de jugadas equivocado puede convertir una buena apertura en una derrota, incluso frente a una simple máquina.",
      story: [
        "En 1996 Garry Kasparov venció 4-2 a Deep Blue de IBM en Filadelfia, aunque la computadora ganó la primera partida. En 1997 una versión mejorada y más fuerte de Deep Blue llegó a Nueva York para una revancha.",
        "El match se decidió en la última partida, con el marcador empatado a 2,5 puntos. Kasparov eligió la Defensa Caro-Kann y jugó un orden de jugadas inusual que salió mal en la jugada 7.",
        "Deep Blue sacrificó un caballo en e6 y Kasparov se rindió tras solo 19 jugadas. Más tarde dijo que sentía que había algo inteligente detrás de las jugadas de la computadora. Sigue siendo uno de los momentos más comentados en la historia de la inteligencia artificial."
      ],
      comments: {
        '1...c6': "Kasparov elige la sólida Defensa Caro-Kann.",
        '5.Ng5': "Un intento de ataque conocido. El caballo apunta a f7 y e6.",
        '7...h6?': "Un error. La jugada correcta era 7...Bd6. Kasparov mezcló sus líneas.",
        '8.Nxe6!': "El sacrificio de caballo. Las blancas entregan una pieza para destrozar el rey negro.",
        '8...Qe7': "La dama negra se aparta. Cuando las blancas enroquen, las negras ganarán el caballo con ...fxe6, pero su rey queda atrapado en el centro.",
        '10.Bg6+': "El jaque del alfil lleva al rey a d8.",
        '14.Bg3': "Las blancas mantienen la presión mientras las piezas negras están atascadas.",
        '16.Qd3': "La dama pasa al ataque y prepara un sacrificio decisivo.",
        '17.Bf5': "Un último sacrificio de alfil para abrir líneas hacia el rey negro.",
        '18.Rxe7': "Las blancas ganan la dama y conservan una gran ventaja posicional.",
        '19.c4': "Kasparov se rindió. El match fue para Deep Blue, 3,5 a 2,5."
      }
    },
    'game-of-the-century': {
      title: "La Partida del Siglo",
      white: "Donald Byrne", black: "Bobby Fischer",
      event: "Memorial Rosenwald, Nueva York",
      opening: "Defensa Grünfeld",
      intro: "Bobby Fischer, de trece años, jugando con negras contra un Maestro Internacional, sacrifica su dama para construir un ataque devastador. Hans Kmoch la llamó la Partida del Siglo y volvió famoso a Fischer.",
      lesson: "Fischer vio que la dama era menos importante que la actividad de todas sus piezas restantes. A veces el cambio correcto es calidad por tiempo y posición.",
      story: [
        "En octubre de 1956, en el Marshall Chess Club de Nueva York, un Bobby Fischer de 13 años se sentó frente a Donald Byrne, un fuerte Maestro Internacional estadounidense. Pocos esperaban que el niño hiciera algo más que defenderse.",
        "Fischer dejó que su rival acumulara presión y entonces jugó el asombroso 17...Be6!, un ofrecimiento de su dama. Después de que las blancas la tomaron, una serie de jaques de caballo y una tranquila retirada de alfil dejaron las piezas blancas hechas un nudo.",
        "El escritor de ajedrez Hans Kmoch la llamó la Partida del Siglo. Fischer llegaría a ser el gran maestro más joven hasta ese momento, y en 1972 el campeón mundial."
      ],
      comments: {
        '4...O-O': "Fischer enroca hacia una estructura al estilo Grünfeld: piezas listas, alfil en fianchetto, presión sobre el centro.",
        '6.Qb3': "Las blancas atacan d5 y b7. Las negras toman el peón y desafían a la dama.",
        '10.Qc5': "La dama blanca sale de caza y pierde tiempo. Fischer aprovechará la falta de desarrollo.",
        '11...Na4!': "Un poderoso salto de caballo. Ataca a la dama y inicia una serie de jugadas forzadas.",
        '13...Nxe4!': "Fischer sacrifica una pieza para lanzar sus piezas contra el rey en el centro.",
        '14.Bxe7': "Byrne se lleva material. Fischer tiene una sorpresa preparada.",
        '17...Be6!!': "La famosa jugada. Fischer ofrece su dama: si las blancas la toman, las piezas negras ganan por la fuerza con caballos y alfil.",
        '18.Bxb6': "Las blancas toman la dama, pero ya es demasiado tarde para defenderse.",
        '19...Ne2+': "Comienza una serie de jaques de caballo. El rey blanco va y viene entre f1 y g1.",
        '23...axb6': "Fischer ha entregado su dama, pero sus torres, alfil y caballo están todos activos mientras las piezas blancas están inmovilizadas.",
        '41...Rc2#': "Jaque mate. La torre, los caballos y el alfil negros se han coordinado a la perfección."
      }
    },
    'fischer-spassky-1972-g6': {
      title: "Fischer vs Spassky, Partida 6",
      white: "Bobby Fischer", black: "Boris Spassky",
      event: "Campeonato Mundial, Reikiavik",
      opening: "Gambito de dama rehusado",
      intro: "En esta famosa partida Fischer abrió con 1.c4, algo que casi nunca había jugado. Se considera una de las partidas mejor jugadas en la historia de los Campeonatos Mundiales, tan fluida que Spassky aplaudió a su rival.",
      lesson: "Un plan claro vence a uno llamativo. Fischer mejoró su posición paso a paso y luego abrió el tablero en el centro justo en el momento correcto.",
      story: [
        "El Campeonato Mundial de 1972 en Reikiavik, Islandia, enfrentó al estadounidense Bobby Fischer con el campeón soviético Boris Spassky en pleno apogeo de la Guerra Fría. Fue el match de ajedrez más publicitado de la historia.",
        "Fischer había perdido la primera partida y no se presentó a la segunda, y luego ganó la partida 3 y empató otras. En la partida 6 sorprendió a Spassky abriendo con 1.c4 en lugar de su habitual 1.e4, una línea que casi nunca había jugado.",
        "Fischer ganó la partida con un juego tranquilo y poderoso, y cuenta la historia que Spassky lo aplaudió al final. Fischer ganó el match 12,5 a 8,5 y se convirtió en el 11.º campeón mundial, poniendo fin a un largo período de dominio soviético."
      ],
      comments: {
        '1.c4': "La Apertura Inglesa. Fischer sorprendió al mundo: hasta esta partida casi siempre jugaba 1.e4.",
        '3.d4': "Las blancas transponen a un Gambito de dama rehusado, una estructura muy conocida.",
        '9.Bxe7': "Un cambio habitual de los alfiles de casillas oscuras. Las blancas buscan una presión posicional duradera.",
        '10.Nxd5': "Las blancas simplifican y dejan a las negras con un peón aislado en d5.",
        '12.Qa4': "La dama presiona la columna c y vigila los puntos débiles.",
        '16.O-O': "Las blancas enrocan y mantienen todo coordinado.",
        '19.Nxe6': "Un cambio que fija la estructura de peones negra y debilita el peón d5-d4.",
        '20.e4': "Las blancas golpean en el centro, aprisionando la posición.",
        '22.e5': "Las blancas ganan espacio y atacan. Las piezas negras tienen poco que hacer.",
        '26.f5!': "La ruptura. Fischer abre la columna f para sus torres.",
        '31.e6!': "El empuje decisivo del peón. Divide la defensa negra y gana material.",
        '41.Qf4': "Las negras se rindieron. Es un ejemplo perfecto de dominio estratégico."
      }
    },
    'kasparov-topalov-1999': {
      title: "La Inmortal de Kasparov",
      white: "Garry Kasparov", black: "Veselin Topalov",
      event: "Hoogovens, Wijk aan Zee",
      opening: "Defensa Pirc",
      intro: "Muchos la consideran la mejor partida de ataque de la era moderna. Kasparov, entonces número uno del mundo, lanza un sacrificio de torre en la jugada 24 que lleva al rey negro en una larga caminata por todo el tablero.",
      lesson: "Cuando el rey rival no tiene un refugio seguro y tú tienes piezas más activas, un sacrificio puede crear un ataque decisivo que no se puede detener.",
      story: [
        "En enero de 1999 el torneo Hoogovens de Wijk aan Zee, en los Países Bajos, reunió a Garry Kasparov y al joven búlgaro Veselin Topalov. Topalov llegaría a ganar el Campeonato Mundial de la FIDE en 2005.",
        "Kasparov construyó una sólida posición con blancas y luego jugó 24.Rxd4!!, un sacrificio de torre que dejó al rey negro expuesto a un ataque largo y forzado. Calcularlo por completo en el tablero fue extraordinario.",
        "El propio Kasparov pensaba que era una de sus mejores partidas, y con regularidad se la elige entre las más grandes jamás jugadas. Su principal lección es que un rey a campo abierto puede ser cazado por piezas desde todos lados."
      ],
      comments: {
        '1.e4': "Kasparov abre con el peón de rey, y Topalov responde con la Defensa Pirc.",
        '4.Be3': "Las blancas montan el Ataque 150 con Be3, Qd2 y Bh6, apuntando al flanco de rey negro.",
        '8.Bh6': "Las blancas cambian el fuerte alfil negro para debilitar las casillas oscuras alrededor del rey.",
        '11.O-O-O': "Las blancas enrocan largo. Ambos reyes pronto estarán en peligro.",
        '13...O-O-O': "Las negras también enrocan por el flanco de dama, lo que resulta arriesgado.",
        '17...Kb8': "Las negras intentan mejorar su rey, pero sigue sin estar seguro.",
        '18.Na5!': "Un fuerte salto de caballo que ataca la cobertura del rey y el alfil de b7.",
        '20.Qf4+': "La dama da jaque y obliga al rey a ir a a7, donde será cazado durante el resto de la partida.",
        '22.Nd5!!': "Un sacrificio profundo. Si las negras toman, las torres blancas ganan acceso a la columna d abierta.",
        '24.Rxd4!!': "El gran sacrificio. La torre va a d4 e inicia una combinación que lanza al rey negro a campo abierto.",
        '25.Re7+': "Un jaque de torre obliga al rey a avanzar hacia el ataque.",
        '26.Qxd4+': "La dama se une a la cacería.",
        '29.Ra7': "La torre amenaza mate y elimina al último defensor negro.",
        '36.Bf1!': "Una jugada tranquila que decide la partida. Amenaza mate y anula todo el contrajuego negro.",
        '39.Qxh8': "Las blancas ganan una torre mientras el rey negro está atrapado lejos de sus piezas.",
        '44.Qa7': "Las negras se rinden. La cacería de rey de Kasparov está completa."
      }
    }
  },

  collections: {
    'traps': { title: "Mates rápidos y trampas", blurb: "Partidas cortas que terminan rápido. Perfectas para aprender de qué hay que cuidarse." },
    'romantic': { title: "La era romántica", blurb: "Cuando el ajedrez era un duelo de ataques audaces y sacrificios espectaculares." },
    'queen-sacs': { title: "Sacrificios de dama", blurb: "Entregar la pieza más poderosa para ganar la partida." },
    'champions': { title: "Campeones mundiales", blurb: "Partidas de Fischer y Kasparov, dos de los mejores jugadores de todos los tiempos." },
    'brilliancies': { title: "Obras brillantes", blurb: "Partidas recordadas por la belleza de sus combinaciones." }
  },

  legends: {
    'Paul Morphy': { years: "1837-1884", from: "Nueva Orleans, EE. UU.", line: "Niño prodigio de Nueva Orleans", bio: "Un joven estadounidense que cruzó el Atlántico en 1858 y venció a los mejores jugadores de Europa, incluido Adolf Anderssen. Enseñó al mundo a desarrollar rápido y a abrir líneas, y luego dejó el ajedrez de competición y volvió a su carrera de abogado." },
    'Adolf Anderssen': { years: "1818-1879", from: "Breslavia, Alemania", line: "El maestro del sacrificio", bio: "Un profesor de matemáticas que ganó el primer torneo internacional en Londres en 1851. Sus partidas de ataque, la Inmortal y la Siempreviva, son los símbolos de la era romántica." },
    'Edward Lasker': { years: "1885-1981", from: "Alemania y EE. UU.", line: "Ingeniero, maestro y jugador de Go", bio: "Un ingeniero estadounidense nacido en Alemania que alcanzó nivel de maestro en ajedrez y también fue un ávido jugador de Go. No tenía parentesco con el campeón mundial Emanuel Lasker." },
    'Akiba Rubinstein': { years: "1880-1961", from: "Polonia", line: "Uno de los más grandes que nunca fue campeón", bio: "Un genio de los finales de torres y uno de los jugadores más fuertes de principios del siglo XX, cuya obra maestra de ataque contra Rotlewi se conoce como la Inmortal de Łódź." },
    'Savielly Tartakower': { years: "1887-1956", from: "Polonia y Francia", line: "El ingenio del mundo del ajedrez", bio: "Un gran maestro, escritor y maestro de la frase ingeniosa. Jugó cientos de torneos y dejó dichos que los ajedrecistas todavía repiten." },
    'Richard Réti': { years: "1889-1929", from: "Checoslovaquia y Austria", line: "Líder de la escuela hipermoderna", bio: "Un fuerte maestro y escritor que promovió controlar el centro a distancia con las piezas en lugar de ocuparlo con peones. La Apertura Réti lleva su nombre." },
    'Bobby Fischer': { years: "1943-2008", from: "Chicago, EE. UU.", line: "El 11.º campeón mundial", bio: "Un prodigio que se hizo gran maestro a los 15 años y derrotó a Boris Spassky en 1972 para convertirse en campeón mundial. Convirtió el ajedrez en un fenómeno mundial." },
    'Boris Spassky': { years: "nacido en 1937", from: "Leningrado, URSS", line: "El 10.º campeón mundial", bio: "Un jugador universal que fue campeón mundial de 1969 a 1972 y que, como es bien sabido, perdió el título ante Bobby Fischer en Reikiavik." },
    'Garry Kasparov': { years: "nacido en 1963", from: "Bakú, URSS", line: "Campeón mundial 1985-2000", bio: "Campeón mundial a los 22 años y el jugador con mejor puntuación del mundo durante casi dos décadas. Perdió un match histórico contra Deep Blue de IBM en 1997." },
    'Veselin Topalov': { years: "nacido en 1975", from: "Bulgaria", line: "Campeón mundial de la FIDE 2005", bio: "Un gran maestro búlgaro combativo y táctico que llegó a lo más alto del juego y fue el rival de Kasparov en su famoso ataque de 1999." },
    'Deep Blue': { years: "1997", from: "IBM", line: "La máquina que venció a un campeón", bio: "Una supercomputadora especializada en ajedrez construida por IBM. En 1997 se convirtió en la primera computadora en vencer a un campeón mundial en ejercicio en un match en condiciones de torneo." }
  }
};
