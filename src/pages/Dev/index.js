import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import './styles.css';

function Dev({ match: { params } }) {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const {
          data: { success, data },
        } = await api.get('/devs', {
          headers: { user: params.id },
        });

        if (success) {
          setDevs(data);
        } else {
          alert('There was an error loading devs');
        }
      } catch (error) {
        alert('There was an error loading devs');
      }
    }
    loadUsers();
  }, [params.id]);

  async function handleLike(id) {
    try {
      const {
        data: { success },
      } = await api.post(`/devs/${id}/like`, null, {
        headers: { user: params.id },
      });

      if (success) {
        setDevs(devs.filter(dev => dev._id !== id));
      } else {
        alert('There was an error liking dev');
      }
    } catch (error) {
      alert('There was an error liking dev');
    }
  }

  async function handleDislike(id) {
    try {
      const {
        data: { success },
      } = await api.post(`/devs/${id}/dislike`, null, {
        headers: { user: params.id },
      });

      if (success) {
        setDevs(devs.filter(dev => dev._id !== id));
      } else {
        alert('There was an error disliking dev');
      }
    } catch (error) {
      alert('There was an error disliking dev');
    }
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev - Reggie" />
      </Link>
      {devs.length > 0 && (
        <ul>
          {devs.map(dev => (
            <li key={dev._id}>
              <img src={dev.avatar} alt={dev.name} />
              <footer>
                <strong>{dev.name}</strong>
                <p>{dev.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button">
                  <img src={dislike} alt="Dislike" onClick={() => handleDislike(dev._id)} />
                </button>
                <button type="button" onClick={() => handleLike(dev._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {devs.length === 0 && <div className="empty">Acabou :(</div>}
    </div>
  );
}

export default Dev;
