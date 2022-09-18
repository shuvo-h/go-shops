import React, { useState } from 'react';
import { useEffect } from 'react';

const useDebounce = (delay=500) => {
    const [unDebouncedValue, setUnDebouncedValue] = useState(null);
    const [debouncedValue, setDebouncedValue] = useState(unDebouncedValue);
    
    useEffect(()=>{
        // change debounce value after a delay
        const debounceTimmer = setTimeout(()=>{
            setDebouncedValue(unDebouncedValue);
        },delay);

        // cleanup useEffect
        return()=>{
            clearTimeout(debounceTimmer);
        }
    },[unDebouncedValue,delay])

    return {
        debouncedValue,
        setUnDebouncedValue
    };
};

export default useDebounce;