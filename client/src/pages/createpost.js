import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle, FaImage, FaEdit, FaPlane, FaHome, FaKaaba, FaSave, FaTimes } from 'react-icons/fa';

// 🔷 COMPONENTES
 //import Title from '../components/forms/TitleInput';

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
import DestinationHajjOmra from '../components/forms/hadjpmra/DestinacionHdjaOmra';
import DestinationLocationVacances from '../components/forms/locationvacances/DestinacionLocationvacances';
import DestinationVoyagesOrganises from '../components/forms/voyageorgranise/Destinacionvoyageorganise';
import TransportHajjOmra from '../components/forms/hadjpmra/TransporHajjOmra';
import TransportLocationVacances from '../components/forms/locationvacances/TransportLocationVacances';
import TransportVoyagesOrganises from '../components/forms/voyageorgranise/TransportVoyageOrganise';
import AlojamientoHajjOmra from '../components/forms/hadjpmra/HotelHajjOmra';
import AlojamientoLocationVacances from '../components/forms/locationvacances/Hotellocationvacance';
import AlojamientoVoyagesOrganises from '../components/forms/voyageorgranise/Hotelvoyageorganise';
import NombreLugarHajjOmra from '../components/forms/hadjpmra/Nombrelugarhotelhadj';
import NombreLugarLocationVacances from '../components/forms/locationvacances/NombreLugarLocationVacances';
import NombreLugarVoyagesOrganises from '../components/forms/voyageorgranise/NombreLugarVoyagesOrganiseq';
import ServiciosHajjOmra from '../components/forms/hadjpmra/ServiciosHajjOmra';
import ServiciosLocationVacances from '../components/forms/locationvacances/ServiciosLocationVancances';
import ServiciosVoyagesOrganises from '../components/forms/voyageorgranise/ServiciosVpuageOrganise';

// 🔷 ACCIONES
import { createPost, updatePost, getCategories } from '../redux/actions/postAction';
import { getDataAPI } from '../utils/fetchData';
import communesjson from '../json/communes.json';

// ============================================================
// 🧩 SECCIÓN COLAPSABLE
// ============================================================
const Section = ({ id, title, icon, isOpen, onToggle, children }) => (
    <div className="accordion-item border-0 border-bottom">
        <h2 className="accordion-header" id={`heading-${id}`}>
            <button
                type="button"
                className={`accordion-button ${isOpen ? '' : 'collapsed'} fw-semibold small`}
                onClick={() => onToggle(id)}
                aria-expanded={isOpen}
                aria-controls={`collapse-${id}`}
            >
                <span className="me-2" aria-hidden="true">{icon}</span>
                {title}
            </button>
        </h2>
        <div
            id={`collapse-${id}`}
            className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
            aria-labelledby={`heading-${id}`}
        >
            <div className="accordion-body px-2 py-3">{children}</div>
        </div>
    </div>
);

// Normaliza strings para comparar
const normalizeStr = (s = '') =>
    String(s).toLowerCase().replace(/[\s_-]+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const Createpost = () => {
    // 🔷 ESTADOS GLOBALES
    const { auth, theme, socket, languageReducer, homePosts } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { t, i18n } = useTranslation('createpost');

    const isEdit = location.state?.isEdit || false;
    const postToEdit = location.state?.postData || null;
    const isRTL = i18n.language === 'ar';

  

    // 🔷 DIAGNÓSTICO: cada vez que cambia el estado de categorías
    useEffect(() => {
 
        console.table(homePosts?.categories?.map(c => ({
            key: c.key,
            label_fr: c.label?.fr,
            detailType: c.detailType,
            _id: c._id,
        })));
        console.groupEnd();
    }, [homePosts?.categories]);

    // 🔷 ESTADO INICIAL
    const initialState = {
        category: 'Agence de Voyage',
        subCategory: '',
        title: '',
        description: '',
        price: '',
        wilaya: '',
        commune: '',
        contacto: '',
        images: [],
        datedepar: '',
        horadudepar: '',
        dateretour: '',
        dureeSejour: '',
        prixAdulte: '',
        prixEnfant: '',
        prixBebe: '',
    };

    const [postData, setPostData] = useState(initialState);
    const [images, setImages] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    const [openSections, setOpenSections] = useState({ 0: true });
    const [completionPercentage, setCompletionPercentage] = useState(0);

    const toggleSection = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

    // 🔷 CARGAR CATEGORÍAS
    useEffect(() => {
        console.log('📡 dispatch(getCategories()) desde Createpost');
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
            const sanitizedData = sanitizePostData(postToEdit);
            const finalPostData = {
                ...initialState,
                ...sanitizedData,
                category: sanitizedData.category || 'Agence de Voyage',
                subCategory: sanitizedData.subCategory || '',
                description: sanitizedData.description || sanitizedData.content || '',
                title: sanitizedData.title || '',
            };
            setPostData(finalPostData);

            if (postToEdit.images && Array.isArray(postToEdit.images) && postToEdit.images.length > 0) {
                const existingImages = postToEdit.images
                    .map(img => {
                        if (typeof img === 'string') return { url: img, file: null, isExisting: true };
                        if (img && img.url) return { ...img, file: null, isExisting: true };
                        return null;
                    })
                    .filter(Boolean);
                setImages(existingImages);
            } else {
                setImages([]);
            }
            setSelectedWilaya(postToEdit.wilaya || '');
        } else {
            setPostData(initialState);
            setImages([]);
            setSelectedWilaya('');
        }
    }, [isEdit, postToEdit]);

    // 🔷 PROGRESO
    useEffect(() => { calculateCompletionPercentage(); }, [postData, images]);

    const calculateCompletionPercentage = () => {
        let completed = 0;
        const total = 8;
        if (postData.subCategory) completed++;
        if (postData.title) completed++;
        if (postData.description) completed++;
        if (postData.wilaya) completed++;
        if (postData.commune) completed++;
        if (postData.contacto) completed++;
        if (images.length > 0) completed++;
        if (postData.prixAdulte || postData.price) completed++;
        setCompletionPercentage(Math.round((completed / total) * 100));
    };

    const sanitizePostData = (data) => (data ? { ...data } : {});

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

    // ============================================================
    // 🔷 RESOLVER categoryId (ASYNC con fallback al backend)
    // ============================================================
    const resolveCategoryId = async () => {
        console.group('🎯 resolveCategoryId');
        console.log('postData.subCategory:', postData.subCategory);
        console.log('normalize(subCategory):', normalizeStr(postData.subCategory));

        const target = normalizeStr(postData.subCategory);
        const cats = homePosts?.categories || [];
        console.log('Categorías en Redux:', cats.length);

        // 1️⃣ Intento con Redux
        if (cats.length > 0) {
            const found = cats.find(c =>
                normalizeStr(c.key) === target ||
                normalizeStr(c.label?.fr) === target ||
                normalizeStr(c.label?.es) === target
            );

            if (found) {
                console.log('✅ MATCH en Redux:', found.key, '→', found._id);
                console.groupEnd();
                return found._id;
            }
            console.warn('⚠️ No match en Redux. Categorías disponibles:');
            console.table(cats.map(c => ({
                key: c.key,
                normalized: normalizeStr(c.key),
                label_fr: c.label?.fr,
            })));
        } else {
            console.warn('⚠️ Redux tiene 0 categorías, probando backend directo...');
        }

        // 2️⃣ Fallback: pedir al backend directo
        try {
            const res = await getDataAPI('categories');
            const fresh = res.data?.categories || [];
            console.log('📥 Backend devolvió:', fresh.length, 'categorías');

            const found = fresh.find(c =>
                normalizeStr(c.key) === target ||
                normalizeStr(c.label?.fr) === target ||
                normalizeStr(c.label?.es) === target
            );

            if (found) {
                console.log('✅ MATCH en Backend:', found.key, '→', found._id);
                console.groupEnd();
                // Sincronizar Redux por si acaso
                return found._id;
            }

            console.error('❌ NO MATCH ni en backend. Comparativa:');
            console.table(fresh.map(c => ({
                key: c.key,
                normalized: normalizeStr(c.key),
                label_fr: c.label?.fr,
            })));
            console.groupEnd();
            return null;
        } catch (err) {
            console.error('❌ Error fetch categories:', err);
            console.groupEnd();
            return null;
        }
    };

    // ============================================================
    // 🔷 SUBMIT
    // ============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

     

        if (!postData.subCategory) {
            setAlertMessage(t('validation_category_required'));
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }
        if (!postData.wilaya || !postData.commune) {
            setAlertMessage(t('validation_wilaya_required'));
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }
        if (images.length === 0) {
            setAlertMessage(t('validation_images_required'));
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }

        // 🔑 Resolver categoryId con await
        const categoryId = await resolveCategoryId();
        console.log('🎯 categoryId resuelto:', categoryId);

        if (!categoryId) {
            setAlertMessage('Catégorie introuvable côté serveur. Vérifiez que les catégories sont bien chargées.');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }

        try {
            if (isEdit && postToEdit) {
                const status = { _id: postToEdit._id, ...postToEdit };
                await dispatch(updatePost({ postData, images, auth, status, categoryId }));
                setAlertMessage(t('success_update'));
                setAlertVariant('success');
            } else {
                await dispatch(createPost({ postData, images, auth, socket, categoryId }));
                setAlertMessage(t('success_create'));
                setAlertVariant('success');
            }
            setShowAlert(true);
            setTimeout(() => history.push('/'), 2000);
        } catch (error) {
            console.error('❌ Error submit:', error);
            setAlertMessage(t('error_publication'));
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    // ============================================================
    // 🎨 RENDER POR CATEGORÍA
    // ============================================================

    const commonDates = (
        <>
            <DateDeparRetour postData={postData} handleChangeInput={handleChangeInput} />
            <HoraDepart postData={postData} handleChangeInput={handleChangeInput} />
            <DurationDisplay postData={postData} handleChangeInput={handleChangeInput} />
        </>
    );

    const renderVoyageOrganise = () => (
        <div className="card mb-4 shadow-sm border-0">
            <div className="card-header bg-primary text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <FaPlane size={14} className="me-2" />
                    {t('voyage_organise', 'Voyage Organisé')}
                </h6>
            </div>
            <div className="card-body px-2 py-2">
                <div className="accordion">
                    <Section id="vo-1" title={t('voyage.destinations_internationales', 'Destinations Internationales')} icon="🗺️" isOpen={openSections['vo-1']} onToggle={toggleSection}>
                        <DestinationVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="vo-2" title={t('voyage.dates_duree', 'Dates et Durée')} icon="📅" isOpen={openSections['vo-2']} onToggle={toggleSection}>
                        {commonDates}
                    </Section>
                    <Section id="vo-3" title={t('voyage.transport_deplacements', 'Transport et Déplacements')} icon="✈️" isOpen={openSections['vo-3']} onToggle={toggleSection}>
                        <TransportVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="vo-4" title={t('voyage.hebergement_pension', 'Hébergement et Pension')} icon="🏨" isOpen={openSections['vo-4']} onToggle={toggleSection}>
                        <NombreLugarVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
                        <AlojamientoVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="vo-5" title={t('voyage.services_inclus', 'Services Inclus')} icon="🛎️" isOpen={openSections['vo-5']} onToggle={toggleSection}>
                        <ServiciosVoyagesOrganises postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                </div>
            </div>
        </div>
    );

    const renderLocationVacances = () => (
        <div className="card mb-4 shadow-sm border-0">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <FaHome size={14} className="me-2" />
                    {t('location_vacances', 'Location Vacances')}
                </h6>
            </div>
            <div className="card-body px-2 py-2">
                <div className="accordion">
                    <Section id="lv-1" title={t('location.informations_logement', 'Informations du Logement')} icon="🏡" isOpen={openSections['lv-1']} onToggle={toggleSection}>
                        <NombreLugarLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
                        <DestinationLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="lv-2" title={t('location.details_hebergement', "Détails de l'Hébergement")} icon="🏨" isOpen={openSections['lv-2']} onToggle={toggleSection}>
                        <AlojamientoLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="lv-3" title={t('location.transport_acces', 'Transport et Accès')} icon="🚗" isOpen={openSections['lv-3']} onToggle={toggleSection}>
                        <TransportLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="lv-4" title={t('location.services_equipements', 'Services et Équipements')} icon="🛎️" isOpen={openSections['lv-4']} onToggle={toggleSection}>
                        <ServiciosLocationVacances postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                </div>
            </div>
        </div>
    );

    const renderHadjOmra = () => (
        <div className="card mb-4 shadow-sm border-0">
            <div className="card-header bg-warning text-dark">
                <h6 className="mb-0 fw-semibold d-flex align-items-center">
                    <FaKaaba size={14} className="me-2" />
                    {t('hadj_omra', 'Hadj & Omra')}
                </h6>
            </div>
            <div className="card-body px-2 py-2">
                <div className="accordion">
                    <Section id="hj-1" title={t('hadj.destination_peletinage', 'Destination du Pèlerinage')} icon="🕋" isOpen={openSections['hj-1']} onToggle={toggleSection}>
                        <DestinationHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
                        <NombreLugarHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="hj-2" title={t('hadj.dates_peletinage', 'Dates du Pèlerinage')} icon="📅" isOpen={openSections['hj-2']} onToggle={toggleSection}>
                        {commonDates}
                    </Section>
                    <Section id="hj-3" title={t('hadj.transport_hebergement', 'Transport et Hébergement')} icon="🚗" isOpen={openSections['hj-3']} onToggle={toggleSection}>
                        <TransportHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
                        <AlojamientoHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                    <Section id="hj-4" title={t('hadj.services_religieux', 'Services Religieux')} icon="🛎️" isOpen={openSections['hj-4']} onToggle={toggleSection}>
                        <ServiciosHajjOmra postData={postData} handleChangeInput={handleChangeInput} />
                    </Section>
                </div>
            </div>
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

    const renderCommonComponents = () => (
        <>
            <TarifasYprecios postData={postData} handleChangeInput={handleChangeInput} category={postData.subCategory} />
            <CancellationPolicy postData={postData} handleChangeInput={handleChangeInput} />
            <ContactReservation postData={postData} handleChangeInput={handleChangeInput} />
        </>
    );

    const wilayasOptions = communesjson.map((w, i) => (
        <option key={i} value={w.wilaya}>{w.wilaya}</option>
    ));

    const communesOptions = selectedWilaya
        ? (communesjson.find(w => w.wilaya === selectedWilaya)?.commune || []).map((c, i) => (
            <option key={i} value={c}>{c}</option>
        ))
        : [];

    return (
        <div className="container-fluid p-0" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="row g-0">
                <div className="col-12">

                    {/* HEADER */}
                    <div className={`card border-0 rounded-0 ${isEdit ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
                        <div className="card-body py-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <h6 className="mb-0 fw-semibold d-flex align-items-center">
                                        {isEdit
                                            ? <><FaEdit size={14} className="me-2" />{t('edit_title', 'Modifier la Publication')}</>
                                            : <><FaInfoCircle size={14} className="me-2" />{t('create_title', 'Créer une Nouvelle Publication')}</>
                                        }
                                    </h6>
                                    {isEdit && postToEdit?.title && (
                                        <small className="d-block opacity-75 mt-1">
                                            {t('modification', 'Modification de')}: «{postToEdit.title}»
                                        </small>
                                    )}
                                </div>
                                <span className={`badge bg-${isEdit ? 'dark' : 'light'} text-${isEdit ? 'white' : 'dark'}`}>
                                    {completionPercentage}% {t('common.complete', 'Complété')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* PROGRESO */}
                    {completionPercentage > 0 && (
                        <div className="bg-white border-bottom px-3 py-2">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <small className="text-muted">{t('common.progress', 'Progression de votre annonce')}</small>
                                <small className="fw-bold">{completionPercentage}%</small>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div
                                    className={`progress-bar bg-${completionPercentage < 50 ? 'warning' : 'success'}`}
                                    role="progressbar"
                                    style={{ width: `${completionPercentage}%` }}
                                    aria-valuenow={completionPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                    )}

                    {/* ALERT */}
                    {showAlert && (
                        <div className={`alert alert-${alertVariant} alert-dismissible mb-0 rounded-0 border-0`} role="alert">
                            <strong className="small">
                                {alertVariant === 'success' ? '✅ Success' : '⚠️ Error'}
                            </strong>
                            <div className="small">{alertMessage}</div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowAlert(false)}
                                aria-label={t('common.close', 'Fermer')}
                            />
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="p-0">
                        <div className="px-2 pt-3">
                            <CategorySelector postData={postData} handleChangeInput={handleChangeInput} />
                        </div>

                        {postData.subCategory && (
                            <>
                                <div className="card mb-0 border-0 rounded-0">
                                    <div className="card-header bg-light border-0">
                                        <h6 className="mb-0 fw-semibold small d-flex align-items-center">
                                            <FaInfoCircle size={14} className="me-2 text-muted" />
                                            {t('common.basic_info', 'Informations de Base')}
                                        </h6>
                                    </div>
                                    <div className="card-body px-2">
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

                                {renderCategoryFields()}
                                {renderCommonComponents()}

                                <div className="card mb-0 border-0 rounded-0">
                                    <div className="card-header bg-light border-0">
                                        <h6 className="mb-0 fw-semibold small d-flex align-items-center">
                                            <FaImage size={14} className="me-2 text-muted" />
                                            {t('common.images', "Images de l'Annonce")}
                                        </h6>
                                    </div>
                                    <div className="card-body px-2">
                                        <ImageUpload
                                            images={images}
                                            handleChangeImages={handleChangeImages}
                                            deleteImages={deleteImages}
                                            theme={theme}
                                            disableZoom={true}
                                        />
                                    </div>
                                </div>

                                <div className="card border-0 bg-transparent">
                                    <div className="card-body px-2">
                                        <div className={`row g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="col-8">
                                                <button
                                                    type="submit"
                                                    className={`btn btn-${isEdit ? 'warning' : 'success'} btn-lg w-100 fw-bold py-2 d-flex align-items-center justify-content-center`}
                                                >
                                                    {isEdit
                                                        ? <><FaSave size={14} className="me-2" />{t('button_update', 'Mettre à jour')}</>
                                                        : <><FaInfoCircle size={14} className="me-2" />{t('button_publish', 'Publier')}</>
                                                    }
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-lg w-100 py-2 d-flex align-items-center justify-content-center"
                                                    onClick={() => history.goBack()}
                                                >
                                                    <FaTimes size={14} className="me-2" />
                                                    {t('common.cancel', 'Annuler')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {!postData.subCategory && (
                            <div className="card text-center border-0 bg-light rounded-0">
                                <div className="card-body py-4">
                                    <div className="fs-1 mb-2">🏁</div>
                                    <h6 className="text-muted mb-0">
                                        {t('common.select_category_first', "Sélectionnez d'abord une catégorie pour commencer")}
                                    </h6>
                                </div>
                            </div>
                        )}
                    </form>

                </div>
            </div>

            <style>{`
                .form-select { position: relative; z-index: 1000; }
                .dropdown-menu { z-index: 1050 !important; }
                img { transform: none !important; transition: none !important; }
                .image-hover-zoom, .image-hover-zoom:hover { transform: none !important; }
                .form-control, .form-select, .form-check-input { border-radius: 0.375rem; }
                .accordion-button:not(.collapsed) {
                    background-color: #f8f9fa;
                    color: #212529;
                    box-shadow: none;
                }
                .accordion-button:focus {
                    box-shadow: 0 0 0 0.15rem rgba(13,110,253,0.15);
                }
                .accordion-item { background-color: transparent; }
                .accordion-body { background-color: #fff; }
                .card-body.px-2 .form-control,
                .card-body.px-2 .form-select {
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                }
                @media (max-width: 576px) {
                    button[type="submit"] { position: sticky; bottom: 0; z-index: 5; }
                }
            `}</style>
        </div>
    );
};

export default Createpost;