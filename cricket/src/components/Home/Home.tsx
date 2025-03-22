import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonThumbnail,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonMenu,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  trophyOutline,
  peopleOutline,
  statsChartOutline,
  notificationsOutline,
  moon,
  sunny,
  logInOutline,
  calendarOutline,
  locationOutline,
  cashOutline,
  personCircleOutline,
  trophy,
  pulseOutline,
  footballOutline,
  businessOutline,
  mailOutline,
} from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCreateTournament = () => {
    history.push('/create-tournament'); // Redirect to create tournament page
  };

  const handleJoinTournament = () => {
    history.push('/join-tournament'); // Redirect to join tournament page
  };

  const handleViewAllTournaments = () => {
    history.push('/tournaments'); // Redirect to all tournaments page
  };

  const handleLoginClick = () => {
    history.push('/login'); // Redirect to login page
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <>
      {/* Sidebar Menu */}
      <IonMenu contentId="home-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={() => history.push('/')}>
              <IonIcon icon={trophyOutline} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem button onClick={handleViewAllTournaments}>
              <IonIcon icon={peopleOutline} slot="start" />
              <IonLabel>Tournaments</IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push('/leaderboard')}>
              <IonIcon icon={statsChartOutline} slot="start" />
              <IonLabel>Leaderboard</IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push('/contact')}>
              <IonIcon icon={notificationsOutline} slot="start" />
              <IonLabel>Contact</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Content */}
      <IonPage id="home-content">
        <IonHeader>
          <IonToolbar color="primary">
            {/* Hamburger Menu Button */}
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}>
                <IonIcon icon={trophyOutline} />
              </IonMenuButton>
            </IonButtons>

            {/* Title */}
            <IonTitle>Home</IonTitle>

            {/* Dark Mode / Light Mode Toggle */}
            <IonButtons slot="end">
              <IonButton onClick={toggleDarkMode}>
                <IonIcon icon={isDarkMode ? sunny : moon} />
              </IonButton>
            </IonButtons>

            {/* Login Button */}
            <IonButtons slot="end">
              <IonButton onClick={handleLoginClick}>
                <IonIcon icon={logInOutline} slot="start" />
                Login
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Welcome Banner (Hero Section) */}
          <section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <IonImg
              src="https://media.istockphoto.com/id/641856978/photo/cricket-stadium.jpg?s=612x612&w=0&k=20&c=MEfasKgWKNwLqdxAlgewb1pbdvCpKUYagkPA9FC_Vrg="
              alt="Cricket Tournament Banner"
              style={{ borderRadius: '10px', marginBottom: '20px' }}
            />
            <IonText color="primary">
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to Cricket Tournaments!</h1>
            </IonText>
            <IonText>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>Organize & Join Cricket Tournaments Easily!</p>
            </IonText>
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="6">
                  <IonButton expand="full" color="primary" onClick={handleCreateTournament}>
                    <IonIcon icon={trophy} slot="start" />
                    Create Tournament
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton expand="full" color="secondary" onClick={handleJoinTournament}>
                    <IonIcon icon={peopleOutline} slot="start" />
                    Apply Tournament
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </section>

          {/* Upcoming & Ongoing Tournaments */}
          <section style={{ marginBottom: '40px' }}>
            <IonText color="primary">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <IonIcon icon={calendarOutline} style={{ marginRight: '10px' }} />
                Upcoming & Ongoing Tournaments
              </h2>
            </IonText>
            <IonGrid>
              <IonRow>
                {[1, 2, 3].map((tournament) => (
                  <IonCol size="12" size-md="6" size-lg="4" key={tournament}>
                    <IonCard style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <IonCardHeader>
                        <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          <IonIcon icon={trophyOutline} style={{ marginRight: '10px' }} />
                          Tournament {tournament}
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <p>
                          <IonIcon icon={calendarOutline} style={{ marginRight: '10px' }} />
                          Start Date: 2023-10-15
                        </p>
                        <p>
                          <IonIcon icon={locationOutline} style={{ marginRight: '10px' }} />
                          Location: Mumbai
                        </p>
                        <p>
                          <IonIcon icon={cashOutline} style={{ marginRight: '10px' }} />
                          Prize Pool: ₹50,000
                        </p>
                        <IonButton expand="block" onClick={handleViewAllTournaments}>
                          View Details
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </section>

          {/* Leaderboard & Stats */}
          <section style={{ marginBottom: '40px' }}>
            <IonText color="primary">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <IonIcon icon={statsChartOutline} style={{ marginRight: '10px' }} />
                Leaderboard & Stats
              </h2>
            </IonText>
            <IonList>
              {[1, 2, 3].map((player) => (
                <IonItem key={player} style={{ marginBottom: '10px' }}>
                  <IonThumbnail slot="start">
                    <IonImg
                      src="https://media.istockphoto.com/id/1354439687/vector/illustration-of-batsman-and-bowler-playing-cricket-championship-sports-with-trophy-on-blue.jpg?s=612x612&w=0&k=20&c=TZNvc0gHwsV8jrmLL-k26LfNYmuhF1J4lt0YRIWzsjY="
                      alt="Player"
                    />
                  </IonThumbnail>
                  <IonLabel>
                    <h3 style={{ fontWeight: 'bold' }}>
                      <IonIcon icon={personCircleOutline} style={{ marginRight: '10px' }} />
                      Player {player}
                    </h3>
                    <p style={{ color: '#666' }}>
                      <IonIcon icon={pulseOutline} style={{ marginRight: '10px' }} />
                      Runs: 500 | Wickets: 20 | Strike Rate: 150
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </section>

          {/* Live Matches & Scores (Optional) */}
          <section style={{ marginBottom: '40px' }}>
            <IonText color="primary">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <IonIcon icon={footballOutline} style={{ marginRight: '10px' }} />
                Live Matches & Scores
              </h2>
            </IonText>
            <IonCard style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <IonCardHeader>
                <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Match 1: Team A vs Team B
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Score: Team A - 120/3 (15 overs)</p>
                <p>Team B - 90/5 (12 overs)</p>
              </IonCardContent>
            </IonCard>
          </section>

          {/* Sponsors / Partners Section */}
          <section style={{ marginBottom: '40px' }}>
            <IonText color="primary">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <IonIcon icon={businessOutline} style={{ marginRight: '10px' }} />
                Our Sponsors
              </h2>
            </IonText>
            <IonGrid>
              <IonRow>
                {[1, 2, 3].map((sponsor) => (
                  <IonCol size="4" key={sponsor}>
                    <IonImg
                      src="https://media.istockphoto.com/id/1354439687/vector/illustration-of-batsman-and-bowler-playing-cricket-championship-sports-with-trophy-on-blue.jpg?s=612x612&w=0&k=20&c=TZNvc0gHwsV8jrmLL-k26LfNYmuhF1J4lt0YRIWzsjY="
                      alt={`Sponsor ${sponsor}`}
                      style={{ borderRadius: '10px' }}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </section>

          {/* Contact & Help Section */}
          <section style={{ marginBottom: '40px' }}>
            <IonText color="primary">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                <IonIcon icon={mailOutline} style={{ marginRight: '10px' }} />
                Contact & Help
              </h2>
            </IonText>
            <IonButton expand="block" color="medium" style={{ marginTop: '10px' }}>
              Contact Us
            </IonButton>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;