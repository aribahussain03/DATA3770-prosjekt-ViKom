export const healthDataByPerson = {
  mamma: {
    appointments: [
      {
        id: 'mamma-appointment-1',
        text: 'Besøk av hjemmetjenesten i dag kl. 13.00.',
      },
      {
        id: 'mamma-appointment-2',
        text: 'Time hos fysioterapeut i morgen kl. 10.00.',
      },
    ],
    medications: [
      {
        id: 'mamma-medication-1',
        time: 'Kl. 08.00',
        name: 'Eksempelmedisin A',
        details: 'Eksempeldata for Mamma.',
      },
      {
        id: 'mamma-medication-2',
        time: 'Kl. 16.00',
        name: 'Eksempelmedisin B',
        details: 'Eksempeldata for Mamma.',
      },
    ],
  },
  pappa: {
    appointments: [
      {
        id: 'pappa-appointment-1',
        text: 'Time hos fastlegen i morgen kl. 09.30.',
      },
      {
        id: 'pappa-appointment-2',
        text: 'Besøk av hjemmetjenesten fredag kl. 12.00.',
      },
    ],
    medications: [
      {
        id: 'pappa-medication-1',
        time: 'Kl. 09.00',
        name: 'Eksempelmedisin C',
        details: 'Eksempeldata for Pappa.',
      },
    ],
  },
};

// Beholder eksportene som de eksisterende skjermene bruker.
export const mockAppointments =
  healthDataByPerson.mamma.appointments;

export const mockMedications =
  healthDataByPerson.mamma.medications;