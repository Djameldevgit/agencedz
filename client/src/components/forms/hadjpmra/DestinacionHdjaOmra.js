import React from 'react';
import { useTranslation } from 'react-i18next';

const DestinacionHadjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPeregrinacion = [
        { value: 'hajj', label: `🕋 ${t('hajj', 'Hajj')}` },
        { value: 'omra', label: `🌙 ${t('omra', 'Omra')}` },
        { value: 'omra_ramadan', label: `⭐ ${t('omra_ramadan', 'Omra Ramadan')}` },
    ];

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-warning bg-opacity-10 border-0">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">📍</span>
                    {t('destino')} — {t('peregrinacion')}
                </h6>
            </div>
            <div className="card-body" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="row g-3">

                    {/* 🔷 TIPO DE PEREGRINACIÓN (NUEVO) */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="type" className="form-label fw-semibold small">
                            {t('tipoPeregrinacion', 'Type de pèlerinage')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={postData.type || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('elegirTipo', 'Sélectionner le type')}</option>
                            {tiposPeregrinacion.map(tp => (
                                <option key={tp.value} value={tp.value}>{tp.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* 🔷 DESTINO (renombrado a `destination`) */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="destination" className="form-label fw-semibold small">
                            {t('ciudadDestinoPeregrinacion', 'Ville de destination')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="destination"
                            name="destination"
                            value={postData.destination || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('elegirDestinoPeregrinacion', 'Choisir la destination')}</option>
                            <optgroup label={t('ciudadesSantas', 'Villes saintes')}>
                                <option value="La Meca">La Meca</option>
                                <option value="Medina">Medina</option>
                                <option value="La Meca y Medina">La Meca y Medina</option>
                                <option value="Meca - Medina - Yeda">Meca - Medina - Yeda</option>
                            </optgroup>
                            <optgroup label={t('ciudadesSantasArabia', 'Villes d\'Arabie Saoudite')}>
                                <option value="Yeda">Yeda</option>
                                <option value="Taif">Taif</option>
                                <option value="Riad">Riad</option>
                                <option value="Dammam">Dammam</option>
                                <option value="Jizan">Jizan</option>
                                <option value="Abha">Abha</option>
                            </optgroup>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DestinacionHadjOmra;