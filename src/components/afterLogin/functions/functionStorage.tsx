import { Text, } from '@chakra-ui/react'
import { useState } from 'react';

type Props = {}

export function intToChar(valToConvert: number) {
    return JSON.stringify(valToConvert);
}

export function charToInt(valToConvert: string) {
    return JSON.parse(valToConvert);
}

export function displayWeek() {
    if (typeof window !== 'undefined') {
        var week = parseInt(window.sessionStorage.getItem("storedWeek") || "1");
        console.log("i am week before if statement " + week)
        var weekMessage;
        if (week <= 10 && week > 0){
            console.log("is this work");
            weekMessage = <Text textAlign={"center"} paddingLeft={1} paddingRight={1}>Week {week}</Text>;
        }
        else if (week <= 0){
            window.sessionStorage.setItem("storedWeek", "1")
            console.log("aaaaaaaaaaaaaaaa ");
        }
        else{
            window.sessionStorage.setItem("storedWeek", "10")        
            console.log("bbbbbbbbbbbbbbbbbbbbb ");
        }
        return weekMessage;
    }
}

export function incrementWeek() {
        if (typeof window !== 'undefined') {
            var week = parseInt(window.sessionStorage.getItem("storedWeek") || "1");
        if (week <= 10 && week > 0 && week + 1 <= 10){
            week = week + 1;
            window.sessionStorage.setItem("storedWeek", intToChar(week))
            console.log("cccccccccccccccccccccccccc " + week);
            displayWeek();
        }
    }
}

export function decrementWeek() {
    if (typeof window !== 'undefined') {
        let week = parseInt(window.sessionStorage.getItem("storedWeek") || "1");
        if (week <= 10 && week > 0 && week - 1 >= 1){
            week = week - 1;
            window.sessionStorage.setItem("storedWeek", intToChar(week))
            console.log("eeeeeeeeeeeeeeeeeeeee " + week);
            displayWeek();
        }
    } 
}