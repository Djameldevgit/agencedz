import React from 'react';
import { useTranslation } from 'react-i18next';

const DestinacionLocationvacances = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');

    const fieldCity = `destinacionvoyage${destinationNumber}`;
    const fieldHotel = `voyage${destinationNumber}hotel${destinationNumber}`;
    const fieldHotelName = `voyage${destinationNumber}nombrehotel${destinationNumber}`;

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-success bg-opacity-10 border-0">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">📍</span>
                    {t('destino')} {destinationNumber} — {t('local')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor={fieldCity} className="form-label fw-semibold small">
                            {t('ciudadDestino')}
                        </label>
                        <select
                            id={fieldCity}
                            name={fieldCity}
                            value={postData[fieldCity] || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('elegirDestino')}</option>
                            <optgroup label={t('destinosNacionales')}>
                                {['Alger','Oran','Constantine','Annaba','Blida','Batna','Djelfa','Sétif','Sidi Bel Abbès','Biskra','Tébessa','El Oued','Skikda','Tizi Ouzou','Béjaïa','Tlemcen','Ghardaïa','Mostaganem','M\'Sila','Saïda'].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </optgroup>
                            <optgroup label={t('destinosSaharianos')}>
                                {['Tamanrasset','Djanet','Illizi','Adrar','Timimoun','Béchar','El Menia','In Salah','Taghit','Beni Abbes'].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </optgroup>
                            <optgroup label={t('destinosCosteros')}>
                                {['Tipaza','Cherchell','Aïn Taya','Zéralda','Sidi Fredj','Tichy','Azeffoun','Jijel','Collo','El Kala'].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor={fieldHotel} className="form-label fw-semibold small">
                            {t('tipoAlojamiento')}
                        </label>
                        <input
                            type="text"
                            id={fieldHotel}
                            name={fieldHotel}
                            value={postData[fieldHotel] || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderTipoAlojamiento')}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor={fieldHotelName} className="form-label fw-semibold small">
                        {t('nombreEstablecimiento')}
                    </label>
                    <input
                        type="text"
                        id={fieldHotelName}
                        name={fieldHotelName}
                        value={postData[fieldHotelName] || ''}
                        onChange={handleChangeInput}
                        placeholder={t('placeholderNombreHotel')}
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    );
};

export default DestinacionLocationvacances;