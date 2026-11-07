import React from 'react';
import { useTranslation } from 'react-i18next';

const NombreLugarVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const zonas = [
        { value: 'centro_ciudad', label: '🏙️ ' + t('centro_ciudad', 'Centro ciudad') },
        { value: 'playa', label: '🏖️ ' + t('zona_playa', 'Zona de playa') },
        { value: 'montana', label: '⛰️ ' + t('zona_montana', 'Zona de montaña') },
        { value: 'historica', label: '🏛️ ' + t('zona_historica', 'Zona histórica') },
        { value: 'comercial', label: '🛍️ ' + t('zona_comercial', 'Zona comercial') },
        { value: 'residencial', label: '🏘️ ' + t('zona_residencial', 'Zona residencial') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-warning text-dark">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏨</span>
                    {t('nombreLugarVoyages', 'Nombre y Lugar - Voyages Organisés')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="nombreHotel" className="form-label fw-semibold small">
                            {t('nombreHotel', 'Nombre del Hotel')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombreHotel"
                            name="nombreHotel"
                            value={postData.nombreHotel || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderNombreHotel', 'Ej: Hotel Riu Palace, Marriott...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="cadenaHotelera" className="form-label fw-semibold small">
                            {t('cadenaHotelera', 'Cadena Hotelera')}
                        </label>
                        <input
                            type="text"
                            id="cadenaHotelera"
                            name="cadenaHotelera"
                            value={postData.cadenaHotelera || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderCadena', 'Ej: Hilton, Marriott, Accor...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="ciudadHotel" className="form-label fw-semibold small">
                            {t('ciudad', 'Ciudad')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="ciudadHotel"
                            name="ciudadHotel"
                            value={postData.ciudadHotel || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderCiudad', 'Ej: Istanbul, Marrakech, Paris...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="paisHotel" className="form-label fw-semibold small">
                            {t('pais', 'País')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="paisHotel"
                            name="paisHotel"
                            value={postData.paisHotel || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderPais', 'Ej: Turquía, Marruecos, Francia...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="direccionHotel" className="form-label fw-semibold small">
                            {t('direccionHotel', 'Dirección del Hotel')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="direccionHotel"
                            name="direccionHotel"
                            value={postData.direccionHotel || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderDireccionHotel', 'Dirección completa del hotel')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="zonaRegion" className="form-label fw-semibold small">
                            {t('zonaRegion', 'Zona/Región')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="zonaRegion"
                            name="zonaRegion"
                            value={postData.zonaRegion || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                            {zonas.map((z) => (
                                <option key={z.value} value={z.value}>{z.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="codigoPostalHotel" className="form-label fw-semibold small">
                            {t('codigoPostal', 'Código Postal')}
                        </label>
                        <input
                            type="text"
                            id="codigoPostalHotel"
                            name="codigoPostalHotel"
                            value={postData.codigoPostalHotel || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderCodigoPostal', 'Código postal')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="puntosInteres" className="form-label fw-semibold small">
                            {t('puntosInteres', 'Puntos de Interés Cercanos')}
                        </label>
                        <textarea
                            id="puntosInteres"
                            name="puntosInteres"
                            rows={2}
                            value={postData.puntosInteres || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderPuntosInteres', 'Ej: A 5 min del centro histórico, cerca del metro...')}
                            className="form-control"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NombreLugarVoyagesOrganises;