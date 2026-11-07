// utils/adaptPostFormData.js
// Convierte el postData plano (que ya usa Createpost) → { postData, detailData }
// para el nuevo backend.

// Mapa de qué campos van al detail según detailType
const DETAIL_FIELDS = {
    travel: [
      'datedepar', 'horadudepar', 'horariollegada', 'duracionviaje', 'fecharegreso',
      'mesInicio', 'mesFin', 'temporada', 'anio',
      'transporte', 'tipoTransporte', 'claseTransporte', 'companiaTransporte',
      'numeroTransporte', 'itinerarioTransporte', 'tiempoTransporte',
      'serviciosTransporte', 'comentariosTransporte',
      'destinacionvoyage1', 'destinacionvoyage2', 'paysDestination',
      'voyage1hotel1', 'voyage1nombrehotel1', 'voyage2hotel2', 'voyage1nombrehotel2',
      'nombredelhotel', 'adresshotel', 'estrellas', 'serviciosdelhotel',
      'incluidoenelprecio', 'totalhabitaciones', 'tipodehabutaciones', 'wifi',
      'hotelWebsite', 'servicios', 'serviciosTr',
      'prixAdulte', 'prixEnfant', 'prixBebe',
      'servicesInclus', 'activites', 'language', 'specifications',
      'optionsPaiement', 'documentsRequises', 'excursions',
      'typeVoyage', 'niveauConfort', 'publicCible',
    ],
    hajj: [
      'destinacionhadj', 'datedepar', 'fecharegreso', 'duracionviaje',
      'mesInicio', 'mesFin', 'temporada', 'anio',
      'transporte', 'tipoTransporte', 'companiaTransporte',
      'nombredelhotel', 'adresshotel', 'estrellas', 'serviciosdelhotel',
      'prixAdulte', 'prixEnfant', 'prixBebe',
      'guideLocal', 'repasInclus', 'transfertAeroport',
      'delaiTraitement', 'formalites', 'assurancesIncluses',
      'servicesInclus', 'documentsRequises', 'optionsPaiement',
    ],
    visa: [
      'paysDestination', 'delaiTraitement', 'formalites',
      'documentsRequises', 'itemsReservations_Visa',
      'prixAdulte', 'optionsPaiement',
    ],
    rental: [
      'Location_Vacances', 'alquilergeneral', 'superficie', 'etage',
      'promoteurimmobilier', 'adress', 'capacitePersonnes',
      'nombreChambres', 'nombreSallesBain',
      'wifiGratuit', 'climatisation', 'cuisineEquipee', 'television',
      'piscine', 'parking', 'animauxAcceptes', 'menageInclus',
      'checkInTime', 'checkOutTime', 'tarifnuit', 'reservacionenlinea',
      'acompteRequise', 'pourcentageAcompte',
    ],
  }
  
  // Campos base (van al Post)
  const BASE_FIELDS = [
    'title', 'description', 'content', 'link', 'price', 'priceType', 'devise',
    'offerType', 'features', 'wilaya', 'commune', 'contacto', 'subCategory',
    'status',
  ]
  
  // Mapea subCategory (string viejo) → detailType
  const SUBCATEGORY_TO_DETAILTYPE = {
    'Voyage Organise': 'travel',
    'Voyage_Local': 'travel',
    'Voyage_Etranger': 'travel',
    'Location_Vacances': 'rental',
    'hadj_Omra': 'hajj',
    'Reservations_Visa': 'visa',
  }
  
  export const getDetailTypeFromSubCategory = (subCategory) =>
    SUBCATEGORY_TO_DETAILTYPE[subCategory] || null
  
  /**
   * Convierte el estado plano del form en { postData, detailData }.
   * @param {Object} flat - el postData plano que ya maneja el form
   * @param {string} categoryId - el _id de la categoría (nuevo backend)
   * @returns {{ postData: Object, detailData: Object }}
   */
  export const adaptPostFormData = (flat, categoryId) => {
    const detailType = getDetailTypeFromSubCategory(flat.subCategory)
    if (!detailType) {
      throw new Error(`Sous-catégorie inconnue: ${flat.subCategory}`)
    }
  
    // 1. Base
    const postData = { category: categoryId }
    BASE_FIELDS.forEach((k) => {
      if (flat[k] !== undefined && flat[k] !== '') postData[k] = flat[k]
    })
  
    // 2. Detail
    const detailData = {}
    const allowed = DETAIL_FIELDS[detailType] || []
    allowed.forEach((k) => {
      if (flat[k] !== undefined && flat[k] !== '') detailData[k] = flat[k]
    })
  
    return { postData, detailData }
  }