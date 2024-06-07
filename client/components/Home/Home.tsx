import React from 'react';
import { NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  ButtonGroup,
  ButtonOr,
  Container,
  Icon,
  Image,
} from 'semantic-ui-react';
import { useAppSelector } from '../../hooks/hooks';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Home.scss';

function Home() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <div className="home">
      <Header />
      <Image
        src="/LogoDiceForge.jpg"
        size="large"
        className="home-logo"
      />
      <div className="home-container">
        <Container text textAlign="center">
          <h2 className="home-title">Aventurier...</h2>

          <p className="home-paragraph">Bienvenue sur Dice Forge !</p>
          <p className="home-paragraph">
            Votre plateforme ultime pour la gestion de parties de jeux de rôles
            en ligne ! <br />
            Que vous soyez un maître du donjon expérimenté ou un aventurier
            débutant, notre site offre tout ce dont vous avez besoin pour rendre
            vos aventures encore plus épiques.
          </p>
          <p className="home-paragraph">
            Plongez dans un univers de possibilités infinies, où chaque lancer
            de dé peut changer le cours de votre destinée. Créez des personnages
            uniques, explorez des mondes fantastiques et tissez des récits
            inoubliables avec vos amis, où que vous soyez.
          </p>
          <p className="home-paragraph">
            En vous inscrivant sur Dice Forge, vous aurez accès à une multitude
            d'outils de gestion de parties, de création de personnages et de
            ressources pour enrichir vos aventures. Que vous préfériez les
            règles classiques ou que vous souhaitiez expérimenter de nouvelles
            variantes, notre plateforme flexible s'adapte à vos besoins.
          </p>
          <p className="home-paragraph">
            Rejoignez notre communauté florissante de passionnés de jeux de
            rôles dès aujourd'hui ! Laissez libre cours à votre imagination,
            forgez des alliances, affrontez des créatures légendaires et écrivez
            votre propre légende.
          </p>
          <p className="home-paragraph">
            Inscrivez-vous dès maintenant pour commencer votre voyage épique sur
            Dice Forge. <br />
          </p>
          <p className="home-paragraph">L'aventure vous attend !</p>
        </Container>
      </div>

      <div className="home-group-btn">
        {isLogged ? (
          <NavLink to="/api/creategame">
            <Button
              className="home-btn-creategame"
              icon="right arrow"
              labelPosition="right"
              content="Créer une partie"
            />
          </NavLink>
        ) : (
          <ButtonGroup>
            <NavLink to="/api/login">
              <Button className="home-btn-login" content="Connectez-vous" />
            </NavLink>
            <ButtonOr text="/" />
            <NavLink to="/api/signup">
              <Button className="home-btn-signup" content="Inscrivez-vous" />
            </NavLink>
          </ButtonGroup>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
