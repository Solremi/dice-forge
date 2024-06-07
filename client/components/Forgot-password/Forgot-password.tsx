import React,{ useState } from 'react';
import { Button, Form, FormInput, Message } from 'semantic-ui-react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Forgot-password.scss';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlesubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/forgot-password', { email });

      if (response.status === 200) {
        setMessage(response.data.message);
        setError(null);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setMessage(null);
    }
  };
  return (
    <div className="forgot-password">
      <Header />
      <h1 className="forgot-password-title">Mot de passe oublié ?</h1>
      <p className="forgot-password-text">
        Vous allez recevoir un e-mail allant vous permettre de modifier votre
        mot de passe.
      </p>
      {message && <Message success content={message} />}
      {error && <Message negative content={error} />}
      <div className="forgot-password-form">
        <Form onSubmit={handlesubmit}>
          <FormInput
            label="Email"
            icon="at"
            iconPosition="left"
            placeholder="Email"
            className="forgot-password-input"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            content="Envoyer"
            className="forgot-password-submit-btn"
          />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
