import React, { useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      const {
        data: { success, data },
      } = await api.post('/devs', { username });

      if (success) {
        history.push(`/dev/${data._id}`);
      } else {
        alert('There was an error');
      }
    } catch (error) {
      alert('There was an error');
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handelSubmit}>
        <img src={logo} alt="Tindev - Reggie" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
