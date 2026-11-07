import React from 'react';
import { useTranslation } from 'react-i18next';

const HotelHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const categoriasHoteles = [
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas'), desc: t('lujo', 'Alojamiento de lujo') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas'), desc: t('superior', 'Alojamiento superior') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas'), desc: t('confort', 'Alojamiento confort') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas'), desc: t('economico', 'Alojamiento económico') }
    ];

    const distancias = [
        { value: '0_200', label: '0-200 m ' + t('muy_cerca', 'Muy cerca') },
        { value: '200_500', label: '200-500 m ' + t('cerca', 'Cerca') },
        { value: '500_1000', label: '500-1000 m ' + t('media', 'Distancia media') },
        { value: '1000_plus', label: '+1000 m ' + t('lejos', 'Lejos') }
    ];

    const serviciosCheck = [
        { name: 'wifiHotel', icon: '📶', label: t('wifi', 'Wi-Fi') },
        { name: 'comidasIncluidas', icon: '🍽️', label: t('comidasIncluidas', 'Comidas incluidas') },
        { name: 'accesoTransporte', icon: '🚌', label: t('accesoTransporte', 'Transporte al Haram') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏨</span>
                    {t('alojamientoHajj', 'Alojamiento Hajj/Omra')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    {/* Hotel La Meca */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="categoriaHotelMeca" className="form-label fw-semibold small">
                            {t('hotelMeca', 'Hotel en La Meca')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="categoriaHotelMeca"
                            name="categoriaHotelMeca"
                            value={postData.categoriaHotelMeca || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectCategoria', 'Seleccione categoría')}</option>
                            {categoriasHoteles.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                        {postData.categoriaHotelMeca && (
                            <div className="form-text text-muted">
                                {categoriasHoteles.find(c => c.value === postData.categoriaHotelMeca)?.desc}
                            </div>
                        )}
                    </div>

                    {/* Hotel Medina */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="categoriaHotelMedina" className="form-label fw-semibold small">
                            {t('hotelMedina', 'Hotel en Medina')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="categoriaHotelMedina"
                            name="categoriaHotelMedina"
                            value={postData.categoriaHotelMedina || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectCategoria', 'Seleccione categoría')}</option>
                            {categoriasHoteles.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                        {postData.categoriaHotelMedina && (
                            <div className="form-text text-muted">
                                {categoriasHoteles.find(c => c.value === postData.categoriaHotelMedina)?.desc}
                            </div>
                        )}
                    </div>

                    {/* Distancia Meca */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="distanciaMeca" className="form-label fw-semibold small">
                            {t('distanciaMeca', 'Distancia a Al-Haram (Meca)')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="distanciaMeca"
                            name="distanciaMeca"
                            value={postData.distanciaMeca || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectDistancia', 'Seleccione distancia')}</option>
                            {distancias.map((d) => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Distancia Medina */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="distanciaMedina" className="form-label fw-semibold small">
                            {t('distanciaMedina', 'Distancia a Al-Masjid (Medina)')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="distanciaMedina"
                            name="distanciaMedina"
                            value={postData.distanciaMedina || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectDistancia', 'Seleccione distancia')}</option>
                            {distancias.map((d) => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Servicios */}
                    <div className="col-12">
                        <label className="form-label fw-semibold small">
                            {t('serviciosHotel', 'Servicios del Hotel')}
                        </label>
                        <div className="d-flex flex-wrap gap-3">
                            {serviciosCheck.map((s) => (
                                <div className="form-check" key={s.name}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={s.name}
                                        name={s.name}
                                        checked={postData[s.name] || false}
                                        onChange={handleChangeInput}
                                    />
                                    <label className="form-check-label small" htmlFor={s.name}>
                                        {s.icon} {s.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HotelHajjOmra;