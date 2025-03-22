import {
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonList,
  IonItem,
  IonAvatar,
  IonIcon,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';

const OrganizerDashboard: React.FC = () => {
  return (
    <IonPage>
      {/* Sidebar */}
      <IonMenu contentId="main-content">
        <IonContent>
          <IonList>
            <IonItem routerLink="/organizer-dashboard">Dashboard</IonItem>
            <IonItem routerLink="/events">My Events</IonItem>
            <IonItem routerLink="/participants">Participants</IonItem>
          </IonList>
          <IonMenuToggle>
            <button style={{
              display: 'block', 
              margin: '20px auto', 
              padding: '10px 15px',
              backgroundColor: 'red', 
              color: 'white', 
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>

      {/* Main Content Area */}
      <IonPage id="main-content">
        
        {/* Navbar */}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Organizer Dashboard</IonTitle>
            <IonButtons slot="end">
            <IonIcon icon={personCircle} size="large" />
          </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* Page Content */}
        <IonContent>
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>Welcome, Organizer!</h1>
        </IonContent>

      </IonPage>
    </IonPage>
  );
};

export default OrganizerDashboard;
