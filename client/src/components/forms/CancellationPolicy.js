import React from 'react';
import { useTranslation } from 'react-i18next';

const CancellationPolicy = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const policies = [
        { value: 'Flexible', color: 'success', icon: '✅' },
        { value: 'Moderee', color: 'warning', icon: '⚠️' },
        { value: 'Strict', color: 'danger', icon: '❌' },
    ];

    const selected = policies.find(p => p.value === postData.cancelarreserva);

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header">
                <h6 className="mb-0 fw-semibold">
                    📝 {t('politique_annulation')}
                </h6>
            </div>
            <div className="card-body" dir={isRTL ? 'rtl' : 'ltr'}>

                <label htmlFor="cancelarreserva" className="form-label fw-semibold small">
                    {t('selectionnez_politique')}
                </label>
                <select
                    id="cancelarreserva"
                    name="cancelarreserva"
                    value={postData.cancelarreserva || ''}
                    onChange={handleChangeInput}
                    className="form-select mb-3"
                >
                    <option value="">— {t('selectionnez_politique')} —</option>
                    {policies.map(p => (
                        <option key={p.value} value={p.value}>
                            {p.icon} {t(`politique_${p.value.toLowerCase()}`)}
                        </option>
                    ))}
                </select>

                {selected && (
                    <div className={`alert alert-${selected.color}`}>
                        <div className={`d-flex align-items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="fs-5 me-2" aria-hidden="true">{selected.icon}</span>
                            <div>
                                <strong>{t(`titre_${selected.value.toLowerCase()}`)}</strong>
                                <div className="small mt-1">
                                    {t(`description_${selected.value.toLowerCase()}`)}
                                </div>
                                <div className="small text-muted mt-2">
                                    {t(`details_${selected.value.toLowerCase()}`)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <h6 className="text-muted mb-3">
                        {t('apercu_politiques')}
                    </h6>
                    <div className="row g-2">
                        {policies.map(p => {
                            const isSelected = postData.cancelarreserva === p.value;
                            return (
                                <div className="col-12 col-md-4" key={p.value}>
                                    <div
                                        className={`border rounded p-3 text-center ${isSelected ? `border-${p.color} bg-${p.color} bg-opacity-10` : ''}`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleChangeInput({
                                            target: { name: 'cancelarreserva', value: p.value },
                                        })}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="fs-4" aria-hidden="true">{p.icon}</div>
                                        <div className="fw-bold small">
                                            {t(`titre_${p.value.toLowerCase()}`)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CancellationPolicy;