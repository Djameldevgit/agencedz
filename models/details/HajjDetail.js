const mongoose = require('mongoose')

const hajjDetailSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true, unique: true, index: true },

  type: { type: String, enum: ['hajj', 'omra', 'omra_ramadan'], required: true },

  destination: { type: String, required: true }, // La Meca, Médine…

  // Fechas
  dateDepart: Date,
  dateRetour: Date,
  dureeJours: Number,

  // Precios
  prix: {
    adulte: Number,
    enfant: Number,
    devise: { type: String, default: 'DZD' },
  },

  // Incluye
  guideLocal: { type: Boolean, default: false },
  repasInclus: { type: Boolean, default: false },
  transfertAeroport: { type: Boolean, default: false },
  assurancesIncluses: { type: Boolean, default: false },

  // Formalidades
  delaiTraitement: String,
  formalites: String,
  documentsRequis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],

  // Hotel
  hotels: [{
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'hotel' },  // 👈 ref
    ville: String,        // Makkah / Madinah
    nuits: Number,
    distanceMosquee: String,   // conservé aquí por si varía por paquete
    formuleRepas: String,
    typeChambre: String,
  }],
  // Transporte
  transport: {
    type: { type: String, enum: ['avion', 'bus'] },
    compagnie: String,
    classe: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('hajjDetail', hajjDetailSchema)