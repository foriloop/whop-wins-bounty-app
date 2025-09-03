import { whopSdk } from './whop-sdk';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AppUser } from './types';

export async function authenticateUser(accessToken: string): Promise<AppUser> {
	try {
		// Validate the access token and get user data from Whop
		const userData = await whopSdk.withUser(accessToken).users.getCurrentUser();
		// The SDK returns a viewer object: { user: { id, username, ... } }
		const whopUser = userData?.user;
		if (!whopUser?.id) {
			throw new Error('Invalid user data received from Whop');
		}

		// Get or create user in our database
		const userRef = doc(db, 'users', whopUser.id);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			// Update existing user with latest data from Whop
			const existingUserData = userSnap.data() as AppUser;
			const updatedFields = {
				updatedAt: Date.now(),
				username: whopUser.username || existingUserData.username || `User${whopUser.id.slice(-4)}`
			};
			
			await updateDoc(userRef, updatedFields);
			
			// Return updated user data
			return {
				...existingUserData,
				...updatedFields
			};
		} else {
			// Create new user with data from Whop
			const newUser: AppUser = {
<<<<<<< HEAD
				userId: userData.user.id,
				username: userData.user.username || `User${userData.user.id.slice(-4)}`,
=======
				userId: whopUser.id,
				username: whopUser.username || `User${whopUser.id.slice(-4)}`,
>>>>>>> e6917df (fix: update Whop SDK method calls and user data handling)
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
		
		// Provide specific error messages for different failure types
		if (error instanceof Error) {
			if (error.message.includes('401') || error.message.includes('Unauthorized')) {
				throw new Error('Invalid or expired access token');
			} else if (error.message.includes('403') || error.message.includes('Forbidden')) {
				throw new Error('Access denied - insufficient permissions');
			} else if (error.message.includes('404') || error.message.includes('Not Found')) {
				throw new Error('User not found in Whop system');
			} else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
				throw new Error('Whop service temporarily unavailable');
			} else {
				throw new Error(`Authentication failed: ${error.message}`);
			}
		}
		
		throw new Error('Authentication failed - unknown error');
	}
}
