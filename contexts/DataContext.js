import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext({
})

export const useAuth = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [postId, setPostId] = useState("");

    const value = {
        isOpen,
        postId,
        setPostId,
        setIsOpen
    }
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}