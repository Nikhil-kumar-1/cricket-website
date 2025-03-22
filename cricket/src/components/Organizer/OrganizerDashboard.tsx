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

const OrganizerDashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Organizer logged out');
  };

  return (
    <>
      {/* Sidebar Menu */}
      <IonMenu contentId="organizer-content" onIonDidOpen={() => setIsMenuOpen(true)} onIonDidClose={() => setIsMenuOpen(false)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Organizer Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button>
                <IonLabel>My Tournaments</IonLabel>
              </IonItem>
              <IonItem button>
                <IonLabel>Create Tournament</IonLabel>
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
      <IonPage id="organizer-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}>
                <IonIcon icon={menuOutline} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Organizer Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>Welcome, Organizer!</h1>
          <p>You can manage your tournaments from the sidebar.</p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default OrganizerDashboard;