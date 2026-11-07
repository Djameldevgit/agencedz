import React from 'react';
import { useTranslation } from 'react-i18next';

const DuracionDelViaje = ({ postData }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const calculateDays = () => {
        if (!postData.datedepar || !postData.dateretour) return null;
        const start = new Date(postData.datedepar);
        const end = new Date(postData.dateretour);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        return days;
    };

    const days = calculateDays();

    return (
        <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="col-12">
                {days !== null && (
                    <div className="alert alert-info py-2 mb-0">
                        <strong>
                            {t('duration', 'Durée du voyage')}: {days}{' '}
                            {days === 1 ? t('day', 'jour') : t('days', 'jours')}
                        </strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DuracionDelViaje;