import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './components/Home/Home'; // Import Home component
import Login from './components/Register/Login';
import Signup from './components/Register/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import OrganizerDashboard from './components/Organizer/OrganizerDashboard';
import ParticipantDashboard from './components/Participant/ParticipantDashboard';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import CreateTournament from './components/Organizer/CreateTournament';

setupIonicReact();

// PrivateRoute with role-based access control
const PrivateRoute = ({ component: Component, requiredRole, ...rest }: any) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
  const userRole = localStorage.getItem('role'); // Get the user's role

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && userRole === requiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Public Routes */}
        <Route exact path="/">
          <Home /> {/* Home page */}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>

        {/* Private Routes with Role-Based Access */}
        <PrivateRoute exact path="/admin" component={AdminDashboard} requiredRole="admin" />
        <PrivateRoute exact path="/organizer" component={OrganizerDashboard} requiredRole="organizer" />
        <PrivateRoute exact path="/create-tournament" component={CreateTournament} requiredRole="organizer" />
        <PrivateRoute exact path="/participant" component={ParticipantDashboard} requiredRole="participant" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;