// node scripts/seed-categories.js

const mongoose = require('mongoose')
const Category = require('../models/Category')
require('dotenv').config()

const categories = [
  { key: 'Voyage Organise',    label: { fr: 'Voyage Organisé',        ar: 'رحلة منظمة' },    detailType: 'travel', order: 1 },
  { key: 'Voyage_Local',       label: { fr: 'Voyage Local',           ar: 'رحلة محلية' },    detailType: 'travel', order: 2 },
  { key: 'Voyage_Etranger',    label: { fr: 'Voyage à l\'Étranger',   ar: 'رحلة خارجية' },   detailType: 'travel', order: 3 },
  { key: 'Location_Vacances',  label: { fr: 'Location Vacances',      ar: 'إيجار عطلات' },   detailType: 'rental', order: 4 },
  { key: 'hadj_Omra',          label: { fr: 'Hadj & Omra',            ar: 'الحج والعمرة' },  detailType: 'hajj',   order: 5 },
  { key: 'Reservations_Visa',  label: { fr: 'Réservations & Visa',    ar: 'تأشيرة' },        detailType: 'visa',   order: 6 },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('✅ Conectado a MongoDB')

    for (const cat of categories) {
      const result = await Category.findOneAndUpdate(
        { key: cat.key },
        { $set: { ...cat, active: true } },
        { upsert: true, new: true }
      )
      console.log(`✅ Categoría: ${result.key} → ${result.label.fr}`)
    }

    console.log('🎉 Seed completado')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error seed:', err)
    process.exit(1)
  }
}

seed()