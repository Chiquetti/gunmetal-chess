// Biblioteca de partidas famosas em português do Brasil.
// As chaves dos comentários são idênticas às do arquivo em inglês.

export default {
  games: {
    'fools-mate': {
      title: "Mate do Tolo",
      white: "O Branco Azarado", black: "O Preto Sortudo",
      event: "A partida mais curta possível",
      opening: "Mate do Tolo (1.f3 e5 2.g4)",
      intro: "O xeque-mate mais rápido do xadrez: apenas dois lances das Pretas. Só acontece se as Brancas fizerem os dois piores lances do tabuleiro, mas mostra por que você nunca deve abrir a diagonal do seu próprio rei.",
      lesson: "Cada lance muda quais casas ao redor do seu rei estão seguras. Antes de mover um peão na frente do rei, pergunte-se que diagonal ou coluna ele abre.",
      story: [
        "O Mate do Tolo é o xeque-mate mais curto possível em uma partida na qual os dois lados jogam lances legais. Como depende de as Brancas colaborarem por completo, quase nunca acontece em partidas de verdade, mas há séculos é usado para mostrar aos iniciantes como um rei pode ser frágil.",
        "A chave é a diagonal enfraquecida e1-h4. Depois de 1.f3 e 2.g4, nada protege o rei da dama que vem para h4.",
        "A versão das Pretas, com os papéis invertidos, é um pouco mais longa e se chama Mate do Pastor. Ambos ensinam a mesma ideia: proteja seu rei e preste atenção nas diagonais longas."
      ],
      comments: {
        '1.f3': "O primeiro erro. Esse lance de peão bloqueia a melhor casa do cavalo e abre a diagonal em direção ao rei.",
        '2.g4': "O segundo erro, fatal. Agora a diagonal de h4 até e1 está totalmente aberta.",
        '2...Qh4#': "Xeque-mate em dois lances. O rei não pode se mover, não pode capturar a dama e nenhuma peça pode bloquear."
      }
    },
    'scholars-mate': {
      title: "Mate do Pastor",
      white: "O Ataque Rápido", black: "O Defensor Descuidado",
      event: "Armadilha clássica de iniciantes",
      opening: "Ataque em f7 ao estilo da Abertura Italiana",
      intro: "O xeque-mate mais rápido que a maioria dos jogadores chega a ver. Só funciona quando as Pretas ignoram a ameaça em f7, mas aprender a evitá-lo ensina duas grandes lições: proteja sua casa mais fraca e não saia com a dama sozinha logo no começo.",
      lesson: "Defenda f7 com ...g6, ...Qe7 ou ...Nh6 e o ataque perde a força. Se você mesmo usar o truque, lembre-se de que um bom adversário vai punir uma dama que sai cedo demais.",
      story: [
        "Quase todo enxadrista cai no Mate do Pastor, ou tenta aplicá-lo, nas primeiras semanas de jogo. Ele tem esse nome por ser o tipo de armadilha que os colegiais (os \"scholars\") aplicam uns nos outros.",
        "A ideia é simples: no começo, o peão de f7 é protegido apenas pelo rei. Bispo e dama miram ali, e se as Pretas não perceberem, a partida termina em quatro lances.",
        "Os jogadores fortes o tratam mais como um aviso do que como uma arma. Mesmo quando não funciona, uma dama que sai cedo pode ser expulsa, então use-o para aprender o padrão e depois passe ao desenvolvimento de verdade."
      ],
      comments: {
        '1.e4': "As Brancas ocupam o centro e abrem linhas para o bispo e a dama.",
        '2.Bc4': "O bispo mira f7. No início, f7 é protegida só pelo rei, o que a torna o ponto mais fraco do campo preto.",
        '3.Qh5': "A dama entra em ação. Ela ataca o peão de e5 e, junto com o bispo, ameaça Qxf7, xeque-mate.",
        '3...Nf6': "As Pretas atacam a dama, o que parece natural, mas ignoram a ameaça real. ...g6 teria expulsado a dama com segurança.",
        '4.Qxf7#': "Xeque-mate. A dama está protegida pelo bispo e o rei não tem casas de fuga."
      }
    },
    'legal-mate': {
      title: "Mate de Légal",
      white: "Sire de Légal", black: "Saint Brie",
      event: "Paris (tradicional)",
      opening: "Partida Italiana, estrutura ao estilo Philidor",
      intro: "Uma das armadilhas mais antigas e bonitas do xadrez: as Brancas entregam a dama para que três peças menores deem o xeque-mate. A ideia funciona sempre que as Pretas capturam a dama de forma descuidada com um cavalo cravado.",
      lesson: "Antes de capturar uma peça grande, pergunte por que o adversário permitiu isso. Uma dama de graça costuma ser uma armadilha.",
      story: [
        "A armadilha leva o nome de Sire de Légal, um mestre parisiense do século XVIII que, segundo se diz, ensinou o grande François-André Danican Philidor. É considerada um dos primeiros sacrifícios de dama famosos da história do xadrez.",
        "O cenário é sutil. O bispo das Pretas crava o cavalo das Brancas contra a dama, e as Pretas pensam que vão ganhar material. As Brancas simplesmente ignoram a cravada.",
        "A posição final, com um cavalo e um bispo dando o mate e as próprias peças pretas bloqueando o rei, é um modelo de xeque-mate \"sufocado\" que todo iniciante deveria conhecer."
      ],
      comments: {
        '3...Bg4': "As Pretas cravam o cavalo de f3 contra a dama branca. Parece forte, mas tira um defensor do centro.",
        '4...g6': "Um erro. As Pretas deveriam ter cuidado primeiro do cavalo em c3 e do peão solto em e5.",
        '5.Nxe5!': "A surpresa. As Brancas ignoram a cravada e oferecem a dama. Se as Pretas a tomarem, a armadilha se fecha.",
        '5...Bxd1': "As Pretas tomam a dama e caem na armadilha.",
        '6.Bxf7+': "O bispo dá xeque e obriga o rei a ir para e7.",
        '7.Nd5#': "Xeque-mate com cavalo e bispo, e com as próprias peças pretas bloqueando a fuga. Duas peças menores e um cavalo em e5 são tudo o que é preciso."
      }
    },
    'gibaud-lazard-1924': {
      title: "Gibaud x Lazard",
      white: "Gibaud", black: "Lazard",
      event: "Paris",
      opening: "Peão da Dama, gambito ao estilo Englund",
      intro: "Uma miniatura de seis lances em que as Pretas vencem com um espetacular sacrifício de cavalo seguido de um rápido mate de dama. É um exemplo favorito de como pegar um peão por ganância pode perder a partida num instante.",
      lesson: "Quando o adversário oferece uma peça, verifique antes todas as linhas forçadas. Aqui, a captura em e3 obrigou o peão das Brancas a abrir a diagonal do rei.",
      story: [
        "Esta partida curta, disputada em um torneio de Paris em 1924, é uma das miniaturas mais conhecidas com final sacrificial. É muito usada no ensino porque toda a combinação cabe em poucos lances.",
        "As Brancas pegam um peão e tentam expulsar o cavalo com o h3, de aparência natural. Esse é o erro.",
        "O sacrifício de cavalo em e3 obriga as Brancas a recapturar com o peão f, o que abre a diagonal e1-h4 e permite que a dama dê o mate em g3."
      ],
      comments: {
        '2...e5': "Um gambito. As Pretas oferecem um peão para ganhar atividade rápida das peças e chances contra o rei.",
        '3.dxe5': "As Brancas aceitam o peão, mas é aqui que o perigo começa.",
        '3...Ng4': "O cavalo ataca e5 e vigia as casas f2 e e3 perto do rei branco.",
        '4.h3?': "Um lance de aparência natural que ataca o cavalo, mas cai numa armadilha. Ngf3 era mais seguro.",
        '4...Ne3!!': "O sacrifício brilhante. Se as Brancas tomarem o cavalo, o peão f sai da diagonal do rei.",
        '5.fxe3': "As Brancas capturam. Agora a diagonal e1-h4 está aberta para a dama preta.",
        '5...Qh4+': "Xeque. As Brancas não podem bloquear com o peão e nem com o peão f.",
        '6.g3': "A única forma de bloquear, mas o peão não está suficientemente protegido.",
        '6...Qxg3#': "Xeque-mate. A dama toma o peão com xeque e o rei não tem como escapar."
      }
    },
    'tartakower-reti-1910': {
      title: "Tartakower x Réti",
      white: "Savielly Tartakower", black: "Richard Réti",
      event: "Viena",
      opening: "Defesa Caro-Kann",
      intro: "Uma miniatura de 11 lances famosa por um sacrifício de dama e um xeque duplo. O rei preto é levado a uma posição em que duas peças menores dão o xeque-mate.",
      lesson: "Capturas gananciosas podem perder para uma sequência forçada. Aqui as Pretas tomaram um cavalo de graça e não viram o sacrifício de dama que vem a seguir.",
      story: [
        "Savielly Tartakower e Richard Réti foram dois dos grandes mestres do início do século XX. Ambos ajudariam a moldar o xadrez moderno, Tartakower com seu humor e Réti com as ideias hipermodernas que defendia.",
        "Nesta partida disputada em Viena, Réti jogou a Defesa Caro-Kann, mas escolheu um plano arriscado que abriu o centro cedo demais.",
        "Tartakower o puniu com um sacrifício de dama inteligente em d8, seguido de um xeque duplo que deixou o rei com um único lance. Tornou-se um exemplo clássico de combinação que todo jogador deve reconhecer."
      ],
      comments: {
        '1...c6': "A Defesa Caro-Kann, uma escolha sólida que prepara ...d5.",
        '5.Qd3': "As Brancas desenvolvem a dama e miram a troca do cavalo de e4. Esse lance de dama também prepara truques futuros.",
        '5...e5?!': "Uma quebra arriscada. Abre o centro enquanto as Pretas ainda não estão totalmente desenvolvidas.",
        '6.dxe5': "As Brancas abrem a coluna d. A dama preta terá de dar xeque e depois tomar em e5.",
        '8.O-O-O': "As Brancas rocam grande, colocando uma torre na coluna d aberta e criando uma ameaça escondida.",
        '8...Nxe4': "A captura gananciosa. Parece que as Pretas ganham uma peça, mas perdem à força.",
        '9.Qd8+!!': "O sacrifício de dama. O rei é obrigado a tomar, e a coluna d se abre para a torre e o bispo.",
        '10.Bg5+': "Um xeque duplo do bispo e da torre. O rei só pode ir para c7.",
        '11.Bd8#': "Xeque-mate. O bispo em d8 está protegido pela torre, e as próprias peças pretas bloqueiam a fuga."
      }
    },
    'opera-game': {
      title: "A Partida da Ópera",
      white: "Paul Morphy", black: "Duque de Brunswick e Conde Isouard",
      event: "Ópera de Paris",
      opening: "Defesa Philidor",
      intro: "Jogada durante uma apresentação na Ópera de Paris. Morphy, o maior jogador de sua época, dá uma lição perfeita: desenvolva-se rápido, lute pelo centro e abra linhas enquanto o rei inimigo ainda não rocou. Costuma ser a primeira partida famosa que um estudante analisa.",
      lesson: "Cada lance de Morphy desenvolve uma peça ou cria uma ameaça. Quando os adversários ficaram para trás no desenvolvimento, ele sacrificou material para puni-los.",
      story: [
        "Em 1858, o jovem americano Paul Morphy estava em Paris e já tinha vencido os melhores jogadores da Europa. Conta-se que foi convidado para a ópera pelo Duque de Brunswick e pelo Conde Isouard, que jogaram juntos, como aliados, contra ele, em um camarote privado durante uma apresentação de Norma, de Bellini.",
        "Dizem que Morphy se irritou com o jogo lento deles e com o fato de darem mais atenção à ópera do que à partida. Jogou depressa e com objetivo, e o Duque e o Conde não conseguiram acompanhar.",
        "A partida é hoje a introdução padrão à estratégia do xadrez: desenvolva-se com ameaças, abra o centro e sacrifique quando o rei do adversário estiver preso. Quase todo livro de xadrez começa com ela."
      ],
      comments: {
        '2...d6': "A Defesa Philidor. É sólida, mas passiva, e aprisiona as próprias peças pretas.",
        '3.d4': "Morphy desafia o centro de imediato e prepara a abertura da posição.",
        '3...Bg4': "As Pretas cravam o cavalo, mas desenvolver o bispo desse jeito custa tempo.",
        '5.Qxf3': "Depois da troca, a dama branca sai com um propósito: mira f7 e b7.",
        '6.Bc4': "Dama e bispo agora pressionam f7. Morphy cria ameaças a cada lance.",
        '7.Qb3': "Um ataque duplo a f7 e b7. As Pretas só conseguem salvar um deles com facilidade.",
        '7...Qe7': "As Pretas defendem f7 e se oferecem para entregar o peão de b7.",
        '8.Nc3': "Morphy recusa o peão. Tomar b7 permitiria às Pretas trocar as damas e respirar. Ele prefere continuar se desenvolvendo.",
        '9.Bg5': "Uma cravada: se o cavalo de f6 se mover, a dama em e7 fica atacada.",
        '10.Nxb5!': "O primeiro sacrifício. O cavalo abre linhas contra o rei preto e a coluna b.",
        '11.Bxb5+': "O bispo dá xeque, e as peças pretas ficam amarradas.",
        '12.O-O-O': "O roque traz a última peça, a torre de a1, para o ataque, com o rei seguro em c1.",
        '13.Rxd7!': "Um sacrifício de torre para eliminar o defensor do cavalo cravado.",
        '16.Qb8+!!': "O famoso sacrifício de dama. As Pretas têm de capturar com o cavalo, o que abre d8 para o golpe final.",
        '17.Rd8#': "Xeque-mate. A torre o aplica, protegida pelo bispo em g5."
      }
    },
    'lasker-thomas-1912': {
      title: "Lasker x Thomas",
      white: "Edward Lasker", black: "Sir George Thomas",
      event: "Londres",
      opening: "Defesa Holandesa",
      intro: "Uma das partidas de ataque mais famosas de todos os tempos. As Brancas sacrificam a dama em h7 e depois caçam o rei preto por todo o tabuleiro até o xeque-mate em d2.",
      lesson: "A dama vale mais do que qualquer outra peça, mas não mais do que um mate forçado. Procure xeques forçados quando o rei tem poucos defensores.",
      story: [
        "Edward Lasker, engenheiro teuto-americano e bom jogador de Go, não tinha parentesco com o Campeão Mundial Emanuel Lasker. Seu adversário, Sir George Thomas, era um baronete inglês que também se destacava no badminton e no tênis.",
        "Thomas escolheu a Defesa Holandesa e enfraqueceu o próprio flanco do rei com seus lances de peão. Lasker estava preparado.",
        "Depois do sacrifício de dama em h7, o rei preto caminha de h7 até g1, perseguido por xeques a cada passo. A partida é uma favorita dos escritores de xadrez justamente por esse quadro: um rei perseguido pelo tabuleiro inteiro."
      ],
      comments: {
        '2...f5': "A Defesa Holandesa. Luta por e4, mas enfraquece a posição do rei preto.",
        '5.Bxf6': "As Brancas trocam o cavalo, eliminando um defensor importante do flanco do rei.",
        '8.Ne5': "Um poderoso cavalo central. Apoia o ataque a h7 e g6.",
        '10.Qh5': "A dama se junta ao ataque e mira h7, onde o cavalo e o bispo já apontam.",
        '11.Qxh7+!!': "O lendário sacrifício de dama. O rei preto é arrancado de seu abrigo.",
        '12.Nxf6+': "O cavalo toma com xeque, obrigando o rei a ir para h6.",
        '14.h4+': "O peão entra na caçada. O rei não tem mais casas seguras.",
        '16.Be2+': "O bispo dá xeque no rei em f3 e o obriga a ir para g2.",
        '17.Rh2+': "A torre acrescenta outro xeque. O rei preto tem de ir para g1.",
        '18.Kd2#': "Um lance de rei de aparência tranquila que dá o xeque-mate: ele descobre um xeque da torre pela primeira fila, e o rei preto não tem como escapar."
      }
    },
    'rotlewi-rubinstein-1907': {
      title: "A Imortal de Rubinstein",
      white: "Georg Rotlewi", black: "Akiba Rubinstein",
      event: "Łódź",
      opening: "Gambito da Dama (estilo Tarrasch)",
      intro: "Conhecida como a Imortal de Rubinstein. As Pretas entregam uma dama, uma torre e depois outra torre, e vencem com um lance tranquilo de torre que decide a partida na hora.",
      lesson: "Não é preciso manter as peças a qualquer custo. Se a atividade delas é esmagadora, até grandes sacrifícios podem deixar o adversário indefeso.",
      story: [
        "Akiba Rubinstein foi um dos jogadores mais fortes do mundo no início do século XX, um gênio dos finais de torre que nunca disputou um match pelo título mundial. Esta partida de Łódź, em 1907, é frequentemente escolhida como sua melhor atuação de ataque.",
        "Rotlewi jogou de forma agressiva contra o esquema de Rubinstein, mas Rubinstein estava pronto com uma série espantosa de sacrifícios.",
        "A ideia central é o sacrifício de torre em c3, seguido de um salto da torre para d2. A dama branca não tem boa casa e as Brancas acabam enfrentando ameaças de mate estando em desvantagem material."
      ],
      comments: {
        '6.dxc5': "As Brancas ganham o peão, mas dão aos bispos pretos casas ativas e tempo para se desenvolver.",
        '8.b4': "As Brancas tentam expulsar o bispo, mas isso enfraquece o flanco da dama.",
        '12...b5': "As Pretas ganham espaço e expulsam o bispo. Suas peças agora estão prontas para a ação.",
        '16...Bxe5': "As Pretas recapturam com o bispo, que agora vigia a diagonal a1-h8 e o rei branco.",
        '19.e5': "As Brancas ganham espaço e fecham a diagonal do bispo, mas isso abre a diagonal a7-g1 para o próprio rei branco.",
        '19...Bb6+': "Xeque. O bispo obriga o rei branco a ir para o canto.",
        '21...Qh4': "Um lance tranquilo, mas mortal. A dama ameaça tomar em h2 e o cavalo em g4 apoia o ataque.",
        '22...Rxc3!!': "O impressionante sacrifício de torre. Se as Brancas tomarem, seu rei fica exposto a ameaças imparáveis.",
        '23...Rd2!!': "Outro lance tranquilo. A torre não pode ser capturada sem perder a dama num ataque descoberto.",
        '24...Bxe4+': "O bispo captura com xeque, e a dama branca tem de bloquear em g2, onde ficará cravada.",
        '25...Rh3': "A torre não pode ser capturada porque a dama em g2 está cravada pelo bispo. As Brancas abandonaram."
      }
    },
    'immortal-game': {
      title: "A Partida Imortal",
      white: "Adolf Anderssen", black: "Lionel Kieseritzky",
      event: "Londres, partida informal",
      opening: "Gambito do Rei Aceito",
      intro: "Jogada em Londres durante o primeiro torneio internacional, esta partida é o símbolo da era romântica do xadrez. Anderssen sacrifica um bispo, as duas torres e a dama, e depois dá o xeque-mate com as três peças que lhe restam.",
      lesson: "Material é só um meio para um fim. Se suas peças estão mais ativas e o rei inimigo está exposto, é possível abrir mão de material para dar o mate.",
      story: [
        "Em 1851, Londres sediou o primeiro torneio internacional de xadrez, e Adolf Anderssen, professor de matemática de Breslau, acabou vencendo-o. Durante o evento, ele disputou esta partida informal contra Lionel Kieseritzky, um jogador nascido na Estônia que vivia em Paris.",
        "Diz-se que Kieseritzky se orgulhava da partida, apesar de tê-la perdido, e ela foi publicada em uma revista de xadrez de Paris. O nome \"Partida Imortal\" foi dado mais tarde, na década de 1850.",
        "Tornou-se o exemplo mais celebrado do estilo romântico, que valorizava o brilho no ataque e o sacrifício em vez do jogo cauteloso. Os computadores modernos dizem que as Pretas perderam boas chances, mas a beleza do final não desbotou."
      ],
      comments: {
        '2.f4': "O Gambito do Rei. As Brancas oferecem um peão em troca de desenvolvimento rápido e uma coluna f aberta, uma abertura muito popular no século XIX.",
        '3...Qh4+': "A dama preta dá xeque e obriga as Brancas a perder o direito de rocar.",
        '4.Kf1': "As Brancas aceitam perder o direito ao roque e confiam na atividade das peças.",
        '4...b5': "Um contra-gambito. As Pretas oferecem um peão para tirar o bispo de c4.",
        '10.g4': "Anderssen continua atacando com peões em vez de recuar, uma escolha extremamente ousada.",
        '11.Rg1!?': "Em vez de salvar o bispo, as Brancas abrem a coluna g. Os dois lados correm em direção ao rei adversário.",
        '17.Nd5': "Um poderoso cavalo central. Ameaça a dama preta e prepara as ideias Nxg7+ e Qf6.",
        '17...Qxb2': "Ganancioso. As Pretas pegam um peão e mandam a dama para longe do próprio rei.",
        '18.Bd6!': "O belo lance de bispo. Isola a dama preta da defesa e prepara o ataque final.",
        '19.e5!': "Outro lance tranquilo. As Brancas ignoram a torre pendurada em g1 e apertam o cerco.",
        '20.Ke2': "O rei branco dá um passo ao lado. As Pretas têm uma dama e uma torre a mais, mas nenhum meio de deter o ataque.",
        '21.Nxg7+': "O xeque do cavalo arrasta o rei para d8.",
        '22.Qf6+!!': "O imortal sacrifício de dama. O cavalo preto é obrigado a tomar, fechando a fuga do rei.",
        '23.Be7#': "Xeque-mate, com apenas um bispo e dois cavalos. As Brancas entregaram a dama e as duas torres."
      }
    },
    'evergreen-game': {
      title: "A Partida Sempre-Viva",
      white: "Adolf Anderssen", black: "Jean Dufresne",
      event: "Berlim, partida casual",
      opening: "Gambito Evans",
      intro: "Outra obra-prima de Anderssen. Recebeu esse nome por continuar sempre fresca e emocionante. As Brancas abrem com o Gambito Evans e depois jogam uma das combinações mais profundas da época.",
      lesson: "Sacrificar material por desenvolvimento funciona melhor quando você consegue abrir linhas em direção ao rei. Conte seus atacantes e suas linhas abertas antes de sacrificar.",
      story: [
        "Um ano depois de seu triunfo em Londres, Anderssen disputou esta partida casual em Berlim contra Jean Dufresne, um jovem mestre alemão. A partida foi publicada e mais tarde admirada pelo primeiro campeão mundial oficial, Wilhelm Steinitz, que lhe deu o nome de Sempre-Viva.",
        "As Brancas abrem com o Gambito Evans, entregando um peão por desenvolvimento rápido. O rei preto nunca chega a encontrar segurança.",
        "A partida termina com uma enxurrada de sacrifícios, incluindo a dama em d7, que deixa as Pretas diante do xeque-mate no centro. Costuma ser colocada ao lado da Partida Imortal como a melhor da era romântica."
      ],
      comments: {
        '4.b4': "O Gambito Evans. As Brancas oferecem um peão para ganhar tempo e controle do centro.",
        '6.d4': "As Brancas abrem o centro e usam o tempo extra para atacar.",
        '7...d3': "As Pretas avançam o peão para d3 para limitar as Brancas. As Brancas o recuperarão mais tarde com Bxd3.",
        '9.e5': "O peão e avança, expulsando a dama preta e impedindo o desenvolvimento das peças pretas.",
        '11.Ba3': "O bispo cobre e7 e mantém o rei preto preso no centro.",
        '17.Nf6+!': "O primeiro sacrifício. O xeque do cavalo desmonta o flanco do rei preto.",
        '18.exf6': "O peão em f6 sufoca as Pretas. As ameaças de mate começam a se acumular.",
        '19.Rad1': "Anderssen traz sua última peça para o jogo e ignora o ataque à sua dama.",
        '20.Rxe7+!': "Um sacrifício de torre para desviar o defensor.",
        '21.Qxd7+!!': "O sacrifício de dama. O rei é arrastado para o campo aberto.",
        '22.Bf5+': "O bispo começa a perseguir o rei com xeque atrás de xeque.",
        '24.Bxe7#': "Xeque-mate. As Brancas sacrificaram as duas torres e a dama e terminam com peças menores."
      }
    },
    'deep-blue-kasparov-1997-g6': {
      title: "Deep Blue x Kasparov, Partida 6",
      white: "Deep Blue (IBM)", black: "Garry Kasparov",
      event: "Revanche, Nova York",
      opening: "Defesa Caro-Kann",
      intro: "A última partida da revanche de 1997. Foi a primeira vez que um computador venceu um campeão mundial em atividade em um match com controle de tempo padrão. Kasparov joga uma linha arriscada, se confunde com a ordem dos lances e cai diante de um sacrifício de cavalo.",
      lesson: "Conheça bem a sua linha de abertura. Uma única ordem de lances errada pode transformar uma boa abertura em derrota, até mesmo contra uma simples máquina.",
      story: [
        "Em 1996, Garry Kasparov venceu o Deep Blue da IBM por 4 a 2 na Filadélfia, embora o computador tenha ganhado a primeira partida. Em 1997, um Deep Blue mais forte e atualizado foi a Nova York para a revanche.",
        "O match foi até a última partida, com o placar empatado em 2,5 pontos para cada lado. Kasparov escolheu a Defesa Caro-Kann e jogou uma ordem de lances incomum que deu errado no lance 7.",
        "O Deep Blue sacrificou um cavalo em e6 e Kasparov abandonou depois de apenas 19 lances. Mais tarde ele disse que sentiu haver algo inteligente por trás dos lances do computador. Continua sendo um dos momentos mais discutidos da história da inteligência artificial."
      ],
      comments: {
        '1...c6': "Kasparov escolhe a sólida Defesa Caro-Kann.",
        '5.Ng5': "Uma tentativa de ataque conhecida. O cavalo mira f7 e e6.",
        '7...h6?': "Um erro. O lance certo era 7...Bd6. Kasparov misturou suas linhas.",
        '8.Nxe6!': "O sacrifício de cavalo. As Brancas entregam uma peça para escancarar o rei preto.",
        '8...Qe7': "A dama preta dá um passo ao lado. Depois que as Brancas rocarem, as Pretas ganharão o cavalo com ...fxe6, mas seu rei fica preso no centro.",
        '10.Bg6+': "O xeque do bispo empurra o rei para d8.",
        '14.Bg3': "As Brancas mantêm a pressão enquanto as peças pretas estão travadas.",
        '16.Qd3': "A dama passa ao ataque e prepara um sacrifício decisivo.",
        '17.Bf5': "Um último sacrifício de bispo para abrir linhas contra o rei preto.",
        '18.Rxe7': "As Brancas ganham a dama e mantêm uma grande vantagem posicional.",
        '19.c4': "Kasparov abandonou. O match ficou com o Deep Blue, por 3,5 a 2,5."
      }
    },
    'game-of-the-century': {
      title: "A Partida do Século",
      white: "Donald Byrne", black: "Bobby Fischer",
      event: "Memorial Rosenwald, Nova York",
      opening: "Defesa Grünfeld",
      intro: "Bobby Fischer, aos treze anos, jogando de Pretas contra um Mestre Internacional, sacrifica a dama para montar um ataque devastador. Foi chamada de Partida do Século por Hans Kmoch e tornou Fischer famoso.",
      lesson: "Fischer percebeu que a dama era menos importante do que a atividade de todas as suas peças restantes. Às vezes a troca certa é qualidade por tempo e posição.",
      story: [
        "Em outubro de 1956, no Marshall Chess Club, em Nova York, um Bobby Fischer de 13 anos sentou-se diante de Donald Byrne, um forte Mestre Internacional americano. Poucos esperavam que o garoto fizesse mais do que se defender.",
        "Fischer deixou o adversário acumular pressão e então jogou o espetacular 17...Be6!, uma oferta de sua dama. Depois que as Brancas a tomaram, uma série de xeques de cavalo e uma discreta retirada de bispo deixaram as peças brancas amarradas em nós.",
        "O escritor de xadrez Hans Kmoch a chamou de Partida do Século. Fischer se tornaria o mais jovem grande mestre da época e, em 1972, Campeão Mundial."
      ],
      comments: {
        '4...O-O': "Fischer rocou para uma estrutura ao estilo Grünfeld: peças prontas, bispo em fianqueto, pressão sobre o centro.",
        '6.Qb3': "As Brancas atacam d5 e b7. As Pretas tomam o peão e desafiam a dama.",
        '10.Qc5': "A dama branca sai à caça e perde tempo. Fischer vai explorar a falta de desenvolvimento.",
        '11...Na4!': "Um poderoso salto de cavalo. Ataca a dama e inicia uma série de lances forçados.",
        '13...Nxe4!': "Fischer sacrifica uma peça para soltar suas peças contra o rei no centro.",
        '14.Bxe7': "Byrne agarra material. Fischer tem uma surpresa pronta.",
        '17...Be6!!': "O lance famoso. Fischer oferece a dama: se as Brancas a tomarem, as peças pretas vencem à força com cavalos e bispo.",
        '18.Bxb6': "As Brancas tomam a dama, mas é tarde demais para se defender.",
        '19...Ne2+': "Começa uma série de xeques de cavalo. O rei branco vai e volta entre f1 e g1.",
        '23...axb6': "Fischer entregou a dama, mas suas torres, bispo e cavalo estão todos ativos, enquanto as peças brancas estão amarradas.",
        '41...Rc2#': "Xeque-mate. A torre, os cavalos e o bispo pretos se coordenaram à perfeição."
      }
    },
    'fischer-spassky-1972-g6': {
      title: "Fischer x Spassky, Partida 6",
      white: "Bobby Fischer", black: "Boris Spassky",
      event: "Campeonato Mundial, Reykjavik",
      opening: "Gambito da Dama Recusado",
      intro: "Nesta famosa partida, Fischer abriu com 1.c4, algo que quase nunca havia jogado. É considerada uma das partidas mais bem jogadas da história dos Campeonatos Mundiais, tão fluida que Spassky aplaudiu o adversário.",
      lesson: "Um plano claro vence um plano chamativo. Fischer melhorou sua posição passo a passo e depois abriu o tabuleiro no centro exatamente no momento certo.",
      story: [
        "O Campeonato Mundial de 1972 em Reykjavik, na Islândia, colocou o americano Bobby Fischer diante do campeão soviético Boris Spassky no auge da Guerra Fria. Foi o match de xadrez mais divulgado da história.",
        "Fischer tinha perdido a primeira partida e perdido a segunda por W.O., depois venceu a Partida 3 e empatou outras. Na Partida 6, surpreendeu Spassky abrindo com 1.c4 em vez do seu habitual 1.e4, uma linha que quase nunca havia jogado.",
        "Fischer venceu a partida com um jogo tranquilo e poderoso, e conta-se que Spassky o aplaudiu no final. Fischer venceu o match por 12,5 a 8,5 e se tornou o 11º Campeão Mundial, encerrando um longo período de domínio soviético."
      ],
      comments: {
        '1.c4': "A Abertura Inglesa. Fischer surpreendeu o mundo: até essa partida, quase sempre jogava 1.e4.",
        '3.d4': "As Brancas transpõem para um Gambito da Dama Recusado, uma estrutura bem conhecida.",
        '9.Bxe7': "Uma troca padrão dos bispos de casas escuras. As Brancas querem uma pressão posicional duradoura.",
        '10.Nxd5': "As Brancas simplificam e deixam as Pretas com um peão isolado em d5.",
        '12.Qa4': "A dama pressiona a coluna c e vigia os pontos fracos.",
        '16.O-O': "As Brancas rocam e mantêm tudo coordenado.",
        '19.Nxe6': "Uma troca que fixa a estrutura de peões preta e enfraquece o peão d5-d4.",
        '20.e4': "As Brancas golpeiam no centro, sufocando a posição.",
        '22.e5': "As Brancas ganham espaço e atacam. As peças pretas têm pouco a fazer.",
        '26.f5!': "A ruptura. Fischer abre a coluna f para suas torres.",
        '31.e6!': "O avanço de peão decisivo. Divide a defesa preta e ganha material.",
        '41.Qf4': "As Pretas abandonaram. É um exemplo perfeito de domínio estratégico."
      }
    },
    'kasparov-topalov-1999': {
      title: "A Imortal de Kasparov",
      white: "Garry Kasparov", black: "Veselin Topalov",
      event: "Hoogovens, Wijk aan Zee",
      opening: "Defesa Pirc",
      intro: "Muitos a consideram a maior partida de ataque da era moderna. Kasparov, então número um do mundo, lança um sacrifício de torre no lance 24 que leva o rei preto a uma longa caminhada por todo o tabuleiro.",
      lesson: "Quando o rei do adversário não tem abrigo seguro e você tem peças mais ativas, um sacrifício pode criar um ataque decisivo que não se pode deter.",
      story: [
        "Em janeiro de 1999, o torneio Hoogovens, em Wijk aan Zee, na Holanda, reuniu Garry Kasparov e o jovem búlgaro Veselin Topalov. Topalov viria a ganhar o Campeonato Mundial da FIDE em 2005.",
        "Kasparov construiu uma posição forte com as Brancas e depois jogou 24.Rxd4!!, um sacrifício de torre que expôs o rei preto a um ataque longo e forçado. Calculá-lo por inteiro à mesa foi extraordinário.",
        "O próprio Kasparov considerava esta uma de suas melhores partidas, e ela é regularmente eleita entre as maiores já jogadas. Sua principal lição é que um rei em campo aberto pode ser caçado por peças vindas de todos os lados."
      ],
      comments: {
        '1.e4': "Kasparov abre com o peão do rei, e Topalov responde com a Defesa Pirc.",
        '4.Be3': "As Brancas montam o Ataque 150 com Be3, Qd2 e Bh6, mirando o flanco do rei preto.",
        '8.Bh6': "As Brancas trocam o forte bispo preto para enfraquecer as casas escuras ao redor do rei.",
        '11.O-O-O': "As Brancas rocam grande. Os dois reis logo estarão em perigo.",
        '13...O-O-O': "As Pretas também rocam para o flanco da dama, o que se revela arriscado.",
        '17...Kb8': "As Pretas tentam melhorar a posição do rei, mas ele ainda não está seguro.",
        '18.Na5!': "Um forte salto de cavalo que ataca a cobertura do rei e o bispo de b7.",
        '20.Qf4+': "A dama dá xeque e obriga o rei a ir para a7, onde será caçado pelo resto da partida.",
        '22.Nd5!!': "Um sacrifício profundo. Se as Pretas tomarem, as torres brancas ganham acesso à coluna d aberta.",
        '24.Rxd4!!': "O grande sacrifício. A torre vai para d4 e inicia uma combinação que manda o rei preto para o campo aberto.",
        '25.Re7+': "Um xeque de torre força o rei a avançar para dentro do ataque.",
        '26.Qxd4+': "A dama entra na caçada.",
        '29.Ra7': "A torre ameaça mate e elimina o último defensor das Pretas.",
        '36.Bf1!': "Um lance tranquilo que decide a partida. Ameaça mate e anula todo o contra-ataque preto.",
        '39.Qxh8': "As Brancas ganham uma torre enquanto o rei preto está preso longe de suas peças.",
        '44.Qa7': "As Pretas abandonam. A caçada ao rei de Kasparov está completa."
      }
    }
  },

  collections: {
    'traps': { title: "Mates Rápidos e Armadilhas", blurb: "Partidas curtas que terminam depressa. Perfeitas para aprender a que você deve ficar atento." },
    'romantic': { title: "A Era Romântica", blurb: "Quando o xadrez era um duelo de ataques ousados e sacrifícios espetaculares." },
    'queen-sacs': { title: "Sacrifícios de Dama", blurb: "Entregar a peça mais poderosa para vencer a partida." },
    'champions': { title: "Campeões Mundiais", blurb: "Partidas de Fischer e Kasparov, dois dos maiores jogadores de todos os tempos." },
    'brilliancies': { title: "Obras-Primas", blurb: "Partidas lembradas pela beleza de suas combinações." }
  },

  legends: {
    'Paul Morphy': { years: "1837-1884", from: "Nova Orleans, EUA", line: "O prodígio do xadrez de Nova Orleans", bio: "Um jovem americano que atravessou o Atlântico em 1858 e venceu os melhores jogadores da Europa, entre eles Adolf Anderssen. Ensinou o mundo a se desenvolver rápido e a abrir linhas, e depois deixou o xadrez competitivo e voltou à carreira de advogado." },
    'Adolf Anderssen': { years: "1818-1879", from: "Breslau, Alemanha", line: "O mestre do sacrifício", bio: "Um professor de matemática que venceu o primeiro torneio internacional, em Londres, em 1851. Suas partidas de ataque, a Imortal e a Sempre-Viva, são os símbolos da era romântica." },
    'Edward Lasker': { years: "1885-1981", from: "Alemanha e EUA", line: "Engenheiro, mestre e jogador de Go", bio: "Um engenheiro americano nascido na Alemanha que alcançou força de mestre no xadrez e também era um apaixonado jogador de Go. Não tinha parentesco com o Campeão Mundial Emanuel Lasker." },
    'Akiba Rubinstein': { years: "1880-1961", from: "Polônia", line: "Um dos maiores que nunca foram campeões", bio: "Um gênio dos finais de torre e um dos jogadores mais fortes do início do século XX, cuja obra-prima de ataque contra Rotlewi é chamada de a Imortal de Łódź." },
    'Savielly Tartakower': { years: "1887-1956", from: "Polônia e França", line: "O humor do mundo do xadrez", bio: "Grande mestre, escritor e mestre da tirada rápida. Disputou centenas de torneios e deixou frases que os enxadristas ainda repetem." },
    'Richard Réti': { years: "1889-1929", from: "Tchecoslováquia e Áustria", line: "Líder da escola hipermoderna", bio: "Um forte mestre e escritor que defendia controlar o centro à distância com peças, em vez de ocupá-lo com peões. A Abertura Réti leva o nome dele." },
    'Bobby Fischer': { years: "1943-2008", from: "Chicago, EUA", line: "O 11º Campeão Mundial", bio: "Um prodígio que se tornou grande mestre aos 15 anos e derrotou Boris Spassky em 1972 para ser Campeão Mundial. Transformou o xadrez em um fenômeno mundial." },
    'Boris Spassky': { years: "nascido em 1937", from: "Leningrado, URSS", line: "O 10º Campeão Mundial", bio: "Um jogador universal que foi campeão mundial de 1969 a 1972 e que, como se sabe, perdeu o título para Bobby Fischer em Reykjavik." },
    'Garry Kasparov': { years: "nascido em 1963", from: "Baku, URSS", line: "Campeão Mundial 1985-2000", bio: "Campeão Mundial aos 22 anos e o jogador de maior rating do mundo durante a maior parte de duas décadas. Perdeu um match histórico para o Deep Blue da IBM em 1997." },
    'Veselin Topalov': { years: "nascido em 1975", from: "Bulgária", line: "Campeão Mundial da FIDE 2005", bio: "Um grande mestre búlgaro combativo e tático, que chegou ao topo absoluto do jogo e foi o outro lado do famoso ataque de Kasparov em 1999." },
    'Deep Blue': { years: "1997", from: "IBM", line: "A máquina que venceu um campeão", bio: "Um supercomputador de xadrez especializado, construído pela IBM. Em 1997 tornou-se o primeiro computador a vencer um Campeão Mundial em atividade em um match sob condições de torneio." }
  }
};
