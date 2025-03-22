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
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';


const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'organizer' | 'participant'>('participant');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match!');
      setShowAlert(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, name, mobile, password, role });
      console.log(response.data);
      setAlertMessage('Signup successful!');
      setShowAlert(true);
      history.push('/login');
    } catch (error) {
      console.error(error);
      setAlertMessage('Signup failed. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Signup</IonTitle>
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

          {/* Name Input */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
              required
              style={{ marginTop: '8px' }}
            />
          </IonItem>

          {/* Mobile Input */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Mobile</IonLabel>
            <IonInput
              type="tel"
              value={mobile}
              onIonChange={(e) => setMobile(e.detail.value!)}
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

          {/* Confirm Password Input */}
          <IonItem style={{ marginBottom: '20px', borderRadius: '10px' }}>
            <IonLabel position="stacked">Confirm Password</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
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
              <IonSelectOption value="organizer">Organizer</IonSelectOption>
              <IonSelectOption value="participant">Participant</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Signup Button */}
          <IonButton expand="full" type="submit" className="ion-margin-top" style={{ borderRadius: '10px' }}>
            Signup
          </IonButton>
        </form>

        {/* Login Link */}
        <IonText className="ion-text-center ion-margin-top">
          <p>
            Already have an account?{' '}
            <IonButton fill="clear" size="small" onClick={() => history.push('/login')}>
              Login
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

export default Signup;