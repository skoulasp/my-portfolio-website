import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import TechStack from "./TechStack";
import LegalModal from "./LegalModal";
import PrivacyPolicy from "./PrivacyPolicy";
import PhotoCredits from "./PhotoCredits";
import enData from "./i18n/en.json";
import elData from "./i18n/gr.json";
import { useLocalStorage } from "./useLocalStorage";
import useResponsiveIntersectionObserver from "./useResponsiveIntersectionObserver";
import TermsOfUse from "./TermsOfUse";

const LanguageContext = createContext();

function App() {
    const [language, setLanguage] = useLocalStorage("lang", "en");
    const data = language === "en" ? enData : elData;
    const [activeSection, setActiveSection] = useState(null);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(true);
    const [scrollPos, setScrollPos] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [introAnimationsActive, setIntroAnimationsActive] = useState(true);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const techStackRef = useRef(null);
    const servicesRef = useRef(null);
    const portfolioRef = useRef(null);
    const contactRef = useRef(null);
    const location = useLocation();
    const hashRef = useRef(window.location.hash);
    const delayRef = useRef(true);
    useEffect(() => {
        if (hashRef.current === "") {
            setTimeout(() => {
                delayRef.current = false;
            }, 5000);
        } else {
            delayRef.current = false;
        }
    }, []);

    useResponsiveIntersectionObserver(homeRef, () => setActiveSection("home"), delayRef);
    useResponsiveIntersectionObserver(aboutRef, () => setActiveSection("about"), delayRef);
    useResponsiveIntersectionObserver(techStackRef, () => setActiveSection("tech-stack"), delayRef);
    useResponsiveIntersectionObserver(servicesRef, () => setActiveSection("services"), delayRef);
    useResponsiveIntersectionObserver(portfolioRef, () => setActiveSection("portfolio"), delayRef);
    useResponsiveIntersectionObserver(contactRef, () => setActiveSection("contact"), delayRef);

    useEffect(() => {
        const urlHash = window.location.hash.substr(1);
        if (urlHash) {
            const newTitle = urlHash.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            document.title = `Petros Skoulas | ${newTitle}`;
        } else {
            document.title = `Petros Skoulas | Front-End Developer`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.hash]);

    useEffect(() => {
        if (!delayRef.current) {
            if (scrollPos > 0) {
                window.scrollTo(0, scrollPos);
            }
        }
        if (location.pathname !== "/") {
            setActiveSection(null);
        }
    }, [location, scrollPos]);

    useLayoutEffect(() => {
        let timeoutId;
        const disableScroll = () => {
            document.body.style.overflow = "hidden";
        };
        const enableScroll = () => {
            document.body.style.overflow = "";
        };
        if (!hashRef.current && window.scrollY === 0) {
            disableScroll();
            timeoutId = setTimeout(() => {
                enableScroll();
                setIntroAnimationsActive(false);
            }, 4600);
        } else {
            setIntroAnimationsActive(false);
        }
        return () => {
            clearTimeout(timeoutId);
            enableScroll();
        };
    }, [hashRef, setIntroAnimationsActive]);

    const handleNavigateToRoute = () => {
        if (location.pathname === "/") {
            document.documentElement.style.scrollBehavior = "auto";
            setScrollPos(() => window.scrollY);
        }
    };

    useLayoutEffect(() => {
        if (hashRef.current) {
            const element = document.querySelector(hashRef.current);
            if (element) {
                const scrollOptions = {
                    behavior: isInitialLoad ? "instant" : "smooth",
                };
                element.scrollIntoView(scrollOptions);
            }
            setIsInitialLoad(false);
        }
    }, [hashRef, isInitialLoad]);

    useEffect(() => {
        if (language === "el") {
            document.body.classList.add("greek");
        } else {
            document.body.classList.remove("greek");
        }
    }, [language]);

    const handleAcceptTerms = () => {
        setIsLegalModalOpen(false);
    };

    const handleDeclineTerms = () => {
        setIsLegalModalOpen(false);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            const timeoutId = setTimeout(() => {
                document.documentElement.style.scrollBehavior = "smooth";
            }, 100);

            return () => {
                clearTimeout(timeoutId);
            };
        } else {
            document.documentElement.style.scrollBehavior = "auto";
        }
    }, [location.pathname]);

    return (
        <LanguageContext.Provider value={{ ...data, activeSection }}>
            <Header
                lang={language}
                setLang={setLanguage}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                introAnimationsActive={introAnimationsActive}
                delayRef={delayRef}
                setIsInitialLoad={setIsInitialLoad}
                hashRef={hashRef}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="container">
                            <Home ref={homeRef} introAnimationsActive={introAnimationsActive} />
                            <About ref={aboutRef} />
                            <TechStack lang={language} ref={techStackRef} />
                            <Services lang={language} ref={servicesRef} />
                            <Portfolio lang={language} ref={portfolioRef} />
                            <Contact lang={language} ref={contactRef} />
                        </div>
                    }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="photo-credits" element={<PhotoCredits />} />
            </Routes>
            <Footer handleNavigateToRoute={handleNavigateToRoute} delayRef={delayRef} />

            {isLegalModalOpen &&
                createPortal(
                    <LegalModal
                        isOpen={isLegalModalOpen}
                        onClose={() => setIsLegalModalOpen(false)}
                        onAccept={handleAcceptTerms}
                        onDecline={handleDeclineTerms}
                        lang={language}
                    />,
                    document.body
                )}
        </LanguageContext.Provider>
    );
}

export { App, LanguageContext };
