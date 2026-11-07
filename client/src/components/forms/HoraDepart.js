import React from 'react';
import { useTranslation } from 'react-i18next';

const HoraDepart = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    return (
        <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="horaDepart" className="form-label fw-semibold small">
                    {t('horaDepart', 'Heure de Départ')} <span className="text-danger">*</span>
                </label>
                <input
                    type="time"
                    id="horaDepart"
                    name="horaDepart"
                    value={postData.horaDepart || ''}
                    onChange={handleChangeInput}
                    className="form-control"
                />
                <div className="form-text text-muted">
                    {t('selectDepartureTime', 'Sélectionnez l\'heure de départ')}
                </div>
            </div>
        </div>
    );
};

export default HoraDepart;