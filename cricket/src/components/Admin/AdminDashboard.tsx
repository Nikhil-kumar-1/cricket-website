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

const AdminDashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Admin logged out');
  };

  return (
    <>
      {/* Sidebar Menu */}
      <IonMenu contentId="admin-content" onIonDidOpen={() => setIsMenuOpen(true)} onIonDidClose={() => setIsMenuOpen(false)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Admin Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button>
                <IonLabel>Manage Organizers</IonLabel>
              </IonItem>
              <IonItem button>
                <IonLabel>Manage Participants</IonLabel>
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
      <IonPage id="admin-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}>
                <IonIcon icon={menuOutline} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Admin Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>Welcome, Admin!</h1>
          <p>You can manage organizers and participants from the sidebar.</p>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminDashboard;