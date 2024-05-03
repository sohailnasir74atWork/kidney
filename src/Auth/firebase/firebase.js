// Firebase imports
import { auth, database } from "./auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  deleteUser
} from "firebase/auth";


export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Additional steps to save or update the user's data in your database
    console.log("Google sign-in successful");
    return result.user;
  } catch (error) {
    console.error("Error with Google sign-in: ", error);
    throw error;
  }
};

// Function to sign out
export const doSignOut = () => {
  return signOut(auth);
};




export const doUpdateProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;
  try {
    // console.log(displayName)
    await updateProfile(user, { displayName, photoURL });
  //  console.log(user)
    console.log('Profile updated successfully.');
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};




