import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "./App";
import { useContext, useEffect } from "react";
const PhotoCredits = () => {
    const data = useContext(LanguageContext);
    const navigate = useNavigate();

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
        <div className="photo-credits fadeInTxt">
            <div className="btn-group">
                <div className="back-btn">
                    <Link onClick={handleNavigateBack}>🡸</Link>
                </div>
                <div className="x-btn" onClick={handleNavigateMain}>
                    <a style={{ fontWeight: 700 }}>✖</a>
                </div>
            </div>
            <div className="photo-credits-content">
                <h1>{data.legal.credits.title}</h1>
                <p>{data.legal.credits.par1}</p>
                <p>{data.legal.credits.par2}</p>
                <p>{data.legal.credits.par3}</p>
                <p>{data.legal.credits.par4}</p>
            </div>
        </div>
    );
};

export default PhotoCredits;
