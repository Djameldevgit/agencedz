import React from 'react';
import { useTranslation } from 'react-i18next';

const Hotellocationvacance = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPropiedades = [
        { value: 'villa', label: '🏠 ' + t('villa', 'Villa') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio') },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad') },
        { value: 'chalet', label: '⛰️ ' + t('chalet', 'Chalet') },
        { value: 'casa_rural', label: '🌄 ' + t('casa_rural', 'Casa rural') },
    ];

    const capacidades = [
        { value: '1_2', label: t('1_2_personas', '1-2 personas') },
        { value: '2_4', label: t('2_4_personas', '2-4 personas') },
        { value: '4_6', label: t('4_6_personas', '4-6 personas') },
        { value: '6_8', label: t('6_8_personas', '6-8 personas') },
        { value: '8_plus', label: t('8_plus_personas', '8+ personas') },
    ];

    const equipamientos = [
        { name: 'wifi', icon: '📶', label: t('wifi', 'Wi-Fi') },
        { name: 'piscina', icon: '🏊', label: t('piscina', 'Piscina') },
        { name: 'aire_acondicionado', icon: '❄️', label: t('aire_acondicionado', 'Aire acondicionado') },
        { name: 'cocina', icon: '👨‍🍳', label: t('cocina', 'Cocina equipada') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏡</span>
                    {t('alojamientoLocation', 'Alojamiento Location Vacances')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="tipoPropiedad" className="form-label fw-semibold small">
                            {t('tipoPropiedad', 'Tipo de Propiedad')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="tipoPropiedad"
                            name="tipoPropiedad"
                            value={postData.tipoPropiedad || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectTipoPropiedad', 'Seleccione tipo')}</option>
                            {tiposPropiedades.map((tp) => (
                                <option key={tp.value} value={tp.value}>{tp.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="capacidad" className="form-label fw-semibold small">
                            {t('capacidad', 'Capacidad')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="capacidad"
                            name="capacidad"
                            value={postData.capacidad || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectCapacidad', 'Número de personas')}</option>
                            {capacidades.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="numHabitaciones" className="form-label fw-semibold small">
                            {t('numHabitaciones', 'Habitaciones')}
                        </label>
                        <select
                            id="numHabitaciones"
                            name="numHabitaciones"
                            value={postData.numHabitaciones || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectNum', 'Seleccione')}</option>
                            {['1','2','3','4','5+'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="numBanos" className="form-label fw-semibold small">
                            {t('numBanos', 'Baños')}
                        </label>
                        <select
                            id="numBanos"
                            name="numBanos"
                            value={postData.numBanos || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectNum', 'Seleccione')}</option>
                            {['1','2','3','4+'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="superficie" className="form-label fw-semibold small">
                            {t('superficie', 'Superficie (m²)')}
                        </label>
                        <input
                            type="number"
                            id="superficie"
                            name="superficie"
                            value={postData.superficie || ''}
                            onChange={handleChangeInput}
                            placeholder="m²"
                            className="form-control"
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold small">
                            {t('equipamientos', 'Equipamientos')}
                        </label>
                        <div className="row g-2">
                            {equipamientos.map((eq) => (
                                <div className="col-6 col-md-3" key={eq.name}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={eq.name}
                                            name={eq.name}
                                            checked={postData[eq.name] || false}
                                            onChange={handleChangeInput}
                                        />
                                        <label className="form-check-label small" htmlFor={eq.name}>
                                            <span aria-hidden="true">{eq.icon}</span> {eq.label}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hotellocationvacance;