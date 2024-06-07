import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, FormInput, Message } from 'semantic-ui-react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Reset-password.scss';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const id = query.get('id');

  useEffect(() => {
    if (!token || !id) {
      setError('Lien de réinitialisation invalide');
    }
  }, [token, id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !id) {
      setError('Lien de réinitialisation invalide');
      return;
    }
    try {
      const response = await axiosInstance.post('reset-password', {
        token,
        id,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        setMessage(response.data.message);
        setError(null);
        navigate('/api/login');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setMessage(null);
    }
  };

  return (
    <div className="reset-password">
      <Header />
      <h1 className="reset-password-title">Réinitialiser votre mot de passe</h1>
      <p className="reset-password-text">
        Veuillez choisir un nouveau mot de passe.
      </p>
      {message && <Message success content={message} />}
      {error && <Message negative content={error} />}
      <div className="reset-password-form">
        <Form onSubmit={handleSubmit}>
          <FormInput
            label="Nouveau mot de passe"
            icon="lock"
            iconPosition="left"
            placeholder="Nouveau mot de passe"
            className="reset-password-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormInput
            label="Confirmation mot de passe"
            icon="lock"
            iconPosition="left"
            placeholder="Confirmation mot de passe"
            className="reset-password-input"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Button
            type="submit"
            content="Envoyer"
            className="reset-password-submit-btn"
          />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
