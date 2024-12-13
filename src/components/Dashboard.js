import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import '../css/Dashboard.css'; // Importa o arquivo CSS
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar mercadorias:', error.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div >
      <NavBar />
    <div className="dashboard-container">
      {items.map((item) => (
        <div className="card" key={item.id}>
          <img
            src={item.image ? `http://localhost:5000/uploads/${item.image}` : 'https://via.placeholder.com/300'}
            alt={item.name}
          />
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
