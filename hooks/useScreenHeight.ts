import { useState, useEffect } from 'react';

export const useScreenHeight = (): number => {
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
        setScreenHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenHeight;
};