const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  // Contenido base (lo que ya usa el cliente)
  title: { type: String, required: false, trim: true },
  slug: { type: String, index: true, sparse: true },
  content: String,
  description: String,
  link: String,

  // Precio "de vitrine" (para mostrar en el listado sin populate)
  price: Number,
  priceType: { type: String, enum: ['fixe', 'a_partir_de', 'sur_devis'], default: 'fixe' },
  devise: { type: String, default: 'DZD' },
  offerType: String,

  // Media
  images: [
    {
      url: String,
      public_id: String
    }
  ],

  features: [String],

  // Relaciones sociales (sin cambios)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },

  // Categorización
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true, index: true },
  subCategory: String,

  // Ubicación
  wilaya: String,
  commune: String,
  contact: String,

  // 🔑 Discriminador polimórfico hacia el Detail
  detailType: {
    type: String,
    enum: ['travel', 'hajj', 'visa', 'rental', null],
    default: null,
    index: true,
  },
  detailRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'detailModel', // referencia dinámica
  },
  detailModel: {
    type: String,
    enum: ['travelDetail', 'hajjDetail', 'visaDetail', 'rentalDetail', null],
    default: null,
  },

  // Estado
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  views: { type: Number, default: 0 },
  deletedAt: { type: Date, default: null },
}, { timestamps: true })

// Índices útiles (reales, no especulativos)
postSchema.index({ category: 1, status: 1, createdAt: -1 })
postSchema.index({ wilaya: 1, status: 1 })
postSchema.index({ user: 1, createdAt: -1 })
postSchema.index({ title: 'text', description: 'text' }) // búsqueda full-text

module.exports = mongoose.model('post', postSchema)