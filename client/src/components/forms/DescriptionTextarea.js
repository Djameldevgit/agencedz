import React from 'react';
import { useTranslation } from 'react-i18next';

const DescriptionTextarea = ({ postData, handleChangeInput, placeholder }) => {
    const { t } = useTranslation('categories');
    const value = postData.description || '';

    return (
        <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold small">
                {t('description')}
            </label>
            <textarea
                id="description"
                name="description"
                rows={3}
                value={value}
                onChange={handleChangeInput}
                placeholder={placeholder || t('placeholderDescription')}
                className="form-control"
            />
            <div className="text-end small text-muted mt-1">
                {value.length} {t('caracteres')}
            </div>
        </div>
    );
};

export default DescriptionTextarea;