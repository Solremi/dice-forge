import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { useAppSelector } from '../../hooks/hooks';
import { actionIsLogged } from '../../store/reducers/userReducer';
import CreateGame from '../CreateGame/CreateGame';
import CreateSheet from '../CreateSheet/CreateSheet';
import ForgotPassword from '../Forgot-password/Forgot-password';
import Game from '../Game/Game';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ResetPassword from '../Reset-password/Reset-password';
import Signup from '../Signup/Signup';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  console.log('je suis le state de app :', user);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      addTokenJwtToAxiosInstance(token);
      if (!user.isLogged) {
        const userData = sessionStorage.getItem('user');
        if (userData) {
          dispatch(actionIsLogged(JSON.parse(userData)));
        }
      }
    }
  }, [dispatch, user.isLogged]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/signup" element={<Signup />} />
        <Route path="/api/creategame" element={<CreateGame />} />
        <Route path="/api/game" element={<Game />} />
        <Route path="/api/createsheet" element={<CreateSheet />} />
        <Route path="/api/profile" element={<Profile />} />
        <Route path="/api/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
