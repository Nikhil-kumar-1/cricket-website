import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { menuOutline, logOutOutline } from 'ionicons/icons';

const ParticipantDashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Participant logged out');
  };

  return (
    <>
      {/* Sidebar Menu */}
      <IonMenu contentId="participant-content" onIonDidOpen={() => setIsMenuOpen(true)} onIonDidClose={() => setIsMenuOpen(false)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Participant Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button>
                <IonLabel>My Profile</IonLabel>
              </IonItem>
              <IonItem button>
                <IonLabel>Join Tournament</IonLabel>
              </IonItem>
              <IonItem button onClick={handleLogout}>
                <IonIcon icon={logOutOutline} slot="start" />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Content */}
      <IonPage id="participant-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}>
                <IonIcon icon={menuOutline} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Participant Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>Welcome, Participant!</h1>
          <p>You can join tournaments and manage your profile from the sidebar.</p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ParticipantDashboard;