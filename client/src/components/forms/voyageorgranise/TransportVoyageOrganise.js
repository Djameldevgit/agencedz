import React from 'react';
import { useTranslation } from 'react-i18next';

const TransportVoyagesOrganises = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const transportModes = [
        { value: 'avion', label: '✈️ ' + t('avion', 'Avion'), description: t('avion_desc', 'Vol international') },
        { value: 'bus', label: '🚌 ' + t('bus', 'Bus touristique'), description: t('bus_desc', 'Bus climatisé') },
        { value: 'train', label: '🚆 ' + t('train', 'Train'), description: t('train_desc', 'Voyage en train') },
        { value: 'bateau', label: '🚢 ' + t('bateau', 'Bateau/Croisière'), description: t('bateau_desc', 'Croisière maritime') },
        { value: 'mixte', label: '🔀 ' + t('mixte', 'Transport mixte'), description: t('mixte_desc', 'Combinaison multiple') },
    ];

    const airlines = [
        'Air Algérie', 'Turkish Airlines', 'Emirates', 'Qatar Airways',
        'Air France', 'Lufthansa', 'British Airways', 'Other',
    ];

    const servicesTransport = [
        { name: 'transfertsAeroport', icon: '🚗', label: t('transfertsAeroport', 'Transferts aéroport') },
        { name: 'transportExcursions', icon: '🚌', label: t('transportExcursions', 'Transport excursions') },
        { name: 'assistanceGuide', icon: '👨‍💼', label: t('assistanceGuide', 'Assistance guide') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-warning text-dark">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🧳</span>
                    {t('transportVoyages', 'Transport Voyages Organisés')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="modeTransport" className="form-label fw-semibold small">
                            {t('modeTransport', 'Mode de Transport Principal')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="modeTransport"
                            name="modeTransport"
                            value={postData.modeTransport || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectMainTransport', 'Sélectionnez le transport')}</option>
                            {transportModes.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        {postData.modeTransport && (
                            <div className="form-text text-muted">
                                {transportModes.find(m => m.value === postData.modeTransport)?.description}
                            </div>
                        )}
                    </div>

                    {postData.modeTransport === 'avion' && (
                        <div className="col-12 col-md-6">
                            <label htmlFor="compagnieAerienne" className="form-label fw-semibold small">
                                {t('compagnieAerienne', 'Compagnie Aérienne')} <span className="text-danger">*</span>
                            </label>
                            <select
                                id="compagnieAerienne"
                                name="compagnieAerienne"
                                value={postData.compagnieAerienne || ''}
                                onChange={handleChangeInput}
                                className="form-select"
                            >
                                <option value="">{t('selectAirline', 'Choisissez la compagnie')}</option>
                                {airlines.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="col-12 col-md-6">
                        <label htmlFor="classeTransport" className="form-label fw-semibold small">
                            {t('classeTransport', 'Classe de Transport')}
                        </label>
                        <select
                            id="classeTransport"
                            name="classeTransport"
                            value={postData.classeTransport || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="standard">⭐ {t('standard', 'Standard')}</option>
                            <option value="comfort">⭐⭐ {t('comfort', 'Confort')}</option>
                            <option value="premium">⭐⭐⭐ {t('premium', 'Premium')}</option>
                            <option value="luxe">💎 {t('luxe', 'Luxe')}</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold small">
                            {t('servicesInclus', 'Services de Transport Inclus')}
                        </label>
                        <div className="d-flex flex-wrap gap-3">
                            {servicesTransport.map((s) => (
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
                                        <span aria-hidden="true">{s.icon}</span> {s.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {(postData.modeTransport === 'avion' || postData.modeTransport === 'mixte') && (
                        <div className="col-12">
                            <div className="card bg-light">
                                <div className="card-header">
                                    <strong>✈️ {t('infoVol', 'Informations Vol')}</strong>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="typeVol" className="form-label small fw-semibold">
                                                {t('typeVol', 'Type de Vol')}
                                            </label>
                                            <select
                                                id="typeVol"
                                                name="typeVol"
                                                value={postData.typeVol || ''}
                                                onChange={handleChangeInput}
                                                className="form-select"
                                            >
                                                <option value="direct">🛫 {t('vol_direct', 'Vol direct')}</option>
                                                <option value="escale">🛬 {t('vol_escale', 'Avec escale')}</option>
                                                <option value="multi">🔀 {t('vol_multi', 'Multi-destinations')}</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="baggage" className="form-label small fw-semibold">
                                                {t('baggage', 'Bagage Inclus')}
                                            </label>
                                            <select
                                                id="baggage"
                                                name="baggage"
                                                value={postData.baggage || ''}
                                                onChange={handleChangeInput}
                                                className="form-select"
                                            >
                                                <option value="20kg">🎒 20kg {t('soute', 'soute')}</option>
                                                <option value="30kg">🧳 30kg {t('soute', 'soute')}</option>
                                                <option value="cabine">💼 {t('cabine_only', 'Cabine seulement')}</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="repasVol" className="form-label small fw-semibold">
                                                {t('repasVol', 'Repas à bord')}
                                            </label>
                                            <select
                                                id="repasVol"
                                                name="repasVol"
                                                value={postData.repasVol || ''}
                                                onChange={handleChangeInput}
                                                className="form-select"
                                            >
                                                <option value="inclus">🍱 {t('inclus', 'Inclus')}</option>
                                                <option value="payant">💵 {t('payant', 'Payant')}</option>
                                                <option value="non">❌ {t('non_inclus', 'Non inclus')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TransportVoyagesOrganises;