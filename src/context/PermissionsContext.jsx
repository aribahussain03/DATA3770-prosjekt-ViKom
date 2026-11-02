import {
    createContext,
    useContext,
    useRef,
    useState,
} from 'react';

const PermissionsContext = createContext(null);

const permissionKeys = [
  'appointments',
  'medications',
  'homeCare',
];

function createPermissions() {
  return {
    appointments: 'none',
    medications: 'none',
    homeCare: 'none',
  };
}

export function PermissionsProvider({ children }) {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [people, setPeople] = useState([
    { id: 'mamma', name: 'Mamma' },
    { id: 'pappa', name: 'Pappa' },
  ]);

  const [selectedPersonId, setSelectedPersonId] = useState('mamma');

  const [permissionsByPerson, setPermissionsByPerson] = useState({
    mamma: createPermissions(),
    pappa: createPermissions(),
  });

  const nextPersonId = useRef(1);

  const selectedPerson =
    people.find((person) => person.id === selectedPersonId) ??
    people[0];

  const permissionStatuses =
    permissionsByPerson[selectedPerson.id] ?? createPermissions();

  const permissions = {
    appointments: permissionStatuses.appointments === 'granted',
    medications: permissionStatuses.medications === 'granted',
    homeCare: permissionStatuses.homeCare === 'granted',
  };

  function selectPerson(personId) {
    if (people.some((person) => person.id === personId)) {
      setSelectedPersonId(personId);
    }
  }

  function addPerson(name) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return null;
    }

    const existingPerson = people.find(
      (person) =>
        person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingPerson) {
      setSelectedPersonId(existingPerson.id);
      return existingPerson.id;
    }

    const personId = `person-${nextPersonId.current++}`;

    setPeople((current) => [
      ...current,
      { id: personId, name: trimmedName },
    ]);

    setPermissionsByPerson((current) => ({
      ...current,
      [personId]: createPermissions(),
    }));

    setSelectedPersonId(personId);

    return personId;
  }

  function removePerson(personId) {
    // Beholder minst én person i prototypen.
    if (people.length <= 1) {
      return;
    }

    const remainingPeople = people.filter(
      (person) => person.id !== personId
    );

    if (remainingPeople.length === people.length) {
      return;
    }

    setPeople(remainingPeople);

    setPermissionsByPerson((current) => {
      const updated = { ...current };
      delete updated[personId];
      return updated;
    });

    if (selectedPersonId === personId) {
      setSelectedPersonId(remainingPeople[0].id);
    }
  }

  // Simulerer godkjent tilgang etter sending fra profilen.
  function requestPermissions(personId, sections) {
    setPermissionsByPerson((current) => {
      if (!current[personId]) {
        return current;
      }

      const updatedPermissions = { ...current[personId] };

      sections.forEach((section) => {
        if (permissionKeys.includes(section)) {
          updatedPermissions[section] = 'granted';
        }
      });

      return {
        ...current,
        [personId]: updatedPermissions,
      };
    });
  }

  // Simulerer godkjent tilgang fra helseoversikten.
  function requestPermission(section) {
    requestPermissions(selectedPerson.id, [section]);
  }

  // Beholdes fordi profilskjermen bruker denne funksjonen.
  function simulateApproval(personId, sections) {
    requestPermissions(personId, sections);
  }

  return (
    <PermissionsContext.Provider
      value={{
        username,
        setUsername,
        profileImage,
        setProfileImage,
        people,
        selectedPerson,
        selectedPersonId,
        selectPerson,
        addPerson,
        removePerson,
        permissions,
        permissionStatuses,
        permissionsByPerson,
        requestPermission,
        requestPermissions,
        simulateApproval,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);

  if (!context) {
    throw new Error(
      'usePermissions must be used within PermissionsProvider'
    );
  }

  return context;
}