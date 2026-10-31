// UI translations (English, Brazilian Portuguese, French). Each entry is [en, pt, fr].
// Famous-game content (titles, stories, comments) lives in js/i18n/games.<lang>.js and is loaded on demand.
export const LANGS = [['en', 'EN', 'English'], ['pt', 'PT', 'Português'], ['fr', 'FR', 'Français'], ['es', 'ES', 'Español']];
const IDX = { en: 0, pt: 1, fr: 2, es: 3 };

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
  'ft.stats': ['Anonymous visit statistics.', 'Estatísticas anônimas de visitas.', 'Statistiques de visite anonymes.'],
  'cb.text': ['We use anonymous statistics to see how the game is used and where it is played. Allow?', 'Usamos estatísticas anônimas para ver como o jogo é usado e de onde. Permitir?', 'Nous utilisons des statistiques anonymes pour savoir comment et d’où le jeu est utilisé. Autoriser ?'],
  'cb.yes': ['Allow', 'Permitir', 'Autoriser'],
  'cb.no': ['No thanks', 'Não, obrigado', 'Non merci'],
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
  'fx.oppwins': ['{{name}} wins', '{{name}} venceu', '{{name}} gagne'],

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



  // learn / puzzles / install
  'nav.learn': ['Learn', 'Aprender', 'Apprendre'],
  'ln.title': ['Learn', 'Aprender', 'Apprendre'],
  'ln.sub': ['Learn how every gun-piece moves, the special rules, and train with puzzles taken from famous games.', 'Aprenda como cada arma-peça anda, as regras especiais e treine com problemas tirados das partidas famosas.', 'Apprenez comment chaque pièce-arme se déplace, les règles spéciales, et entraînez-vous avec des problèmes tirés des parties célèbres.'],
  'ln.tab.pieces': ['The pieces', 'As peças', 'Les pièces'],
  'ln.tab.rules': ['Special rules', 'Regras especiais', 'Règles spéciales'],
  'ln.tab.puzzles': ['Puzzles', 'Problemas', 'Problèmes'],
  'ln.pick': ['Tap a piece to see where it can move.', 'Toque em uma peça para ver para onde ela pode ir.', 'Touchez une pièce pour voir où elle peut aller.'],
  'ln.value': ['Value: {{n}} points', 'Valor: {{n}} pontos', 'Valeur : {{n}} points'],
  'ln.valueK': ['Priceless: if it is lost, the game is lost.', 'Não tem preço: se for perdido, o jogo acaba.', 'Inestimable : s’il est perdu, la partie est perdue.'],
  'gun.k': ['AR-15 rifle', 'Fuzil AR-15', 'Fusil AR-15'],
  'gun.q': ['AK-47 rifle', 'Fuzil AK-47', 'Fusil AK-47'],
  'gun.r': ['12-gauge pump shotgun', 'Espingarda pump calibre 12', 'Fusil à pompe calibre 12'],
  'gun.b': ['Winchester 1894 lever-action rifle', 'Rifle Winchester 1894 de ação por alavanca', 'Carabine Winchester 1894 à levier'],
  'gun.n': ['Revolver', 'Revólver', 'Revolver'],
  'gun.p': ['9mm cartridge', 'Cartucho 9mm', 'Cartouche 9 mm'],
  'how.k': ['Moves one square in any direction. It can never move into check. If it is attacked and cannot escape, the game is over.', 'Anda uma casa em qualquer direção. Nunca pode ir para uma casa em xeque. Se for atacado e não puder escapar, o jogo termina.', 'Se déplace d’une case dans toutes les directions. Il ne peut jamais aller en échec. S’il est attaqué sans pouvoir s’échapper, la partie est finie.'],
  'how.q': ['The most powerful piece. Moves any number of squares in a straight line or on a diagonal.', 'A peça mais poderosa. Anda quantas casas quiser em linha reta ou na diagonal.', 'La pièce la plus puissante. Se déplace d’autant de cases qu’elle veut en ligne droite ou en diagonale.'],
  'how.r': ['Moves any number of squares along a row or a column.', 'Anda quantas casas quiser pela linha ou pela coluna.', 'Se déplace d’autant de cases qu’elle veut sur une ligne ou une colonne.'],
  'how.b': ['Moves any number of squares diagonally, and always stays on the same color of square.', 'Anda quantas casas quiser na diagonal e sempre permanece na mesma cor de casa.', 'Se déplace en diagonale d’autant de cases qu’il veut et reste toujours sur la même couleur de case.'],
  'how.n': ['Moves in an L shape: two squares in one direction and one to the side. It is the only piece that can jump over others.', 'Anda em L: duas casas numa direção e uma para o lado. É a única peça que pode pular as outras.', 'Se déplace en L : deux cases dans une direction et une sur le côté. C’est la seule pièce qui peut sauter par-dessus les autres.'],
  'how.p': ['Moves forward one square, or two from its starting square. It captures one square diagonally forward. In the demo it can take the black pawn.', 'Anda uma casa para a frente, ou duas na casa inicial. Captura uma casa na diagonal para a frente. No exemplo, ela pode capturar o peão preto.', 'Avance d’une case, ou de deux depuis sa case de départ. Il prend en diagonale d’une case vers l’avant. Dans l’exemple, il peut prendre le pion noir.'],
  'rule.castle.t': ['Castling', 'Roque', 'Roque'],
  'rule.castle.d': ['Once per game, the king moves two squares toward a rook and the rook jumps to the other side of it. It is allowed only if neither piece has moved, nothing is between them, and the king is not in check and does not cross an attacked square.', 'Uma vez por jogo, o rei anda duas casas em direção a uma torre e a torre pula para o outro lado dele. Só vale se nenhuma das duas peças tiver se movido, se não houver peças no meio, e se o rei não estiver em xeque nem passar por uma casa atacada.', 'Une fois par partie, le roi se déplace de deux cases vers une tour et la tour passe de l’autre côté. C’est permis seulement si aucune des deux pièces n’a bougé, s’il n’y a rien entre elles, et si le roi n’est pas en échec et ne traverse pas une case attaquée.'],
  'rule.ep.t': ['En passant', 'En passant', 'Prise en passant'],
  'rule.ep.d': ['If an enemy pawn advances two squares and lands next to your pawn, you may capture it as if it had moved only one square. You must do it on the very next move or lose the chance.', 'Se um peão inimigo avançar duas casas e parar ao lado do seu peão, você pode capturá-lo como se tivesse andado só uma casa. É preciso fazer isso na jogada seguinte, senão perde a chance.', 'Si un pion adverse avance de deux cases et s’arrête à côté de votre pion, vous pouvez le prendre comme s’il n’avait avancé que d’une case. Il faut le faire au coup suivant, sinon l’occasion est perdue.'],
  'rule.promo.t': ['Promotion', 'Promoção', 'Promotion'],
  'rule.promo.d': ['A pawn that reaches the far end of the board becomes a queen, rook, bishop or knight of your choice. Most players choose the queen, the AK-47.', 'Um peão que chega ao outro lado do tabuleiro vira dama, torre, bispo ou cavalo, à sua escolha. A maioria escolhe a dama, a AK-47.', 'Un pion qui atteint le bout de l’échiquier devient une dame, une tour, un fou ou un cavalier au choix. La plupart choisissent la dame, l’AK-47.'],
  'rule.check.t': ['Check and checkmate', 'Xeque e xeque-mate', 'Échec et échec et mat'],
  'rule.check.d': ['Check means the king is attacked, and you must get out of it right away. If there is no way out, it is checkmate and the game is over.', 'Xeque significa que o rei está sendo atacado e você precisa sair dele na hora. Se não houver saída, é xeque-mate e o jogo termina.', 'Échec signifie que le roi est attaqué, et vous devez y échapper aussitôt. S’il n’y a aucune issue, c’est échec et mat et la partie est terminée.'],
  'rule.stale.t': ['Stalemate and draws', 'Afogamento e empates', 'Pat et parties nulles'],
  'rule.stale.d': ['If the player to move has no legal move but is not in check, it is a draw called stalemate. A game is also drawn by repetition, by the 50-move rule, by agreement, or when neither side can force mate.', 'Se quem tem a vez não tem nenhum lance legal, mas não está em xeque, o jogo empata por afogamento. Também há empate por repetição, pela regra dos 50 lances, por acordo ou quando nenhum lado consegue dar mate.', 'Si le joueur au trait n’a aucun coup légal sans être en échec, la partie est nulle par pat. Elle est aussi nulle par répétition, par la règle des 50 coups, par accord ou quand aucun camp ne peut mater.'],
  'pz.title': ['Puzzles from famous games', 'Problemas das partidas famosas', 'Problèmes des parties célèbres'],
  'pz.sub': ['Find the winning moves the masters played. The opponent answers automatically.', 'Encontre os lances vencedores que os mestres jogaram. O adversário responde sozinho.', 'Trouvez les coups gagnants joués par les maîtres. L’adversaire répond automatiquement.'],
  'pz.mate1': ['Mate in 1', 'Mate em 1', 'Mat en 1'],
  'pz.mateN': ['Mate in {{n}}', 'Mate em {{n}}', 'Mat en {{n}}'],
  'pz.white': ['White to move', 'As brancas jogam', 'Aux Blancs de jouer'],
  'pz.black': ['Black to move', 'As pretas jogam', 'Aux Noirs de jouer'],
  'pz.from': ['From: {{game}}', 'De: {{game}}', 'De : {{game}}'],
  'pz.back': ['← All puzzles', '← Todos os problemas', '← Tous les problèmes'],
  'pz.hint': ['Hint', 'Dica', 'Indice'],
  'pz.solution': ['Show solution', 'Mostrar a solução', 'Voir la solution'],
  'pz.next': ['Next puzzle →', 'Próximo problema →', 'Problème suivant →'],
  'pz.restart': ['Restart', 'Recomeçar', 'Recommencer'],
  'pz.prompt': ['Find the winning move.', 'Encontre o lance vencedor.', 'Trouvez le coup gagnant.'],
  'pz.correct': ['Correct! Keep going.', 'Correto! Continue.', 'Correct ! Continuez.'],
  'pz.wrong': ['Not quite. Try again, or ask for a hint.', 'Não foi esse. Tente de novo ou peça uma dica.', 'Pas tout à fait. Réessayez ou demandez un indice.'],
  'pz.solved': ['Solved!', 'Resolvido!', 'Résolu !'],
  'pz.solvedMsg': ['Well done! That is exactly what the master played.', 'Muito bem! Foi exatamente o que o mestre jogou.', 'Bravo ! C’est exactement ce qu’a joué le maître.'],
  'pz.reveal': ['The master played {{m}}.', 'O mestre jogou {{m}}.', 'Le maître a joué {{m}}.'],
  'pz.progress': ['{{a}} of {{b}} solved', '{{a}} de {{b}} resolvidos', '{{a}} problèmes résolus sur {{b}}'],
  'pwa.install': ['Install the app', 'Instalar o app', 'Installer l’app'],
  'pwa.ios': ['To install: tap Share, then "Add to Home Screen".', 'Para instalar: toque em Compartilhar e depois em "Adicionar à Tela de Início".', 'Pour installer : touchez Partager puis « Sur l’écran d’accueil ».'],
  'pwa.offline': ['You are offline. Playing the computer and studying games still work.', 'Você está offline. Jogar contra o computador e estudar partidas continua funcionando.', 'Vous êtes hors ligne. Jouer contre l’ordinateur et étudier les parties fonctionne toujours.'],

  // name reservation / recovery
  'pf.globalNote': ['Names are reserved: nobody else can use yours.', 'Os nomes são reservados: ninguém mais pode usar o seu.', 'Les noms sont réservés : personne d’autre ne peut utiliser le vôtre.'],
  'pf.taken': ['This name is already taken. Please choose another.', 'Este nome já está em uso. Escolha outro.', 'Ce nom est déjà pris. Choisissez-en un autre.'],
  'pf.invalid': ['Use 2 to 20 letters, numbers, spaces, dots or dashes.', 'Use de 2 a 20 letras, números, espaços, pontos ou hifens.', 'Utilisez 2 à 20 lettres, chiffres, espaces, points ou tirets.'],
  'pf.network': ['Could not reach the ranking server. Check your internet and try again.', 'Não foi possível falar com o servidor do ranking. Confira a internet e tente de novo.', 'Impossible de joindre le serveur du classement. Vérifiez votre connexion et réessayez.'],
  'pf.available': ['Available', 'Disponível', 'Disponible'],
  'pf.checking': ['Checking...', 'Verificando...', 'Vérification...'],
  'pf.restore': ['I already have this name on another device', 'Já tenho este nome em outro aparelho', 'J’ai déjà ce nom sur un autre appareil'],
  'pf.restoreHint': ['Type your name above and your recovery code.', 'Digite seu nome acima e o seu código de recuperação.', 'Saisissez votre nom ci-dessus et votre code de récupération.'],
  'pf.restoreGo': ['Restore', 'Restaurar', 'Restaurer'],
  'pf.restoreFail': ['That name and code do not match.', 'Esse nome e esse código não combinam.', 'Ce nom et ce code ne correspondent pas.'],
  'pf.codeTitle': ['Your recovery code', 'Seu código de recuperação', 'Votre code de récupération'],
  'pf.codeSub': ['Write it down or copy it. It proves this name is yours and lets you play on another device. Nobody else can see it.', 'Anote ou copie. Ele prova que este nome é seu e permite jogar em outro aparelho. Ninguém mais consegue vê-lo.', 'Notez-le ou copiez-le. Il prouve que ce nom est à vous et permet de jouer sur un autre appareil. Personne d’autre ne peut le voir.'],
  'pf.codePh': ['XXXX-XXXX-XXXX-XXXX', 'XXXX-XXXX-XXXX-XXXX', 'XXXX-XXXX-XXXX-XXXX'],
  'pf.copy': ['Copy code', 'Copiar código', 'Copier le code'],
  'pf.copied': ['Copied!', 'Copiado!', 'Copié !'],
  'pf.continue': ['Continue', 'Continuar', 'Continuer'],
  'rk.localOnly': ['This list shows only the players on this device. The worldwide ranking is not enabled yet.', 'Esta lista mostra só os jogadores deste aparelho. O ranking mundial ainda não está ativado.', 'Cette liste ne montre que les joueurs de cet appareil. Le classement mondial n’est pas encore activé.'],
  // profile / ranking
  'nav.ranking': ['Ranking', 'Ranking', 'Classement'],
  'pf.title': ['What is your name?', 'Qual é o seu nome?', 'Quel est votre nom ?'],
  'pf.sub': ['Your name appears in online games and in the ranking.', 'Seu nome aparece nos jogos online e no ranking.', 'Votre nom apparaît dans les parties en ligne et dans le classement.'],
  'pf.ph': ['Your name', 'Seu nome', 'Votre nom'],
  'pf.save': ['Save', 'Salvar', 'Enregistrer'],
  'pf.short': ['Please type at least 2 letters.', 'Digite pelo menos 2 letras.', 'Saisissez au moins 2 lettres.'],
  'pf.change': ['Change player', 'Trocar de jogador', 'Changer de joueur'],
  'pf.setName': ['Set your name', 'Defina seu nome', 'Votre nom'],
  'pf.switch': ['Other players on this device:', 'Outros jogadores neste aparelho:', 'Autres joueurs sur cet appareil :'],
  'rk.title': ['Ranking', 'Ranking', 'Classement'],
  'rk.sub': ['Every game counts, against the computer or against a real person. Win to climb.', 'Toda partida conta, contra o computador ou contra uma pessoa de verdade. Vença para subir.', 'Chaque partie compte, contre l’ordinateur ou contre une vraie personne. Gagnez pour monter.'],
  'rk.local': ['On this device', 'Neste aparelho', 'Sur cet appareil'],
  'rk.global': ['Worldwide', 'Mundial', 'Mondial'],
  'rk.empty': ['No games yet. Play one to enter the ranking!', 'Ainda não há partidas. Jogue uma para entrar no ranking!', 'Aucune partie pour l’instant. Jouez pour entrer au classement !'],
  'rk.loading': ['Loading...', 'Carregando...', 'Chargement...'],
  'rk.error': ['Could not load the worldwide ranking. Try again later.', 'Não foi possível carregar o ranking mundial. Tente mais tarde.', 'Impossible de charger le classement mondial. Réessayez plus tard.'],
  'rk.col.pos': ['#', '#', '#'],
  'rk.col.player': ['Player', 'Jogador', 'Joueur'],
  'rk.col.pts': ['Points', 'Pontos', 'Points'],
  'rk.col.w': ['W', 'V', 'V'],
  'rk.col.d': ['D', 'E', 'N'],
  'rk.col.l': ['L', 'D', 'D'],
  'rk.col.cpu': ['vs Computer', 'vs Computador', 'vs Ordinateur'],
  'rk.col.online': ['Online', 'Online', 'En ligne'],
  'rk.pts': ['points', 'pontos', 'points'],
  'rk.earned': ['+{{n}} points', '+{{n}} pontos', '+{{n}} points'],
  'rk.how': ['How points work', 'Como funcionam os pontos', 'Comment fonctionnent les points'],
  'rk.rule.cpu': ['Against the computer: Easy 10 points, Medium 25, Hard 50 for a win. A draw gives half.', 'Contra o computador: Fácil 10 pontos, Médio 25, Difícil 50 por vitória. O empate vale metade.', 'Contre l’ordinateur : Facile 10 points, Moyen 25, Difficile 50 pour une victoire. La nulle vaut la moitié.'],
  'rk.rule.online': ['Against a friend online: 40 points for a win, 20 for a draw.', 'Contra um amigo online: 40 pontos por vitória, 20 por empate.', 'Contre un ami en ligne : 40 points pour une victoire, 20 pour une nulle.'],
  'rk.rule.loss': ['A loss gives no points, and you never lose points you already have.', 'A derrota não dá pontos, e você nunca perde os pontos que já tem.', 'Une défaite ne rapporte rien, et vous ne perdez jamais les points acquis.'],
  'rk.rule.disc': ['If a friend disconnects, the game does not count for either player.', 'Se um amigo desconectar, a partida não conta para nenhum dos dois.', 'Si un ami se déconnecte, la partie ne compte pour personne.'],
  'rk.you': ['you', 'você', 'vous'],
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
  'on.theirTurn': ['Waiting for {{name}}\'s move...', 'Aguardando o lance de {{name}}...', 'En attente du coup de {{name}}...'],
  'on.check': ['Check!', 'Xeque!', 'Échec !'],
  'on.mateWin': ['Checkmate! You win!', 'Xeque-mate! Você venceu!', 'Échec et mat ! Vous gagnez !'],
  'on.mateLose': ['Checkmate. {{name}} wins.', 'Xeque-mate. {{name}} venceu.', 'Échec et mat. {{name}} gagne.'],
  'on.resignedMe': ['You resigned.', 'Você desistiu.', 'Vous avez abandonné.'],
  'on.resignedThem': ['{{name}} resigned. You win!', '{{name}} desistiu. Você venceu!', '{{name}} a abandonné. Vous gagnez !'],
  'on.drawAgreed': ['Draw agreed.', 'Empate por acordo.', 'Nulle par accord.'],
  'on.disconnected': ['{{name}} disconnected.', '{{name}} desconectou.', '{{name}} s’est déconnecté.'],
  'on.drawOffer': ['Offer draw', 'Propor empate', 'Proposer nulle'],
  'on.drawOffered': ['Draw offer sent.', 'Proposta de empate enviada.', 'Proposition de nulle envoyée.'],
  'on.drawAsk': ['{{name}} offers a draw.', '{{name}} propõe empate.', '{{name}} propose la nulle.'],
  'on.accept': ['Accept', 'Aceitar', 'Accepter'],
  'on.decline': ['Decline', 'Recusar', 'Refuser'],
  'on.drawDeclined': ['Draw offer declined.', 'Proposta de empate recusada.', 'Proposition de nulle refusée.'],
  'on.rematch': ['Rematch', 'Revanche', 'Revanche'],
  'on.rematchAsk': ['{{name}} wants a rematch.', '{{name}} quer a revanche.', '{{name}} veut une revanche.'],
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

// Always starts in English. A language the visitor picked earlier is remembered.
let lang = 'en';
try {
  const saved = localStorage.getItem('gunmetal.lang');
  if (saved && IDX[saved] !== undefined) lang = saved;
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
  let s = lang === 'es' ? ((ES_UI && ES_UI[key]) || (e ? e[0] : key)) : (e ? (e[IDX[lang]] || e[0]) : key);
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
let ES_UI = null;
export async function loadContent(l = lang) {
  CONTENT = null; ES_UI = null;
  if (l === 'es') { ES_UI = (await import('./i18n/ui.es.js')).default; CONTENT = (await import('./i18n/games.es.js')).default; return; }
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
