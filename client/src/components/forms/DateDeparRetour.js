import React from 'react';
import { useTranslation } from 'react-i18next';

const DateDeparRetour = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="col-12 col-md-6">
                <label htmlFor="datedepar" className="form-label fw-semibold small">
                    {t('dateDepart', 'Date de Départ')} <span className="text-danger">*</span>
                </label>
                <input
                    type="date"
                    id="datedepar"
                    name="datedepar"
                    value={postData.datedepar || ''}
                    onChange={handleChangeInput}
                    className="form-control"
                />
                <div className="form-text text-muted">
                    {t('selectDepartureDate', 'Sélectionnez la date de départ')}
                </div>
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="dateretour" className="form-label fw-semibold small">
                    {t('dateRetour', 'Date de Retour')} <span className="text-danger">*</span>
                </label>
                <input
                    type="date"
                    id="dateretour"
                    name="dateretour"
                    value={postData.dateretour || ''}
                    onChange={handleChangeInput}
                    className="form-control"
                />
                <div className="form-text text-muted">
                    {t('selectReturnDate', 'Sélectionnez la date de retour')}
                </div>
            </div>
        </div>
    );
};

export default DateDeparRetour;