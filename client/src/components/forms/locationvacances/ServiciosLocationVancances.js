import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiciosLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const servicios = [
        { name: 'limpiezaDiaria', icon: '🧹', label: t('limpiezaDiaria', 'Limpieza diaria'), description: t('limpiezaDiaria_desc', 'Servicio de limpieza todos los días') },
        { name: 'cambioRopa', icon: '🛏️', label: t('cambioRopa', 'Cambio de ropa de cama'), description: t('cambioRopa_desc', 'Cambio regular de sábanas y toallas') },
        { name: 'wifiGratuito', icon: '📶', label: t('wifiGratuito', 'Wi-Fi gratuito'), description: t('wifiGratuito_desc', 'Internet de alta velocidad') },
        { name: 'parkingGratuito', icon: '🅿️', label: t('parkingGratuito', 'Parking gratuito'), description: t('parkingGratuito_desc', 'Estacionamiento incluido') },
        { name: 'piscinaPrivada', icon: '🏊', label: t('piscinaPrivada', 'Piscina privada'), description: t('piscinaPrivada_desc', 'Uso exclusivo de piscina') },
        { name: 'jacuzzi', icon: '💦', label: t('jacuzzi', 'Jacuzzi'), description: t('jacuzzi_desc', 'Bañera de hidromasaje') },
        { name: 'bbq', icon: '🔥', label: t('bbq', 'Zona de barbacoa'), description: t('bbq_desc', 'Área para parrillas') },
        { name: 'cuna', icon: '👶', label: t('cuna', 'Cuna para bebé'), description: t('cuna_desc', 'Disponible bajo petición') },
        { name: 'lavadora', icon: '🧼', label: t('lavadora', 'Lavadora'), description: t('lavadora_desc', 'Lavadora a disposición') },
        { name: 'secadora', icon: '🌬️', label: t('secadora', 'Secadora'), description: t('secadora_desc', 'Secadora de ropa') },
        { name: 'accesoPlaya', icon: '🏖️', label: t('accesoPlaya', 'Acceso directo a playa'), description: t('accesoPlaya_desc', 'Acceso privado a la playa') },
        { name: 'gimnasio', icon: '💪', label: t('gimnasio', 'Acceso a gimnasio'), description: t('gimnasio_desc', 'Uso de instalaciones deportivas') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🛎️</span>
                    {t('serviciosLocation', 'Servicios Location Vacances')}
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

export default ServiciosLocationVacances;