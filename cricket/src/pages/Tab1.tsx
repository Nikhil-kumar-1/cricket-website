import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonMenu, IonItem, IonList, IonButton } from '@ionic/react';
import { personCircle, logOut, close } from 'ionicons/icons';



const AdminDashboard: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <IonPage>
      {/* Sidebar (Menu) */}
      <IonMenu side="start" contentId="main-content" type="overlay" className={showMenu ? 'menu-open' : ''}>
        <IonContent>
          <IonList>
            <IonItem button onClick={() => setShowMenu(false)}>
              <IonIcon icon={close} slot="start" />
              Close Menu
            </IonItem>
            <IonItem button>
              <IonIcon icon={logOut} slot="start" />
              Logout
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Header with Navbar */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton onClick={() => setShowMenu(true)} />
          </IonButtons>
          <IonTitle>Admin Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={personCircle} size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Main Content */}
      <IonContent id="main-content">
        
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
