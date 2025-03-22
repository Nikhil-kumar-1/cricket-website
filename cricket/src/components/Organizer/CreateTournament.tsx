import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonDatetime,
  IonTextarea,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { calendarOutline, trophyOutline, peopleOutline, cashOutline, addOutline } from 'ionicons/icons';

const CreateTournament: React.FC = () => {
  const history = useHistory();
  const [tournamentName, setTournamentName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [prizePool, setPrizePool] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleAddMember = () => {
    if (newMember.trim() === '') {
      setAlertMessage('Please enter a valid team member name.');
      setShowAlert(true);
      return;
    }
    setTeamMembers([...teamMembers, newMember]);
    setNewMember('');
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleCreateTournament = async () => {
    if (!tournamentName || !startDate || !endDate || !prizePool || teamMembers.length === 0) {
      setAlertMessage('Please fill all fields and add at least one team member.');
      setShowAlert(true);
      return;
    }

    const tournamentData = {
      name: tournamentName,
      startDate,
      endDate,
      prizePool,
      teamMembers,
    };

    try {
      const response = await fetch('http://localhost:5000/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        history.push('/tournaments'); // Redirect to tournaments list page
      } else {
        setAlertMessage('Failed to create tournament. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Create Tournament</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Tournament Name */}
        <IonItem>
          <IonLabel position="stacked">Tournament Name</IonLabel>
          <IonInput
            value={tournamentName}
            onIonChange={(e) => setTournamentName(e.detail.value!)}
            placeholder="Enter tournament name"
          />
        </IonItem>

        {/* Start Date */}
        <IonItem>
  <IonLabel position="stacked">Start Date</IonLabel>
  <IonDatetime
    presentation="date-time"
    value={startDate}
    onIonChange={(e) => setStartDate(e.detail.value?.toString() || '')}
  />
</IonItem>

<IonItem>
  <IonLabel position="stacked">End Date</IonLabel>
  <IonDatetime
    presentation="date-time"
    value={endDate}
    onIonChange={(e) => setEndDate(e.detail.value?.toString() || '')}
  />
</IonItem>


        {/* Prize Pool */}
        <IonItem>
          <IonLabel position="stacked">Prize Pool</IonLabel>
          <IonInput
            type="number"
            value={prizePool}
            onIonChange={(e) => setPrizePool(e.detail.value!)}
            placeholder="Enter prize pool amount"
          />
        </IonItem>

        {/* Team Members */}
        <IonItem>
          <IonLabel position="stacked">Add Team Members</IonLabel>
          <IonInput
            value={newMember}
            onIonChange={(e) => setNewMember(e.detail.value!)}
            placeholder="Enter team member name"
          />
          <IonButton slot="end" onClick={handleAddMember}>
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonItem>

        {/* Team Members List */}
        <IonList>
          {teamMembers.map((member, index) => (
            <IonItem key={index}>
              <IonLabel>{member}</IonLabel>
              <IonButton color="danger" onClick={() => handleRemoveMember(index)}>
                Remove
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Create Tournament Button */}
        <IonButton expand="block" onClick={handleCreateTournament}>
          Create Tournament
        </IonButton>

        {/* Alert for Errors */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateTournament;