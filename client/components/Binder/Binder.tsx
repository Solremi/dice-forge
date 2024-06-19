import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  Container,
  Icon,
} from 'semantic-ui-react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Binder.scss';

interface Sheet {
  id: number;
  name: string;
  image: string;
  class: string;
  level: number;
}

const CardItem: React.FC<Sheet> = ({
  id,
  name,
  image,
  class: className,
  level,
}) => (
  <Card>
    <CardContent>
      <CardHeader>{name}</CardHeader>
      <CardDescription>
        <img src={image} alt={name} />
        <p>Classe: {className}</p>
        <p>Niveau: {level}</p>
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup className="binder-btn-group">
        <Button content={<Icon name="pencil" />} />
        <Button content={<Icon name="trash" />} />
      </ButtonGroup>
    </CardContent>
  </Card>
);

const Binder: React.FC = () => {
  const location = useLocation();
  const gameId = Number(location.state);

  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const getSheets = async () => {
      try {
        // Assurez-vous que gameId est correctement défini avant de faire l'appel
        if (gameId) {
          const response = await axiosInstance.get(`/api/binder/${gameId}`);
          setSheets(response.data);
        }
      } catch (error) {
        console.log('Erreur lors de la récupération des fiches', error);
      }
    };
    getSheets();
  }, [gameId]); // Ajoutez gameId comme dépendance pour relancer l'effet si gameId change

  return (
    <div className="binder">
      <Header />
      <div className="binder-main-container">
        <h1 className="binder-title">Classeur de fiches</h1>
        <div className="binder-btn-group">
          <NavLink to="/api/createsheet" state={gameId}>
            <Button
              className="binder-btn-createsheet"
              content="Créer une fiche"
            />
          </NavLink>
          <NavLink to={`/api/game/${gameId}`}>
            <Button
              className="binder-btn-backToGame"
              content="Retour à la partie"
            />
          </NavLink>
        </div>
        <Container
          className={sheets.length === 0 ? 'binder-container-hidden' : 'binder-container'}
        >
          <CardGroup>
            {sheets.map((sheet) => (
              <CardItem key={sheet.id} {...sheet} />
            ))}
          </CardGroup>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Binder;
