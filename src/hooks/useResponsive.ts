import React, { useEffect, useState } from "react";

interface ResponsiveBreakpoints {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const useResponsive = (): ResponsiveBreakpoints => {
    const [responsive, setResponsive] = useState<ResponsiveBreakpoints>({
        isMobile: false,
        isTablet: false,
        isDesktop: false
    });
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setResponsive({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        }
        // Call the function initially
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);

    }, []);
    return responsive;
}
export default useResponsive;