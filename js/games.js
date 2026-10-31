// Famous games library. Moves are historical facts; commentary and stories are original.
// Comment keys: "9.Nf5" = White's 9th move, "9...Qg6" = Black's 9th move (check/mate signs and !? are ignored).
// Fields: level (Beginner|Intermediate|Advanced), era (Timeless|Romantic|Classical|Modern),
// opening, players (names used by the player filter), tags (themes), story (paragraphs).

export const GAMES = [
  /* ---------------------------- BEGINNER ---------------------------- */
  {
    id: 'fools-mate',
    title: "Fool's Mate",
    white: 'The Unlucky White Player', black: 'The Lucky Black Player',
    event: 'The shortest possible game', year: '', era: 'Timeless',
    result: '0-1', level: 'Beginner',
    opening: "Fool's Mate (1.f3 e5 2.g4)", players: [],
    tags: ['Trap', 'Mate'],
    intro: "The fastest checkmate in chess: just two moves by Black. It only happens if White plays the two worst moves on the board, but it shows why you must never open the diagonal to your own king.",
    lesson: "Every move changes which squares around your king are safe. Before moving a pawn in front of your king, ask what diagonal or file it opens.",
    story: [
      "Fool's Mate is the shortest possible checkmate in a game where both sides play legal moves. Because it needs White to cooperate fully, it almost never happens in real games, but it has been used for centuries to show beginners how fragile a king can be.",
      "The key is the weakened diagonal e1-h4. After 1.f3 and 2.g4, nothing protects the king from the queen coming to h4.",
      "Black's version, with the roles reversed, is a bit longer and is called the Scholar's Mate. Both are lessons in the same idea: guard your king and pay attention to long diagonals."
    ],
    pgn: '1. f3 e5 2. g4 Qh4#',
    comments: {
      '1.f3': "The first mistake. This pawn move blocks the knight's best square and opens the diagonal toward the king.",
      '2.g4': "The fatal second mistake. Now the diagonal from h4 to e1 is wide open.",
      '2...Qh4#': "Checkmate in two moves. The king cannot move, cannot capture the queen and no piece can block."
    }
  },
  {
    id: 'scholars-mate',
    title: "Scholar's Mate",
    white: 'The Quick Attack', black: 'The Careless Defender',
    event: 'Classic beginner trap', year: '', era: 'Timeless',
    result: '1-0', level: 'Beginner',
    opening: 'Italian-style attack on f7', players: [],
    tags: ['Trap', 'Opening', 'Mate'],
    intro: "The fastest checkmate most players ever see. It only works when Black ignores the threat to f7, but learning how to stop it teaches two big lessons: guard your weakest square, and don't rush your queen out alone.",
    lesson: "Defend f7 with ...g6, ...Qe7 or ...Nh6 and the attack fizzles. If you play the trick yourself, remember a good opponent will punish an early queen.",
    story: [
      "Almost every chess player falls for, or tries, Scholar's Mate in their first weeks. It is called that because it is the sort of trap schoolchildren (scholars) play on each other.",
      "The idea is simple: the f7 pawn is protected only by the king at the start. Bishop and queen both aim there, and if Black does not notice, the game ends in four moves.",
      "Strong players treat it as a warning more than a weapon. Even when it does not work, an early queen can be chased away, so use it to learn the pattern and then move on to real development."
    ],
    pgn: '1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7#',
    comments: {
      '1.e4': "White claims the center and opens lines for the bishop and queen.",
      '2.Bc4': "The bishop eyes f7. At the start, f7 is guarded only by the king, which makes it the weakest point in Black's camp.",
      '3.Qh5': "The queen joins in. It attacks the e5 pawn and, together with the bishop, threatens Qxf7 checkmate.",
      '3...Nf6': "Black attacks the queen, which looks natural, but it ignores the real threat. ...g6 would have kicked the queen away safely.",
      '4.Qxf7#': "Checkmate. The queen is protected by the bishop and the king has no escape squares."
    }
  },
  {
    id: 'legal-mate',
    title: "Legal's Mate",
    white: 'Sire de Légal', black: 'Saint Brie',
    event: 'Paris (traditional)', year: '1750', era: 'Romantic',
    result: '1-0', level: 'Beginner',
    opening: 'Italian Game, Philidor-style setup', players: ['Sire de Légal'],
    tags: ['Sacrifice', 'Trap', 'Mate'],
    intro: "One of the oldest and prettiest traps in chess: White gives up the queen so that three minor pieces can deliver checkmate. The idea works any time Black grabs the queen carelessly with a pinned knight.",
    lesson: "Before capturing a big piece, ask why the opponent allowed it. A free queen is often a trap.",
    story: [
      "The trap carries the name of Sire de Légal, a Parisian master of the 1700s who is said to have taught the great François-André Danican Philidor. It is credited as one of the first famous queen sacrifices in chess history.",
      "The setup is subtle. Black's bishop pins White's knight to the queen, so Black thinks he can win material. White simply ignores the pin.",
      "The final picture, with a knight and a bishop delivering mate and Black's own pieces blocking his king, is a model of a 'smothered' style checkmate that every beginner should know."
    ],
    pgn: '1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6 5. Nxe5 Bxd1 6. Bxf7+ Ke7 7. Nd5#',
    comments: {
      '3...Bg4': "Black pins the knight on f3 to White's queen. It looks strong, but it removes a defender from the center.",
      '4...g6': "A mistake. Black should have dealt with the knight on c3 and the loose e5 pawn first.",
      '5.Nxe5!': "The surprise. White ignores the pin and offers the queen. If Black takes it, the trap springs.",
      '5...Bxd1': "Black takes the queen, falling into the trap.",
      '6.Bxf7+': "The bishop checks the king and forces it to move to e7.",
      '7.Nd5#': "Checkmate with knight and bishop, and Black's own pieces blocking the escape. Two minor pieces and a knight on e5 are all it takes."
    }
  },
  {
    id: 'gibaud-lazard-1924',
    title: 'Gibaud vs Lazard',
    white: 'Gibaud', black: 'Lazard',
    event: 'Paris', year: '1924', era: 'Classical',
    result: '0-1', level: 'Beginner',
    opening: "Queen's Pawn, Englund-style gambit", players: ['Gibaud', 'Lazard'],
    tags: ['Trap', 'Sacrifice', 'Mate'],
    intro: "A six-move miniature where Black wins with a spectacular knight sacrifice followed by a quick queen mate. It is a favorite example of how a greedy pawn grab can lose the game instantly.",
    lesson: "When an opponent offers a piece, check every forcing line first. Here, the capture on e3 forced White's pawn to open the king's diagonal.",
    story: [
      "This short game from a Paris event in 1924 is one of the best-known miniatures with a sacrificial finish. It is often used in teaching because the whole combination fits in a few moves.",
      "White grabs a pawn and tries to kick the knight away with the natural-looking h3. That is the mistake.",
      "Black's knight sacrifice on e3 forces White to recapture with the f-pawn, which opens the e1-h4 diagonal and lets the queen deliver mate on g3."
    ],
    pgn: '1. d4 Nf6 2. Nd2 e5 3. dxe5 Ng4 4. h3 Ne3 5. fxe3 Qh4+ 6. g3 Qxg3#',
    comments: {
      '2...e5': "A gambit. Black offers a pawn to get fast piece activity and chances against the king.",
      '3.dxe5': "White accepts the pawn, but this is where the danger starts.",
      '3...Ng4': "The knight attacks e5 and eyes the f2 and e3 squares near White's king.",
      '4.h3?': "A natural-looking move that attacks the knight, but it walks into a trap. Ngf3 was safer.",
      '4...Ne3!!': "The brilliant sacrifice. If White takes the knight, the f-pawn leaves the king's diagonal.",
      '5.fxe3': "White captures. Now the e1-h4 diagonal is open to Black's queen.",
      '5...Qh4+': "Check. White cannot block with the e-pawn or the f-pawn.",
      '6.g3': "The only way to block, but the pawn is not protected enough.",
      '6...Qxg3#': "Checkmate. The queen takes the pawn with check and the king has no escape."
    }
  },
  {
    id: 'tartakower-reti-1910',
    title: 'Tartakower vs Réti',
    white: 'Savielly Tartakower', black: 'Richard Réti',
    event: 'Vienna', year: '1910', era: 'Classical',
    result: '1-0', level: 'Beginner',
    opening: 'Caro-Kann Defence', players: ['Savielly Tartakower', 'Richard Réti'],
    tags: ['Queen sacrifice', 'Trap', 'Mate'],
    intro: "An 11-move miniature famous for a queen sacrifice and a double check. Black's king is driven to a position where two minor pieces deliver checkmate.",
    lesson: "Greedy captures can lose to a forcing sequence. Here Black took a free knight and missed the queen sacrifice that follows.",
    story: [
      "Savielly Tartakower and Richard Réti were two of the leading masters of the early 1900s. Both would help shape modern chess, Tartakower with his wit and Réti with the hypermodern ideas he promoted.",
      "In this game from Vienna, Réti played the Caro-Kann Defence but chose a risky plan that opened the center too early.",
      "Tartakower punished him with a clever queen sacrifice on d8, followed by a double check that left the king with only one move. It became a standard example of a combination every player should recognize."
    ],
    pgn: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Qd3 e5 6. dxe5 Qa5+ 7. Bd2 Qxe5 8. O-O-O Nxe4 9. Qd8+ Kxd8 10. Bg5+ Kc7 11. Bd8#',
    comments: {
      '1...c6': "The Caro-Kann Defence, a solid choice that prepares ...d5.",
      '5.Qd3': "White develops the queen and eyes the e4 knight exchange. This queen move also prepares later tricks.",
      '5...e5?!': "A risky break. It opens the center while Black is still not fully developed.",
      '6.dxe5': "White opens the d-file. The black queen will have to check and then take on e5.",
      '8.O-O-O': "White castles long, placing a rook on the open d-file and creating a hidden threat.",
      '8...Nxe4': "The greedy capture. It looks like Black wins a piece, but it loses by force.",
      '9.Qd8+!!': "The queen sacrifice. The king must take, and the d-file opens for the rook and bishop.",
      '10.Bg5+': "A double check from the bishop and rook. The king can only step to c7.",
      '11.Bd8#': "Checkmate. The bishop on d8 is protected by the rook, and Black's own pieces block the escape."
    }
  },

  /* ---------------------------- INTERMEDIATE ---------------------------- */
  {
    id: 'opera-game',
    title: 'The Opera Game',
    white: 'Paul Morphy', black: 'Duke of Brunswick & Count Isouard',
    event: 'Paris Opera House', year: '1858', era: 'Romantic',
    result: '1-0', level: 'Intermediate',
    opening: 'Philidor Defence', players: ['Paul Morphy'],
    tags: ['Sacrifice', 'Queen sacrifice', 'Mate', 'Brilliancy'],
    intro: "Played during a performance at the Paris Opera. Morphy, the greatest player of his era, gives a perfect lesson: develop quickly, fight for the center, and open lines when the enemy king is still uncastled. It is often the first famous game a student studies.",
    lesson: "Every Morphy move develops a piece or creates a threat. When his opponents lagged in development, he sacrificed material to punish them.",
    story: [
      "In 1858 the young American Paul Morphy was in Paris and had beaten the best players in Europe. The story goes that he was invited to the opera by the Duke of Brunswick and Count Isouard, who played together as allies against him in a private box during a performance of Bellini's Norma.",
      "Morphy was said to have been irritated by their slow play and the fact that they paid more attention to the opera than to the game. He played quickly and with purpose, and the Duke and Count could not keep up.",
      "The game is now the standard introduction to chess strategy: develop with threats, open the center, and sacrifice when the opponent's king is stuck. Nearly every chess book begins with it."
    ],
    pgn: '1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8#',
    comments: {
      '2...d6': "The Philidor Defence. It is solid but passive, and it hems in Black's own pieces.",
      '3.d4': "Morphy challenges the center at once and prepares to open the position.",
      '3...Bg4': "Black pins the knight, but developing the bishop this way costs time.",
      '5.Qxf3': "After the trade, White's queen comes out with a purpose: it aims at f7 and b7.",
      '6.Bc4': "Queen and bishop now both bear down on f7. Morphy is building threats with every move.",
      '7.Qb3': "A double attack on f7 and b7. Black can only save one of them easily.",
      '7...Qe7': "Black defends f7 and offers to give up the b7 pawn.",
      '8.Nc3': "Morphy declines the pawn. Grabbing b7 would let Black trade queens and relax. He keeps developing instead.",
      '9.Bg5': "A pin: if the f6 knight moves, the queen on e7 is attacked.",
      '10.Nxb5!': "The first sacrifice. The knight opens lines against Black's king and the b-file.",
      '11.Bxb5+': "The bishop checks, and Black's pieces are tied up.",
      '12.O-O-O': "Castling brings the last piece, the a1 rook, into the attack with the king safe on c1.",
      '13.Rxd7!': "A rook sacrifice to remove the defender of the pinned knight.",
      '16.Qb8+!!': "The famous queen sacrifice. Black must capture with the knight, which opens d8 for the finishing blow.",
      '17.Rd8#': "Checkmate. The rook delivers it, protected by the bishop on g5."
    }
  },
  {
    id: 'lasker-thomas-1912',
    title: 'Lasker vs Thomas',
    white: 'Edward Lasker', black: 'Sir George Thomas',
    event: 'London', year: '1912', era: 'Classical',
    result: '1-0', level: 'Intermediate',
    opening: 'Dutch Defence', players: ['Edward Lasker', 'George Thomas'],
    tags: ['Queen sacrifice', 'Attack', 'Mate', 'Brilliancy'],
    intro: "One of the most famous attacking games ever. White sacrifices the queen on h7, then hunts the black king across the entire board until checkmate on d2.",
    lesson: "The queen is worth more than any other piece, but not more than a forced mate. Look for forcing checks when the king has few defenders.",
    story: [
      "Edward Lasker, a German-American engineer and a strong Go player, was no relation to World Champion Emanuel Lasker. His opponent, Sir George Thomas, was an English baronet who also excelled at badminton and tennis.",
      "Thomas chose the Dutch Defence and weakened his own kingside with his pawn moves. Lasker was ready.",
      "After the queen sacrifice on h7, the black king walks from h7 all the way to g1, harassed by checks at every step. The game is a favorite among chess writers for exactly that picture: a king chased across the board."
    ],
    pgn: '1. d4 e6 2. Nf3 f5 3. Nc3 Nf6 4. Bg5 Be7 5. Bxf6 Bxf6 6. e4 fxe4 7. Nxe4 b6 8. Ne5 O-O 9. Bd3 Bb7 10. Qh5 Qe7 11. Qxh7+ Kxh7 12. Nxf6+ Kh6 13. Neg4+ Kg5 14. h4+ Kf4 15. g3+ Kf3 16. Be2+ Kg2 17. Rh2+ Kg1 18. Kd2#',
    comments: {
      '2...f5': "The Dutch Defence. It fights for e4 but weakens the black king's position.",
      '5.Bxf6': "White trades the knight, removing a key defender of the kingside.",
      '8.Ne5': "A powerful central knight. It supports the attack on h7 and g6.",
      '10.Qh5': "The queen joins the attack and eyes h7, with the knight and bishop already aiming there.",
      '11.Qxh7+!!': "The legendary queen sacrifice. Black's king is pulled out of its shelter.",
      '12.Nxf6+': "The knight takes with check, forcing the king to h6.",
      '14.h4+': "The pawn joins the hunt. The king has no safe squares left.",
      '16.Be2+': "The bishop checks the king on f3 and forces it to g2.",
      '17.Rh2+': "The rook adds another check. Black's king has to go to g1.",
      '18.Kd2#': "A quiet-looking king move that delivers checkmate: it uncovers a check from the rook along the first rank, and Black's king has no escape."
    }
  },
  {
    id: 'rotlewi-rubinstein-1907',
    title: "Rubinstein's Immortal",
    white: 'Georg Rotlewi', black: 'Akiba Rubinstein',
    event: 'Łódź', year: '1907', era: 'Classical',
    result: '0-1', level: 'Intermediate',
    opening: "Queen's Gambit (Tarrasch-style)", players: ['Akiba Rubinstein', 'Georg Rotlewi'],
    tags: ['Sacrifice', 'Attack', 'Brilliancy', 'Mate'],
    intro: "Known as Rubinstein's Immortal. Black gives up a queen, a rook and then another rook, and wins with a quiet rook move that decides the game on the spot.",
    lesson: "Pieces do not need to be kept at all costs. If their activity is overwhelming, even large sacrifices can leave your opponent helpless.",
    story: [
      "Akiba Rubinstein was one of the strongest players in the world in the early 1900s, a rook endgame genius who never got a match for the world title. This game from Łódź in 1907 is often chosen as his best attacking performance.",
      "Rotlewi played aggressively against Rubinstein's setup, but Rubinstein was ready with an astonishing series of sacrifices.",
      "The key idea is the rook sacrifice on c3, followed by a rook jump to d2. White's queen has no good square and White ends up facing mate threats while down in material."
    ],
    pgn: '1. d4 d5 2. Nf3 e6 3. e3 c5 4. c4 Nc6 5. Nc3 Nf6 6. dxc5 Bxc5 7. a3 a6 8. b4 Bd6 9. Bb2 O-O 10. Qd2 Qe7 11. Bd3 dxc4 12. Bxc4 b5 13. Bd3 Rd8 14. Qe2 Bb7 15. O-O Ne5 16. Nxe5 Bxe5 17. f4 Bc7 18. e4 Rac8 19. e5 Bb6+ 20. Kh1 Ng4 21. Be4 Qh4 22. g3 Rxc3 23. gxh4 Rd2 24. Qxd2 Bxe4+ 25. Qg2 Rh3',
    comments: {
      '6.dxc5': "White wins the pawn but gives Black's bishops active squares and time to develop.",
      '8.b4': "White tries to kick the bishop away, but it weakens the queenside.",
      '12...b5': "Black gains space and kicks the bishop. His pieces are now ready for action.",
      '16...Bxe5': "Black recaptures with the bishop, which now eyes the a1-h8 diagonal and the white king.",
      '19.e5': "White gains space and closes the bishop's diagonal, but this opens the a7-g1 diagonal to White's own king.",
      '19...Bb6+': "Check. The bishop forces White's king to the corner.",
      '21...Qh4': "A quiet but deadly move. The queen threatens to take on h2 and the knight on g4 supports the attack.",
      '22...Rxc3!!': "The stunning rook sacrifice. If White takes, his king is exposed to unstoppable threats.",
      '23...Rd2!!': "Another quiet move. The rook cannot be taken without losing the queen to a discovered attack.",
      '24...Bxe4+': "The bishop captures with check, and White's queen must block on g2, where it will be pinned.",
      '25...Rh3': "The rook cannot be captured because the queen on g2 is pinned by the bishop. White resigned."
    }
  },
  {
    id: 'immortal-game',
    title: 'The Immortal Game',
    white: 'Adolf Anderssen', black: 'Lionel Kieseritzky',
    event: 'London, informal game', year: '1851', era: 'Romantic',
    result: '1-0', level: 'Intermediate',
    opening: "King's Gambit Accepted", players: ['Adolf Anderssen', 'Lionel Kieseritzky'],
    tags: ['Sacrifice', 'Queen sacrifice', 'Attack', 'Mate', 'Brilliancy'],
    intro: "Played in London during the first international tournament, this game is the symbol of the Romantic era of chess. Anderssen sacrifices a bishop, both rooks and his queen, then checkmates with the three pieces he has left.",
    lesson: "Material is only a means to an end. If your pieces are more active and the enemy king is exposed, material can be given up to deliver mate.",
    story: [
      "In 1851 London hosted the first international chess tournament, and Adolf Anderssen, a mathematics teacher from Breslau, went on to win it. During the event he played this informal game against Lionel Kieseritzky, an Estonian-born player living in Paris.",
      "Kieseritzky is said to have been proud of the game despite losing it, and it was published in a Paris chess magazine. The name 'Immortal Game' was given later, in the 1850s.",
      "It became the most celebrated example of the Romantic style, which valued attacking brilliance and sacrifice over cautious play. Modern computers say that Black missed good chances, but the beauty of the finale has not faded."
    ],
    pgn: '1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7#',
    comments: {
      '2.f4': "The King's Gambit. White offers a pawn for fast development and an open f-file, a very popular opening in the 1800s.",
      '3...Qh4+': "Black's queen checks and forces White to lose the right to castle.",
      '4.Kf1': "White accepts losing castling rights and trusts piece activity.",
      '4...b5': "A counter-gambit. Black offers a pawn to pull the bishop away from c4.",
      '10.g4': "Anderssen keeps attacking with pawns instead of retreating, an extremely bold choice.",
      '11.Rg1!?': "Instead of saving his bishop, White opens the g-file. Both sides are racing toward the other king.",
      '17.Nd5': "A powerful central knight. It threatens Black's queen and sets up the Nxg7+ and Qf6 ideas.",
      '17...Qxb2': "Greedy. Black grabs a pawn and sends the queen far from its own king.",
      '18.Bd6!': "The beautiful bishop move. It cuts the black queen off from defense and prepares the final attack.",
      '19.e5!': "Another quiet move. White ignores the hanging rook on g1 and tightens the net.",
      '20.Ke2': "White's king steps aside. Black has a queen and rook extra but no way to stop the attack.",
      '21.Nxg7+': "The knight check drags the king to d8.",
      '22.Qf6+!!': "The immortal queen sacrifice. Black's knight must take, closing the king's escape.",
      '23.Be7#': "Checkmate, with only a bishop and two knights. White has given up queen and both rooks."
    }
  },
  {
    id: 'evergreen-game',
    title: 'The Evergreen Game',
    white: 'Adolf Anderssen', black: 'Jean Dufresne',
    event: 'Berlin, casual game', year: '1852', era: 'Romantic',
    result: '1-0', level: 'Intermediate',
    opening: 'Evans Gambit', players: ['Adolf Anderssen', 'Jean Dufresne'],
    tags: ['Sacrifice', 'Queen sacrifice', 'Attack', 'Mate', 'Brilliancy'],
    intro: "Another Anderssen masterpiece. It gets its name from the fact it stays fresh and exciting. White opens with the Evans Gambit and then plays one of the deepest combinations of the era.",
    lesson: "Sacrificing material for development works best when you can open lines toward the king. Count your attackers and your open lines before sacrificing.",
    story: [
      "A year after his triumph in London, Anderssen played this casual game in Berlin against Jean Dufresne, a young German master. The game was published and later admired by the first official world champion, Wilhelm Steinitz, who gave it the name Evergreen.",
      "White opens with the Evans Gambit, giving a pawn for rapid development. Black's king never quite finds safety.",
      "The game ends with a flurry of sacrifices, including the queen on d7, that leave Black facing checkmate in the center. It is often placed alongside the Immortal Game as the best of the Romantic era."
    ],
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3 8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6 14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3 20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7#',
    comments: {
      '4.b4': "The Evans Gambit. White offers a pawn to gain time and control of the center.",
      '6.d4': "White opens the center and uses the extra tempo to attack.",
      '7...d3': "Black pushes the pawn to d3 to cramp White. White will win it back later with Bxd3.",
      '9.e5': "The e-pawn thrusts forward, driving Black's queen and keeping Black's pieces from developing.",
      '11.Ba3': "The bishop covers e7 and keeps Black's king stuck in the center.",
      '17.Nf6+!': "The first sacrifice. The knight check pulls apart Black's king side.",
      '18.exf6': "The pawn on f6 cramps Black. Mate threats begin to gather.",
      '19.Rad1': "Anderssen brings his last piece into play and ignores the attack on his queen.",
      '20.Rxe7+!': "A rook sacrifice to deflect the defender.",
      '21.Qxd7+!!': "The queen sacrifice. The king is pulled out into the open.",
      '22.Bf5+': "The bishop starts chasing the king with check after check.",
      '24.Bxe7#': "Checkmate. White has sacrificed both rooks and the queen and finishes with minor pieces."
    }
  },
  {
    id: 'deep-blue-kasparov-1997-g6',
    title: 'Deep Blue vs Kasparov, Game 6',
    white: 'Deep Blue (IBM)', black: 'Garry Kasparov',
    event: 'Rematch, New York', year: '1997', era: 'Modern',
    result: '1-0', level: 'Intermediate',
    opening: 'Caro-Kann Defence', players: ['Garry Kasparov', 'Deep Blue'],
    tags: ['Man vs Machine', 'Sacrifice', 'History'],
    intro: "The final game of the 1997 rematch. It was the first time a computer beat a reigning world champion in a match under standard time controls. Kasparov plays a risky line, gets confused about move order, and falls to a knight sacrifice.",
    lesson: "Know your opening line well. A single wrong move order can turn a good opening into a loss, even against a mere machine.",
    story: [
      "In 1996 Garry Kasparov beat IBM's Deep Blue 4-2 in Philadelphia, though the computer won the first game. In 1997 a stronger, upgraded Deep Blue came to New York for a rematch.",
      "The match went to the last game, which was tied at 2.5 points each. Kasparov chose the Caro-Kann Defence and played an unusual move order that went wrong at move 7.",
      "Deep Blue sacrificed a knight on e6 and Kasparov resigned after only 19 moves. He later said he felt something intelligent was behind the computer's moves. It remains one of the most discussed moments in the history of artificial intelligence."
    ],
    pgn: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3 h6 8. Nxe6 Qe7 9. O-O fxe6 10. Bg6+ Kd8 11. Bf4 b5 12. a4 Bb7 13. Re1 Nd5 14. Bg3 Kc8 15. axb5 cxb5 16. Qd3 Bc6 17. Bf5 exf5 18. Rxe7 Bxe7 19. c4 1-0',
    comments: {
      '1...c6': "Kasparov chooses the solid Caro-Kann Defence.",
      '5.Ng5': "A known attacking try. The knight aims at f7 and e6.",
      '7...h6?': "A mistake. The right move was 7...Bd6. Kasparov mixed up his lines.",
      '8.Nxe6!': "The knight sacrifice. White gives up a piece to tear open Black's king.",
      '8...Qe7': "Black's queen steps aside. After White castles Black will win the knight with ...fxe6, but his king is stuck in the center.",
      '10.Bg6+': "The bishop check drives the king to d8.",
      '14.Bg3': "White keeps up the pressure while Black's pieces are stuck.",
      '16.Qd3': "The queen switches to the attack and prepares a decisive sacrifice.",
      '17.Bf5': "A final bishop sacrifice to open lines to Black's king.",
      '18.Rxe7': "White wins the queen and keeps a large positional advantage.",
      '19.c4': "Kasparov resigned. The match went to Deep Blue, 3.5 to 2.5."
    }
  },

  /* ---------------------------- ADVANCED ---------------------------- */
  {
    id: 'game-of-the-century',
    title: 'The Game of the Century',
    white: 'Donald Byrne', black: 'Bobby Fischer',
    event: 'Rosenwald Memorial, New York', year: '1956', era: 'Modern',
    result: '0-1', level: 'Advanced',
    opening: 'Grünfeld Defence', players: ['Bobby Fischer', 'Donald Byrne'],
    tags: ['Queen sacrifice', 'Sacrifice', 'Attack', 'Brilliancy'],
    intro: "Thirteen-year-old Bobby Fischer, playing Black against an International Master, sacrifices his queen to build a devastating attack. It was named the Game of the Century by Hans Kmoch and made Fischer famous.",
    lesson: "Fischer saw that the queen was less important than the activity of all his remaining pieces. Sometimes the right trade is quality for time and position.",
    story: [
      "In October 1956, at the Marshall Chess Club in New York, a 13-year-old Bobby Fischer sat down against Donald Byrne, a strong American International Master. Few expected the boy to do more than hold his own.",
      "Fischer allowed his opponent to build pressure, and then played the stunning 17...Be6!, an offer of his queen. After White took it, a series of knight checks and a quiet bishop retreat left White's pieces tied in knots.",
      "Chess writer Hans Kmoch called it the Game of the Century. Fischer would go on to become the youngest grandmaster at that time, and in 1972 the World Champion."
    ],
    pgn: '1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2#',
    comments: {
      '4...O-O': "Fischer castles into a Grünfeld-style setup: pieces ready, fianchettoed bishop, pressure on the center.",
      '6.Qb3': "White attacks d5 and b7. Black takes the pawn and challenges the queen.",
      '10.Qc5': "White's queen goes hunting and loses time. Fischer will exploit the lack of development.",
      '11...Na4!': "A powerful knight jump. It attacks the queen and starts a series of forcing moves.",
      '13...Nxe4!': "Fischer sacrifices a piece to unleash his pieces against the king in the center.",
      '14.Bxe7': "Byrne grabs material. Fischer has a surprise ready.",
      '17...Be6!!': "The famous move. Fischer offers his queen: if White takes it, Black's pieces win by force with knights and bishop.",
      '18.Bxb6': "White takes the queen, but it is too late to defend.",
      '19...Ne2+': "A series of knight checks begins. The white king shuffles between f1 and g1.",
      '23...axb6': "Fischer has given up his queen, but his rooks, bishop and knight are all active while White's pieces are tied down.",
      '41...Rc2#': "Checkmate. Black's rook, knights and bishop have coordinated perfectly."
    }
  },
  {
    id: 'fischer-spassky-1972-g6',
    title: 'Fischer vs Spassky, Game 6',
    white: 'Bobby Fischer', black: 'Boris Spassky',
    event: 'World Championship, Reykjavik', year: '1972', era: 'Modern',
    result: '1-0', level: 'Advanced',
    opening: "Queen's Gambit Declined", players: ['Bobby Fischer', 'Boris Spassky'],
    tags: ['Positional', 'World Championship', 'Brilliancy'],
    intro: "In this famous game Fischer opened with 1.c4, something he had almost never played. It is considered one of the best-played games in World Championship history, so smooth that Spassky applauded his opponent.",
    lesson: "A clear plan beats a flashy one. Fischer improved his position step by step, then broke open the board in the center at exactly the right moment.",
    story: [
      "The 1972 World Championship in Reykjavik, Iceland, pitted the American Bobby Fischer against the Soviet champion Boris Spassky at the height of the Cold War. It was the most publicized chess match in history.",
      "Fischer had lost the first game and forfeited the second, and then won Game 3 and drew others. In Game 6, he surprised Spassky by opening with 1.c4 instead of his usual 1.e4, a line he had almost never played.",
      "Fischer won the game with quiet and powerful play, and the story goes that Spassky applauded him at the end. Fischer went on to win the match 12.5 to 8.5 and became the 11th World Champion, ending a long period of Soviet dominance."
    ],
    pgn: '1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7 32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6 38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0',
    comments: {
      '1.c4': "The English Opening. Fischer surprised the world: until this game he almost always played 1.e4.",
      '3.d4': "White transposes into a Queen's Gambit Declined, a well-known structure.",
      '9.Bxe7': "A standard trade of the dark-squared bishops. White wants a lasting positional pull.",
      '10.Nxd5': "White simplifies and leaves Black with an isolated pawn on d5.",
      '12.Qa4': "The queen pressures the c-file and eyes the weak spots.",
      '16.O-O': "White castles and keeps everything coordinated.",
      '19.Nxe6': "A trade that fixes Black's pawn structure and weakens the d5-d4 pawn.",
      '20.e4': "White strikes in the center, clamping down on the position.",
      '22.e5': "White gains space and attacks. Black's pieces have little to do.",
      '26.f5!': "The breakthrough. Fischer opens the f-file for his rooks.",
      '31.e6!': "The decisive pawn thrust. It splits Black's defense and wins material.",
      '41.Qf4': "Black resigned. It is a perfect example of strategic domination."
    }
  },
  {
    id: 'kasparov-topalov-1999',
    title: "Kasparov's Immortal",
    white: 'Garry Kasparov', black: 'Veselin Topalov',
    event: 'Hoogovens, Wijk aan Zee', year: '1999', era: 'Modern',
    result: '1-0', level: 'Advanced',
    opening: 'Pirc Defence', players: ['Garry Kasparov', 'Veselin Topalov'],
    tags: ['Sacrifice', 'Attack', 'Brilliancy'],
    intro: "Many call this the greatest attacking game of the modern era. Kasparov, then world number one, launches a rook sacrifice on move 24 that leads the black king on a long walk across the whole board.",
    lesson: "When the opponent's king has no safe shelter and you have more active pieces, a sacrifice can create a decisive attack that cannot be stopped.",
    story: [
      "In January 1999 the Hoogovens tournament in Wijk aan Zee, the Netherlands, brought together Garry Kasparov and the young Bulgarian Veselin Topalov. Topalov would go on to win the FIDE World Championship in 2005.",
      "Kasparov built a strong position with White and then played 24.Rxd4!!, a rook sacrifice that opened the black king to a long and forced attack. Calculating it fully at the board was extraordinary.",
      "Kasparov himself thought it was one of his best games, and it is regularly voted among the greatest games ever played. Its main lesson is that a king in the open can be hunted by pieces from all sides."
    ],
    pgn: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. O-O-O Qe7 12. Kb1 a6 13. Nc1 O-O-O 14. Nb3 exd4 15. Rxd4 c5 16. Rd1 Nb6 17. g3 Kb8 18. Na5 Ba8 19. Bh3 d5 20. Qf4+ Ka7 21. Rhe1 d4 22. Nd5 Nbxd5 23. exd5 Qd6 24. Rxd4 cxd4 25. Re7+ Kb6 26. Qxd4+ Kxa5 27. b4+ Ka4 28. Qc3 Qxd5 29. Ra7 Bb7 30. Rxb7 Qc4 31. Qxf6 Kxa3 32. Qxa6+ Kxb4 33. c3+ Kxc3 34. Qa1+ Kd2 35. Qb2+ Kd1 36. Bf1 Rd2 37. Rd7 Rxd7 38. Bxc4 bxc4 39. Qxh8 Rd3 40. Qa8 c3 41. Qa4+ Ke1 42. f4 f5 43. Kc1 Rd2 44. Qa7 1-0',
    comments: {
      '1.e4': "Kasparov opens with his king's pawn, and Topalov answers with the Pirc Defence.",
      '4.Be3': "White sets up the 150 Attack with Be3, Qd2 and Bh6, aiming at Black's kingside.",
      '8.Bh6': "White trades off Black's strong bishop to weaken the dark squares around the king.",
      '11.O-O-O': "White castles long. Both kings will soon be in danger.",
      '13...O-O-O': "Black also castles queenside, which turns out to be risky.",
      '17...Kb8': "Black tries to improve his king, but it is still not safe.",
      '18.Na5!': "A strong knight jump that attacks the king's cover and the b7 bishop.",
      '20.Qf4+': "The queen checks and forces the king to a7, where it will be hunted for the rest of the game.",
      '22.Nd5!!': "A deep sacrifice. If Black takes, White's rooks gain access to the open d-file.",
      '24.Rxd4!!': "The great sacrifice. The rook goes to d4 and starts a combination that sends Black's king out into the open.",
      '25.Re7+': "A rook check forces the king forward into the attack.",
      '26.Qxd4+': "The queen joins the hunt.",
      '29.Ra7': "The rook threatens mate and removes Black's last defender.",
      '36.Bf1!': "A quiet move that decides the game. It threatens mate and shuts down all of Black's counterplay.",
      '39.Qxh8': "White wins a rook while the black king is stuck far from its pieces.",
      '44.Qa7': "Black resigns. Kasparov's king hunt is complete."
    }
  }
];

/* Curated collections shown at the top of the library. */
export const COLLECTIONS = [
  { id: 'traps', title: 'Quick Mates & Traps', blurb: 'Short games that end fast. Perfect for learning what to watch out for.', games: ['fools-mate', 'scholars-mate', 'legal-mate', 'gibaud-lazard-1924', 'tartakower-reti-1910'] },
  { id: 'romantic', title: 'The Romantic Era', blurb: 'When chess was a duel of daring attacks and spectacular sacrifices.', games: ['legal-mate', 'opera-game', 'immortal-game', 'evergreen-game'] },
  { id: 'queen-sacs', title: 'Queen Sacrifices', blurb: 'Giving up the most powerful piece to win the game.', games: ['tartakower-reti-1910', 'opera-game', 'lasker-thomas-1912', 'immortal-game', 'evergreen-game', 'game-of-the-century'] },
  { id: 'champions', title: 'World Champions', blurb: 'Games by Fischer and Kasparov, two of the greatest players ever.', games: ['game-of-the-century', 'fischer-spassky-1972-g6', 'kasparov-topalov-1999', 'deep-blue-kasparov-1997-g6'] },
  { id: 'brilliancies', title: 'Brilliancies', blurb: 'Games remembered for the beauty of their combinations.', games: ['opera-game', 'lasker-thomas-1912', 'rotlewi-rubinstein-1907', 'immortal-game', 'evergreen-game', 'kasparov-topalov-1999'] }
];

/* Short stories about the players. `name` must match an entry in a game's `players`. */
export const LEGENDS = [
  { name: 'Paul Morphy', years: '1837-1884', from: 'New Orleans, USA', line: 'Chess prodigy of New Orleans', bio: 'A young American who crossed the Atlantic in 1858 and beat the best players in Europe, including Adolf Anderssen. He taught the world to develop fast and open lines, then left competitive chess and returned to his law career.' },
  { name: 'Adolf Anderssen', years: '1818-1879', from: 'Breslau, Germany', line: 'The master of the sacrifice', bio: 'A mathematics teacher who won the first international tournament in London in 1851. His attacking games, the Immortal and the Evergreen, are the symbols of the Romantic era.' },
  { name: 'Edward Lasker', years: '1885-1981', from: 'Germany and the USA', line: 'Engineer, master and Go player', bio: 'A German-born American engineer who reached master strength at chess and was also an avid player of Go. He was no relation to World Champion Emanuel Lasker.' },
  { name: 'Akiba Rubinstein', years: '1880-1961', from: 'Poland', line: 'One of the greatest never to be champion', bio: 'A rook endgame genius and one of the strongest players of the early 1900s, whose attacking masterpiece against Rotlewi is called the Immortal of Łódź.' },
  { name: 'Savielly Tartakower', years: '1887-1956', from: 'Poland and France', line: 'The wit of the chess world', bio: 'A grandmaster, writer and master of the quick quip. He played hundreds of tournaments and left sayings that chess players still repeat.' },
  { name: 'Richard Réti', years: '1889-1929', from: 'Czechoslovakia and Austria', line: 'Leader of the hypermodern school', bio: 'A strong master and a writer who promoted controlling the center from a distance with pieces instead of occupying it with pawns. The Réti Opening is named after him.' },
  { name: 'Bobby Fischer', years: '1943-2008', from: 'Chicago, USA', line: 'The 11th World Champion', bio: 'A prodigy who became a grandmaster at 15 and defeated Boris Spassky in 1972 to become World Champion. He turned chess into a worldwide sensation.' },
  { name: 'Boris Spassky', years: 'born 1937', from: 'Leningrad, USSR', line: 'The 10th World Champion', bio: 'A universal player who held the World Championship from 1969 to 1972, and who famously lost it to Bobby Fischer in Reykjavik.' },
  { name: 'Garry Kasparov', years: 'born 1963', from: 'Baku, USSR', line: 'World Champion 1985-2000', bio: 'World Champion at 22 and the top-rated player in the world for most of two decades. He lost a historic match to IBM\'s Deep Blue in 1997.' },
  { name: 'Veselin Topalov', years: 'born 1975', from: 'Bulgaria', line: 'FIDE World Champion 2005', bio: 'A fighting, tactical Bulgarian grandmaster who reached the very top of the game and was the other side of Kasparov\'s famous 1999 attack.' },
  { name: 'Deep Blue', years: '1997', from: 'IBM', line: 'The machine that beat a champion', bio: 'A specialized chess supercomputer built by IBM. In 1997 it became the first computer to beat a reigning World Champion in a match under tournament conditions.' }
];
