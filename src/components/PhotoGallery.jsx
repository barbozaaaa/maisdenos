import { useState } from 'react'
import './PhotoGallery.css'

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const photos = [
    {
      id: 1,
      src: '/IMG/2d33ba85-adeb-4f8d-9f11-4e437cafd06c.JPG',
      alt: 'Projeto Mais de Nós - Ação Social',
      title: 'Momento de Alegria'
    },
    {
      id: 2,
      src: '/IMG/7a7277c3-de22-4bef-8fcd-e354adcc7db5.JPG',
      alt: 'Projeto Mais de Nós - Crianças',
      title: 'Sorrisos que Transformam'
    },
    {
      id: 3,
      src: '/IMG/b6fb7032-5bf8-476a-88aa-4f1af5e6f027.JPG',
      alt: 'Projeto Mais de Nós - Comunidade',
      title: 'União e Solidariedade'
    },
    {
      id: 4,
      src: '/IMG/IMG_3901.jpg',
      alt: 'Projeto Mais de Nós - Atividades',
      title: 'Crescendo Juntos'
    },
    {
      id: 5,
      src: '/IMG/IMG_3902.jpg',
      alt: 'Projeto Mais de Nós - Famílias',
      title: 'Famílias Abençoadas'
    },
    {
      id: 6,
      src: '/IMG/PHOTO-2025-08-24-17-17-10.jpg',
      alt: 'Projeto Mais de Nós - Evento',
      title: 'Celebrando a Vida'
    },
    {
      id: 7,
      src: '/IMG/PHOTO-2025-08-24-17-17-12.jpg',
      alt: 'Projeto Mais de Nós - Ação',
      title: 'Amor em Ação'
    }
  ]

  const openModal = (photo) => {
    setSelectedImage(photo)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="galeria" className="photo-gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">
            Nossos <span className="gradient-text">Momentos</span>
          </h2>
          <p className="gallery-description">
            Cada sorriso, cada abraço, cada momento de alegria compartilhado. 
            Estas são as histórias que nos movem e nos inspiram a continuar.
          </p>
        </div>

        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(photo)}
            >
              <div className="photo-container">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="gallery-photo"
                  loading="lazy"
                />
                <div className="photo-overlay">
                  <div className="photo-info">
                    <h3 className="photo-title">{photo.title}</h3>
                    <div className="photo-icon">📸</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <p className="cta-text">
            Quer fazer parte desta história? Seja <strong>+1</strong> conosco!
          </p>
          <button 
            className="btn-gallery"
            onClick={() => document.getElementById('doar').scrollIntoView({ behavior: 'smooth' })}
          >
            💝 Fazer Doação
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="modal-image"
            />
            <div className="modal-info">
              <h3 className="modal-title">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoGallery
