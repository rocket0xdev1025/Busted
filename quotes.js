// Brief, attributed excerpts. CJ's signature quote stays fixed in index.html.
const source={
  vc:'https://en.wikiquote.org/wiki/Grand_Theft_Auto:_Vice_City',
  sa:'https://en.wikiquote.org/wiki/Grand_Theft_Auto:_San_Andreas',
  iv:'https://en.wikiquote.org/wiki/Grand_Theft_Auto_IV',
  ivTrailer:'https://www.grandtheftwiki.com/Niko_Bellic',
  v:'https://en.wikiquote.org/wiki/Grand_Theft_Auto_V',
  iii:'https://en.wikiquote.org/wiki/Grand_Theft_Auto_III',
  vcs:'https://www.grandtheftwiki.com/Pedestrian_Dialog_in_GTA_Vice_City_Stories',
  lcs:'https://gamefaqs.gamespot.com/psp/925776-grand-theft-auto-liberty-city-stories/faqs/42852',
  two:'https://gta.fandom.com/wiki/Dialogues_in_GTA_2',
  lost:'https://www.quotes.net/movies/grand_theft_auto_iv%3A_the_lost_and_damned_quotes_124207',
  vice:'https://en.wikiquote.org/wiki/Miami_Vice',
  viceFilm:'https://en.wikiquote.org/wiki/Miami_Vice_(film)',
  luck:'https://www.dailyscript.com/scripts/miami-vice.html'
};
const q=(text,character,game,url)=>({text,character,game,url});
export const QUOTE_POOLS={
  viceCity:[
    q('This is the last dance for Lance Vance!','Tommy Vercetti','Vice City',source.vc),
    q('Vercetti. Remember the name.','Tommy Vercetti','Vice City',source.vc),
    q('Real smooth, Lance.','Tommy Vercetti','Vice City',source.vc),
    q('Yeah. Like a woman.','Tommy Vercetti','Vice City',source.vc),
    q("Isn’t Vice City beautiful?",'Victor Vance','Vice City Stories',source.vcs),
    q("I’m a soldier, friend!",'Victor Vance','Vice City Stories',source.vcs),
    q('Blame military cutbacks.','Victor Vance','Vice City Stories',source.vcs),
    q('This is an ugly town.','Victor Vance','Vice City Stories',source.vcs),
    q('The name’s Vic, say goodbye.','Victor Vance','Vice City Stories',source.vcs)
  ],
  miamiVice:[
    q('Freeze! Miami Vice!','Ricardo Tubbs','Miami Vice · TV',source.vice),
    q('Just think straight.','Martin Castillo','Miami Vice · TV',source.vice),
    q("There’s a thin line between hard work and obsession.",'Ricardo Tubbs','Miami Vice · TV',source.vice),
    q('Make it one.','Sonny Crockett','Miami Vice · TV',source.vice),
    q('Live now. Life is short. Time is luck.','Isabella','Miami Vice · 2006',source.viceFilm),
    q('You cannot negotiate with gravity.','Sonny Crockett','Miami Vice · 2006',source.viceFilm),
    q('Luck ran out.','Sonny Crockett','Miami Vice · 2006',source.luck),
    q('As far and as fast as you can.','Sonny Crockett','Miami Vice · 2006',source.viceFilm)
  ],
  gta:[
    q('All we had to do, was follow the damn train, CJ!','Big Smoke','San Andreas',source.sa),
    q('Grove Street - Home.','Carl Johnson','San Andreas',source.sa),
    q('Life is complicated.','Niko Bellic','GTA IV',source.ivTrailer),
    q('Perhaps here, things will be different.','Niko Bellic','GTA IV',source.ivTrailer),
    q('Welcome to America!','Niko Bellic','GTA IV',source.iv),
    q('You still have integrity.','Roman Bellic','GTA IV',source.iv),
    q('Surviving is winning, Franklin.','Michael De Santa','GTA V','https://gta.fandom.com/wiki/Something_Sensible'),
    q('You forget a thousand things every day, make sure this is one of them.','Michael De Santa','GTA V','https://gamefaqs.gamespot.com/xbox360/634491-grand-theft-auto-v/trivia'),
    q('Nothing drives down real estate prices like a good old-fashioned gang war.','Donald Love','GTA III',source.iii),
    q('What are you talking about?','Lazlow Jones','GTA III',source.iii),
    q('He took my car!','Pedestrian','GTA III',source.iii),
    q('Keep the engine running.','Maria Latore','Liberty City Stories',source.lcs),
    q('A real man would have called his mother.','Ma Cipriani','Liberty City Stories',source.lcs),
    q('This is Toni Cipriani kicking your asses!','Toni Cipriani','Liberty City Stories',source.lcs),
    q('And remember, respect is everything!','Announcer','GTA 2',source.two),
    q('Not again!','Johnny Klebitz','The Lost and Damned',source.lost),
    q('Man, I am going straight to hell.','Johnny Klebitz','The Lost and Damned',source.lost),
    q('Brian, shut up.','Billy Grey','The Lost and Damned',source.lost),
    q('Mercifully not.','Johnny Klebitz','The Lost and Damned',source.lost)
  ]
};
