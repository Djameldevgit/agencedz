import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiciosVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'guiaAcompañante', icon: '👨‍💼', label: t('guiaAcompañante', 'Guía acompañante'), description: t('guiaAcompañante_desc', 'Guía profesional durante todo el viaje') },
        { name: 'excursionesIncluidas', icon: '🗺️', label: t('excursionesIncluidas', 'Excursiones incluidas'), description: t('excursionesIncluidas_desc', 'Visitas a lugares turísticos') },
        { name: 'entradasMonumentos', icon: '🎫', label: t('entradasMonumentos', 'Entradas a monumentos'), description: t('entradasMonumentos_desc', 'Acceso a sitios históricos') },
        { name: 'trasladosAeropuerto', icon: '🚗', label: t('trasladosAeropuerto', 'Traslados aeropuerto'), description: t('trasladosAeropuerto_desc', 'Transporte ida y vuelta') },
        { name: 'asistencia24h', icon: '📞', label: t('asistencia24h', 'Asistencia 24/7'), description: t('asistencia24h_desc', 'Soporte durante todo el viaje') },
        { name: 'seguroViaje', icon: '🛡️', label: t('seguroViaje', 'Seguro de viaje'), description: t('seguroViaje_desc', 'Cobertura médica y de cancelación') },
        { name: 'comidasIncluidas', icon: '🍽️', label: t('comidasIncluidas', 'Comidas incluidas'), description: t('comidasIncluidas_desc', 'Según régimen seleccionado') },
        { name: 'actividadesRecreativas', icon: '🎭', label: t('actividadesRecreativas', 'Actividades recreativas'), description: t('actividadesRecreativas_desc', 'Entretenimiento y diversión') },
        { name: 'espectaculosNocturnos', icon: '🌃', label: t('espectaculosNocturnos', 'Espectáculos nocturnos'), description: t('espectaculosNocturnos_desc', 'Shows y entretenimiento') },
        { name: 'deportesAcuaticos', icon: '🏄', label: t('deportesAcuaticos', 'Deportes acuáticos'), description: t('deportesAcuaticos_desc', 'Actividades en el agua') },
        { name: 'spaBienestar', icon: '💆', label: t('spaBienestar', 'Spa y bienestar'), description: t('spaBienestar_desc', 'Masajes y tratamientos') },
        { name: 'comprasGuiadas', icon: '🛍️', label: t('comprasGuiadas', 'Compras guiadas'), description: t('comprasGuiadas_desc', 'Tour de compras con guía') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-warning text-dark">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🧳</span>
                    {t('serviciosVoyages', 'Servicios Voyages Organisés')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
                    {servicios.map((servicio) => (
                        <div className="col-12 col-md-6 col-lg-4" key={servicio.name}>
                            <div className="form-check p-3 border rounded h-100">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={servicio.name}
                                    name={servicio.name}
                                    checked={postData[servicio.name] || false}
                                    onChange={handleChangeInput}
                                />
                                <label className="form-check-label w-100" htmlFor={servicio.name}>
                                    <div className="fw-semibold small">
                                        <span aria-hidden="true">{servicio.icon}</span> {servicio.label}
                                    </div>
                                    <small className="text-muted d-block mt-1">
                                        {servicio.description}
                                    </small>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiciosVoyagesOrganises;