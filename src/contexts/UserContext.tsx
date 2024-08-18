// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the user object
export interface User {
   email: string;
   username?: string;
}

// Define the type for the context value
interface UserContextType {
   user: User | null;
   setUserData: (userData: User | null) => void;
}

// Create UserContext with default values
const UserContext = createContext<UserContextType>({
   user: null,
   setUserData: () => {},
});

// Define the props for UserProvider
interface UserProviderProps {
   initialUser?: User | null;
   children: ReactNode;
}

// Define the UserProvider component
export function UserProvider({
   initialUser = null,
   children,
}: UserProviderProps) {
   const [user, setUser] = useState<User | null>(initialUser);

   // Function to update user data
   const setUserData = (userData: User | null) => {
      setUser(userData);
   };

   return (
      <UserContext.Provider value={{ user, setUserData }}>
         {children}
      </UserContext.Provider>
   );
}

// Custom hook for using user context
export const useUser = () => useContext(UserContext);
