/**
 * Polish translations — single source of truth for all UI text.
 * NO emojis anywhere.
 */
const pl = {
  // App
  appName: "PulseNews",
  appTagline: "Lokalne zdarzenia w czasie rzeczywistym",

  // Nav
  nav: {
    home: "Strona glowna",
    map: "Mapa na zywo",
    report: "Zglos",
    admin: "Panel admina",
    mySubmissions: "Moje zgloszenia",
    category: "Lokalnie"
  },

  // Auth
  auth: {
    signIn: "Zaloguj sie",
    signOut: "Wyloguj sie",
    checkingAuth: "Sprawdzanie uprawnien...",
    accessDenied: "Brak dostepu",
    accessDeniedDesc: "Nie masz uprawnien administratora. Skontaktuj sie z administratorem.",
    backToHome: "Powrot na strone glowna",
    loginRequired: "Wymagane logowanie",
  },

  // Header
  header: {
    liveLabel: "NA ZYWO",
    breakingTicker: "Karambol na autostradzie A1 — Pozar w centrum — Ostrzezenie przed burza",
  },

  // Hero
  hero: {
    breaking: "PILNE",
    live: "NA ZYWO",
  },

  // Index
  index: {
    latestIncidents: "Najnowsze zdarzenia",
  },

  // Categories (no emojis)
  categories: {
    all: "Wszystkie",
    accident: "Wypadki",
    fire: "Pozary",
    police: "Policja",
    emergency: "Ratunkowe",
    weather: "Pogoda",
    crime: "Przestepstwa",
  },

  // Severity
  severity: {
    critical: "Krytyczny",
    high: "Wysoki",
    medium: "Sredni",
    low: "Niski",
  },

  // Article page
  article: {
    notFound: "Artykul nie znaleziony",
    backToHome: "Powrot na strone glowna",
    back: "Wstecz",
    quickFacts: "Kluczowe informacje",
    location: "Lokalizacja",
    severity: "Powaga",
    timeline: "Chronologia zdarzenia",
    share: "Udostepnij",
    reportSimilar: "Zglos podobne zdarzenie",
    views: "wyswietlenia",
    comments: "komentarze",
  },

  // Live feed
  liveFeed: {
    title: "Relacja na zywo",
  },

  // Trending
  trending: {
    title: "Popularne teraz",
    views: "wyswietlen",
  },

  // Map
  map: {
    title: "Mapa zdarzen na zywo",
    active: "Aktywne",
    clickMarkers: "Mapa interaktywna — kliknij znaczniki aby zobaczyc zdarzenia",
    fullArticle: "Pelny artykul",
    close: "Zamknij",
  },

  // Submit
  submit: {
    title: "Zglos zdarzenie",
    subtitle: "Pomoz informowac spolecznosc. Wszystkie zgloszenia sa weryfikowane przed publikacja.",
    submittingAs: "Zglaszasz jako",
    anonymous: "Anonimowo",
    incidentTitle: "Tytul zdarzenia",
    incidentTitlePlaceholder: "Krotki opis tego, co sie wydarzylo",
    category: "Kategoria",
    categoryPlaceholder: "Wybierz kategorie",
    locationLabel: "Lokalizacja",
    locationPlaceholder: "Ulica, skrzyzowanie lub rejon",
    description: "Opis",
    descriptionPlaceholder: "Co sie wydarzylo? Podaj szczegoly: czas, poszkodowani, zamkniecia drog...",
    media: "Zdjecia / Filmy",
    mediaTap: "Kliknij aby dodac lub przeciagnij pliki",
    mediaFormats: "JPG, PNG, MP4 do 50MB",
    anonymousToggle: "Zglos anonimowo",
    anonymousDesc: "Twoja tozsamosc nie bedzie ujawniona",
    submitButton: "Wyslij zgloszenie",
    submitting: "Wysylanie...",
    missingFields: "Brakujace pola",
    missingFieldsDesc: "Wypelnij wszystkie wymagane pola.",
    success: "Zgloszenie wyslane",
    successDesc: "Twoje zgloszenie zostalo przeslane do weryfikacji. Dziekujemy!",
    failed: "Wyslanie nie powiodlo sie",
    failedDesc: "Sprobuj ponownie pozniej.",
  },

  // My submissions
  mySubmissions: {
    title: "Moje zgloszenia",
    subtitle: "Sledz status swoich zgloszen",
    noSubmissions: "Brak zgloszen",
    noSubmissionsDesc: "Nie masz jeszcze zadnych zgloszen.",
    status: {
      pending: "Oczekujace",
      approved: "Zatwierdzone",
      rejected: "Odrzucone",
    },
  },

  // Admin
  admin: {
    title: "Panel administracyjny",
    loggedAs: "Zalogowano jako",
    newArticle: "Nowy artykul",
    articlesTab: "Artykuly",
    submissionsTab: "Zgloszenia",
    noSubmissions: "Brak oczekujacych zgloszen",
    approve: "Zatwierdz",
    reject: "Odrzuc",
    approved: "Zgloszenie zatwierdzone",
    approvedDesc: "Raport zostal opublikowany.",
    rejected: "Zgloszenie odrzucone",
    deleted: "Artykul usuniety",
    errorApprove: "Nie udalo sie zatwierdzic zgloszenia.",
    errorReject: "Nie udalo sie odrzucic zgloszenia.",
    published: "opublikowany",
    preview: "Podglad",
    edit: "Edytuj",
    delete: "Usun",
    error: "Blad",
    feedbackPlaceholder: "Opcjonalna informacja zwrotna...",
  },

  // Search
  search: {
    title: "Szukaj",
    placeholder: "Szukaj artykulow...",
    noResults: "Brak wynikow",
    noResultsDesc: "Sprobuj innych slow kluczowych.",
    searching: "Wyszukiwanie...",
  },

  // Share
  share: {
    title: "Udostepnij",
    copyLink: "Kopiuj link",
    copied: "Skopiowano!",
    facebook: "Facebook",
    twitter: "X (Twitter)",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },

  // 404
  notFound: {
    title: "404",
    message: "Strona nie znaleziona",
    backHome: "Powrot na strone glowna",
  },

  // Time
  time: {
    secondsAgo: (n: number) => `${n}s temu`,
    minutesAgo: (n: number) => `${n}min temu`,
    hoursAgo: (n: number) => `${n}godz temu`,
    daysAgo: (n: number) => `${n}d temu`,
  },
} as const;

export default pl;
