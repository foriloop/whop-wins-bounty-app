import { whopSdk } from './whop-sdk';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AppUser } from './types';

export async function authenticateUser(accessToken: string): Promise<AppUser> {
	try {
		// Verify the token with Whop
		const userData = await whopSdk.withUser(accessToken).retrieveCurrentUser();
		
		if (!userData) {
			throw new Error('Failed to retrieve user data from Whop');
		}

		// Get or create user in our database
		const userRef = doc(db, 'users', userData.id);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			// Update existing user
			const existingUserData = userSnap.data() as AppUser;
			await updateDoc(userRef, {
				updatedAt: Date.now(),
				username: userData.username || existingUserData.username || `User${userData.id.slice(-4)}`
			});
			
			// Return updated user data
			return {
				...existingUserData,
				username: userData.username || existingUserData.username || `User${userData.id.slice(-4)}`,
				updatedAt: Date.now()
			};
		} else {
			// Create new user
			const newUser: AppUser = {
				userId: userData.id,
				username: userData.username || `User${userData.id.slice(-4)}`,
				role: 'member',
				points: 0,
				badge: 'Initiate',
				createdAt: Date.now(),
				updatedAt: Date.now()
			};

			await setDoc(userRef, newUser);
			return newUser;
		}
	} catch (error) {
		console.error('Authentication error:', error);
		if (error instanceof Error) {
			throw new Error(`Authentication failed: ${error.message}`);
		}
		throw new Error('Authentication failed');
	}
}
