import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, FormInput, Input } from 'semantic-ui-react';
import { ILicenceOption } from '../../@Types/game';
import axiosInstance from '../../axios/axios';
import { useAppDispatch } from '../../hooks/hooks';
import { actionSetGameId } from '../../store/reducers/gameReducer';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CreateGame.scss';

function CreateGame() {
  const [title, setTitle] = useState('');
  const [licences, setLicences] = useState<string>('');
  const [players, setPlayers] = useState<string[]>(['']);
  const [licenseOptions, setLicenseOptions] = useState<ILicenceOption[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/api/license')
      .then((response) => {
        const { data } = response;
        if (data) {
          const options = data.map((license: ILicenceOption) => ({
            key: license.id,
            text: license.name,
            value: license.name,
          }));
          setLicenseOptions(options);
        } else {
          setLicenseOptions([]);
        }
      })
      .catch((error) => console.error('Erreur: ', error));
  }, []);

  const postGame = async (formData: any) => {
    try {
      const response = await axiosInstance.post('/api/game', formData);

      console.log('Success:', response.data);
      const gameId = response.data.id;
      dispatch(actionSetGameId({ gameId }));
      navigate(`/api/game/:${gameId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, '']);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const email = players;
    const formData = {
      name: title,
      license_name: licences,
      email: email,
    };
    console.log('Form data:', formData);

    postGame(formData);
  };

  return (
    <div className="create-game">
      <Header />
      <div className="create-game-content">
        <h1 className="create-game-title">Créer ta partie</h1>
        <div className="create-game-form">
          <Form>
            <FormInput
              className="create-game-input"
              label="Nom de la partie"
              placeholder="Nom de la partie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon="game"
              iconPosition="left"
            />
            <label className="create-game-licences">
              Licences
              <Dropdown
                className="create-game-licences-input"
                placeholder="Licence"
                selection
                options={licenseOptions}
                value={licences}
                onChange={(e, { value }) => setLicences(value as string)}
              />
            </label>
            {players.map((player, index) => (
              <Form.Field key={index} className="create-game-form-field">
                <FormInput
                  className="create-game-input"
                  label="Ajouter un joueur"
                  placeholder="Ajouter un joueur"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  icon="at"
                  iconPosition="left"
                />
                {index > 0 && (
                  <Button
                    className="create-game-delete-player-btn"
                    onClick={() => handleRemovePlayer(index)}
                    icon="minus"
                  />
                )}
              </Form.Field>
            ))}
            <Button
              onClick={handleAddPlayer}
              icon="plus"
              className="create-game-add-player-btn"
            />
            <div className="submit-container">
              <Button
                onClick={handleSubmit}
                className="create-game-submit-btn"
                content="Valider"
              />
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGame;