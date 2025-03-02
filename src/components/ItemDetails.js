import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ItemDetails.css'; // Importa o CSS
import NavBar from '../components/NavBar';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/mercadorias/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do item:', error);
        setLoading(false);
      });
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <NavBar />
      <div className="item-details">
        {item && item.images && item.images.length > 0 ? (
          <div className="item-images">
            <button className="image-nav" onClick={prevImage}>
              &#60; Prev
            </button>
            <div className="zoom-container">
              <img
                src={item.images[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
              />
            </div>
            <button className="image-nav" onClick={nextImage}>
              Next &#62;
            </button>
          </div>
        ) : (
          <img
            src="/images/placeholder.png" // Imagem de fallback
            alt="Item"
          />
        )}

        <h2>{item.name}</h2>
        <p>Preço: R$ {item.price}</p>
        <p>Altura: {item.height} cm</p>
        <p>Largura: {item.width} cm</p>
        <span className={`status ${item.status}`}>{item.status}</span>
      </div>
    </div>
  );
};

export default ItemDetails;
 