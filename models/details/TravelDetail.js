const mongoose = require('mongoose')

const travelDetailSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true, unique: true, index: true },

  // Fechas y duración
  dateDepart: Date,
  heureDepart: String,
  heureArrivee: String,
  dureeVoyage: String,
  dateRetour: Date,
  periode: {
    moisDebut: String,
    moisFin: String,
    saison: { type: String, enum: ['basse', 'moyenne', 'haute', 'ramadan', 'vacances'] },
    annee: Number,
  },

  // Transporte
  transport: {
    type: { type: String, enum: ['avion', 'bus', 'bateau', 'train', 'voiture'] },
    classe: String,
    compagnie: String,
    numero: String,
    itineraire: String,
    duree: String,
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
    commentaires: String,
  },

  // Destinos
  destinations: [{
    ordre: Number,
    pays: String,
    ville: String,
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'hotel' },  // 👈 ref al hotel
    nuits: Number,
    dateArrivee: Date,
    dateDepart: Date,
    formuleRepas: String,
    typeChambre: String,
  }],

  // Precios (Number, no String)
  prix: {
    adulte: Number,
    enfant: Number,
    bebe: Number,
    devise: { type: String, default: 'DZD' },
  },

  // Servicios incluidos
  servicesInclus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  activites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  excursions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  langues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],

  // Meta viaje
  typeVoyage: { type: String, enum: ['organise', 'libre', 'circuit', 'sejour'] },
  niveauConfort: { type: String, enum: ['standard', 'confort', 'luxe', 'premium'] },
  publicCible: String,
}, { timestamps: true })

module.exports = mongoose.model('travelDetail', travelDetailSchema)