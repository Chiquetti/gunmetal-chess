// UI translations (English, Brazilian Portuguese, French). Each entry is [en, pt, fr].
// Famous-game content (titles, stories, comments) lives in js/i18n/games.<lang>.js and is loaded on demand.
export const LANGS = [['en', 'EN', 'English'], ['pt', 'PT', 'Português (BR)'], ['fr', 'FR', 'Français']];
const IDX = { en: 0, pt: 1, fr: 2 };

const D = {
  // navigation / chrome
  'nav.home': ['Home', 'Início', 'Accueil'],
  'nav.play': ['Play', 'Jogar', 'Jouer'],
  'nav.online': ['Play a Friend', 'Jogar online', 'En ligne'],
  'nav.library': ['Famous Games', 'Partidas famosas', 'Parties célèbres'],
  'sound.on': ['Sound: On', 'Som: ligado', 'Son : activé'],
  'sound.off': ['Sound: Off', 'Som: desligado', 'Son : coupé'],
  'sound.title': ['Toggle sound effects', 'Ligar/desligar os efeitos sonoros', 'Activer/couper les effets sonores'],
  'lang.title': ['Language', 'Idioma', 'Langue'],
  'ft.stats': ['Anonymous visit statistics (country level, no cookies).', 'Estatísticas anônimas de visitas (por país, sem cookies).', 'Statistiques de visite anonymes (par pays, sans cookies).'],
  'ft.share': ['Share this game', 'Compartilhar este jogo', 'Partager ce jeu'],
  'ft.copied': ['Link copied!', 'Link copiado!', 'Lien copié !'],

  // home
  'home.title': ['Your move.', 'Sua vez.', 'À vous de jouer.'],
  'home.sub': ['Play the computer, challenge a friend online, or study the great games of history one move at a time.', 'Jogue contra o computador, desafie um amigo online ou estude as grandes partidas da história, um lance de cada vez.', 'Jouez contre l’ordinateur, défiez un ami en ligne ou étudiez les grandes parties de l’histoire, coup par coup.'],
  'home.computer.t': ['Play the Computer', 'Jogar contra o computador', 'Jouer contre l’ordinateur'],
  'home.computer.s': ['Choose Easy, Medium or Hard.', 'Escolha Fácil, Médio ou Difícil.', 'Choisissez Facile, Moyen ou Difficile.'],
  'home.online.t': ['Play a Friend Online', 'Jogar online com um amigo', 'Jouer en ligne avec un ami'],
  'home.online.s': ['Send a link and play in real time. Two players, any device.', 'Envie um link e jogue em tempo real. Dois jogadores, em qualquer aparelho.', 'Envoyez un lien et jouez en temps réel. Deux joueurs, sur n’importe quel appareil.'],
  'home.continue.t': ['Continue Game', 'Continuar partida', 'Reprendre la partie'],
  'home.continue.s': ['{{level}} level, playing {{color}}', 'Nível {{level}}, jogando de {{color}}', 'Niveau {{level}}, avec les {{color}}'],
  'home.library.t': ['Famous Games', 'Partidas famosas', 'Parties célèbres'],
  'home.library.s': ['Watch the masters play, with a coach explaining each key move.', 'Veja os mestres jogarem, com um treinador explicando cada lance importante.', 'Regardez les maîtres jouer, avec un coach qui explique chaque coup clé.'],

  // levels / colors / pieces
  'lv.easy': ['Easy', 'Fácil', 'Facile'],
  'lv.medium': ['Medium', 'Médio', 'Moyen'],
  'lv.hard': ['Hard', 'Difícil', 'Difficile'],
  'lv.easy.b': ['A friendly opponent that makes plenty of mistakes.', 'Um adversário amigável que comete muitos erros.', 'Un adversaire sympathique qui fait beaucoup d’erreurs.'],
  'lv.medium.b': ['Solid club player. Punishes obvious errors.', 'Jogador de clube sólido. Pune erros óbvios.', 'Joueur de club solide. Punit les erreurs évidentes.'],
  'lv.hard.b': ['Strong and tactical. Expect no gifts.', 'Forte e tático. Não espere presentes.', 'Fort et tactique. N’espérez aucun cadeau.'],
  'color.w': ['White', 'Brancas', 'Blancs'],
  'color.b': ['Black', 'Pretas', 'Noirs'],
  'color.r': ['Random', 'Aleatório', 'Aléatoire'],
  'piece.k': ['King', 'Rei', 'Roi'],
  'piece.q': ['Queen', 'Dama', 'Dame'],
  'piece.r': ['Rook', 'Torre', 'Tour'],
  'piece.b': ['Bishop', 'Bispo', 'Fou'],
  'piece.n': ['Knight', 'Cavalo', 'Cavalier'],
  'piece.p': ['Pawn', 'Peão', 'Pion'],

  // setup / play
  'setup.title': ['New Game', 'Nova partida', 'Nouvelle partie'],
  'setup.sub': ['Pick your opponent\'s strength and your color.', 'Escolha a força do adversário e a sua cor.', 'Choisissez la force de l’adversaire et votre couleur.'],
  'setup.start': ['Start Game', 'Começar', 'Commencer'],
  'play.computer': ['Computer', 'Computador', 'Ordinateur'],
  'play.you': ['You', 'Você', 'Vous'],
  'btn.new': ['New Game', 'Nova partida', 'Nouvelle partie'],
  'btn.undo': ['Take Back', 'Desfazer', 'Annuler'],
  'btn.hint': ['Hint', 'Dica', 'Indice'],
  'btn.flip': ['Flip', 'Girar', 'Retourner'],
  'btn.resign': ['Resign', 'Desistir', 'Abandonner'],
  'hint.thinking': ['Thinking...', 'Pensando...', 'Réflexion...'],
  'play.moves': ['Moves', 'Lances', 'Coups'],
  'status.your': ['Your move.', 'Sua vez.', 'À vous de jouer.'],
  'status.check': ['Check! Your move.', 'Xeque! Sua vez.', 'Échec ! À vous de jouer.'],
  'status.thinking': ['Computer is thinking', 'O computador está pensando', 'L’ordinateur réfléchit'],
  'res.resigned': ['You resigned. Computer wins.', 'Você desistiu. O computador venceu.', 'Vous avez abandonné. L’ordinateur gagne.'],
  'res.mateLose': ['Checkmate. The computer wins.', 'Xeque-mate. O computador venceu.', 'Échec et mat. L’ordinateur gagne.'],
  'res.mateWin': ['Checkmate! You win!', 'Xeque-mate! Você venceu!', 'Échec et mat ! Vous gagnez !'],
  'res.stalemate': ['Stalemate. The game is a draw.', 'Afogamento. A partida empatou.', 'Pat. La partie est nulle.'],
  'res.repetition': ['Draw by repetition.', 'Empate por repetição.', 'Nulle par répétition.'],
  'res.insufficient': ['Draw: not enough material to mate.', 'Empate: material insuficiente para o mate.', 'Nulle : matériel insuffisant pour mater.'],
  'res.fifty': ['Draw (50-move rule).', 'Empate (regra dos 50 lances).', 'Nulle (règle des 50 coups).'],
  'res.over': ['Game over.', 'Fim de jogo.', 'Partie terminée.'],
  'promo.title': ['Promote your pawn', 'Promova seu peão', 'Promouvez votre pion'],
  'promo.sub': ['Choose a new piece.', 'Escolha uma nova peça.', 'Choisissez une nouvelle pièce.'],
  'resign.title': ['Resign this game?', 'Desistir desta partida?', 'Abandonner cette partie ?'],
  'resign.sub': ['The computer will be declared the winner.', 'O computador será declarado vencedor.', 'L’ordinateur sera déclaré vainqueur.'],
  'resign.keep': ['Keep playing', 'Continuar jogando', 'Continuer à jouer'],
  'resign.confirm': ['Resign', 'Desistir', 'Abandonner'],

  // effects
  'fx.check': ['CHECK!', 'XEQUE!', 'ÉCHEC !'],
  'fx.mate': ['CHECKMATE', 'XEQUE-MATE', 'ÉCHEC ET MAT'],
  'fx.youwin': ['You win!', 'Você venceu!', 'Vous gagnez !'],
  'fx.compwins': ['The computer wins', 'O computador venceu', 'L’ordinateur gagne'],
  'fx.white': ['White wins', 'Brancas vencem', 'Les Blancs gagnent'],
  'fx.black': ['Black wins', 'Pretas vencem', 'Les Noirs gagnent'],
  'fx.oppwins': ['Your opponent wins', 'Seu adversário venceu', 'Votre adversaire gagne'],

  // library
  'lib.title': ['Famous Games', 'Partidas famosas', 'Parties célèbres'],
  'lib.sub': ['Masters and Grandmasters, one move at a time. Watch with commentary, read the story behind each game, or test yourself by guessing the master\'s next move.', 'Mestres e Grandes Mestres, um lance de cada vez. Assista com comentários, leia a história de cada partida ou teste-se tentando adivinhar o próximo lance do mestre.', 'Maîtres et Grands Maîtres, coup par coup. Regardez avec commentaires, lisez l’histoire de chaque partie ou testez-vous en devinant le prochain coup du maître.'],
  'lib.collections': ['Collections', 'Coleções', 'Collections'],
  'lib.browse': ['Browse all games', 'Ver todas as partidas', 'Toutes les parties'],
  'lib.search': ['Search by title, player, opening, theme or story...', 'Busque por título, jogador, abertura, tema ou história...', 'Rechercher par titre, joueur, ouverture, thème ou histoire...'],
  'f.level': ['All levels', 'Todos os níveis', 'Tous les niveaux'],
  'f.era': ['All eras', 'Todas as eras', 'Toutes les époques'],
  'f.theme': ['All themes', 'Todos os temas', 'Tous les thèmes'],
  'f.player': ['All players', 'Todos os jogadores', 'Tous les joueurs'],
  'f.result': ['All results', 'Todos os resultados', 'Tous les résultats'],
  'f.first': ['Any first move', 'Qualquer primeiro lance', 'N’importe quel premier coup'],
  'sort.rec': ['Sort: Recommended', 'Ordem: recomendada', 'Tri : recommandé'],
  'sort.easy': ['Easiest first', 'Mais fáceis primeiro', 'Plus faciles d’abord'],
  'sort.hard': ['Hardest first', 'Mais difíceis primeiro', 'Plus difficiles d’abord'],
  'sort.old': ['Oldest first', 'Mais antigas primeiro', 'Plus anciennes d’abord'],
  'sort.new': ['Newest first', 'Mais recentes primeiro', 'Plus récentes d’abord'],
  'sort.short': ['Shortest first', 'Mais curtas primeiro', 'Plus courtes d’abord'],
  'sort.long': ['Longest first', 'Mais longas primeiro', 'Plus longues d’abord'],
  'sort.az': ['A to Z', 'De A a Z', 'De A à Z'],
  'lib.fav': ['Favorites', 'Favoritas', 'Favorites'],
  'lib.clear': ['Clear filters', 'Limpar filtros', 'Effacer les filtres'],
  'lib.import': ['+ Import a game', '+ Importar uma partida', '+ Importer une partie'],
  'lib.count': ['Showing <b>{{n}}</b> of {{total}} games', 'Mostrando <b>{{n}}</b> de {{total}} partidas', '<b>{{n}}</b> parties sur {{total}}'],
  'lib.collection': ['Collection', 'Coleção', 'Collection'],
  'lib.remove': ['remove', 'remover', 'retirer'],
  'lib.empty': ['No games match these filters. Try clearing a filter or searching for something else.', 'Nenhuma partida com esses filtros. Tente limpar um filtro ou buscar outra coisa.', 'Aucune partie ne correspond à ces filtres. Essayez d’en effacer un ou de chercher autre chose.'],
  'lib.legends': ['Legends of the game', 'Lendas do xadrez', 'Légendes des échecs'],
  'lib.legends.sub': ['Tap a name to see every game they played in this library.', 'Toque em um nome para ver todas as partidas dele nesta biblioteca.', 'Touchez un nom pour voir toutes ses parties dans cette bibliothèque.'],
  'lib.gamesN': ['{{n}} games', '{{n}} partidas', '{{n}} parties'],
  'lib.legendOne': ['1 game in library', '1 partida na biblioteca', '1 partie dans la bibliothèque'],
  'lib.legendMany': ['{{n}} games in library', '{{n}} partidas na biblioteca', '{{n}} parties dans la bibliothèque'],
  'card.moves': ['{{n}} moves', '{{n}} lances', '{{n}} coups'],
  'tag.story': ['Story', 'História', 'Histoire'],
  'tag.done': ['Watched ✓', 'Assistida ✓', 'Vue ✓'],
  'fav.add': ['Add to favorites', 'Adicionar aos favoritos', 'Ajouter aux favoris'],
  'fav.remove': ['Remove from favorites', 'Remover dos favoritos', 'Retirer des favoris'],
  'res.w': ['White wins', 'Brancas vencem', 'Les Blancs gagnent'],
  'res.b': ['Black wins', 'Pretas vencem', 'Les Noirs gagnent'],
  'res.d': ['Draw', 'Empate', 'Nulle'],
  'resultWord': ['Result', 'Resultado', 'Résultat'],
  'first.1.e4': ['1.e4 (King\'s pawn)', '1.e4 (peão do rei)', '1.e4 (pion roi)'],
  'first.1.d4': ['1.d4 (Queen\'s pawn)', '1.d4 (peão da dama)', '1.d4 (pion dame)'],
  'first.Flank': ['Flank (1.c4 / 1.Nf3)', 'Flanco (1.c4 / 1.Nf3)', 'Flanc (1.c4 / 1.Nf3)'],
  'first.Other': ['Other first moves', 'Outros primeiros lances', 'Autres premiers coups'],
  // enums used for filters and badges
  'level.Beginner': ['Beginner', 'Iniciante', 'Débutant'],
  'level.Intermediate': ['Intermediate', 'Intermediário', 'Intermédiaire'],
  'level.Advanced': ['Advanced', 'Avançado', 'Avancé'],
  'level.Custom': ['Custom', 'Personalizada', 'Personnalisée'],
  'era.Timeless': ['Timeless', 'Atemporal', 'Intemporel'],
  'era.Romantic': ['Romantic', 'Romântica', 'Romantique'],
  'era.Classical': ['Classical', 'Clássica', 'Classique'],
  'era.Modern': ['Modern', 'Moderna', 'Moderne'],
  'era.Custom': ['Custom', 'Personalizada', 'Personnalisée'],
  'theme.Trap': ['Trap', 'Armadilha', 'Piège'],
  'theme.Opening': ['Opening', 'Abertura', 'Ouverture'],
  'theme.Mate': ['Mate', 'Mate', 'Mat'],
  'theme.Sacrifice': ['Sacrifice', 'Sacrifício', 'Sacrifice'],
  'theme.Queen sacrifice': ['Queen sacrifice', 'Sacrifício da dama', 'Sacrifice de dame'],
  'theme.Attack': ['Attack', 'Ataque', 'Attaque'],
  'theme.Brilliancy': ['Brilliancy', 'Obra-prima', 'Brillante'],
  'theme.Positional': ['Positional', 'Posicional', 'Positionnel'],
  'theme.World Championship': ['World Championship', 'Campeonato Mundial', 'Championnat du monde'],
  'theme.Man vs Machine': ['Man vs Machine', 'Homem x Máquina', 'Homme contre machine'],
  'theme.History': ['History', 'História', 'Histoire'],
  'theme.Miniature': ['Miniature', 'Miniatura', 'Miniature'],
  'theme.Imported': ['Imported', 'Importada', 'Importée'],

  // viewer
  'v.back': ['← All games', '← Todas as partidas', '← Toutes les parties'],
  'v.watch': ['Watch', 'Assistir', 'Regarder'],
  'v.guess': ['Guess the move', 'Adivinhe o lance', 'Devinez le coup'],
  'v.play': ['▶ Play', '▶ Reproduzir', '▶ Lecture'],
  'v.pause': ['❚❚ Pause', '❚❚ Pausar', '❚❚ Pause'],
  'v.story': ['The story behind this game', 'A história por trás desta partida', 'L’histoire de cette partie'],
  'v.next': ['Next game →', 'Próxima partida →', 'Partie suivante →'],
  'v.remove': ['Remove imported game', 'Remover partida importada', 'Retirer la partie importée'],
  'v.intro': ['Introduction', 'Introdução', 'Introduction'],
  'v.natural': ['A natural move that continues the plan.', 'Um lance natural que continua o plano.', 'Un coup naturel qui poursuit le plan.'],
  'v.result': ['Result {{r}}.', 'Resultado {{r}}.', 'Résultat {{r}}.'],
  'v.start': ['Start', 'Início', 'Début'],
  'v.prev': ['Previous', 'Anterior', 'Précédent'],
  'v.nextMove': ['Next', 'Próximo', 'Suivant'],
  'v.end': ['End', 'Fim', 'Fin'],
  'g.hint': ['Hint', 'Dica', 'Indice'],
  'g.show': ['Show move', 'Mostrar o lance', 'Montrer le coup'],
  'g.side': ['Playing: {{c}}', 'Jogando de: {{c}}', 'Vous jouez : {{c}}'],
  'g.title': ['Guess the move', 'Adivinhe o lance', 'Devinez le coup'],
  'g.intro': ['You play {{c}}. Find the master\'s move each turn.', 'Você joga de {{c}}. Encontre o lance do mestre a cada vez.', 'Vous jouez les {{c}}. Trouvez le coup du maître à chaque tour.'],
  'g.complete': ['Game complete', 'Partida concluída', 'Partie terminée'],
  'g.found': ['You found <b>{{a}}</b> of <b>{{b}}</b> moves on the first try.', 'Você acertou <b>{{a}}</b> de <b>{{b}}</b> lances de primeira.', 'Vous avez trouvé <b>{{a}}</b> coups sur <b>{{b}}</b> du premier coup.'],
  'g.correct': ['Correct!', 'Correto!', 'Correct !'],
  'g.wrong': ['Not the master\'s move.', 'Não foi o lance do mestre.', 'Ce n’est pas le coup du maître.'],
  'g.wrong2': ['Try again, or use Hint.', 'Tente de novo ou use a Dica.', 'Réessayez ou utilisez l’Indice.'],
  'g.played': ['The master played {{m}}.', 'O mestre jogou {{m}}.', 'Le maître a joué {{m}}.'],
  'g.played2': ['Play it on the board to continue.', 'Jogue no tabuleiro para continuar.', 'Jouez-le sur l’échiquier pour continuer.'],

  // import
  'imp.title': ['Import a game', 'Importar uma partida', 'Importer une partie'],
  'imp.sub': ['Paste a game in PGN format (chess.com and Lichess both let you copy it). It is saved only in this browser.', 'Cole uma partida em formato PGN (o chess.com e o Lichess permitem copiar). Ela fica salva só neste navegador.', 'Collez une partie au format PGN (chess.com et Lichess permettent de la copier). Elle n’est enregistrée que dans ce navigateur.'],
  'imp.titlePh': ['Title (optional)', 'Título (opcional)', 'Titre (facultatif)'],
  'imp.cancel': ['Cancel', 'Cancelar', 'Annuler'],
  'imp.go': ['Import', 'Importar', 'Importer'],
  'imp.errInvalid': ['That does not look like a valid PGN. Check the moves and try again.', 'Isso não parece um PGN válido. Confira os lances e tente de novo.', 'Ceci ne ressemble pas à un PGN valide. Vérifiez les coups et réessayez.'],
  'imp.errNone': ['No moves found in that text.', 'Nenhum lance encontrado nesse texto.', 'Aucun coup trouvé dans ce texte.'],
  'imp.event': ['Imported game', 'Partida importada', 'Partie importée'],
  'imp.intro': ['Your imported game. Step through the moves, or switch to Guess the move to test yourself.', 'Sua partida importada. Avance pelos lances ou use "Adivinhe o lance" para se testar.', 'Votre partie importée. Parcourez les coups ou passez à « Devinez le coup » pour vous tester.'],
  'rm.title': ['Remove this game?', 'Remover esta partida?', 'Retirer cette partie ?'],
  'rm.sub': ['It will be deleted from this browser.', 'Ela será apagada deste navegador.', 'Elle sera supprimée de ce navigateur.'],
  'rm.cancel': ['Cancel', 'Cancelar', 'Annuler'],
  'rm.confirm': ['Remove', 'Remover', 'Retirer'],

  // online two-player
  'on.title': ['Play a Friend Online', 'Jogar online com um amigo', 'Jouer en ligne avec un ami'],
  'on.sub': ['Create a game and send the link to a friend. You play in real time, move by move. No account needed.', 'Crie uma partida e envie o link para um amigo. Vocês jogam em tempo real, lance a lance. Não precisa de cadastro.', 'Créez une partie et envoyez le lien à un ami. Vous jouez en temps réel, coup par coup. Aucun compte nécessaire.'],
  'on.create': ['Create a game', 'Criar uma partida', 'Créer une partie'],
  'on.create.s': ['You get a link and a code to share.', 'Você recebe um link e um código para compartilhar.', 'Vous obtenez un lien et un code à partager.'],
  'on.join': ['Join a game', 'Entrar em uma partida', 'Rejoindre une partie'],
  'on.join.s': ['Got a code from a friend? Type it here.', 'Recebeu um código de um amigo? Digite aqui.', 'Un code reçu d’un ami ? Saisissez-le ici.'],
  'on.codePh': ['CODE', 'CÓDIGO', 'CODE'],
  'on.joinBtn': ['Join', 'Entrar', 'Rejoindre'],
  'on.yourColor': ['Your color', 'Sua cor', 'Votre couleur'],
  'on.createBtn': ['Create game', 'Criar partida', 'Créer la partie'],
  'on.waiting': ['Waiting for your friend to join...', 'Aguardando seu amigo entrar...', 'En attente de votre ami...'],
  'on.share': ['Send this link to your friend:', 'Envie este link para seu amigo:', 'Envoyez ce lien à votre ami :'],
  'on.codeIs': ['Or give them this code:', 'Ou passe este código:', 'Ou donnez-lui ce code :'],
  'on.copy': ['Copy link', 'Copiar link', 'Copier le lien'],
  'on.copied': ['Copied!', 'Copiado!', 'Copié !'],
  'on.cancel': ['Cancel', 'Cancelar', 'Annuler'],
  'on.connecting': ['Connecting...', 'Conectando...', 'Connexion...'],
  'on.failed': ['Could not connect. Check the code and your internet, then try again.', 'Não foi possível conectar. Confira o código e a internet e tente de novo.', 'Connexion impossible. Vérifiez le code et votre connexion, puis réessayez.'],
  'on.noGame': ['No game was found with that code. Ask your friend to create it again.', 'Nenhuma partida encontrada com esse código. Peça para seu amigo criar de novo.', 'Aucune partie trouvée avec ce code. Demandez à votre ami de la recréer.'],
  'on.opponent': ['Friend', 'Amigo', 'Ami'],
  'on.you': ['You', 'Você', 'Vous'],
  'on.yourTurn': ['Your move.', 'Sua vez.', 'À vous de jouer.'],
  'on.theirTurn': ['Waiting for your friend\'s move...', 'Aguardando o lance do seu amigo...', 'En attente du coup de votre ami...'],
  'on.check': ['Check!', 'Xeque!', 'Échec !'],
  'on.mateWin': ['Checkmate! You win!', 'Xeque-mate! Você venceu!', 'Échec et mat ! Vous gagnez !'],
  'on.mateLose': ['Checkmate. Your friend wins.', 'Xeque-mate. Seu amigo venceu.', 'Échec et mat. Votre ami gagne.'],
  'on.resignedMe': ['You resigned.', 'Você desistiu.', 'Vous avez abandonné.'],
  'on.resignedThem': ['Your friend resigned. You win!', 'Seu amigo desistiu. Você venceu!', 'Votre ami a abandonné. Vous gagnez !'],
  'on.drawAgreed': ['Draw agreed.', 'Empate por acordo.', 'Nulle par accord.'],
  'on.disconnected': ['Your friend disconnected.', 'Seu amigo desconectou.', 'Votre ami s’est déconnecté.'],
  'on.drawOffer': ['Offer draw', 'Propor empate', 'Proposer nulle'],
  'on.drawOffered': ['Draw offer sent.', 'Proposta de empate enviada.', 'Proposition de nulle envoyée.'],
  'on.drawAsk': ['Your friend offers a draw.', 'Seu amigo propõe empate.', 'Votre ami propose la nulle.'],
  'on.accept': ['Accept', 'Aceitar', 'Accepter'],
  'on.decline': ['Decline', 'Recusar', 'Refuser'],
  'on.drawDeclined': ['Draw offer declined.', 'Proposta de empate recusada.', 'Proposition de nulle refusée.'],
  'on.rematch': ['Rematch', 'Revanche', 'Revanche'],
  'on.rematchAsk': ['Your friend wants a rematch.', 'Seu amigo quer a revanche.', 'Votre ami veut une revanche.'],
  'on.rematchWait': ['Rematch requested...', 'Revanche solicitada...', 'Revanche demandée...'],
  'on.leave': ['Leave game', 'Sair da partida', 'Quitter la partie'],
  'on.resignTitle': ['Resign this game?', 'Desistir desta partida?', 'Abandonner cette partie ?'],
  'on.resignSub': ['Your friend will be declared the winner.', 'Seu amigo será declarado vencedor.', 'Votre ami sera déclaré vainqueur.'],
  'on.chat': ['Chat', 'Chat', 'Chat'],
  'on.chatPh': ['Type a message...', 'Digite uma mensagem...', 'Écrivez un message...'],
  'on.send': ['Send', 'Enviar', 'Envoyer'],
  'on.connected': ['Connected! The game is starting.', 'Conectado! A partida vai começar.', 'Connecté ! La partie commence.'],
  'on.note': ['Online games connect the two browsers directly, using free public servers to introduce them. If it does not connect, try a different network or wifi.', 'As partidas online conectam os dois navegadores diretamente, usando servidores públicos gratuitos para apresentá-los. Se não conectar, tente outra rede ou wifi.', 'Les parties en ligne relient directement les deux navigateurs, avec des serveurs publics gratuits pour les mettre en contact. Si la connexion échoue, essayez un autre réseau ou wifi.'],
  'on.sameColor': ['Both players chose the same color. Colors were assigned randomly.', 'Os dois escolheram a mesma cor. As cores foram sorteadas.', 'Les deux joueurs ont choisi la même couleur. Les couleurs ont été tirées au sort.'],
  'on.moves': ['Moves', 'Lances', 'Coups']
};

let lang = 'en';
try {
  const saved = localStorage.getItem('gunmetal.lang');
  if (saved && IDX[saved] !== undefined) lang = saved;
  else {
    const nav = (navigator.language || 'en').toLowerCase();
    lang = nav.startsWith('pt') ? 'pt' : nav.startsWith('fr') ? 'fr' : 'en';
  }
} catch (e) { /* keep default */ }

export const getLang = () => lang;
export function setLang(l) {
  if (IDX[l] === undefined) return;
  lang = l;
  try { localStorage.setItem('gunmetal.lang', l); } catch (e) { /* ignore */ }
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
}
document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

export function t(key, vars) {
  const e = D[key];
  let s = e ? (e[IDX[lang]] || e[0]) : key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split('{{' + k + '}}').join(v);
  return s;
}
/** Translate an enum value (level, era, theme...) falling back to the raw value. */
export const tEnum = (prefix, v) => (D[prefix + '.' + v] ? t(prefix + '.' + v) : v);

/** Apply translations to static HTML: data-i18n (text), data-i18n-html, data-i18n-ph, data-i18n-title. */
export function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  root.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
}

/* ---- famous-game content (loaded on demand) ---- */
let CONTENT = null;
export async function loadContent(l = lang) {
  CONTENT = null;
  if (l === 'pt') CONTENT = (await import('./i18n/games.pt.js')).default;
  else if (l === 'fr') CONTENT = (await import('./i18n/games.fr.js')).default;
}
export function locGame(g) {
  const x = CONTENT && CONTENT.games && CONTENT.games[g.id];
  if (!x) return g;
  return { ...g, ...x, comments: { ...g.comments, ...(x.comments || {}) }, story: x.story || g.story };
}
export const locCollection = (c) => ({ ...c, ...((CONTENT && CONTENT.collections && CONTENT.collections[c.id]) || {}) });
export const locLegend = (p) => ({ ...p, ...((CONTENT && CONTENT.legends && CONTENT.legends[p.name]) || {}) });
