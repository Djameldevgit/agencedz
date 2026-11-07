import React from 'react';
import { useTranslation } from 'react-i18next';

const DestinacionHadjOmra = ({ postData, handleChangeInput, destinationNumber = 1 }) => {
    const { t } = useTranslation('categories');

    const fieldName = `destinacionvoyage${destinationNumber}`;
    const fieldId = `destinacion-voyage-${destinationNumber}`;

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-warning bg-opacity-10 border-0">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">📍</span>
                    {t('destino')} {destinationNumber} — {t('peregrinacion')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <label
                                htmlFor={fieldId}
                                className="form-label fw-semibold small"
                            >
                                {t('ciudadDestinoPeregrinacion')}
                            </label>
                            <select
                                id={fieldId}
                                name={fieldName}
                                value={postData[fieldName] || ''}
                                onChange={handleChangeInput}
                                className="form-select"
                                aria-label={t('ciudadDestinoPeregrinacion')}
                            >
                                <option value="">{t('elegirDestinoPeregrinacion')}</option>
                                <optgroup label={t('ciudadesSantas')}>
                                    <option value="La Meca">La Meca</option>
                                    <option value="Medina">Medina</option>
                                    <option value="La Meca y Medina">La Meca y Medina</option>
                                    <option value="Meca - Medina - Yeda">Meca - Medina - Yeda</option>
                                </optgroup>
                                <optgroup label={t('ciudadesSantasArabia')}>
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
        </div>
    );
};

export default DestinacionHadjOmra;