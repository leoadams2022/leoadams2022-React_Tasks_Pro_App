import React, { useContext, createContext, useState, useEffect } from 'react';

const LocalStorageContext = createContext();


const LocalStorageProvider = ({ children }) => {
    const [data, setData] = useState([{ Tasks: [] }, { Groups: [{ id: 888, title: "General", color: "#6074F9" }] }]);

    // Function to save data to local storage
    const saveToLocalStorage = (data) => {
        localStorage.setItem('myData', JSON.stringify(data));
        setData(data)
    };

    // Function to retrieve data from local storage
    const getFromLocalStorage = () => {
        return new Promise((resolve) => {
            const storedData = localStorage.getItem('myData');
            const parsedData = storedData ? JSON.parse(storedData) : [{ Tasks: [] }, { Groups: [{ id: 888, title: "General", color: "#6074F9" }] }];
            resolve(parsedData);
        });
    };

    // Load data from local storage on component mount
    useEffect(() => {
        getFromLocalStorage().then((parsedData) => setData(parsedData));
        // console.log('data', data)
    }, []);

    return (
        <LocalStorageContext.Provider
            value={{
                data,
                saveToLocalStorage,
            }}
        >
            {children}
        </LocalStorageContext.Provider>
    );
};
const useLocalStorage = () => {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error('useLocalStorage must be used within a LocalStorageProvider');
    }
    return context;
};

export { LocalStorageProvider, useLocalStorage };
export default LocalStorageContext;