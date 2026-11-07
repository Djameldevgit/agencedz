import React from 'react';
import { useTranslation } from 'react-i18next';

const NombreLugarhotelhadj = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const zonasMeca = [
        { value: 'haram', label: '🕋 ' + t('cerca_haram', 'Cerca del Haram') },
        { value: 'aziziya', label: t('aziziya', 'Aziziya') },
        { value: 'shisha', label: t('shisha', 'Shisha') },
        { value: 'nawazia', label: t('nawazia', 'Nawazia') },
        { value: 'other', label: t('otra_zona', 'Otra zona') },
    ];

    const zonasMedina = [
        { value: 'haram_nabawi', label: '🕌 ' + t('cerca_haram_nabawi', 'Cerca del Haram Nabawi') },
        { value: 'olaya', label: t('olaya', 'Olaya') },
        { value: 'king_fahad', label: t('king_fahad', 'King Fahad') },
        { value: 'other', label: t('otra_zona', 'Otra zona') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏨</span>
                    {t('nombreLugarHajj', 'Nombre y Lugar - Hajj/Omra')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    {/* Sección Hotel La Meca */}
                    <div className="col-12">
                        <h6 className="border-bottom pb-2 mb-3 fw-semibold">
                            🕋 {t('hotelMeca', 'Hotel en La Meca')}
                        </h6>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="nombreHotelMeca" className="form-label fw-semibold small">
                            {t('nombreHotelMeca', 'Nombre del Hotel en La Meca')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombreHotelMeca"
                            name="nombreHotelMeca"
                            value={postData.nombreHotelMeca || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderNombreHotel', 'Ej: Hotel Elaf Al Malik')}
                            className="form-control"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="zonaMeca" className="form-label fw-semibold small">
                            {t('zonaMeca', 'Zona en La Meca')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="zonaMeca"
                            name="zonaMeca"
                            value={postData.zonaMeca || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                            {zonasMeca.map((z) => (
                                <option key={z.value} value={z.value}>{z.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sección Hotel Medina */}
                    <div className="col-12">
                        <h6 className="border-bottom pb-2 mt-3 mb-3 fw-semibold">
                            🕌 {t('hotelMedina', 'Hotel en Medina')}
                        </h6>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="nombreHotelMedina" className="form-label fw-semibold small">
                            {t('nombreHotelMedina', 'Nombre del Hotel en Medina')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombreHotelMedina"
                            name="nombreHotelMedina"
                            value={postData.nombreHotelMedina || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderNombreHotel', 'Ej: Hotel Anwar Al Madinah')}
                            className="form-control"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="zonaMedina" className="form-label fw-semibold small">
                            {t('zonaMedina', 'Zona en Medina')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="zonaMedina"
                            name="zonaMedina"
                            value={postData.zonaMedina || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectZona', 'Seleccione la zona')}</option>
                            {zonasMedina.map((z) => (
                                <option key={z.value} value={z.value}>{z.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dirección detallada */}
                    <div className="col-12">
                        <label htmlFor="direccionHoteles" className="form-label fw-semibold small">
                            {t('direccionDetallada', 'Dirección Detallada (opcional)')}
                        </label>
                        <textarea
                            id="direccionHoteles"
                            name="direccionHoteles"
                            rows={2}
                            value={postData.direccionHoteles || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderDireccion', 'Dirección completa de los hoteles...')}
                            className="form-control"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NombreLugarhotelhadj;