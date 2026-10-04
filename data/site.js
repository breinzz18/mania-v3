// Restaurant settings. Everything specific to this restaurant lives here (plus data/menu.js and images/).
// To make a page for another restaurant: copy the site folder, replace this file, menu.js, brand/ and images/.
window.SITE = {
  name: "Mania Restaurante",
  shortName: "Mania",
  since: 1996,
  defaultLang: "en",

  // Contact. Leave a field null to hide its button.
  phoneDisplay: "+34 922 79 52 78",
  phoneDial: "+34922795278",
  whatsapp: null,              // e.g. "34600111222" (digits only) — shows WhatsApp buttons when set
  bookingUrl: null,            // external booking system; when null, "Book a table" calls the phone
  address: "Avenida Rafael Puig Lluvina 5, Paseo Marítimo, Local 10, 38660 Costa Adeje, Tenerife",
  addressShort: "Paseo Marítimo · Costa Adeje",
  coords: { lat: 28.0703869, lng: -16.7324533 },
  googleUrl: "https://www.google.com/maps/place/Restaurante+Man%C3%ADa+S.L./@28.0703869,-16.7324533,17z/data=!3m1!4b1!4m6!3m5!1s0xc6a976658d8a25f:0x4895ac8cfd2e8ce9!8m2!3d28.0703869!4d-16.7324533!16s%2Fg%2F11c1wy3w5_",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJX6LYWGaXagwR6Ywu_YyslUg",
  socials: {
    tripadvisor: "https://www.tripadvisor.es/Restaurant_Review-g662606-d3236536-Reviews-Restaurante_Mania-Costa_Adeje_Adeje_Tenerife_Canary_Islands.html",
    facebook: "https://www.facebook.com/maniarestaurant/",
    instagram: null
  },

  // Google rating — update by hand now and then.
  rating: { value: 4.0, count: 2288 },
  // Real review excerpt only (shown in its original language).
  quote: { text: "Buen servicio, buena comida, platos abundantes en primera línea de playa.", lang: "es", source: "Google" },

  // Opening hours, 0 = Sunday … 6 = Saturday, 24h "HH:MM". null = hide the hours block.
  hours: { 0: [["09:30", "23:00"]], 1: [["09:30", "23:00"]], 2: [["09:30", "23:00"]], 3: [["09:30", "23:00"]], 4: [["09:30", "23:00"]], 5: [["09:30", "23:00"]], 6: [["09:30", "23:00"]] },
  timezone: "Atlantic/Canary",

  currency: "€",

  // Photos (file names in images/, without size suffix). Category photos are picked up as cat-<category-id>.
  images: {
    hero: "scene-sunset-terrace",
    intro: "scene-aerial-shore",
    story: ["scene-restaurant-front", "scene-sea-rocks", "scene-costa-adeje"],
    guests: ["guest-paella", "guest-sangria", "guest-garlic-prawns", "guest-octopus", "guest-sunset-pasta", "guest-fish",
             "guest-seafood-stew", "guest-salmon", "guest-tuna-salad", "guest-burgers", "guest-sea-view", "guest-table"],
    findUs: "scene-costa-adeje"
  },

  // Video loops (video/<name>.mp4 + video/<name>.jpg poster). Missing files fall back to the photo.
  videos: {
    heroPortrait: "hero-portrait", heroLandscape: "hero-landscape", story: "aerial", ambient: "sangria",
    // category id -> loop shown in that category's header
    categories: { paella: "paella", "hot-starters": "prawns", "house-specialties": "tbone", pizza: "pizza", pasta: "pasta",
                  "fish-seafood": "fish", salads: "salads" }
  },
  // "Today at Mania" reel: menu number + video
  signature: [{ n: "99", video: "paella" }, { n: "26", video: "prawns" }, { n: "72", video: "tbone" }, { n: "122", video: "pizza" }],

  // Original printed menu pages (menu-pages/<lang>-<n>.webp), shown under "View original menu". 0 = hide.
  menuPages: 4,

  // Restaurant-specific copy, per language
  copy: {
    heroLine: {
      en: "Steaks, paella & pizza by the sea", es: "Carnes, paella y pizza junto al mar", de: "Steaks, Paella & Pizza am Meer",
      fr: "Grillades, paella et pizza face à la mer", it: "Carne, paella e pizza sul mare", nl: "Steaks, paella & pizza aan zee",
      da: "Steaks, paella og pizza ved havet", sv: "Stekar, paella och pizza vid havet", no: "Biff, paella og pizza ved havet",
      fi: "Pihvejä, paellaa ja pizzaa meren äärellä"
    },
    story: {
      en: "On the seafront promenade of Costa Adeje. Grilled meat, paella, fresh fish, pasta and pizza — served on our terrace a few steps from the beach.",
      es: "En el paseo marítimo de Costa Adeje. Carnes a la brasa, paella, pescado fresco, pasta y pizza, servidos en nuestra terraza a pocos pasos de la playa.",
      de: "An der Strandpromenade von Costa Adeje. Gegrilltes Fleisch, Paella, frischer Fisch, Pasta und Pizza – serviert auf unserer Terrasse, nur wenige Schritte vom Strand.",
      fr: "Sur la promenade de Costa Adeje. Viandes grillées, paella, poisson frais, pâtes et pizzas, servis sur notre terrasse à quelques pas de la plage.",
      it: "Sul lungomare di Costa Adeje. Carne alla griglia, paella, pesce fresco, pasta e pizza, serviti sulla nostra terrazza a pochi passi dalla spiaggia.",
      nl: "Aan de boulevard van Costa Adeje. Gegrild vlees, paella, verse vis, pasta en pizza – geserveerd op ons terras, op een paar stappen van het strand.",
      da: "På strandpromenaden i Costa Adeje. Grillet kød, paella, frisk fisk, pasta og pizza – serveret på vores terrasse få skridt fra stranden.",
      sv: "På strandpromenaden i Costa Adeje. Grillat kött, paella, färsk fisk, pasta och pizza – serverat på vår terrass några steg från stranden.",
      no: "På strandpromenaden i Costa Adeje. Grillet kjøtt, paella, fersk fisk, pasta og pizza – servert på terrassen vår noen skritt fra stranden.",
      fi: "Costa Adejen rantabulevardilla. Grillilihaa, paellaa, tuoretta kalaa, pastaa ja pizzaa – tarjoiltuna terassillamme muutaman askeleen päässä rannasta."
    }
  }
};
