import React from 'react';
import { useTranslation } from 'react-i18next';

const AddressInput = ({
    postData,
    handleChangeInput,
    handleWilayaChange,
    wilayasOptions,
}) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Ville de départ */}
            <div className="col-12 col-md-6">
                <label htmlFor="villeDepart" className="form-label fw-semibold small">
                    {t('villeDepart', 'Ville de Départ')} <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    id="villeDepart"
                    name="villeDepart"
                    value={postData.villeDepart || ''}
                    onChange={handleChangeInput}
                    placeholder={t('placeholderVilleDepart', 'Ex: Alger, Oran, Constantine...')}
                    className="form-control"
                />
                <div className="form-text text-muted">
                    {t('villeDepartHelp', 'Entrez la ville de départ du voyage')}
                </div>
            </div>

            {/* Wilaya */}
            <div className="col-12 col-md-6">
                <label htmlFor="wilaya" className="form-label fw-semibold small">
                    {t('wilaya', 'Wilaya')} <span className="text-danger">*</span>
                </label>
                <select
                    id="wilaya"
                    name="wilaya"
                    value={postData.wilaya || ''}
                    onChange={handleWilayaChange}
                    className="form-select"
                >
                    <option value="">{t('selectionnezWilaya', 'Sélectionnez une wilaya')}</option>
                    {wilayasOptions}
                </select>
                <div className="form-text text-muted">
                    {t('wilayaHelp', 'Sélectionnez la wilaya de départ')}
                </div>
            </div>
        </div>
    );
};

export default AddressInput;