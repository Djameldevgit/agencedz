const mongoose = require('mongoose')

const rentalDetailSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true, unique: true, index: true },

  // Inmueble
  typeLocation: { type: String, enum: ['appartement', 'villa', 'studio', 'chalet', 'maison'] },
  superficie: Number,             // m²
  etage: Number,
  promoteurImmobilier: { type: Boolean, default: false },
  adresse: String,

  // Capacidad
  capacitePersonnes: Number,
  nombreChambres: Number,
  nombreSallesBain: Number,
  typesChambres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],

  // Equipamientos (booleanos → mejor como catálogo de equipments)
  equipements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  // (wifiGratuit, climatisation, cuisineEquipee, television, piscine, parking, animauxAcceptes, menageInclus)

  // Check-in/out
  checkInTime: String,
  checkOutTime: String,

  // Tarifas
  tarifNuit: Number,
  devise: { type: String, default: 'DZD' },
  reservationEnLigne: { type: Boolean, default: false },

  // Pago
  acompteRequis: { type: Boolean, default: false },
  pourcentageAcompte: Number,
}, { timestamps: true })

module.exports = mongoose.model('rentalDetail', rentalDetailSchema)