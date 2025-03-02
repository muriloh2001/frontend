import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedScreen = () => {
  const navigate = useNavigate();

  // Estado para os campos do formulário
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [images, setImages] = useState([]);  // Alterado para múltiplas imagens
  const [status, setStatus] = useState('novo');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('height', height);
    formData.append('width', width);
    formData.append('status', status);

    // Adiciona as imagens no FormData
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/mercadorias', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Mercadoria cadastrada com sucesso!');
      console.log(response.data);

      // Limpa o formulário
      setName('');
      setPrice('');
      setHeight('');
      setWidth('');
      setImages([]);
      setStatus('novo');
    } catch (error) {
      console.error('Erro ao cadastrar mercadoria:', error.response?.data || error.message);
      setMessage('Erro ao cadastrar mercadoria.');
    }
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Bem-vindo à Tela Protegida</h1>
      <p>Somente usuários autenticados podem acessar esta página.</p>

      <button onClick={handleLogout} style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}>
        Logout
      </button>

      <h2>Cadastro de Mercadorias</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Nome da Mercadoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="number"
          placeholder="Altura (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="number"
          placeholder="Largura (cm)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          required
          style={{ padding: '10px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{ padding: '10px' }}
        >
          <option value="novo">Novo</option>
          <option value="usado">Usado</option>
          <option value="semi-novo">Semi-novo</option>
        </select>
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Cadastrar Mercadoria
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default ProtectedScreen;
