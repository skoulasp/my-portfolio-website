import { useEffect } from "react";

const useScrollPosition = () => {
    useEffect(() => {
        const setScroll = () => {
            window.onscroll = () => {
                window.scrollY > 12 ? sessionStorage.setItem("scroll_position", window.scrollY) : false;
            };
        };
        let pos = sessionStorage.getItem("scroll_position");
        window.scrollTo(0, pos);
        window.addEventListener("scroll", setScroll);
        return () => {
            window.removeEventListener("scroll", setScroll);
        };
    }, []);

    return null;
};

export default useScrollPosition;
