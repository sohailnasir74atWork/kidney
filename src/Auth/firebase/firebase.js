// Firebase imports
import { auth, database } from "./auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  deleteUser
} from "firebase/auth";






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




