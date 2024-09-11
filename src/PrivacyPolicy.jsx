import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "./App";
import { useContext, useEffect } from "react";
const PrivacyPolicy = () => {
    const data = useContext(LanguageContext);
    const navigate = useNavigate();
    const domainName = window.location.hostname;
    const handleNavigateBack = () => {
        navigate(-1, { state: { fromRoute: true } });
    };
    const handleNavigateMain = () => {
        navigate("/", { state: { fromRoute: true } });
    };

    useEffect(() => {
        if (window.innerWidth <= 720) {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <div className="privacy-policy fadeInTxt">
            <div className="btn-group">
                <div className="back-btn">
                    <Link onClick={handleNavigateBack}>🡸</Link>
                </div>
                <div className="x-btn" onClick={handleNavigateMain}>
                    <a style={{ fontWeight: 700 }}>✖</a>
                </div>
            </div>
            <div className="privacy-content">
                <h1>{data.legal.privacy.title}</h1>
                <p>
                    {data.legal.privacy.par0} {domainName}. {data.legal.privacy.par1}
                </p>
                <h2>{data.legal.privacy.items[0].title}</h2>
                <p>{data.legal.privacy.items[0].content}</p>
                <h2>{data.legal.privacy.items[1].title}</h2>
                <p>{data.legal.privacy.items[1].content}</p>
                <h2>{data.legal.privacy.items[2].title}</h2>
                <p>{data.legal.privacy.items[2].content}</p>
                <h2>{data.legal.privacy.items[3].title}</h2>
                <p>{data.legal.privacy.items[3].content}</p>
                <h2>{data.legal.privacy.items[4].title}</h2>
                <p>{data.legal.privacy.items[4].content}</p>
                <h2>{data.legal.privacy.items[5].title}</h2>
                <p>{data.legal.privacy.items[5].content}</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
