import React from 'react';
import { useTranslation } from 'react-i18next';

const Hotelvoyageorganise = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const categoriasHoteles = [
        { value: '5_estrellas', label: '⭐⭐⭐⭐⭐ 5 ' + t('estrellas', 'estrellas') },
        { value: '4_estrellas', label: '⭐⭐⭐⭐ 4 ' + t('estrellas', 'estrellas') },
        { value: '3_estrellas', label: '⭐⭐⭐ 3 ' + t('estrellas', 'estrellas') },
        { value: '2_estrellas', label: '⭐⭐ 2 ' + t('estrellas', 'estrellas') },
        { value: 'hostal', label: '🏠 ' + t('hostal', 'Hostal') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') },
    ];

    const tiposHabitacion = [
        { value: 'doble', label: t('doble', 'Habitación doble') },
        { value: 'individual', label: t('individual', 'Habitación individual') },
        { value: 'triple', label: t('triple', 'Habitación triple') },
        { value: 'suite', label: t('suite', 'Suite') },
        { value: 'familiar', label: t('familiar', 'Habitación familiar') },
    ];

    const regimenes = [
        { value: 'solo_alojamiento', label: '🏨 ' + t('solo_alojamiento', 'Solo alojamiento') },
        { value: 'desayuno', label: '🍳 ' + t('desayuno', 'Desayuno incluido') },
        { value: 'media_pension', label: '🍽️ ' + t('media_pension', 'Media pensión') },
        { value: 'pension_completa', label: '📦 ' + t('pension_completa', 'Pensión completa') },
        { value: 'todo_incluido', label: '🎉 ' + t('todo_incluido', 'Todo incluido') },
    ];

    const ubicaciones = [
        { value: 'centro_ciudad', label: '🏙️ ' + t('centro_ciudad', 'Centro ciudad') },
        { value: 'playa', label: '🏖️ ' + t('playa', 'Frente a la playa') },
        { value: 'montana', label: '⛰️ ' + t('montana', 'En la montaña') },
        { value: 'campo', label: '🌾 ' + t('campo', 'En el campo') },
        { value: 'aeropuerto', label: '✈️ ' + t('aeropuerto', 'Cerca del aeropuerto') },
    ];

    const serviciosIncluidos = [
        { name: 'wifiIncluido', icon: '📶', label: t('wifi', 'Wi-Fi') },
        { name: 'piscinaIncluida', icon: '🏊', label: t('piscina', 'Piscina') },
        { name: 'spaIncluido', icon: '💆', label: t('spa', 'Spa') },
        { name: 'gimnasioIncluido', icon: '💪', label: t('gimnasio', 'Gimnasio') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-warning text-dark">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏨</span>
                    {t('alojamientoVoyages', 'Alojamiento Voyages Organisés')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="categoriaAlojamiento" className="form-label fw-semibold small">
                            {t('categoriaAlojamiento', 'Categoría del Alojamiento')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="categoriaAlojamiento"
                            name="categoriaAlojamiento"
                            value={postData.categoriaAlojamiento || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectCategoria', 'Seleccione categoría')}</option>
                            {categoriasHoteles.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="tipoHabitacion" className="form-label fw-semibold small">
                            {t('tipoHabitacion', 'Tipo de Habitación')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="tipoHabitacion"
                            name="tipoHabitacion"
                            value={postData.tipoHabitacion || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectTipoHabitacion', 'Seleccione tipo')}</option>
                            {tiposHabitacion.map((tp) => (
                                <option key={tp.value} value={tp.value}>{tp.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="regimenComidas" className="form-label fw-semibold small">
                            {t('regimenComidas', 'Régimen de Comidas')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="regimenComidas"
                            name="regimenComidas"
                            value={postData.regimenComidas || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectRegimen', 'Seleccione régimen')}</option>
                            {regimenes.map((r) => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="ubicacionHotel" className="form-label fw-semibold small">
                            {t('ubicacionHotel', 'Ubicación del Hotel')}
                        </label>
                        <select
                            id="ubicacionHotel"
                            name="ubicacionHotel"
                            value={postData.ubicacionHotel || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectUbicacion', 'Tipo de ubicación')}</option>
                            {ubicaciones.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold small">
                            {t('serviciosIncluidos', 'Servicios Incluidos')}
                        </label>
                        <div className="row g-2">
                            {serviciosIncluidos.map((s) => (
                                <div className="col-6 col-md-3" key={s.name}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={s.name}
                                            name={s.name}
                                            checked={postData[s.name] || false}
                                            onChange={handleChangeInput}
                                        />
                                        <label className="form-check-label small" htmlFor={s.name}>
                                            <span aria-hidden="true">{s.icon}</span> {s.label}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hotelvoyageorganise;