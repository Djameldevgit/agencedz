const mongoose = require('mongoose')

const visaDetailSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true, unique: true, index: true },

  pays: { type: String, required: true },
  typeVisa: { type: String, enum: ['tourisme', 'affaires', 'etudes', 'travail', 'transit'], required: true },

  delaiTraitement: String,        // ej: "7-10 jours"
  validite: String,               // ej: "3 mois"
  sejourMax: String,              // ej: "30 jours"
  entrees: { type: String, enum: ['simple', 'double', 'multiple'] },

  documentsRequis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'catalog' }],
  formalites: String,
  rendezVousRequis: { type: Boolean, default: false },

  tarif: {
    montant: Number,
    devise: { type: String, default: 'DZD' },
    fraisService: Number,
  },

  itemsReservations: [String],    // lo que había como itemsReservations_Visa
}, { timestamps: true })

module.exports = mongoose.model('visaDetail', visaDetailSchema)