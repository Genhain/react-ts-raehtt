export const beers = [
  'Altbier',
  'Amber ale',
  'Barley wine',
  'Berliner Weisse',
  'Bière de Garde',
  'Bitter',
  'Blonde Ale',
  'Bock',
  'Brown ale',
  'California Common/Steam Beer',
  'Cream Ale',
  'Doppelbock',
  'Dortmunder Export',
  'Dunkel	',
  'Dunkelweizen',
  'Eisbock',
  'Flanders red ale',
  'Golden/Summer ale',
  'Gose',
  'Gueuze',
  'Hefeweizen',
  'Helles',
  'India pale ale	',
  'Kölsch	',
  'Lambic',
  'Light ale',
  'Maibock/Helles bock',
  'Malt liquor',
  'Mild',
  'Oktoberfestbier/Märzenbier',
  'Old ale	',
  'Oud bruin',
  'Pale ale',
  'Pilsener/Pilsner/Pils',
  'Porter',
  'Red ale',
  'Roggenbier',
  'Saison',
  'Schwarzbier	',
  'Scotch ale',
  'Stout',
  'Vienna lager',
  'Weissbier',
  'Weizenbock',
  'Witbier',
];

export const searchBeers = (
  searchTerm: string,
  callBack: (results: string[]) => void
) => {
  setTimeout(() => {
    callBack(beers.filter((x) => x.toLowerCase().includes(searchTerm.toLowerCase())));
  }, 2000);
};
