import React, { useState } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonSelect,
  IonSelectOption,
  IonText,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'organizer' | 'participant'>('admin');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
      const { token, role: userRole } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin') {
        history.push('/admin');
      } else if (userRole === 'organizer') {
        history.push('/organizer');
      } else {
        history.push('/participant');
      }
    } catch (error) {
      setAlertMessage('Login failed. Please check your credentials.');
      setShowAlert(true);
    }
  };

  const handleBackClick = () => {
    history.push('/'); // Redirect to home page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          {/* Back Button */}
          <IonButtons slot="start">
            <IonButton onClick={handleBackClick}>Back</IonButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Email Input */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
              style={{ marginTop: '8px' }}
            />
          </IonItem>

          {/* Password Input */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
              style={{ marginTop: '8px' }}
            />
          </IonItem>

          {/* Role Select */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Role</IonLabel>
            <IonSelect
              value={role}
              onIonChange={(e) => setRole(e.detail.value)}
              style={{ marginTop: '8px' }}
            >
              <IonSelectOption value="admin">Admin</IonSelectOption>
              <IonSelectOption value="organizer">Organizer</IonSelectOption>
              <IonSelectOption value="participant">Participant</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Login Button */}
          <IonButton expand="full" type="submit" className="ion-margin-top" style={{ borderRadius: '10px' }}>
            Login
          </IonButton>
        </form>

        {/* Sign Up Link */}
        <IonText className="ion-text-center ion-margin-top">
          <p>
            Don't have an account?{' '}
            <IonButton fill="clear" size="small" onClick={() => history.push('/signup')}>
              Sign Up
            </IonButton>
          </p>
        </IonText>

        {/* Alert for Error Messages */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Alert"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;