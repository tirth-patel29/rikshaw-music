import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, onDisconnect, set, remove } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceMe",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-domain.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://dummy-domain-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-project-id.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

let app: FirebaseApp | undefined;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.error("Firebase init failed:", e);
}

export const subscribeToPresence = (onCountUpdate: (count: number) => void) => {
  if (!app) return () => {};

  const db = getDatabase(app);
  const auth = getAuth(app);
  let userRef: any = null;

  signInAnonymously(auth).then(() => {
    const connectionsRef = ref(db, 'presence');
    const connectedRef = ref(db, '.info/connected');

    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)!
        userRef = push(connectionsRef);

        // When I disconnect, remove this device
        onDisconnect(userRef).remove().then(() => {
          set(userRef, true);
        });
      }
    });

    onValue(connectionsRef, (snap) => {
      const val = snap.val();
      onCountUpdate(val ? Object.keys(val).length : 0);
    });
  }).catch(e => {
    console.error("Anonymous auth failed (check config/rules):", e);
    onCountUpdate(1); // Fallback to 1 if not configured
  });

  return () => {
    if (userRef) {
      remove(userRef);
    }
  };
};
