import React from 'react';
import { useTranslation } from 'react-i18next';

const TransportHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const airlines = [
        'Air Algérie', 'Saudi Airlines', 'Emirates', 'Qatar Airways',
        'Turkish Airlines', 'Etihad Airways', 'Other'
    ];

    const transportTypes = [
        { value: 'avion_direct', label: t('avion_direct', 'Vol direct'), icon: '✈️' },
        { value: 'avion_escale', label: t('avion_escale', 'Vol avec escale'), icon: '🛬' },
        { value: 'bus_meca_medina', label: t('bus_meca_medina', 'Bus Mecque-Médine'), icon: '🚌' },
    ];

    const clases = [
        { value: 'economy', label: t('economy', 'Économique') },
        { value: 'premium_economy', label: t('premium_economy', 'Économique Premium') },
        { value: 'business', label: t('business', 'Affaires') },
        { value: 'first', label: t('first', 'Première Classe') },
    ];

    const transportsTerrestres = [
        { value: 'bus_ac', label: '🚌 ' + t('bus_ac', 'Bus climatisé') },
        { value: 'van', label: '🚐 ' + t('van', 'Van de luxe') },
        { value: 'voiture', label: '🚗 ' + t('voiture', 'Voiture privée') },
        { value: 'non_inclus', label: '❌ ' + t('non_inclus', 'Non inclus') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🚗</span>
                    {t('transportHajj', 'Transport Hajj/Omra')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    {/* Type de transport */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="typeTransport" className="form-label fw-semibold small">
                            {t('typeTransport', 'Type de Transport')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="typeTransport"
                            name="typeTransport"
                            value={postData.typeTransport || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectTransportType', 'Sélectionnez le type')}</option>
                            {transportTypes.map((tt) => (
                                <option key={tt.value} value={tt.value}>
                                    {tt.icon} {tt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Compagnie aérienne */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="compagnieAerienne" className="form-label fw-semibold small">
                            {t('compagnieAerienne', 'Compagnie Aérienne')}
                        </label>
                        <select
                            id="compagnieAerienne"
                            name="compagnieAerienne"
                            value={postData.compagnieAerienne || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectAirline', 'Choisissez la compagnie')}</option>
                            {airlines.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>

                    {/* Classe de vol */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="classeVol" className="form-label fw-semibold small">
                            {t('classeVol', 'Classe de Vol')}
                        </label>
                        <select
                            id="classeVol"
                            name="classeVol"
                            value={postData.classeVol || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectClass', 'Sélectionnez la classe')}</option>
                            {clases.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Transport terrestre */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="transportTerrestre" className="form-label fw-semibold small">
                            {t('transportTerrestre', 'Transport Terrestre')}
                        </label>
                        <select
                            id="transportTerrestre"
                            name="transportTerrestre"
                            value={postData.transportTerrestre || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <option value="">{t('selectGroundTransport', 'Transport au sol')}</option>
                            {transportsTerrestres.map((tt) => (
                                <option key={tt.value} value={tt.value}>{tt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Transferts aéroport */}
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="transfertsAeroport"
                                name="transfertsAeroport"
                                checked={postData.transfertsAeroport || false}
                                onChange={handleChangeInput}
                            />
                            <label className="form-check-label small" htmlFor="transfertsAeroport">
                                <span aria-hidden="true">🚐</span> {t('transfertsAeroport', 'Transferts aéroport-hôtel inclus')}
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TransportHajjOmra;