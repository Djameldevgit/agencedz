const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
  // 🔑 Identificación
  nom: { type: String, required: true, trim: true },            // ex: "Hôtel El Aurassi"
  slug: { type: String, index: true, sparse: true },
  chaine: String,                                               // ex: "Accor", "Mariott", "Indépendant"

  // 📍 Localisation
  adresse: String,
  ville: { type: String, required: true },
  pays: { type: String, required: true },
  wilaya: String,                                               // pour l'Algérie
  commune: String,
  codePostal: String,
  coordonnees: {
    lat: Number,
    lng: Number,
  },
  distanceCentre: String,                                       // ex: "2 km du centre"
  distancePlage: String,
  distanceMosquee: String,                                      // utile pour Hajj/Omra
  distanceAeroport: String,

  // ⭐ Classification
  etoiles: { type: Number, min: 1, max: 5 },                    // 1 à 5 étoiles
  categorie: {                                                  // classification interne
    type: String,
    enum: ['economique', 'standard', 'superieur', 'luxe', 'boutique', 'resort'],
    default: 'standard',
  },
  note: { type: Number, min: 0, max: 10 },                      // note globale
  nombreAvis: { type: Number, default: 0 },

  // 🖼️ Médias
  images: [String],
  logo: String,
  siteWeb: String,
  telephone: String,
  email: String,

  // 🛏️ Chambres
  nombreChambresTotal: Number,
  typesChambres: [{
    type: {                                                     // ex: "Double", "Suite", "Triple"
      type: String,
      enum: ['simple', 'double', 'triple', 'quadruple', 'suite', 'familiale', 'junior_suite'],
    },
    lit: String,                                                // ex: "1 lit double + 1 canapé"
    capacite: Number,
    superficie: Number,                                         // m²
    description: String,
    images: [String],
    prixNuit: Number,
    devise: { type: String, default: 'DZD' },
  }],

  // 🛎️ Services (référence au catalogue partagé)
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  // ex: wifi_gratuit, climatisation, piscine, spa, salle_sport, restaurant,
  //     bar, parking, navette, reception_24h, menage_quotidien, animaux_acceptes...

  // 🍽️ Restauration
  formulesRepas: [{
    type: {
      type: String,
      enum: ['petit_dejeuner', 'demi_pension', 'pension_complete', 'tout_inclus'],
    },
    inclus: { type: Boolean, default: false },
    description: String,
    supplementPrix: Number,
  }],

  // 🕐 Check-in / Check-out
  checkIn: { type: String, default: '14:00' },
  checkOut: { type: String, default: '12:00' },

  // 💳 Conditions
  politiqueAnnulation: String,
  conditionsReservation: String,

  // 🌍 Description multilingue (fr obligatoire, ar optionnel)
  description: {
    fr: String,
    ar: String,
  },

  // 🏷️ État
  actif: { type: Boolean, default: true },
  partenaire: { type: Boolean, default: false },                // hôtel partenaire agence ?
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })

// 📊 Índices reales (basados en queries típicas del front)
hotelSchema.index({ ville: 1, etoiles: -1 })
hotelSchema.index({ pays: 1, ville: 1 })
hotelSchema.index({ nom: 'text', 'description.fr': 'text' })
hotelSchema.index({ actif: 1, partenaire: -1 })

module.exports = mongoose.model('hotel', hotelSchema)