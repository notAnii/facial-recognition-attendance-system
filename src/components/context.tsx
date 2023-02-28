'use client'
import React, { createContext, useState } from 'react'

type Props = {}

type WeekContextType = {
    weekNumber: number,
    setWeekNumber(value: number): void,
    subjectCodeNumber: string,
    setSubjectCodeNumber(value: string): void,
    sessionNumberCon: number,
    setSessionNumberConNumber(value: number): void
}
  
  export const WeekContext = createContext<WeekContextType>({
    weekNumber: 1, setWeekNumber: () => {},
    subjectCodeNumber: "", setSubjectCodeNumber: () => {},
    sessionNumberCon: 1, setSessionNumberConNumber: () => {}});

const Context = ({children}: any) => {
    
    const [weekNumber, setWeekNumber] = useState<number>(1);
    const [subjectCodeNumber, setSubjectCodeNumber] = useState<string>("");
    const [sessionNumberCon, setSessionNumberConNumber] = useState<number>(0);
    
    return (
    <WeekContext.Provider 
    value={{
        weekNumber, setWeekNumber, 
        subjectCodeNumber, setSubjectCodeNumber, 
        sessionNumberCon, setSessionNumberConNumber}}>
        {children}
    </WeekContext.Provider>
    )
}

export default Context