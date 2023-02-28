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
    dayNumber: string,
    setDayNumber(value: string): void,
    startTimeNumber: string,
    setStartTimeNumber(value: string): void
    endTimeNumber: string,
    setEndTimeNumber(value: string): void
}
  
  export const WeekContext = createContext<WeekContextType>({
    weekNumber: 1, setWeekNumber: () => {},
    subjectCodeNumber: "", setSubjectCodeNumber: () => {},
    sessionNumberCon: 1, setSessionNumberConNumber: () => {},
    dayNumber: "", setDayNumber: () => {},
    startTimeNumber: "", setStartTimeNumber: () => {},
    endTimeNumber: "", setEndTimeNumber: () => {}});

const Context = ({children}: any) => {
    
    const [weekNumber, setWeekNumber] = useState<number>(1);
    const [subjectCodeNumber, setSubjectCodeNumber] = useState<string>("");
    const [sessionNumberCon, setSessionNumberConNumber] = useState<number>(0);
    const [dayNumber, setDayNumber] = useState<string>("");
    const [startTimeNumber, setStartTimeNumber] = useState<string>("");
    const [endTimeNumber, setEndTimeNumber] = useState<string>("");
    
    return (
    <WeekContext.Provider 
    value={{
        weekNumber, setWeekNumber, 
        subjectCodeNumber, setSubjectCodeNumber, 
        sessionNumberCon, setSessionNumberConNumber,
        dayNumber, setDayNumber,
        startTimeNumber, setStartTimeNumber,
        endTimeNumber, setEndTimeNumber}}>
        {children}
    </WeekContext.Provider>
    )
}

export default Context