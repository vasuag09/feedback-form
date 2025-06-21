import { useState } from "react";

export default function useInput(initalValue){
    const [value, setValue] = useState(initalValue)
    function onChange(e){
        setValue(e.target.value)
    }
    function reset(){
        setValue("")
    }
    return {
        value,
        onChange,
        reset
    }
}