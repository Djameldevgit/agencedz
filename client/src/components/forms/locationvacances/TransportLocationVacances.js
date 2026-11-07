import React from 'react';
import { useTranslation } from 'react-i18next';

const TransportLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const opcionesTransporte = [
        { value: 'non_inclus', label: '❌ ' + t('transport_non_inclus', 'Transport non inclus') },
        { value: 'navette', label: '🚐 ' + t('navette', 'Navette gratuite') },
        { value: 'transfert_paye', label: '🚗 ' + t('transfert_paye', 'Transfert payant') },
        { value: 'location_voiture', label: '🔑 ' + t('location_voiture', 'Location voiture incluse') },
    ];

    const opcionesParking = [
        { value: 'gratuit', label: '🅿️ ' + t('parking_gratuit', 'Parking gratuit') },
        { value: 'payant', label: '💰 ' + t('parking_payant', 'Parking payant') },
        { value: 'prive', label: '🔒 ' + t('parking_prive', 'Parking privé') },
        { value: 'non_disponible', label: '❌ ' + t('parking_non_disponible', 'Pas de parking') },
    ];

    const accesos = [
        { name: 'accesBus', icon: '🚌', label: 'Bus' },
        { name: 'accesTaxi', icon: '🚕', label: 'Taxi' },
        { name: 'accesMetro', icon: '🚇', label: 'Métro' },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🚗</span>
                    {t('transportLocation', 'Transport Location Vacances')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="transportInclus" className="form-label fw-semibold small">
                            {t('transportInclus', 'Transport Inclus')}
                        </label>
                        <select
                            id="transportInclus"
                            name="transportInclus"
                            value={postData.transportInclus || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectTransportOption', 'Options de transport')}</option>
                            {opcionesTransporte.map((op) => (
                                <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                        </select>
                        <div className="form-text text-muted">
                            {t('transportLocationHelp', 'Transport vers la location')}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="parking" className="form-label fw-semibold small">
                            {t('parking', 'Parking')}
                        </label>
                        <select
                            id="parking"
                            name="parking"
                            value={postData.parking || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectParking', 'Options parking')}</option>
                            {opcionesParking.map((op) => (
                                <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold small">
                            {t('accesTransport', 'Accès Transport Public')}
                        </label>
                        <div className="d-flex flex-wrap gap-3">
                            {accesos.map((a) => (
                                <div className="form-check" key={a.name}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={a.name}
                                        name={a.name}
                                        checked={postData[a.name] || false}
                                        onChange={handleChangeInput}
                                    />
                                    <label className="form-check-label small" htmlFor={a.name}>
                                        <span aria-hidden="true">{a.icon}</span> {a.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="distanceTransport" className="form-label fw-semibold small">
                            {t('distanceTransport', 'Distance arrêt transport')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="distanceTransport"
                                name="distanceTransport"
                                value={postData.distanceTransport || ''}
                                onChange={handleChangeInput}
                                placeholder="500"
                                className="form-control"
                            />
                            <span className="input-group-text">m</span>
                        </div>
                        <div className="form-text text-muted">
                            {t('distanceTransportHelp', 'Distance du transport public')}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TransportLocationVacances;