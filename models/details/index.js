const TravelDetail = require('./TravelDetail')
const HajjDetail   = require('./HajjDetail')
const VisaDetail   = require('./VisaDetail')
const RentalDetail = require('./RentalDetail')

const DETAIL_MAP = {
  travel: { model: TravelDetail, name: 'travelDetail' },
  hajj:   { model: HajjDetail,   name: 'hajjDetail'   },
  visa:   { model: VisaDetail,   name: 'visaDetail'   },
  rental: { model: RentalDetail, name: 'rentalDetail' },
}

module.exports = { DETAIL_MAP }