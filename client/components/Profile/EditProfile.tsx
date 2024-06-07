import { Button, Form, FormInput } from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ChangeEvent, useState } from 'react';
import './EditProfil.scss';

function EditProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
    <div className="editprofile">
      <Header />
      <div className="editprofile-page">
        <h1 className="editprofile-title">Edition du profil</h1>
        <Form className="editprofile-form">
          <input
            className="editprofile-input"
            type="file"
            onChange={handleAvatarChange}
          />
          {avatarPreview && (
            <div className="avatar-preview">
              <img src={avatarPreview} alt="Avatar Preview" />
            </div>
          )}
          <FormInput
            className="editprofile-input"
            icon="user"
            iconPosition="left"
            label="Nom"
            placeholder="Nom"
          />
          <FormInput
            className="editprofile-input"
            icon="user"
            iconPosition="left"
            label="Prénom"
            placeholder="Prénom"
          />

          <FormInput
            className="editprofile-input"
            icon="lock"
            iconPosition="left"
            label="Mot de passe"
            placeholder="Mot de passe"
          />
          <FormInput
            className="editprofile-input"
            icon="lock"
            iconPosition="left"
            label="Confirmation mot de passe"
            placeholder="Confirmation mot de passe"
          />
          <Button className="editprofile-btn" content="Valider" />
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
