export const sportsData = {
  Football: {
    emoji: "⚽",
    tagline: "High energy. Pure teamwork.",
    description:
      "Football is the world's most popular sport — outdoor, team-based, and intensely competitive. Perfect if you love sprinting, strategy, and collective wins.",
    tags: ["Outdoor", "Team", "High Intensity"],
    color: "#16a34a",
    venues: [
      {
        name: "Aramoun Field",
        location: "Aramoun Main Street, near The Public Hall",
        phone: "03 794 089",
      },
      {
        name: "FC Beirut – Ras El Nabiaa",
        location: "Ras El Nabiaa, Abdullah Yafi Street, Beirut",
        phone: "03 714 036",
      },
      {
        name: "BSA Field",
        location: "Ghobeiri, Camil Chamoun Street, Beirut",
        phone: "70 800 190",
      },
    ],
  },
  Basketball: {
    emoji: "🏀",
    tagline: "Fast lanes, faster players.",
    description:
      "Basketball blends speed, agility, and precision. Whether indoors or on a street court, it's ideal for players who crave constant motion.",
    tags: ["Indoor", "Team", "High Intensity"],
    color: "#ea580c",
    venues: [
      {
        name: "Sport Ville",
        location: "Sakiet AlJanzir, Berlin Street",
        phone: "71 588 733",
      },
      {
        name: "Hoops Hazmiya",
        location: "Hazmiya, Elias El Hrawi Street",
        phone: "05 454 511",
      },
      {
        name: "Athletico Sports",
        location: "Dbayeh, Zouk El Khrab",
        phone: "70 202 030",
      },
    ],
  },
  Swimming: {
    emoji: "🏊",
    tagline: "Flow. Breathe. Repeat.",
    description:
      "Swimming is low-impact and full-body. Ideal for those who prefer solo training, love water, and want a sport that builds endurance without stress on joints.",
    tags: ["Indoor/Outdoor", "Individual", "Moderate"],
    color: "#0891b2",
    venues: [
      {
        name: "Rio Lento",
        location: "El Matn, Naher El Kalb",
        phone: "04 915 656",
      },
      {
        name: "La Siesta Resort",
        location: "Khalde, Sea Road",
        phone: "05 815 555",
      },
      {
        name: "Byblos Marine",
        location: "Byblos, Jbail Sea Road",
        phone: "09 945 234",
      },
    ],
  },
  Tennis: {
    emoji: "🎾",
    tagline: "Precision over power.",
    description:
      "Tennis sharpens your reflexes, strategy, and endurance. A sport for individualists who love one-on-one competition and technical mastery.",
    tags: ["Outdoor", "Individual", "Moderate"],
    color: "#7c3aed",
    venues: [
      {
        name: "Sports Avenue",
        location: "Hazmiya, Elias El Hrawi Street",
        phone: "76 366 188",
      },
      {
        name: "Tennis Lab",
        location: "Forn El Chebbak, Horsh Tabet",
        phone: "70 316 315",
      },
      {
        name: "Serve The Academy (STA)",
        location: "Jnah, Bourj El Brajne",
        phone: "71 304 791",
      },
    ],
  },
};


export const quizQuestions = [
  {
    id: "location",
    text: "Where do you prefer to train?",
    options: [
      { value: "indoor",  label: "Indoors",        icon: "🏠" },
      { value: "outdoor", label: "Outdoors",        icon: "🌿" },
      { value: "either",  label: "Doesn't matter",  icon: "🔄" },
    ],
  },
  {
    id: "social",
    text: "Do you prefer competing solo or with a team?",
    options: [
      { value: "team",       label: "Team sport",   icon: "👥" },
      { value: "individual", label: "Solo",         icon: "🧘" },
      { value: "either",     label: "Either works", icon: "🤝" },
    ],
  },
  {
    id: "intensity",
    text: "What's your preferred intensity level?",
    options: [
      { value: "high",     label: "High",     icon: "🔥" },
      { value: "moderate", label: "Moderate", icon: "⚡" },
      { value: "low",      label: "Low",      icon: "🌊" },
    ],
  },
];


export function getMatches(answers) {
  const scores = { Football: 0, Basketball: 0, Swimming: 0, Tennis: 0 };
  const { location, social, intensity } = answers;

  if (location === "outdoor" || location === "either") {
    scores.Football   += 2;
    scores.Tennis     += 2;
  }
  if (location === "indoor" || location === "either") {
    scores.Basketball += 2;
    scores.Swimming   += 1;
  }
  if (social === "team" || social === "either") {
    scores.Football   += 2;
    scores.Basketball += 2;
  }
  if (social === "individual" || social === "either") {
    scores.Swimming   += 2;
    scores.Tennis     += 2;
  }
  if (intensity === "high") {
    scores.Football   += 2;
    scores.Basketball += 2;
  }
  if (intensity === "moderate") {
    scores.Tennis     += 2;
    scores.Swimming   += 1;
  }
  if (intensity === "low") {
    scores.Swimming   += 3;
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([sport]) => sport);
}