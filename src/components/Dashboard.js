import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import '../css/Dashboard.css'; // Importa o CSS
import NavBar from '../components/NavBar';
import ImageCarousel from '../components/ImageCarousel'; // Importa o carrossel automático

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO:', socket.id);
    });

    socket.on('newMercadoria', (newItem) => {
      setItems((prevItems) => [...prevItems, newItem]);
      setFilteredItems((prevItems) => [...prevItems, newItem]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/mercadorias')
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar mercadorias:', error.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (priceFilter === '' || (priceFilter === '100' && item.price <= 100) || (priceFilter === '500' && item.price <= 500) || (priceFilter === '2000' && item.price <= 2000)) &&
          (statusFilter === '' || item.status === statusFilter)
        );
      })
    );
  }, [searchTerm, priceFilter, statusFilter, items]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="filters">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">Filtrar por preço</option>
          <option value="100">Até R$ 100</option>
          <option value="500">Até R$ 500</option>
          <option value="2000">Até R$ 2000</option>
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filtrar por condição</option>
          <option value="novo">Novo</option>
          <option value="usado">Usado</option>
          <option value="semi-novo">Semi-novo</option>
        </select>
      </div>
      <div className="dashboard-container">
        {filteredItems.map((item) => (
          <div className="card" key={item.id} onClick={() => navigate(`/detalhes/${item.id}`)}>
            {/* Novo carrossel automático */}
            <ImageCarousel images={item.images} />
            <h2>{item.name}</h2>
            <p>Preço: R$ {item.price}</p>
            <p>Altura: {item.height} cm</p>
            <p>Largura: {item.width} cm</p>
            <span className={`status ${item.status}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
