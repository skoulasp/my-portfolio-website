import { useEffect, useState, useCallback } from "react";

function useResponsiveIntersectionObserver(refs, setActiveSection, delayRef) {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
            setViewportHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const calculateThreshold = useCallback(
        (ref) => {
            if (ref?.current) {
                const sectionHeight = ref.current.offsetHeight;

                if (viewportHeight <= 700) {
                    if (sectionHeight <= 800) return 0.5;
                    if (sectionHeight <= 1000) return 0.4;
                    if (sectionHeight <= 1600) return 0.3;
                    if (sectionHeight <= 3000) return 0.2;
                    return sectionHeight > 6000 ? 0.05 : 0.1;
                }

                if (viewportWidth <= 400) {
                    if (sectionHeight <= 1300) return 0.5;
                    if (sectionHeight <= 2000) return 0.4;
                    if (sectionHeight <= 3000) return 0.2;
                    return sectionHeight > 6000 ? 0.05 : 0.1;
                }

                if (viewportWidth <= 600) {
                    if (sectionHeight <= 1600) return 0.4;
                    if (sectionHeight <= 2500) return 0.3;
                    if (sectionHeight <= 3000) return 0.2;
                    return sectionHeight > 6000 ? 0.05 : 0.2;
                }

                if (viewportWidth <= 1200) {
                    if (sectionHeight <= 1300) return 0.5;
                    if (sectionHeight <= 1600) return 0.4;
                    if (sectionHeight <= 2100) return 0.3;
                    if (sectionHeight <= 3000) return 0.2;
                    return sectionHeight > 6000 ? 0.08 : 0.1;
                }

                if (sectionHeight > 1200) {
                    if (sectionHeight <= 1200) return 0.5;
                    if (sectionHeight <= 2000) return 0.4;
                    return 0.1;
                }
            }
            return 0.5;
        },
        [viewportWidth, viewportHeight]
    );

    const calculateRootMargin = useCallback(() => {
        if (viewportHeight <= 700) return "0px 0px -5% 0px";

        if (viewportWidth <= 400) return "0px 0px -5% 0px";
        if (viewportWidth <= 600) return "0px 0px -10% 0px";
        if (viewportWidth <= 1200) return "0px 0px -15% 0px";
        return "0px 0px -20% 0px";
    }, [viewportWidth, viewportHeight]);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const activeSectionId = entry.target.id || entry.target.classList[0];
                    setActiveSection(activeSectionId);
                    if (!delayRef.current) {
                        const url = new URL(window.location.href);
                        url.hash = activeSectionId;
                        window.history.pushState({}, "", url);
                    }
                }
            });
        };

        const refsArray = Array.isArray(refs) ? refs : [refs];
        const observers = refsArray.map((ref) => {
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                rootMargin: calculateRootMargin(),
                threshold: calculateThreshold(ref),
            });

            if (ref.current) observer.observe(ref.current);
            return observer;
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [delayRef, refs, setActiveSection, viewportWidth, viewportHeight, calculateRootMargin, calculateThreshold]);
}

export default useResponsiveIntersectionObserver;
