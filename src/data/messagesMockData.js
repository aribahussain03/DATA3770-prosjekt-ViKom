export const mockConversations = [
  {
    id: '2',
    name: 'Pappa',
    lastMessage: 'Moren din maser om at du skal svare på meldingene hennes.',
    time: '14.30',
    picture: require('../../assets/images/avatars/pappa.png'),
  },
  {
    id: '1',
    name: 'Mamma',
    lastMessage: 'Hei. Hvordan går det?',
    time: '13.45',
    picture: require('../../assets/images/avatars/mamma.png'),
  },
];

export const mockMessages = [
  {
    id: '1',
    conversationId: '1',
    sender: 'them',
    text: 'Hei, hvordan går det?',
    time: '13.30',
  },
  {
    id: '2',
    conversationId: '1',
    sender: 'me',
    text: 'Hei mamma. Det går bra.',
    time: '13.35',
  },
  {
    id: '3',
    conversationId: '1',
    sender: 'them',
    text: 'Så fint å høre.',
    time: '13.40',
  },
  {
    id: '4',
    conversationId: '1',
    sender: 'them',
    text: 'Kommer du i dag?',
    time: '13.42',
  },
  {
    id: '5',
    conversationId: '1',
    sender: 'me',
    text: 'Jeg kommer kl 16.',
    time: '13.45',
  },
  {
    id: '6',
    conversationId: '2',
    sender: 'them',
    text: 'Moren din maser om at du skal svare på meldingene hennes.',
    time: '14.30',
  },
];
