import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../Auth/context/authContext/Index";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, query, get } from "firebase/database";

const GlobalStatsContext = createContext();

export const useGlobalStats = () => useContext(GlobalStatsContext);

export const ContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState(null); // State to hold user data
  const [verifiedUser, setVerifiedUser] = useState(false); // State to indicate if user is verified
  const [started, setStarted] = useState(false)
  const [fetchData, setFetchData] = useState(false)

  const db = getDatabase();
  const usersRef = ref(db, 'users/');
  const fetchUserData = async () => {
    if (currentUser) {
      const uid = currentUser.uid;
      const dbRef = ref(db, "users/" + uid);
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserData(userData); // Update user data state
          console.log('userfata',userData)
        } else {
          console.log("No user data found.");
          setUserData(null); // Reset user data state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null); // Reset user data state on error
      }
    } else {
      console.log("No user is logged in.");
      setUserData(null); // Reset user data state if no user is logged in
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount or when currentUser changes
  }, [currentUser, fetchData]);

   
  get(usersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const filteredUsers = Object.keys(users).filter(key => {
        const user = users[key];
        return user.bloodType === "O+" && user.donorBloodGroup === "B+";
      }).map(key => users[key]);
      
      console.log("Matched users:", filteredUsers);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return (
    <GlobalStatsContext.Provider
      value={{
        activeStep,
        userData,
        verifiedUser,
        setActiveStep,
        started,
        setStarted,
        setFetchData,
        fetchData
        // Additional values can be added here as needed
      }}
    >
      {children}
    </GlobalStatsContext.Provider>
  );
};

export default ContextProvider;
