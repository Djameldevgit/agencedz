import React from 'react';
import { useTranslation } from 'react-i18next';

const ImageUpload = ({ images, handleChangeImages, deleteImages, theme }) => {
    const { t } = useTranslation('categories');

    const getImageSrc = (img) => {
        if (img.camera) return img.camera;
        if (img.url) return img.url;
        return URL.createObjectURL(img);
    };

    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">

                {images.length > 0 && (
                    <div className="mb-4">
                        <div className="row g-3">
                            {images.map((img, index) => (
                                <div className="col-6 col-md-4 col-lg-3" key={index}>
                                    <div className="position-relative">
                                        <img
                                            src={getImageSrc(img)}
                                            alt={t('preview')}
                                            className="w-100 rounded"
                                            style={{ height: '120px', objectFit: 'cover' }}
                                        />
                                        <span className="badge bg-success position-absolute top-0 start-0 m-1">
                                            🖼️
                                        </span>
                                        <span className="badge bg-secondary position-absolute top-0 end-0 m-1">
                                            #{index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                                            onClick={() => deleteImages(index)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                transform: 'translate(30%, -30%)',
                                                fontSize: '14px',
                                                padding: 0,
                                            }}
                                            aria-label={t('delete', 'Supprimer')}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer d-inline-block"
                        style={{
                            cursor: 'pointer',
                            fontSize: '2rem',
                            color: theme ? '#f8f9fa' : '#0d6efd',
                        }}
                    >
                        <i className="fas fa-image"></i>
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChangeImages}
                        className="d-none"
                    />
                    <div className="text-muted small mt-2">
                        {t('uploadHint', 'Cliquez sur l\'icône pour ajouter des images (5 MB max)')}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ImageUpload;