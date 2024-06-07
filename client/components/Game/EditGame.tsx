import {
  Button,
  Form,
  FormInput,
  FormSelect,
  FormTextArea,
  Input,
} from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './EditGame.scss';
import { useState } from 'react';

function EditGame() {
  const [game, setGame] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [music, setMusic] = useState<string>('');
  const [players, setPlayers] = useState<string[]>(['']);

  const handleAddPlayer = () => {
    setPlayers([...players, '']);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  return (
    <div className="edit-game">
      <Header />
      <div className="edit-game-page">
        <h1 className="edit-game-title">Réglages de la partie</h1>
        <Form className="edit-game-form">
          <FormInput
            className="edit-game-input"
            label="Nom de la partie"
            placeholder="Partie 1"
            icon="game"
            iconPosition="left"
            value={game}
            onChange={(event) => {
              setGame(event.target.value);
            }}
          />
          {players.map((player, index) => (
            <Form.Field key={index}>
              <FormInput
                label="Ajouter un joueur"
                placeholder="Ajouter un joueur"
                iconPosition="left"
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                icon="at"
              />
              {index > 0 && (
                <Button
                  className="edit-game-close-btn"
                  onClick={() => handleRemovePlayer(index)}
                  icon="close"
                />
              )}
            </Form.Field>
          ))}

          <Button
            className="edit-game-btn"
            onClick={handleAddPlayer}
            icon="plus"
          />
          <FormInput
            className="edit-game-input"
            label="Date de session"
            placeholder="22/06/24"
            icon="calendar alternate"
            iconPosition="left"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <FormTextArea
            className="edit-game-input"
            placeholder="Ajouter vos notes pour la partie"
            label="Notes"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
          <label>
            Musique
            <input
              className="edit-game-input"
              type="file"
              value={music}
              onChange={(event) => {
                setMusic(event.target.value);
              }}
            ></input>
          </label>
          <Button content="Modifier" className="edit-game-submit-btn" />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default EditGame;
