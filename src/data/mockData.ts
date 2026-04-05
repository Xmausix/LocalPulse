export interface Incident {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "accident" | "fire" | "police" | "emergency" | "weather" | "crime";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: Date;
  imageUrl: string;
  isBreaking: boolean;
  isLive: boolean;
  views: number;
  comments: number;
  timeline?: { time: string; description: string }[];
}

export const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "accident", label: "Wypadki" },
  { id: "fire", label: "Pozary" },
  { id: "police", label: "Policja" },
  { id: "emergency", label: "Ratunkowe" },
  { id: "weather", label: "Pogoda" },
  { id: "crime", label: "Przestepstwa" },
];

const now = new Date();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

export const incidents: Incident[] = [
  {
    id: "1",
    slug: "karambol-na-autostradzie-a1-3-rannych",
    title: "PILNE: Karambol na autostradzie A1 — 3 rannych",
    summary: "Zderzenie 5 pojazdow zamknelo autostrade A1 w kierunku Gdanska na wysokosci wezla Lodz. Sluzby ratunkowe na miejscu.",
    content: "Do powaznego karambolu doszlo na autostradzie A1 w kierunku Gdanska w okolicach wezla Lodz Polnoc. Wedlug informacji policji, w zderzeniu uczestniczylo co najmniej 5 pojazdow, w tym samochod ciezarowy. Trzy osoby zostaly przewiezione do Szpitala Wojewodzkiego z obrazeniami niezagrazajacymi zyciu. Ruch kierowany jest objazdami — kierowcy powinni spodziewac sie znacznych opoznien przez najblizsze godziny.",
    category: "accident",
    severity: "critical",
    location: "Autostrada A1, wezel Lodz Polnoc",
    coordinates: { lat: 51.8125, lng: 19.4616 },
    timestamp: minutesAgo(8),
    imageUrl: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80",
    isBreaking: true,
    isLive: true,
    views: 12453,
    comments: 87,
    timeline: [
      { time: "7:42", description: "Pierwsze zgloszenia o zderzeniu na A1" },
      { time: "7:45", description: "Wyslano jednostki policji i strazy pozarnej" },
      { time: "7:51", description: "Zamknieto wszystkie pasy w kierunku Gdanska" },
      { time: "7:58", description: "3 poszkodowanych przewieziono do szpitala" },
      { time: "8:15", description: "Wezwano ekipe ds. substancji niebezpiecznych — wyciek paliwa" },
    ],
  },
  {
    id: "2",
    slug: "pozar-magazynu-w-centrum-ewakuacja",
    title: "Pozar magazynu w centrum miasta — zarzadzono ewakuacje",
    summary: "Pozar 3. stopnia wybuchl w magazynie przy ul. Piotrkowskiej. Ewakuowano pobliskie budynki.",
    content: "Strazacy walcza z poteznym pozarem w magazynie handlowym przy skrzyzowaniu ul. Piotrkowskiej i Narutowicza w centrum miasta. Ogien zostal zgloszony okolo godziny 6:30 i rozprzestrzenil sie na sasiednie budynki. Wladze zarzadzily ewakuacje kilku okolicznych budynkow. Dotychczas nie zgloszono ofiar. Przyczyna pozaru jest badana.",
    category: "fire",
    severity: "critical",
    location: "ul. Piotrkowska / Narutowicza, centrum",
    coordinates: { lat: 51.7592, lng: 19.4560 },
    timestamp: minutesAgo(23),
    imageUrl: "https://images.unsplash.com/photo-1486551937199-baf066858de7?w=800&q=80",
    isBreaking: true,
    isLive: true,
    views: 8921,
    comments: 134,
    timeline: [
      { time: "6:30", description: "Zgloszenie pozaru w magazynie" },
      { time: "6:35", description: "Przyjazd pierwszych jednostek, podniesienie do 2. stopnia" },
      { time: "6:48", description: "Podniesienie do 3. stopnia, wezwano dodatkowe sily" },
      { time: "7:10", description: "Ewakuacja sasiadujacych budynkow" },
    ],
  },
  {
    id: "3",
    slug: "poscig-policyjny-zakonczony-zatrzymaniem",
    title: "Poscig policyjny zakonczony zatrzymaniem w Parku Centralnym",
    summary: "Szybki poscig przez dzielnice mieszkaniowa zakonczyl sie ujeciem podejrzanego.",
    content: "Poscig policyjny, ktory rozpoczal sie na obwodnicy miasta, zakonczyl sie w okolicy Parku Centralnego, gdy podejrzany stracil kontrole nad pojazdem. Kierowca, 28-letni mezczyzna, zostal zatrzymany bez dalszych incydentow. Zaden z postronnych obserwatorow nie zostal ranny. Policja informuje, ze poscig rozpoczal sie po tym, jak podejrzany zbiegl z rutynowej kontroli drogowej.",
    category: "police",
    severity: "high",
    location: "okolice Parku Centralnego",
    coordinates: { lat: 51.7700, lng: 19.4750 },
    timestamp: minutesAgo(45),
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&q=80",
    isBreaking: false,
    isLive: false,
    views: 5632,
    comments: 45,
  },
  {
    id: "4",
    slug: "ostrzezenie-przed-silna-burza",
    title: "Ostrzezenie przed silna burza dla wojewodztwa",
    summary: "IMGW ostrzega przed wiatrem do 100 km/h i duzym gradem do wieczora.",
    content: "Instytut Meteorologii i Gospodarki Wodnej wydal ostrzezenie o silnej burzy dla calego wojewodztwa, obowiazujace do godziny 22:00. Mieszkancy powinni spodziewac sie niszczacych wiatrow do 100 km/h, duzego gradu i ewentualnych podtopien na nizinnych terenach.",
    category: "weather",
    severity: "high",
    location: "Cale wojewodztwo",
    coordinates: { lat: 51.7769, lng: 19.4547 },
    timestamp: minutesAgo(60),
    imageUrl: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80",
    isBreaking: false,
    isLive: false,
    views: 15234,
    comments: 201,
  },
  {
    id: "5",
    slug: "napad-na-stacje-benzynowa-poszukiwany-sprawca",
    title: "Napad na stacje benzynowa — sprawca poszukiwany",
    summary: "Policja szuka podejrzanego, ktory dokowal napadu z bronia na sklep przy stacji.",
    content: "Policja poszukuje uzbrojonego sprawcy, ktory napadl na stacje benzynowa przy ul. Dabrowskiego okolo godziny 5:15 rano. Podejrzany opisywany jest jako mezczyzna w ciemnym ubraniu i kominiarce. Nikt nie zostal ranny podczas napadu.",
    category: "crime",
    severity: "high",
    location: "ul. Dabrowskiego",
    coordinates: { lat: 51.7500, lng: 19.4400 },
    timestamp: minutesAgo(120),
    imageUrl: "https://images.unsplash.com/photo-1586985289071-02bba1a8e680?w=800&q=80",
    isBreaking: false,
    isLive: false,
    views: 7845,
    comments: 92,
  },
  {
    id: "6",
    slug: "awaria-wodociagu-zalane-skrzyzowanie",
    title: "Awaria wodociagu — zalane skrzyzowanie, droga zamknieta",
    summary: "Pekniecie rury wodociagowej spowodowalo zalanie i zamkniecie skrzyzowania ul. Kilinskiego i Zielonej.",
    content: "Pekniecie rury wodociagowej na skrzyzowaniu ul. Kilinskiego i Zielonej spowodowalo znaczne zalanie okolicy. Ekipy miejskie pracuja na miejscu nad odcieciem wody i naprawami. Skrzyzowanie pozostanie zamkniete przez kilka najblizszych godzin.",
    category: "emergency",
    severity: "medium",
    location: "ul. Kilinskiego / Zielona",
    coordinates: { lat: 51.7650, lng: 19.4680 },
    timestamp: minutesAgo(180),
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80",
    isBreaking: false,
    isLive: false,
    views: 3421,
    comments: 28,
  },
];

export const liveFeedItems = [
  { id: "lf1", text: "Policja potwierdza otwarcie wszystkich pasow na A1 po zakonczeniu akcji", time: "2min temu", isNew: true },
  { id: "lf2", text: "Straz pozarna informuje: pozar magazynu opanowany w 60%", time: "5min temu", isNew: true },
  { id: "lf3", text: "Podejrzany z poscigu w Parku Centralnym zidentyfikowany, zarzuty w toku", time: "12min temu", isNew: false },
  { id: "lf4", text: "Pierwsze informacje o gradzie w zachodniej czesci wojewodztwa", time: "18min temu", isNew: false },
  { id: "lf5", text: "Dodatkowe karetki wyslane na miejsce karambolu na A1", time: "25min temu", isNew: false },
  { id: "lf6", text: "Policja udostepnila nagranie z monitoringu ze stacji benzynowej", time: "32min temu", isNew: false },
  { id: "lf7", text: "Czerwony Krzyz organizuje schronienie dla ewakuowanych z centrum", time: "40min temu", isNew: false },
  { id: "lf8", text: "Stluczka na ul. Dabrowskiego, brak poszkodowanych", time: "48min temu", isNew: false },
];

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s temu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min temu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}godz temu`;
  return `${Math.floor(hours / 24)}d temu`;
}

export function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical": return "bg-alert text-alert-foreground";
    case "high": return "bg-urgent text-urgent-foreground";
    case "medium": return "bg-yellow-500 text-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
}

export function getSeverityLabel(severity: string) {
  switch (severity) {
    case "critical": return "Krytyczny";
    case "high": return "Wysoki";
    case "medium": return "Sredni";
    case "low": return "Niski";
    default: return severity;
  }
}

export function getCategoryLabel(category: string) {
  return categories.find(c => c.id === category)?.label || category;
}
