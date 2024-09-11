import { useEffect, useState, useRef } from "react";
import MobileDetect from "mobile-detect";

function useFixedHeader(headerRef) {
    const [isFixed, setIsFixed] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
    const [isTablet, setIsTablet] = useState(false);
    const [isFixedPermanent, setIsFixedPermanent] = useState(false);
    const [isSlidingIn, setIsSlidingIn] = useState(false);
    const hideTimeoutRef = useRef(null);
    const removeTimeoutRef = useRef(null);
    const cancelTimeoutRef = useRef(null);
    const idleTimeoutRef = useRef(null);
    const inactiveTimeoutRef = useRef(null);
    const isFixedActive = isFixedPermanent || isMobile || isTablet;

    useEffect(() => {
        const md = new MobileDetect(window.navigator.userAgent);
        setIsTablet(!!md.tablet());
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 720);
            if (window.innerWidth <= 720) {
                setIsFixedPermanent(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsFixed(isMobile || isTablet);
        setIsHiding(false);
        headerRef.current.classList.remove("slideOut");
        clearTimeout(hideTimeoutRef.current);
        clearTimeout(removeTimeoutRef.current);
        clearTimeout(cancelTimeoutRef.current);
        clearTimeout(idleTimeoutRef.current);
    }, [headerRef, isMobile, isTablet]);

    useEffect(() => {
        let hiding = false;
        let cursorWithinHeader = false;
        const startIdleTimeout = () => {
            if (isFixedPermanent && !hiding) return;
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(() => {
                hideHeader();
            }, 10);
        };

        const handleVisibilityChange = () => {
            if (isFixedPermanent || scrollY < 100 || isMobile || isTablet) return;
            if (
                document.visibilityState === "hidden" &&
                isHiding &&
                isFixed &&
                !isFixedPermanent &&
                scrollY >= 100 &&
                !isMobile &&
                !isTablet
            ) {
                setIsFixed(false);
            }

            if (document.visibilityState === "visible" && isFixed && !isFixedPermanent && scrollY >= 100 && !isMobile && !isTablet) {
                clearTimeout(inactiveTimeoutRef.current);
                cancelHideHeader();
                clearTimeouts();
            }
        };

        const clearTimeouts = () => {
            clearTimeout(hideTimeoutRef.current);
            clearTimeout(removeTimeoutRef.current);
            clearTimeout(cancelTimeoutRef.current);
            clearTimeout(idleTimeoutRef.current);
        };
        clearTimeouts();

        const handleMouseEnter = () => {
            if (isFixedPermanent || isMobile || isTablet) return;
            if (!headerRef.current.classList.contains("fixed")) return;
            clearTimeouts();
            if (headerRef.current.classList.contains("fixed") && headerRef.current.classList.contains("slideOut") && hiding) {
                cancelHideHeader();
            }
        };

        const showHeader = () => {
            if (isFixedPermanent || isMobile || isTablet || isFixed || hiding) return;
            clearTimeouts();
            setIsSlidingIn(true);
            setIsFixed(true);
        };

        const hideHeader = () => {
            if (isFixedPermanent || isMobile || isTablet || hiding) return;
            if (scrollY >= 100) {
                hiding = true;

                hideTimeoutRef.current = setTimeout(() => {
                    setIsHiding(true);
                }, 1000);
                removeTimeoutRef.current = setTimeout(() => {
                    setIsFixed(false);
                    hiding = false;

                    setIsHiding(false);
                }, 2000);
            } else {
                setIsFixed(false);

                hiding = false;
                setIsHiding(false);
            }
        };

        const cancelHideHeader = (cursorWithinHeader = true) => {
            if (isFixedPermanent || isMobile || isTablet) return;
            hiding = false;
            setIsHiding(false);
            setIsFixed(true);

            if (scrollY < 100) {
                if (!cursorWithinHeader) {
                    setIsFixed(false);
                }
                headerRef.current.classList.remove("slideOut");
            }
        };

        const handleMouseLeave = () => {
            if (!isFixedPermanent && isFixed && !isMobile && !isTablet && window.scrollY < 100) {
                setIsFixed(false);
            }
            clearTimeouts();
            hiding = false;
            hideHeader();
        };

        const handleHeaderClick = (e) => {
            if (e.target.closest("ul, .logo") || isMobile || isTablet) return;
            if (!isFixedPermanent) {
                setIsFixedPermanent((prevIsFixedPermanent) => {
                    if (!prevIsFixedPermanent) {
                        setIsFixed(true);
                    }

                    return !prevIsFixedPermanent;
                });
                if (!isFixedPermanent && window.scrollY < 100) {
                    setIsFixed(true);
                }
            } else {
                setIsFixedPermanent(false);
                if (window.scrollY < 100) {
                    if (e.target.closest("header")) {
                        setIsFixed(true);
                    } else {
                        setIsFixed(false);
                    }

                    clearTimeout(hideTimeoutRef.current);
                }
            }
        };

        const handleMouseMove = (event) => {
            cursorWithinHeader = event.target.closest("header");
            if (isFixedPermanent || isMobile || isTablet || hiding) return;
            const scrollY = window.scrollY;
            const mouseY = event.clientY;
            const mouseX = event.clientX;
            const windowWidth = window.innerWidth;
            const distanceFromRightEdge = windowWidth - mouseX;
            const isNearRightEdge = distanceFromRightEdge <= 200;

            if (scrollY >= 100) {
                if (mouseY <= 100 && !isFixed && !hiding && !isNearRightEdge) {
                    showHeader();
                }
            } else {
                if (!isFixedPermanent && !isMobile && !isTablet && headerRef.current && event.target.closest("header")) {
                    setIsFixed(true);
                }
            }

            if (isFixed && scrollY >= 100 && !isMobile && !isTablet && !cursorWithinHeader && !isFixedPermanent) {
                startIdleTimeout();
            }
        };

        const handleScroll = () => {
            if (!isFixedPermanent && !isMobile && !isTablet && window.scrollY < 1) {
                cancelHideHeader(cursorWithinHeader);
                clearTimeouts();
            }
        };

        if (headerRef.current) {
            headerRef.current.addEventListener("mouseenter", handleMouseEnter);
            headerRef.current.addEventListener("mouseleave", handleMouseLeave);
            headerRef.current.addEventListener("click", handleHeaderClick);
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            if (headerRef.current) {
                headerRef.current.removeEventListener("mouseenter", handleMouseEnter);
                headerRef.current.removeEventListener("mouseleave", handleMouseLeave);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                headerRef.current.removeEventListener("click", handleHeaderClick);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerRef, isFixed, isFixedPermanent, isMobile]);

    return { isFixed, setIsFixed, isFixedPermanent, isSlidingIn, setIsSlidingIn, isHiding, isFixedActive };
}

export default useFixedHeader;
