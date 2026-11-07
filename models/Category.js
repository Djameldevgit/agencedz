const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  // 🔑 Identificador estable (no cambia nunca)
  // Ej: 'Voyage Organise', 'Location_Vacances', 'hadj_Omra'
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },

  // 🏷️ Etiquetas multilingües
  label: {
    fr: { type: String, required: true },
    ar: { type: String, default: '' },
    es: { type: String, default: '' },
    en: { type: String, default: '' },
  },

  // 🎨 UI
  icon: { type: String, default: '' },      // ej: 'FaPlane', 'FaHome', 'FaKaaba'
  color: { type: String, default: '' },     // ej: '#2c5aa0'

  // 🔗 Tipo de detail que genera esta categoría
  // travel  → TravelDetail  (viajes)
  // hajj    → HajjDetail    (hajj/omra)
  // visa    → VisaDetail    (visa)
  // rental  → RentalDetail  (location vacances)
  detailType: {
    type: String,
    required: true,
    enum: ['travel', 'hajj', 'visa', 'rental'],
    index: true,
  },

  // 🔗 Jerarquía (opcional, para subcategorías futuras)
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    default: null,
  },

  // 📊 Orden de aparición
  order: { type: Number, default: 0, index: true },

  // ✅ Estado
  active: { type: Boolean, default: true, index: true },
}, { timestamps: true })

// Índices útiles
categorySchema.index({ active: 1, order: 1 })
categorySchema.index({ detailType: 1, active: 1 })

module.exports = mongoose.model('category', categorySchema)