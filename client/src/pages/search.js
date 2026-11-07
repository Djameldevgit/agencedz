import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { getCategories } from "../redux/actions/postAction";
import UserCard from "../components/UserCard";
import Posts from "../components/home/Posts";

import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  ListGroup,
  InputGroup,
  Row,
  Col,
  Card,
  Accordion,
  Badge,
} from "react-bootstrap";

import LoadIcon from "../images/loading.gif";

export default function SearchPage() {
  const { t, i18n } = useTranslation('search');
  const languageReducer = useSelector(state => state.languageReducer);
  const { homePosts } = useSelector(state => state);

  useEffect(() => {
    const lang = languageReducer?.language || 'es';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [languageReducer?.language, i18n]);

  // 🔹 Estados
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    subCategory: "",
    destinacionvoyage1: "",
    wilaya: ""
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // 🔹 Cargar categorías del backend al montar
  useEffect(() => {
    if (!homePosts?.categories || homePosts.categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, homePosts?.categories]);

  // 🔹 Construir opciones de subCategory dinámicamente desde Redux
  //    Si no hay categorías cargadas, fallback al listado estático
  const fallbackCategories = [
    { value: "Voyage Organise", label: "Voyage Organisé" },
    { value: "Voyage_Local", label: "Voyage Local" },
    { value: "Voyage_Etranger", label: "Voyage à l'Étranger" },
    { value: "Location_Vacances", label: "Location Vacances" },
    { value: "hadj_Omra", label: "Hadj & Omra" },
    { value: "Reservations_Visa", label: "Réservations & Visa" }
  ];

  const subCategoryOptions = (homePosts?.categories && homePosts.categories.length > 0)
    ? homePosts.categories.map(cat => ({
        // El value mantiene la forma "Voyage Organise" para no romper el backend adapter
        value: cat.key,
        label: cat.label?.fr || cat.key,
      }))
    : fallbackCategories;

  // 🔹 Opciones de destino estáticas (por ahora)
  const destinationOptions = [
    {
      group: "Destinations Nationales",
      options: [
        "Alger", "Oran", "Constantine", "Tlemcen", "Béjaïa",
        "Timimoun", "Djanet", "Taghit", "Boussaâda", "Oued Souf"
      ]
    },
    {
      group: "Destinations Internationales",
      options: [
        "Istanbul", "Dubaï", "Le Caire", "Sharm El Sheikh", "Tunis",
        "Sousse", "Djerba", "Moscou", "Saint Petersburg", "Kuala Lumpur",
        "Langkawi", "Bakou", "Téhéran", "Kashan", "Ispahan", "Shiraz",
        "New York", "Los Angeles", "Las Vegas", "San Francisco", "Andalousie",
        "Rome", "Paris", "Maldives", "Zanzibar", "Jordanie", "Ouzbékistan", "Thaïlande"
      ]
    }
  ];

  // 🔹 Mapeo subCategory → detailType (para enviar al backend)
  const subCategoryToDetailType = {
    'voyage_local': 'travel',
    'voyage_etranger': 'travel',
    'voyage_organise': 'travel',
    'Voyage Organise': 'travel',
    'Voyage_Local': 'travel',
    'Voyage_Etranger': 'travel',
    'location_vacances': 'rental',
    'Location_Vacances': 'rental',
    'hajj_omra': 'hajj',
    'hadj_Omra': 'hajj',
    'visa': 'visa',
    'Reservations_Visa': 'visa',
  };

  // 🔹 Buscar posts (con filtros compatibles con el backend nuevo)
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      // Título
      if (search.trim()) queryParams.append('title', search.trim());

      // Categoría / detailType
      if (filters.subCategory.trim()) {
        const dt = subCategoryToDetailType[filters.subCategory.trim()];
        if (dt) queryParams.append('detailType', dt);
      }

      // Wilaya
      if (filters.wilaya.trim()) queryParams.append('wilaya', filters.wilaya.trim());

      // Nota: destinacionvoyage1 ya no existe en backend nuevo.
      // Se mantiene en UI para más adelante (cuando TravelDetail.destinations esté listo).

      const qs = queryParams.toString();
      const url = `posts${qs ? `?${qs}` : ''}`;

      const res = await getDataAPI(url, auth.token);
      setResults(res.data.posts || []);

    } catch (err) {
      console.error("Error en búsqueda:", err);
      setError(
        err.response?.data?.msg || err.message || t('errors.searchError')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseUsers = () => {
    setUsers([]);
    setSearch("");
  };

  const updateFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setSearch("");
    setFilters({
      subCategory: "",
      destinacionvoyage1: "",
      wilaya: ""
    });
    setResults([]);
    setUsers([]);
    setError(null);
  };

  const activeFiltersCount = [
    search,
    filters.subCategory,
    filters.destinacionvoyage1,
    filters.wilaya
  ].filter(Boolean).length;

  return (
    <Container className="py-3">
      <div className="text-center mb-3">
        <h4 className="fw-bold text-primary mb-1">{t('title')}</h4>
        <p className="text-muted small">{t('subtitle')}</p>
      </div>

      <Card className="shadow-sm border-0 mb-3">
        <Card.Body className="p-3">
          <Form onSubmit={handleSearch}>
            {search && users.length > 0 && (
              <Card className="mb-2 border-primary">
                <Card.Header className="bg-primary text-white py-1 px-2">
                  <small className="fw-bold">
                    <i className="fas fa-users me-1"></i>
                    {t('travelAgenciesFound')} ({users.length})
                  </small>
                </Card.Header>
                <ListGroup variant="flush" className="max-h-200 overflow-auto">
                  {userLoading && (
                    <ListGroup.Item className="text-center py-2">
                      <Spinner animation="border" size="sm" className="me-2" />
                      <small>{t('searchingAgencies')}</small>
                    </ListGroup.Item>
                  )}
                  {users.map((user) => (
                    <ListGroup.Item key={user._id} action className="p-2">
                      <UserCard
                        user={user}
                        border="border-0"
                        handleClose={handleCloseUsers}
                        compact={true}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            )}

            <Accordion className="mb-3" defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="py-2">
                  <div className="d-flex align-items-center w-100">
                    <i className="fas fa-filter text-primary me-2 fs-6"></i>
                    <small className="fw-semibold">{t('filters.title')}</small>
                    {activeFiltersCount > 0 && (
                      <Badge bg="primary" className="ms-2 fs-6">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </div>
                </Accordion.Header>
                <Accordion.Body className="p-2">
                  <Row className="g-2">
                    {/* FILTRO 1: SUBCATEGORÍA */}
                    <Col sm={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-semibold mb-1">
                          <i className="fas fa-tags text-info me-1"></i>
                          {t('filters.subCategory')}
                        </Form.Label>
                        <Form.Select
                          value={filters.subCategory}
                          onChange={(e) => updateFilter('subCategory', e.target.value)}
                          size="sm"
                        >
                          <option value="">{t('filters.selectSubCategory')}</option>
                          {subCategoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* FILTRO 2: DESTINO (por ahora solo UI) */}
                    <Col sm={6}>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-semibold mb-1">
                          <i className="fas fa-map-marker-alt text-success me-1"></i>
                          {t('filters.destination')}
                        </Form.Label>
                        <Form.Select
                          value={filters.destinacionvoyage1}
                          onChange={(e) => updateFilter('destinacionvoyage1', e.target.value)}
                          size="sm"
                        >
                          <option value="">{t('filters.selectDestination')}</option>
                          <optgroup label={t('filters.nationalDestinations')}>
                            {destinationOptions[0].options.map((destination) => (
                              <option key={destination} value={destination}>
                                {destination}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label={t('filters.internationalDestinations')}>
                            {destinationOptions[1].options.map((destination) => (
                              <option key={destination} value={destination}>
                                {destination}
                              </option>
                            ))}
                          </optgroup>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* FILTRO 3: WILAYA */}
                    <Col sm={12}>
                      <Form.Group className="">
                        <Form.Label className="small fw-semibold">
                          <i className="fas fa-globe-americas text-warning me-1"></i>
                          {t('filters.wilaya')}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t('filters.wilayaPlaceholder')}
                          value={filters.wilaya}
                          onChange={(e) => updateFilter('wilaya', e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Botón buscar */}
                  <div className="d-flex gap-2 mt-2">
                    <Button type="submit" variant="primary" size="sm" className="flex-grow-1">
                      <i className="fas fa-search me-1"></i>
                      {t('buttonSearch', 'Rechercher')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleClearFilters}
                    >
                      <i className="fas fa-times me-1"></i>
                      {t('buttonClear', 'Effacer')}
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Form>
        </Card.Body>
      </Card>

      {results.length > 0 && (
        <Alert variant="info" className="px-3 d-flex align-items-center">
          <i className="fas fa-info-circle me-2 fs-6"></i>
          <small className="fw-semibold">
            {t('results.found', { count: results.length })}
          </small>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="px-3 d-flex align-items-center">
          <i className="fas fa-exclamation-triangle me-2 fs-6"></i>
          <small>{error}</small>
        </Alert>
      )}

      <div className="">
        {loading ? (
          <Card className="text-center">
            <Card.Body className="p-3">
              <img src={LoadIcon} alt="loading" width="40" className="mb-2" />
              <h6 className="text-muted mb-1">{t('results.searching')}</h6>
              <small className="text-muted">{t('results.loading')}</small>
            </Card.Body>
          </Card>
        ) : (
          <Posts filters={results.length > 0 ? results : []} />
        )}
      </div>
    </Container>
  );
}