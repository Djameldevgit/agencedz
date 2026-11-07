import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiciosHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'guiaReligioso', icon: '📖', label: t('guiaReligioso', 'Guía religioso'), description: t('guiaReligioso_desc', 'Acompañamiento de un guía religioso') },
        { name: 'conferencias', icon: '🎤', label: t('conferencias', 'Conferencias religiosas'), description: t('conferencias_desc', 'Conferencias sobre rituales') },
        { name: 'trasladosMecaMedina', icon: '🚌', label: t('trasladosMecaMedina', 'Traslados Meca-Medina'), description: t('trasladosMecaMedina_desc', 'Transporte entre ciudades santas') },
        { name: 'visitasGuiadas', icon: '🏛️', label: t('visitasGuiadas', 'Visitas guiadas'), description: t('visitasGuiadas_desc', 'Visitas a lugares históricos') },
        { name: 'asistenciaMedica', icon: '🏥', label: t('asistenciaMedica', 'Asistencia médica'), description: t('asistenciaMedica_desc', 'Servicio médico durante el viaje') },
        { name: 'seguroViaje', icon: '🛡️', label: t('seguroViaje', 'Seguro de viaje'), description: t('seguroViaje_desc', 'Cobertura de seguro médico') },
        { name: 'kitPeregrino', icon: '🎒', label: t('kitPeregrino', 'Kit del peregrino'), description: t('kitPeregrino_desc', 'Incluye Ihram y otros elementos') },
        { name: 'tramitesVisado', icon: '📄', label: t('tramitesVisado', 'Trámites de visado'), description: t('tramitesVisado_desc', 'Gestión de visado saudí') }
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🛎️</span>
                    {t('serviciosHajj', 'Servicios Hajj/Omra')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
                    {servicios.map((servicio) => (
                        <div className="col-12 col-md-6" key={servicio.name}>
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

export default ServiciosHajjOmra;