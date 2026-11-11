import { useSyncExternalStore } from 'react';

import { mockConversations, mockMessages } from '../../data/messagesMockData';

// Felles lager for samtaler og meldinger mens appen er åpen.
// Alt nullstilles når appen lastes på nytt, siden vi ikke har backend.
let state = {
  conversations: mockConversations,
  messages: mockMessages,
};

const listeners = new Set();
let nextId = 1;

function setState(nextState) {
  state = nextState;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Skjermene oppdateres automatisk når lageret endres.
export function useMessagesStore() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

// Klokkeslett på norsk form, for eksempel 14.30.
function currentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}.${minutes}`;
}

// Legger til meldingen og flytter samtalen øverst med ny forhåndsvisning.
export function sendMessage(conversation, text) {
  const time = currentTime();

  const message = {
    // «new-» hindrer at id-en kolliderer med testdataene.
    id: `new-${nextId++}`,
    conversationId: conversation.id,
    sender: 'me',
    text,
    time,
  };

  const existing = state.conversations.find((item) => item.id === conversation.id);
  const updatedConversation = { ...(existing ?? conversation), lastMessage: text, time };

  setState({
    conversations: [
      updatedConversation,
      ...state.conversations.filter((item) => item.id !== conversation.id),
    ],
    messages: [...state.messages, message],
  });
}

export function deleteConversation(conversationId) {
  setState({
    conversations: state.conversations.filter((item) => item.id !== conversationId),
    messages: state.messages.filter((message) => message.conversationId !== conversationId),
  });
}
