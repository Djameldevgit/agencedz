import React from 'react';
import { useTranslation } from 'react-i18next';

const NombreLugarLocationVacances = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation('categories');
    const isRTL = i18n.language === 'ar';

    const tiposPropiedad = [
        { value: 'villa', label: '🏠 ' + t('villa', 'Villa') },
        { value: 'apartamento', label: '🏢 ' + t('apartamento', 'Apartamento') },
        { value: 'studio', label: '🔲 ' + t('studio', 'Studio') },
        { value: 'riad', label: '🏺 ' + t('riad', 'Riad') },
        { value: 'chalet', label: '⛰️ ' + t('chalet', 'Chalet') },
        { value: 'casa_campo', label: '🌄 ' + t('casa_campo', 'Casa de campo') },
    ];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <span className="me-2" aria-hidden="true">🏡</span>
                    {t('nombreLugarLocation', 'Nombre y Lugar - Location Vacances')}
                </h6>
            </div>
            <div className="card-body">
                <div className="row g-3" dir={isRTL ? 'rtl' : 'ltr'}>

                    <div className="col-12 col-md-6">
                        <label htmlFor="nombrePropiedad" className="form-label fw-semibold small">
                            {t('nombrePropiedad', 'Nombre de la Propiedad')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="nombrePropiedad"
                            name="nombrePropiedad"
                            value={postData.nombrePropiedad || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderNombrePropiedad', 'Ej: Villa Mar Bella, Apartamento Vista al Mar...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="tipoPropiedadNombre" className="form-label fw-semibold small">
                            {t('tipoPropiedad', 'Tipo de Propiedad')} <span className="text-danger">*</span>
                        </label>
                        <select
                            id="tipoPropiedadNombre"
                            name="tipoPropiedad"
                            value={postData.tipoPropiedad || ''}
                            onChange={handleChangeInput}
                            className="form-select"
                        >
                            <option value="">{t('selectTipoPropiedad', 'Seleccione tipo')}</option>
                            {tiposPropiedad.map((tp) => (
                                <option key={tp.value} value={tp.value}>{tp.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="direccionCompleta" className="form-label fw-semibold small">
                            {t('direccionCompleta', 'Dirección Completa')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="direccionCompleta"
                            name="direccionCompleta"
                            value={postData.direccionCompleta || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderDireccion', 'Ej: Calle Principal Nº 123, Jijel')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="ciudad" className="form-label fw-semibold small">
                            {t('ciudad', 'Ciudad')} <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={postData.ciudad || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderCiudad', 'Ej: Jijel, Alger, Oran...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="codigoPostal" className="form-label fw-semibold small">
                            {t('codigoPostal', 'Código Postal')}
                        </label>
                        <input
                            type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            value={postData.codigoPostal || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderCodigoPostal', 'Código postal')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="zonaBarrio" className="form-label fw-semibold small">
                            {t('zonaBarrio', 'Zona/Barrio')}
                        </label>
                        <input
                            type="text"
                            id="zonaBarrio"
                            name="zonaBarrio"
                            value={postData.zonaBarrio || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderZona', 'Ej: Corniche, Centre-ville, Plage...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="referenciasCercanas" className="form-label fw-semibold small">
                            {t('referenciasCercanas', 'Referencias Cercanas')}
                        </label>
                        <input
                            type="text"
                            id="referenciasCercanas"
                            name="referenciasCercanas"
                            value={postData.referenciasCercanas || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderReferencias', 'Ej: A 200m de la playa, cerca del mercado...')}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="descripcionUbicacion" className="form-label fw-semibold small">
                            {t('descripcionUbicacion', 'Descripción de la Ubicación')}
                        </label>
                        <textarea
                            id="descripcionUbicacion"
                            name="descripcionUbicacion"
                            rows={3}
                            value={postData.descripcionUbicacion || ''}
                            onChange={handleChangeInput}
                            placeholder={t('placeholderDescUbicacion', 'Describa el entorno, vistas, accesos...')}
                            className="form-control"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NombreLugarLocationVacances;