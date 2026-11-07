import React from 'react';
import { useTranslation } from 'react-i18next';

const Destinacionvoyageorganise = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');

    const fieldName = `destinacionvoyage${destinationNumber}`;
    const fieldId = `destinacion-voyage-${destinationNumber}`;

    const destinos = [
        {
            group: t('destinosArabes'),
            cities: ['Dubai','Abu Dhabi','Sharjah','El Cairo','Sharm El Sheikh','Alejandría','Túnez','Sousse','Djerba','Hammamet','Amán','Aqaba','Petra','Doha','Manama','Mascate','Salalah','Beirut','Trípoli'],
        },
        {
            group: t('destinosTurquia'),
            cities: ['Estambul','Ankara','Esmirna','Antalya','Bursa','Konya','Trabzon','Capadocia','Pamukkale','Éfeso'],
        },
        {
            group: t('destinosAsia'),
            cities: ['Kuala Lumpur','Langkawi','Penang','Bangkok','Phuket','Chiang Mai','Singapur','Bali','Yakarta','Seúl'],
        },
        {
            group: t('destinosEuropa'),
            cities: ['París','Lyon','Marsella','Londres','Manchester','Roma','Milán','Venecia','Madrid','Barcelona','Berlín','Múnich','Ámsterdam','Bruselas','Ginebra','Zúrich'],
        },
        {
            group: t('destinosAmerica'),
            cities: ['Nueva York','Los Ángeles','Miami','Las Vegas','Toronto','Montreal','Vancouver'],
        },
        {
            group: t('destinosAfrica'),
            cities: ['Casablanca','Marrakech','Tánger','Dakar','Túnez','Nairobi','Ciudad del Cabo'],
        },
    ];

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-warning bg-opacity-10 border-0">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">📍</span>
                    {t('destino')} {destinationNumber} — {t('internacional')}
                </h6>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor={fieldId} className="form-label fw-semibold small">
                        {t('ciudadDestino')}
                    </label>
                    <select
                        id={fieldId}
                        name={fieldName}
                        value={postData[fieldName] || ''}
                        onChange={handleChangeInput}
                        className="form-select"
                    >
                        <option value="">{t('elegirDestino')}</option>
                        {destinos.map((g) => (
                            <optgroup key={g.group} label={g.group}>
                                {g.cities.map((c) => (
                                    <option key={`${g.group}-${c}`} value={c}>{c}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Destinacionvoyageorganise;