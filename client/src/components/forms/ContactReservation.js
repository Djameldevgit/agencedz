import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactReservation = ({ postData, handleChangeInput }) => {
    const { t } = useTranslation('categories');

    const detectContactType = (text) => {
        if (!text) return [];
        const types = [];
        const low = text.toLowerCase();
        if (text.includes('@') || low.includes('email')) types.push('email');
        if (/\+\d{2,3}[-.\s]?\d{2,3}[-.\s]?\d{3}[-.\s]?\d{3}/.test(text) ||
            low.includes('tel') || low.includes('whatsapp')) types.push('phone');
        if (low.includes('http') || low.includes('www') || low.includes('.com') || low.includes('.dz')) types.push('website');
        if (low.includes('facebook') || low.includes('instagram') || low.includes('twitter')) types.push('social');
        if (low.includes('adresse') || low.includes('rue') || low.includes('address')) types.push('address');
        return types;
    };

    const colorByType = {
        phone: 'success',
        email: 'primary',
        website: 'info',
        social: 'warning',
        address: 'secondary',
    };

    const contactTypes = detectContactType(postData.contacto || '');
    const value = postData.contacto || '';

    return (
        <div className="mb-4">
            <label htmlFor="contacto" className="form-label fw-bold">
                📞 {t('contactReservation')} <span className="text-danger">*</span>
            </label>

            {contactTypes.length > 0 && (
                <div className="mb-2">
                    <small className="text-muted me-2">{t('typesDetectes')}:</small>
                    {contactTypes.map((type, i) => (
                        <span key={i} className={`badge bg-${colorByType[type] || 'secondary'} me-1 mb-1`}>
                            {t(`type_${type}`)}
                        </span>
                    ))}
                </div>
            )}

            <textarea
                id="contacto"
                name="contacto"
                rows={3}
                value={value}
                onChange={handleChangeInput}
                placeholder={t('placeholderContact')}
                className="form-control"
                style={{ resize: 'vertical' }}
            />

            <div className="text-end small text-muted mt-1">
                {value.length} {t('caracteres')}
            </div>
        </div>
    );
};

export default ContactReservation;