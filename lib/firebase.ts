import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	// Optional
	...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
		? { measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID }
		: {}),
	...(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
		? { storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }
		: {}),
} as const;

function createFirebaseApp(): FirebaseApp {
	return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseApp: FirebaseApp = createFirebaseApp();
export const db: Firestore = getFirestore(firebaseApp);



