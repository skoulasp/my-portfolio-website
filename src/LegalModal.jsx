import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "./App";

const LegalModal = ({ isOpen, onClose, onAccept, onDecline, lang }) => {
    const [isClosing, setIsClosing] = useState(false);
    const data = useContext(LanguageContext);
    const domainName = window.location.hostname;

    const handleAccept = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onAccept();
            onClose();
        }, 500);
    };

    const handleDecline = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onDecline();
            onClose();
        }, 500);
    };

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape" && isOpen) {
                setIsClosing(true);
                setTimeout(() => {
                    setIsClosing(false);
                    onAccept();
                    onClose();
                }, 500);
            }
        };

        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onAccept, onClose]);

    const parseTextWithLinks = (text) => {
        const termsLink = <Link to="/terms-of-use">Terms of Use</Link>;
        const privacyLink = <Link to="/privacy-policy">Privacy Policy</Link>;
        const termsLinkGR = <Link to="/terms-of-use">Όρους Χρήσης</Link>;
        const privacyLinkGR = <Link to="/privacy-policy">Πολιτική Απορρήτου</Link>;

        if (lang === "en") {
            return text.split(/(\[termsLink\]|\[privacyLink\])/).map((part, i) => {
                if (part === "[termsLink]") return <span key={i}>{termsLink}</span>;
                if (part === "[privacyLink]") return <span key={i}>{privacyLink}</span>;
                return part;
            });
        } else {
            return text.split(/(\[termsLink\]|\[privacyLink\])/).map((part, i) => {
                if (part === "[termsLink]") return <span key={i}>{termsLinkGR}</span>;
                if (part === "[privacyLink]") return <span key={i}>{privacyLinkGR}</span>;
                return part;
            });
        }
    };

    return (
        <dialog open={isOpen} onClose={onClose} className={`legal-modal ${isClosing ? "fadeOut" : "fadeInModal"}`}>
            <div className="parent">
                <h3>{data.legal.modal.title}</h3>
                <p>
                    {data.legal.modal.par0} <span className="bold">{domainName}</span>! {parseTextWithLinks(data.legal.modal.par1)}
                </p>
                <p dangerouslySetInnerHTML={{ __html: data.legal.modal.items[0].content }}></p>
                <p dangerouslySetInnerHTML={{ __html: data.legal.modal.items[1].content }}></p>
                <p dangerouslySetInnerHTML={{ __html: data.legal.modal.items[2].content }}></p>
            </div>
            <div className="btn-group">
                <button className="accept" onClick={handleAccept}>
                    {data.legal.modal.buttons.accept}
                </button>
                <button className="decline" onClick={handleDecline}>
                    {data.legal.modal.buttons.decline}
                </button>
            </div>
        </dialog>
    );
};

export default LegalModal;
