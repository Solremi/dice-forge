import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormInput } from 'semantic-ui-react';
import { IUser } from '../../@Types/user';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Signup.scss';

function Signup() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState<IUser>({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  /**
   * La fonction postUser envoie une requête POST à une URL spécifiée avec les données du formulaire et enregistre la réponse.
  @formData - Le paramètre formData dans la fonction postUser est de type IUser,
   qui contient des données liées à un utilisateur, telles que leur nom,
   leur email, leur mot de passe, etc. Ces données sont ensuite envoyées en tant que
   requête POST à http://localhost:5000/api/signup en utilisant Axios.
  */
  const postUser = async (formData: IUser) => {
    const response = await axiosInstance.post('/signup', formData);
  };

  /**
   * La fonction handleSubmit empêche le comportement de soumission par défaut
   * du formulaire, enregistre les données du formulaire utilisateur, et envoie les données à un serveur.
   * @event - Le paramètre event dans la fonction handleSubmit est de type React.FormEvent<HTMLFormElement>.
   * Ce paramètre représente l'événement de soumission du formulaire dans une application React.
   * En appelant event.preventDefault(), vous empêchez le comportement de soumission par défaut du formulaire,
   * ce qui vous permet de gérer la soumission du formulaire manuellement.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postUser(userFormData);
    navigate('/api/login');
  };

  /**
   * Fonction qui permet de changer la valeur du state au changement de l'input (input contrôlé)
   * @param event - paramètres de la fonction qui contient la valeur de l'input
   * @param {string} inputName - Le paramètre inputName dans la fonction handleChange
   * est une chaîne de caractères qui représente le nom du champ de saisie qui a déclenché
   * l'événement de changement. Il est utilisé comme clé pour mettre à jour la valeur
   * correspondante dans l'objet d'état userFormData.
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    event.preventDefault();
    setUserFormData((previousData) => ({
      ...previousData,
      [inputName]: event.target.value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="signup">
      <Header />
      <h1 className="signup-title">Inscription</h1>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <FormInput
          className="signup-input"
          icon="user"
          iconPosition="left"
          label="Nom"
          placeholder="Nom"
          onChange={(event) => handleChange(event, 'lastname')}
        />
        <FormInput
          className="signup-input"
          icon="user"
          iconPosition="left"
          label="Prénom"
          type="text"
          placeholder="Prénom"
          onChange={(event) => handleChange(event, 'firstname')}
        />
        <FormInput
          className="signup-input"
          icon="at"
          iconPosition="left"
          label="Email"
          type="email"
          placeholder="Email"
          onChange={(event) => handleChange(event, 'email')}
        />
        <FormInput
          className="signup-input"
          icon="lock"
          iconPosition="left"
          label="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => handleChange(event, 'password')}
        />
        <FormInput
          className="signup-input"
          icon="lock"
          iconPosition="left"
          label="Confirmation"
          type="password"
          placeholder="Confirmation mot de passe"
          onChange={(event) => handleChange(event, 'confirmPassword')}
        />

        <Button content="Valider" type="submit" className="signup-form-btn" />
      </Form>
      <Footer />
    </div>
  );
}

export default Signup;
