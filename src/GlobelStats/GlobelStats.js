import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../Auth/context/authContext/Index";
import { getDatabase, ref, get } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";

const GlobalStatsContext = createContext();

export const useGlobalStats = () => useContext(GlobalStatsContext);

export const ContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(false)
  const [matchedUser, setMatchedUser] = useState([])


  const db = getDatabase();

  const fetchUserData = async () => {
    if (currentUser) {
      setIsLoading(true);
      const uid = currentUser.uid;
      const userRef = ref(db, `users/${uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          console.log('UserData:', snapshot.val());
        } else {
          console.log("No user data found.");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No user is logged in.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount or when currentUser changes
  }, [currentUser, fetchData, userData]);

  useEffect(() => {
    if (userData) {
      // Ideally, implement server-side filtering using Firebase queries if possible
      fetchMatchedUsers(); // Fetch matched users only when userData is updated and not null
    }
  }, [userData, fetchData]);

  const bloodCompatibility = {
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'O-': ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    'A+': ['A+', 'AB+'],
    'A-': ['A+', 'A-', 'AB+', 'AB-'],
    'B+': ['B+', 'AB+'],
    'B-': ['B+', 'B-', 'AB+', 'AB-'],
    'AB+': ['AB+'],
    'AB-': ['AB+', 'AB-']
  };
  
  const fetchMatchedUsers = () => {
    if (!userData) return;
  
    const usersRef = ref(db, 'users/');
    const matchedUsersQuery = query(usersRef,
      orderByChild('country'),
      equalTo(userData.country)
    );
  
    get(matchedUsersQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const filteredUsers = Object.keys(users).filter(key => {
          const user = users[key];
          // Checking if the current user can donate to the matched user
          const canDonate = bloodCompatibility[userData.bloodType]?.includes(user.donorBloodGroup);
          // Checking if the matched user can donate to the current user
          const canReceive = bloodCompatibility[user.bloodType]?.includes(userData.donorBloodGroup);
          return canDonate && canReceive;
        }).map(key => users[key]);
        setMatchedUser(filteredUsers);
        console.log("Matched users:", filteredUsers);
      } else {
        console.log("No data available");
        setMatchedUser([]);
      }
    }).catch((error) => {
      console.error("Error fetching matched users:", error);
      setError(error);
    });
  };
  

  return (
    <GlobalStatsContext.Provider value={{
      activeStep,
      setActiveStep,
      userData,
      matchedUser,
      isLoading,
      bloodCompatibility,
      error,
      fetchData,
      setFetchData
    }}>
      {children}
    </GlobalStatsContext.Provider>
  );
};

export default ContextProvider;
