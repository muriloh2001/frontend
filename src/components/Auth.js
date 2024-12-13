import React, { useState, useEffect } from 'react'; // Adiciona useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Inicializa o token com o valor do localStorage
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Atualiza o token no estado quando ele é alterado
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Salva o token no localStorage
    } else {
      localStorage.removeItem('token'); // Remove o token do localStorage ao deslogar
    }
  }, [token]);

  const handleLogin = async () => {
    console.log('[LOGIN] Enviando requisição de login...');
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const token = response.data.token;

      // Salva o token no estado e no localStorage
      setToken(token);
      console.log('[LOGIN] Token armazenado no localStorage:', token);

      setMessage('Login realizado com sucesso!');
      navigate('/protected');
    } catch (error) {
      console.error('[LOGIN] Erro no login:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Erro ao realizar login.');
    }
  };

  const handleRegister = async () => {
    console.log('[REGISTER] Enviando requisição de registro...');
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      console.log('[REGISTER] Registro bem-sucedido para:', username);
      setMessage('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('[REGISTER] Erro no registro:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Erro ao registrar usuário.');
    }
  };

  const accessProtectedRoute = async () => {
    console.log('[PROTECTED] Tentando acessar rota protegida...');
    if (!token) {
      console.error('[PROTECTED] Token ausente. Faça login antes de acessar.');
      setMessage('Token ausente. Faça login antes de acessar a rota protegida.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('[PROTECTED] Resposta da rota protegida:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('[PROTECTED] Erro ao acessar rota protegida:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Erro ao acessar a rota protegida.');
    }
  };

  const handleLogout = () => {
    setToken(null); // Limpa o token
    setMessage('Você foi deslogado.');
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Autenticação</h1>
      {!token ? (
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: '10px' }}>
          <button onClick={accessProtectedRoute} style={{ padding: '10px 15px', cursor: 'pointer' }}>
            Acessar Rota Protegida
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 15px', cursor: 'pointer', marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!token && (
          <>
            <button onClick={handleLogin} style={{ padding: '10px 15px', cursor: 'pointer' }}>
              Login
            </button>
            <button onClick={handleRegister} style={{ padding: '10px 15px', cursor: 'pointer' }}>
              Registrar
            </button>
          </>
        )}
      </div>
      {message && <p style={{ marginTop: '20px', color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default Auth;
