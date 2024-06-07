import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormInput, Message } from 'semantic-ui-react';
import { IResponseData } from '../../@Types/response.data';
import { IUserLogin } from '../../@Types/user';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { actionIsLogged } from '../../store/reducers/userReducer';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Login.scss';

function Login() {
  const [userLoginData, setUserLoginData] = useState<IUserLogin>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const postUser = async (formData: IUserLogin) => {
    try {
      const response = await axiosInstance.post('/api/login', formData);

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setIsHidden(false);
        addTokenJwtToAxiosInstance(response.data.accessToken);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        dispatch(actionIsLogged(response.data.user));
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as IResponseData;

        if (axiosError.response.status === 401) {
          setErrorMessage(data.error);
          setSuccessMessage('');
          setIsHidden(false);
        } else if (axiosError.response.status === 500) {
          setErrorMessage('Erreur serveur');
          setSuccessMessage('');
          setIsHidden(false);
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postUser(userLoginData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    event.preventDefault();
    setUserLoginData((previousData) => ({
      ...previousData,
      [inputName]: event.target.value,
    }));
  };

  return (
    <div className="login">
      <Header />
      <h1 className="login-title">Connexion</h1>
      <div className="login-form">
        {!isHidden &&
          (errorMessage ? (
            <Message negative>{errorMessage}</Message>
          ) : (
            <Message success header={successMessage} />
          ))}

        <Form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            className="login-input"
            icon="at"
            iconPosition="left"
            placeholder="Email"
            onChange={(event) => handleChange(event, 'email')}
          />
          <FormInput
            label="Mot de passe"
            className="login-input"
            icon="lock"
            iconPosition="left"
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => handleChange(event, 'password')}
          />
          <a className="login-link" href="/api/forgot-password">
            Mot de passe oublié ?
          </a>
          <Button
            content="Se connecter"
            type="submit"
            className="login-form-btn"
          />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
