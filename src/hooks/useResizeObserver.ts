import { MutableRefObject, useEffect, useRef } from "react";

const useResizeObserver = (callback: (react: DOMRectReadOnly) => void): MutableRefObject<HTMLDivElement | null> => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                callback(entry.contentRect);
            }
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [callback]);
    return ref;
};

export default useResizeObserver;