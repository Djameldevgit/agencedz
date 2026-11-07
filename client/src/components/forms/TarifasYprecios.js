import React from 'react';
import { useTranslation } from 'react-i18next';

const TarifasYprecios = ({ postData, handleChangeInput, category }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const calcularTotal = () => {
        const base = parseFloat(postData.precioBase) || 0;
        const ninos = parseFloat(postData.tarifaNinos) || 0;
        const bebes = parseFloat(postData.tarifaBebes) || 0;
        return base + ninos + bebes;
    };

    const tiposPrecio = {
        hadjomra: [
            { value: 'paquete_completo', label: '📦 ' + t('paquete_completo', 'Paquete completo') },
            { value: 'solo_vuelo', label: '✈️ ' + t('solo_vuelo', 'Solo vuelo') },
            { value: 'solo_hotel', label: '🏨 ' + t('solo_hotel', 'Solo hotel') },
            { value: 'personalizado', label: '🔧 ' + t('personalizado', 'Personalizado') },
        ],
        locationvacances: [
            { value: 'por_noche', label: '🌙 ' + t('por_noche', 'Por noche') },
            { value: 'por_semana', label: '📅 ' + t('por_semana', 'Por semana') },
            { value: 'por_mes', label: '🗓️ ' + t('por_mes', 'Por mes') },
            { value: 'temporada_alta', label: '📈 ' + t('temporada_alta', 'Temporada alta') },
            { value: 'temporada_baja', label: '📉 ' + t('temporada_baja', 'Temporada baja') },
        ],
        voyagesorganises: [
            { value: 'todo_incluido', label: '🎉 ' + t('todo_incluido', 'Todo incluido') },
            { value: 'vuelo_hotel', label: '✈️🏨 ' + t('vuelo_hotel', 'Vuelo + Hotel') },
            { value: 'solo_circuito', label: '🗺️ ' + t('solo_circuito', 'Solo circuito') },
            { value: 'personalizado', label: '🔧 ' + t('personalizado', 'Personalizado') },
        ],
    };

    const politicasNinos = [
        { value: 'gratis_hasta_2', label: t('gratis_hasta_2', 'Gratis hasta 2 años') },
        { value: 'descuento_50', label: t('descuento_50', '50% descuento 2-12 años') },
        { value: 'descuento_30', label: t('descuento_30', '30% descuento 2-12 años') },
        { value: 'mismo_precio', label: t('mismo_precio', 'Mismo precio que adultos') },
        { value: 'no_admiten', label: t('no_admiten', 'No admiten niños') },
    ];

    const categoriaKey = (category || '').replace(/[^a-z]/gi, '').toLowerCase();
    const opcionesActuales = tiposPrecio[categoriaKey] || [];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-info text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">💰</span>
                    {t('tarifasPrecios', 'Tarifas y Precios')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    {/* Precio base */}
                    <div className="col-12 col-md-6">
                        <label htmlFor="precioBase" className="form-label fw-semibold small">
                            {t('precioBase', 'Precio Base')} <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="precioBase"
                                name="precioBase"
                                value={postData.precioBase || ''}
                                onChange={handleChangeInput}
                                placeholder="0"
                                min="0"
                                className="form-control"
                            />
                            <span className="input-group-text">DZD</span>
                        </div>
                        <div className="form-text text-muted">
                            {categoriaKey === 'hadjomra'
                                ? t('precioBaseHajj', 'Precio por persona para el paquete completo')
                                : categoriaKey === 'locationvacances'
                                ? t('precioBaseLocation', 'Precio por noche para la propiedad')
                                : t('precioBaseVoyages', 'Precio por persona para el viaje organizado')}
                        </div>
                    </div>

                    {/* Tipo de precio */}
                    {opcionesActuales.length > 0 && (
                        <div className="col-12 col-md-6">
                            <label htmlFor="tipoPrecio" className="form-label fw-semibold small">
                                {t('tipoPrecio', 'Tipo de Precio')}
                            </label>
                            <select
                                id="tipoPrecio"
                                name="tipoPrecio"
                                value={postData.tipoPrecio || ''}
                                onChange={handleChangeInput}
                                className="form-select"
                            >
                                <option value="">{t('selectTipoPrecio', 'Seleccione tipo')}</option>
                                {opcionesActuales.map((op) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Tarifas niños */}
                    <div className="col-12">
                        <h6 className="border-bottom pb-2 mb-3 fw-semibold">
                            👶 {t('tarifasNinos', 'Tarifas para Niños')}
                        </h6>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="tarifaNinos" className="form-label fw-semibold small">
                            {t('ninos_2_12', 'Niños (2-12 años)')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="tarifaNinos"
                                name="tarifaNinos"
                                value={postData.tarifaNinos || ''}
                                onChange={handleChangeInput}
                                placeholder="0"
                                min="0"
                                className="form-control"
                            />
                            <span className="input-group-text">DZD</span>
                        </div>
                        <div className="form-text text-muted">
                            {t('tarifaNinosHelp', 'Precio especial para niños')}
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="tarifaBebes" className="form-label fw-semibold small">
                            {t('bebes_0_2', 'Bebés (0-2 años)')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="tarifaBebes"
                                name="tarifaBebes"
                                value={postData.tarifaBebes || ''}
                                onChange={handleChangeInput}
                                placeholder="0"
                                min="0"
                                className="form-control"
                            />
                            <span className="input-group-text">DZD</span>
                        </div>
                        <div className="form-text text-muted">
                            {t('tarifaBebesHelp', 'Precio para bebés (generalmente gratuito)')}
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="politicaNinos" className="form-label fw-semibold small">
                            {t('politicaNinos', 'Política de Niños')}
                        </label>
                        <select
                            id="politicaNinos"
                            name="politicaNinos"
                            value={postData.politicaNinos || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectPolitica', 'Seleccione política')}</option>
                            {politicasNinos.map((p) => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Descuentos */}
                    <div className="col-12">
                        <h6 className="border-bottom pb-2 mt-3 mb-3 fw-semibold">
                            🏷️ {t('descuentosOfertas', 'Descuentos y Ofertas')}
                        </h6>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="descuentoGrupo" className="form-label fw-semibold small">
                            {t('descuentoGrupo', 'Descuento por Grupo')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                id="descuentoGrupo"
                                name="descuentoGrupo"
                                value={postData.descuentoGrupo || ''}
                                onChange={handleChangeInput}
                                placeholder="0"
                                min="0"
                                max="100"
                                className="form-control"
                            />
                            <span className="input-group-text">%</span>
                        </div>
                        <div className="form-text text-muted">
                            {t('descuentoGrupoHelp', 'Descuento para grupos grandes')}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="ofertaEspecial" className="form-label fw-semibold small">
                            {t('ofertaEspecial', 'Oferta Especial')}
                        </label>
                        <input
                            type="text"
                            id="ofertaEspecial"
                            name="ofertaEspecial"
                            value={postData.ofertaEspecial || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderOferta', 'Ej: 3x2, Early Booking...')}
                            className="form-control"
                        />
                    </div>

                    {/* Total */}
                    <div className="col-12">
                        <div className="alert alert-success mt-3 mb-0">
                            <div className={`d-flex justify-content-between align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <strong>{t('totalEstimado', 'Total Estimado')}:</strong>
                                <h5 className="mb-0">{calcularTotal().toLocaleString()} DZD</h5>
                            </div>
                            <small className="text-muted">
                                {t('totalHelp', 'Precio base + tarifas niños — Este es un cálculo estimado')}
                            </small>
                        </div>
                    </div>

                    {/* Info pago */}
                    <div className="col-12">
                        <label htmlFor="infoPago" className="form-label fw-semibold small">
                            {t('infoPago', 'Información de Pago')}
                        </label>
                        <textarea
                            id="infoPago"
                            name="infoPago"
                            rows={2}
                            value={postData.infoPago || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderInfoPago', 'Condiciones de pago, seña requerida, métodos de pago aceptados...')}
                            className="form-control"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TarifasYprecios;