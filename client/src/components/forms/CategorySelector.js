import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CategorySelector = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    // ✅ SOLO LEE de Redux. No dispara nada.
    const { categories } = useSelector(state => state.homePosts || {});

    // Fallback si el backend aún no respondió (evita que el select quede vacío)
    const fallbackCategorias = [
        { key: 'Voyage Organise',   label: { fr: 'Voyage Organisé' },        detailType: 'travel', icon: '🗺️' },
        { key: 'Voyage_Local',      label: { fr: 'Voyage Local' },            detailType: 'travel', icon: '📍' },
        { key: 'Voyage_Etranger',   label: { fr: 'Voyage à l\'Étranger' },    detailType: 'travel', icon: '🌍' },
        { key: 'Location_Vacances', label: { fr: 'Location Vacances' },       detailType: 'rental', icon: '🏠' },
        { key: 'hadj_Omra',         label: { fr: 'Hadj & Omra' },             detailType: 'hajj',   icon: '🕋' },
        { key: 'Reservations_Visa', label: { fr: 'Réservations & Visa' },     detailType: 'visa',   icon: '📋' },
    ];

    const listaCategorias = useMemo(() => {
        const source = (categories && categories.length > 0) ? categories : fallbackCategorias;

        const colorByDetailType = {
            travel: 'primary', rental: 'success', hajj: 'warning', visa: 'info',
        };
        const iconByKey = {
            'Voyage Organise':   '🗺️',
            'Voyage_Local':      '📍',
            'Voyage_Etranger':   '🌍',
            'Location_Vacances': '🏠',
            'hadj_Omra':         '🕋',
            'Reservations_Visa': '📋',
        };

        return source.map(cat => ({
            value: cat.key,
            label: cat.label?.fr || cat.key,
            detailType: cat.detailType,
            color: colorByDetailType[cat.detailType] || 'secondary',
            emoji: cat.icon || iconByKey[cat.key] || '📁',
            _id: cat._id,
        }));
    }, [categories]);

    const categoriaActual = listaCategorias.find(c => c.value === postData.subCategory);

    return (
        <div className="mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <label htmlFor="subCategory" className="form-label fw-bold">
                📂 {t('categoriaPublicacion', 'Catégorie de publication')}
            </label>

            {categoriaActual && (
                <div className="mb-3">
                    <span className={`badge bg-${categoriaActual.color} fs-6 p-2`}>
                        <span className="me-1">{categoriaActual.emoji}</span>
                        {categoriaActual.label}
                    </span>
                </div>
            )}

            <select
                id="subCategory"
                name="subCategory"
                value={postData.subCategory || ''}
                onChange={handleChangeInput}
                className="form-select form-select-lg border-2"
            >
                <option value="">{t('seleccionarCategoria', 'Sélectionner une catégorie')}</option>
                {listaCategorias.map(cat => (
                    <option key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                    </option>
                ))}
            </select>

            {/* Aviso mientras llegan del backend (solo informativo, no dispara nada) */}
            {(!categories || categories.length === 0) && (
                <div className="form-text text-muted mt-1 small">
                    {t('loadingCategories', 'Chargement des catégories...')}
                </div>
            )}
        </div>
    );
};

export default CategorySelector;