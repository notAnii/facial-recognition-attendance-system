'use client'
import React, { createContext, useState } from 'react'

type Props = {}

type WeekContextType = {
    weekNumber: number,
    setWeekNumber(value: number): void
  }
  
  export const WeekContext = createContext<WeekContextType>({weekNumber: 1, setWeekNumber: () => {}});

const Context = ({children}: any) => {
    const [weekNumber, setWeekNumber] = useState<number>(1);
    return (
    <WeekContext.Provider value={{weekNumber, setWeekNumber}}>
        {children}
    </WeekContext.Provider>
    )
}

export default Context