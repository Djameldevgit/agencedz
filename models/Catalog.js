const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema({
  type: { type: String, enum: ['service', 'langue', 'paiement', 'document', 'equipement', 'activite','hotel_service'  ], required: true, index: true },
  key: { type: String, required: true },
  label: { fr: String, ar: String, es: String },
  icon: String,
  active: { type: Boolean, default: true },
}, { timestamps: true })

catalogSchema.index({ type: 1, key: 1 }, { unique: true })

module.exports = mongoose.model('catalog', catalogSchema)