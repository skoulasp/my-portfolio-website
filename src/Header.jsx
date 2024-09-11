import { useState, useEffect, useContext, useRef, useMemo, useCallback } from "react";
import { LanguageContext } from "./App";
import useFixedHeader from "./useFixedHeader";
import { HashLink } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/img/logo.png";

function Header({ lang, setLang, activeSection, setActiveSection, introAnimationsActive, delayRef, setIsInitialLoad, hashRef }) {
    const [isMobileNavActive, setIsMobileNavActive] = useState(false);
    const [isNavbarSlidingIn, setIsNavbarSlidingIn] = useState(false);
    const headerRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const specialRoute = useMemo(() => ["/terms-of-use", "/privacy-policy", "/photo-credits"], []);

    const toggleMobileNav = (event) => {
        event.preventDefault();
        setIsMobileNavActive((prevState) => !prevState);
    };

    const handleEscKey = useCallback(
        (event) => {
            if (event.key === "Escape" && isMobileNavActive) {
                setIsMobileNavActive(false);
            }
        },
        [isMobileNavActive]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [handleEscKey, isMobileNavActive]);

    const data = useContext(LanguageContext);

    const { isFixed, isFixedActive, isFixedPermanent, isSlidingIn, setIsSlidingIn, isHiding } = useFixedHeader(headerRef);

    useEffect(() => {
        if (isSlidingIn) {
            setIsNavbarSlidingIn(true);
            const timeoutId = setTimeout(() => {
                setIsNavbarSlidingIn(false);
                setIsSlidingIn(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [isSlidingIn, setIsSlidingIn]);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        let scrollTimeout;
        let handleScrollTimeout;

        const handleNavItemClick = (e) => {
            e.preventDefault();

            if (isMobileNavActive) {
                setIsMobileNavActive(false);
                document.documentElement.style.scrollBehavior = "auto";
                setTimeout(() => {
                    document.documentElement.style.scrollBehavior = "smooth";
                }, 100);
            }

            const targetId = e.target.closest("a")?.getAttribute("href")?.substring(1);
            const targetSection = document.getElementById(targetId?.substring(1));

            if (targetSection && targetId) {
                delayRef.current = true;

                if (isFixedActive) {
                    const headerHeight = 100;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                } else {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }

                const onScrollEnd = () => {
                    if (activeSection !== targetId) {
                        delayRef.current = false;
                        setActiveSection(targetId);
                        window.history.pushState({}, "", `#${targetId}`);
                    }
                    window.removeEventListener("scroll", handleScrollTimeout);
                };

                let scrollTimeout;
                const handleScrollTimeout = () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(onScrollEnd, 150);
                };

                window.addEventListener("scroll", handleScrollTimeout);
            }
        };

        document.querySelectorAll(".nav-item a").forEach((item) => {
            item.addEventListener("click", handleNavItemClick);
        });

        return () => {
            document.querySelectorAll(".nav-item a").forEach((item) => {
                item.removeEventListener("click", handleNavItemClick);
            });
            clearTimeout(scrollTimeout);
            window.removeEventListener("scroll", handleScrollTimeout);
        };
    }, [
        activeSection,
        delayRef,
        isMobileNavActive,
        location,
        navigate,
        setIsInitialLoad,
        hashRef,
        setActiveSection,
        specialRoute,
        isFixedActive,
    ]);

    useEffect(() => {
        const handleLogoClick = (e) => {
            e.preventDefault();
            const hash = window.location.hash;
            if (hash === "#home") return;
            const targetId = "/#home";
            const targetSection = document.getElementById("home");
            const isSpecialRoute = specialRoute.includes(location.pathname);
            delayRef.current = true;
            setIsInitialLoad(true);
            setTimeout(() => {
                delayRef.current = false;
                setIsInitialLoad(false);
            }, 300);
            if (isSpecialRoute) {
                hashRef.current = "#home";
                navigate(targetId);
                setTimeout(() => {
                    delayRef.current = false;
                    setIsInitialLoad(false);
                }, 300);
            } else {
                hashRef.current = "#home";
                navigate(targetId);
                targetSection.scrollIntoView({ behavior: "instant" });
            }
        };
        document.querySelector(".logo a").addEventListener("click", handleLogoClick);

        return () => {
            document.querySelector(".logo a").removeEventListener("click", handleLogoClick);
        };
    }, [delayRef, hashRef, location.pathname, navigate, setIsInitialLoad, specialRoute]);

    return (
        <header
            id="header"
            className={`site-header ${isFixed ? "fixed" : ""} ${isHiding ? "slideOut" : ""} ${isFixedPermanent ? "fixed-permanent" : ""} ${
                introAnimationsActive ? "navbarSlideIn" : ""
            } ${isNavbarSlidingIn ? "navbarInteractiveSlideIn" : ""}`}
            ref={headerRef}
        >
            <div className={`logo ${introAnimationsActive ? "navbar-logo-enter" : ""}`}>
                <HashLink to="/#home">
                    <img src={logo} alt={data.header.logo} className="logo" />
                </HashLink>
            </div>
            <nav role="navigation" aria-label="Main menu">
                <span className="top-left"></span>
                <span className="top-right"></span>
                <span className="bottom-left"></span>
                <span className="bottom-right"></span>
                <span className="top-left-vertical"></span>
                <span className="top-right-vertical"></span>
                <span className="bottom-left-vertical"></span>
                <span className="bottom-right-vertical"></span>
                <ul
                    className={`navbar ${isMobileNavActive ? "mobile" : ""} ${introAnimationsActive ? "navbar-menu-enter" : ""}`}
                    id="nav-menu"
                >
                    <li className={`nav-item ${activeSection === "home" ? "active" : ""}`}>
                        <HashLink to="/#home">{data.header.menu_items.home}</HashLink>
                    </li>
                    <li className={`nav-item ${activeSection === "about" ? "active" : ""}`}>
                        <HashLink to="/#about">{data.header.menu_items.about}</HashLink>
                    </li>
                    <li className={`nav-item ${activeSection === "tech-stack" ? "active" : ""}`}>
                        <HashLink to="/#tech-stack">{data.header.menu_items.tech_stack}</HashLink>
                    </li>
                    <li className={`nav-item ${activeSection === "services" ? "active" : ""}`}>
                        <HashLink to="/#services">{data.header.menu_items.services}</HashLink>
                    </li>
                    <li className={`nav-item ${activeSection === "portfolio" ? "active" : ""}`}>
                        <HashLink to="/#portfolio">{data.header.menu_items.portfolio}</HashLink>
                    </li>
                    <li className={`nav-item ${activeSection === "contact" ? "active" : ""}`}>
                        <HashLink to="/#contact">{data.header.menu_items.contact}</HashLink>
                    </li>
                    <li className="nav-item">
                        <div className="lang-parent">
                            <a onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>
                                EN
                            </a>
                            <span>|</span>
                            <a onClick={() => setLang("el")} className={lang === "el" ? "active" : ""}>
                                EL
                            </a>
                        </div>
                    </li>
                </ul>
                <div
                    className={`hamburger ${isMobileNavActive ? "active" : ""}`}
                    onClick={toggleMobileNav}
                    aria-expanded={isMobileNavActive}
                >
                    <span className="hamburger-btn"></span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
