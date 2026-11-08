import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaImage, FaSave, FaTimes, FaCheck } from 'react-icons/fa';

// 🔷 COMPONENTES
import CategorySelector from '../components/forms/CategorySelector';
import DescriptionTextarea from '../components/forms/DescriptionTextarea';
import AddressInput from '../components/forms/AddressInput';
import ImageUpload from '../components/forms/ImageUpload';
import TarifasYprecios from '../components/forms/TarifasYprecios';
import ContactReservation from '../components/forms/ContactReservation';
import CancellationPolicy from '../components/forms/CancellationPolicy';
import DateDeparRetour from '../components/forms/DateDeparRetour';
import HoraDepart from '../components/forms/HoraDepart';
import DurationDisplay from '../components/forms/DuracionDelViaje';

// 🔷 HAJJ/OMRA
import DestinationHajjOmra from '../components/forms/hadjpmra/DestinacionHdjaOmra';
import NombreLugarHajjOmra from '../components/forms/hadjpmra/Nombrelugarhotelhadj';
import TransportHajjOmra from '../components/forms/hadjpmra/TransporHajjOmra';
import AlojamientoHajjOmra from '../components/forms/hadjpmra/HotelHajjOmra';
import ServiciosHajjOmra from '../components/forms/hadjpmra/ServiciosHajjOmra';

// 🔷 LOCATION VACANCES
import NombreLugarLocationVacances from '../components/forms/locationvacances/NombreLugarLocationVacances';
import DestinationLocationVacances from '../components/forms/locationvacances/DestinacionLocationvacances';
import AlojamientoLocationVacances from '../components/forms/locationvacances/Hotellocationvacance';
import TransportLocationVacances from '../components/forms/locationvacances/TransportLocationVacances';
import ServiciosLocationVacances from '../components/forms/locationvacances/ServiciosLocationVancances';

// 🔷 VOYAGE ORGANISÉ
import DestinationVoyagesOrganises from '../components/forms/voyageorgranise/Destinacionvoyageorganise';
import TransportVoyagesOrganises from '../components/forms/voyageorgranise/TransportVoyageOrganise';
import NombreLugarVoyagesOrganises from '../components/forms/voyageorgranise/NombreLugarVoyagesOrganiseq';
import AlojamientoVoyagesOrganises from '../components/forms/voyageorgranise/Hotelvoyageorganise';
import ServiciosVoyagesOrganises from '../components/forms/voyageorgranise/ServiciosVpuageOrganise';

// 🔷 ACCIONES
import { createPost, updatePost, getCategories } from '../redux/actions/postAction';
import { getDataAPI } from '../utils/fetchData';
import communesjson from '../json/communes.json';

// ============================================================
// 🔷 ESTADO INICIAL (fuera del componente, se crea UNA vez)
// ============================================================
const INITIAL_STATE = {
  // Base
  subCategory: '',
  title: '',
  description: '',
  wilaya: '',
  commune: '',
  villeDepart: '',
  contacto: '',

  // Fechas
  datedepar: '',
  dateretour: '',
  horaDepart: '',

  // Precios
  precioBase: '',
  tipoPrecio: '',
  tarifaNinos: '',
  tarifaBebes: '',
  politicaNinos: '',
  descuentoGrupo: '',
  ofertaEspecial: '',
  infoPago: '',

  // Precios compatibilidad
  prixAdulte: '',
  prixEnfant: '',
  prixBebe: '',

  // Cancelación
  cancelarreserva: '',
};

// ============================================================
// 🔧 HELPERS
// ============================================================
const normalizeStr = (s = '') =>
  String(s).toLowerCase().replace(/[\s_-]+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Sección colapsable minimalista
const Section = ({ id, title, isOpen, onToggle, children }) => (
  <div className="accordion-item border-0 border-bottom">
    <h2 className="accordion-header">
      <button
        type="button"
        className={`accordion-button ${isOpen ? '' : 'collapsed'} fw-semibold small px-3`}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        {title}
      </button>
    </h2>
    <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
      <div className="accordion-body px-3 py-3">{children}</div>
    </div>
  </div>
);

// ============================================================
// 🎮 COMPONENTE PRINCIPAL
// ============================================================
const Createpost = () => {
  const { auth, theme, socket, languageReducer, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation('createpost');

  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;
  const isRTL = i18n.language === 'ar';

  // 🔷 ESTADOS
  const [postData, setPostData] = useState(INITIAL_STATE);
  const [images, setImages] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const [openSections, setOpenSections] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const toggleSection = (id) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  // 🔷 CARGAR CATEGORÍAS
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // 🔷 IDIOMA
  useEffect(() => {
    const lang = languageReducer?.language || 'fr';
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [languageReducer?.language, i18n]);

  // 🔷 MODO EDICIÓN
  useEffect(() => {
    if (isEdit && postToEdit) {
      const finalPostData = {
        ...INITIAL_STATE,
        ...postToEdit,
        subCategory: postToEdit.subCategory || '',
        description: postToEdit.description || postToEdit.content || '',
        title: postToEdit.title || '',
      };
      setPostData(finalPostData);

      if (Array.isArray(postToEdit.images) && postToEdit.images.length > 0) {
        const existing = postToEdit.images
          .map(img => {
            if (typeof img === 'string') return { url: img, file: null, isExisting: true };
            if (img && img.url) return { ...img, file: null, isExisting: true };
            return null;
          })
          .filter(Boolean);
        setImages(existing);
      } else {
        setImages([]);
      }
      setSelectedWilaya(postToEdit.wilaya || '');
    } else {
      setPostData(INITIAL_STATE);
      setImages([]);
      setSelectedWilaya('');
    }
  }, [isEdit, postToEdit]);

  // 🔷 PROGRESO
  useEffect(() => {
    let completed = 0;
    const total = 8;
    if (postData.subCategory) completed++;
    if (postData.title) completed++;
    if (postData.description) completed++;
    if (postData.wilaya) completed++;
    if (postData.commune) completed++;
    if (postData.contacto) completed++;
    if (images.length > 0) completed++;
    if (postData.precioBase || postData.prixAdulte) completed++;
    setCompletionPercentage(Math.round((completed / total) * 100));
  }, [postData, images]);

  // 🔷 HANDLERS
  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleWilayaChange = (event) => {
    const w = event.target.value;
    setSelectedWilaya(w);
    const found = communesjson.find(x => x.wilaya === w);
    const communes = found ? found.commune : [];
    setPostData(prev => ({ ...prev, wilaya: w, commune: communes[0] || '' }));
  };

  const handleCommuneChange = (event) => {
    setPostData(prev => ({ ...prev, commune: event.target.value }));
  };

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    const newImages = [];
    files.forEach(file => {
      if (!file) { err = t('validation_images_required'); return; }
      if (file.size > 1024 * 1024 * 5) { err = t('validation_images_size'); return; }
      newImages.push(file);
    });
    if (err) {
      setAlertMessage(err); setAlertVariant('danger'); setShowAlert(true);
      return;
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const arr = [...images]; arr.splice(index, 1); setImages(arr);
  };

  // 🔷 RESOLVER categoryId
  const resolveCategoryId = async () => {
    const target = normalizeStr(postData.subCategory);
    const cats = homePosts?.categories || [];

    if (cats.length > 0) {
      const found = cats.find(c =>
        normalizeStr(c.key) === target ||
        normalizeStr(c.label?.fr) === target ||
        normalizeStr(c.label?.es) === target
      );
      if (found) return found._id;
    }

    // Fallback directo al backend
    try {
      const res = await getDataAPI('categories');
      const fresh = res.data?.categories || [];
      const found = fresh.find(c =>
        normalizeStr(c.key) === target ||
        normalizeStr(c.label?.fr) === target ||
        normalizeStr(c.label?.es) === target
      );
      return found?._id || null;
    } catch (err) {
      console.error('Error resolving category:', err);
      return null;
    }
  };

  // 🔷 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!postData.subCategory) {
      setAlertMessage(t('validation_category_required')); setAlertVariant('danger'); setShowAlert(true); return;
    }
    if (!postData.title || postData.title.trim().length < 3) {
      setAlertMessage(t('validation_title_required', 'Le titre est requis (min. 3 caractères)'));
      setAlertVariant('danger'); setShowAlert(true); return;
    }
    if (!postData.wilaya || !postData.commune) {
      setAlertMessage(t('validation_wilaya_required')); setAlertVariant('danger'); setShowAlert(true); return;
    }
    if (images.length === 0) {
      setAlertMessage(t('validation_images_required')); setAlertVariant('danger'); setShowAlert(true); return;
    }

    const categoryId = await resolveCategoryId();
    if (!categoryId) {
      setAlertMessage('Catégorie introuvable côté serveur. Vérifiez les catégories.');
      setAlertVariant('danger'); setShowAlert(true); return;
    }

    setSubmitting(true);
    try {
      if (isEdit && postToEdit) {
        const status = { _id: postToEdit._id, ...postToEdit };
        await dispatch(updatePost({ postData, images, auth, status, categoryId }));
        setAlertMessage(t('success_update')); setAlertVariant('success');
      } else {
        await dispatch(createPost({ postData, images, auth, socket, categoryId }));
        setAlertMessage(t('success_create')); setAlertVariant('success');
      }
      setShowAlert(true);
      setTimeout(() => history.push('/'), 2000);
    } catch (error) {
      setAlertMessage(t('error_publication')); setAlertVariant('danger'); setShowAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // 🎨 RENDER POR CATEGORÍA (simplificado, sin colores hardcodeados)
  // ============================================================

  const commonDates = (
    <>
      <DateDeparRetour postData={postData} handleChangeInput={handleChangeInput} />
      <HoraDepart postData={postData} handleChangeInput={handleChangeInput} />
      <DurationDisplay postData={postData} handleChangeInput={handleChangeInput} />
    </>
  );

  const renderVoyageOrganise = () => (
    <div className="accordion mb-3">
      <Section id="vo-1" title={t('voyage.destinations', 'Destinations')} isOpen={openSections['vo-1']} onToggle={toggleSection}>
        <DestinationVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="vo-2" title={t('voyage.dates', 'Dates et durée')} isOpen={openSections['vo-2']} onToggle={toggleSection}>
        {commonDates}
      </Section>
      <Section id="vo-3" title={t('voyage.transport', 'Transport')} isOpen={openSections['vo-3']} onToggle={toggleSection}>
        <TransportVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="vo-4" title={t('voyage.hebergement', 'Hébergement')} isOpen={openSections['vo-4']} onToggle={toggleSection}>
        <NombreLugarVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
        <AlojamientoVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="vo-5" title={t('voyage.services', 'Services inclus')} isOpen={openSections['vo-5']} onToggle={toggleSection}>
        <ServiciosVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
    </div>
  );

  const renderLocationVacances = () => (
    <div className="accordion mb-3">
      <Section id="lv-1" title={t('location.informations', 'Informations logement')} isOpen={openSections['lv-1']} onToggle={toggleSection}>
        <NombreLugarLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
        <DestinationLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="lv-2" title={t('location.hebergement', 'Hébergement')} isOpen={openSections['lv-2']} onToggle={toggleSection}>
        <AlojamientoLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="lv-3" title={t('location.transport', 'Transport et accès')} isOpen={openSections['lv-3']} onToggle={toggleSection}>
        <TransportLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="lv-4" title={t('location.services', 'Services et équipements')} isOpen={openSections['lv-4']} onToggle={toggleSection}>
        <ServiciosLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
    </div>
  );

  const renderHadjOmra = () => (
    <div className="accordion mb-3">
      <Section id="hj-1" title={t('hadj.destination', 'Destination du pèlerinage')} isOpen={openSections['hj-1']} onToggle={toggleSection}>
        <DestinationHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
        <NombreLugarHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="hj-2" title={t('hadj.dates', 'Dates')} isOpen={openSections['hj-2']} onToggle={toggleSection}>
        {commonDates}
      </Section>
      <Section id="hj-3" title={t('hadj.transport', 'Transport et hébergement')} isOpen={openSections['hj-3']} onToggle={toggleSection}>
        <TransportHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
        <AlojamientoHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
      <Section id="hj-4" title={t('hadj.services', 'Services religieux')} isOpen={openSections['hj-4']} onToggle={toggleSection}>
        <ServiciosHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
      </Section>
    </div>
  );

  const renderCategoryFields = () => {
    switch (postData.subCategory) {
      case 'Voyage Organise':
      case 'Voyage_Local':
      case 'Voyage_Etranger':
        return renderVoyageOrganise();
      case 'Location_Vacances':
        return renderLocationVacances();
      case 'hadj_Omra':
        return renderHadjOmra();
      default:
        return null;
    }
  };

  const wilayasOptions = communesjson.map((w, i) => (
    <option key={i} value={w.wilaya}>{w.wilaya}</option>
  ));

  const communesOptions = selectedWilaya
    ? (communesjson.find(w => w.wilaya === selectedWilaya)?.commune || []).map((c, i) => (
        <option key={i} value={c}>{c}</option>
      ))
    : [];

  // ============================================================
  // 🎨 RENDER PRINCIPAL
  // ============================================================
  return (
    <div className="container-fluid p-0 bg-light" dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh' }}>

      {/* ============= HEADER COMPACTO ============= */}
      <div className="bg-white border-bottom sticky-top" style={{ zIndex: 100 }}>
        <div className="container-fluid px-3 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-semibold">
              {isEdit ? t('edit_title', 'Modifier la publication') : t('create_title', 'Nouvelle publication')}
            </h6>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">{completionPercentage}%</small>
              <div className="progress" style={{ width: '80px', height: '6px' }}>
                <div
                  className={`progress-bar ${completionPercentage < 50 ? 'bg-warning' : 'bg-success'}`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============= ALERT ============= */}
      {showAlert && (
        <div className={`alert alert-${alertVariant} alert-dismissible mb-0 rounded-0 border-0`} role="alert">
          <small>{alertMessage}</small>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
            aria-label="Fermer"
          />
        </div>
      )}

      {/* ============= FORM ============= */}
      <form onSubmit={handleSubmit}>
        <div className="container-fluid px-3 py-3" style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Categoría */}
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <CategorySelector postData={postData} handleChangeInput={handleChangeInput} />
            </div>
          </div>

          {postData.subCategory && (
            <>
              {/* Info base */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  {/* Título */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold small">
                      {t('title', 'Titre')} <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={postData.title || ''}
                      onChange={handleChangeInput}
                      placeholder={t('placeholderTitle', 'Ex: Voyage organisé à Istanbul 7 jours')}
                      className="form-control"
                      maxLength={120}
                      required
                    />
                  </div>

                  <DescriptionTextarea postData={postData} handleChangeInput={handleChangeInput} />

                  <AddressInput
                    postData={postData}
                    handleChangeInput={handleChangeInput}
                    wilayasOptions={wilayasOptions}
                    communesOptions={communesOptions}
                    handleWilayaChange={handleWilayaChange}
                    handleCommuneChange={handleCommuneChange}
                  />
                </div>
              </div>

              {/* Campos específicos */}
              {renderCategoryFields()}

              {/* Comunes */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <TarifasYprecios postData={postData} handleChangeInput={handleChangeInput} category={postData.subCategory} />
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <CancellationPolicy postData={postData} handleChangeInput={handleChangeInput} />
                  <ContactReservation postData={postData} handleChangeInput={handleChangeInput} />
                </div>
              </div>

              {/* Imágenes */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <label className="form-label fw-semibold small mb-2">
                    <FaImage className="me-2 text-muted" />
                    {t('common.images', 'Images')} <span className="text-danger">*</span>
                  </label>
                  <ImageUpload
                    images={images}
                    handleChangeImages={handleChangeImages}
                    deleteImages={deleteImages}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="d-flex gap-2 mb-4">
                <button
                  type="submit"
                  className={`btn btn-${isEdit ? 'warning' : 'success'} flex-grow-1 fw-bold py-2`}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      {t('publishing', 'Publication...')}
                    </>
                  ) : isEdit ? (
                    <>
                      <FaSave className="me-2" />
                      {t('button_update', 'Mettre à jour')}
                    </>
                  ) : (
                    <>
                      <FaCheck className="me-2" />
                      {t('button_publish', 'Publier')}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary py-2"
                  onClick={() => history.goBack()}
                  disabled={submitting}
                >
                  <FaTimes className="me-1" />
                  {t('common.cancel', 'Annuler')}
                </button>
              </div>
            </>
          )}

          {!postData.subCategory && (
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body py-5">
                <div className="fs-1 mb-2">📂</div>
                <h6 className="text-muted mb-0">
                  {t('common.select_category_first', "Sélectionnez d'abord une catégorie")}
                </h6>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Createpost;