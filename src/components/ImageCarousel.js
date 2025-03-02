import React, { useState, useEffect } from "react";
import "../css/Dashboard.css"; // Importa o CSS do Dashboard

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Troca a imagem a cada 3 segundos

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }
  }, [images]);

  return (
    <div className="carousel-container">
      <img src={images[currentIndex]} alt={`Imagem ${currentIndex}`} className="carousel-image" />
    </div>
  );
};

export default ImageCarousel;
