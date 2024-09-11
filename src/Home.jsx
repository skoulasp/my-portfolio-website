import { useContext, forwardRef } from "react";
import TiltImage from "./TiltImage";
import flag from "./assets/img/flag.svg";
import { LanguageContext } from "./App";
import me from "./assets/img/me.jpg";

const Home = forwardRef(function Home({ introAnimationsActive }, ref) {
    const data = useContext(LanguageContext);

    return (
        <section id="home" className={`introduction ${introAnimationsActive ? "home-start" : ""}`} ref={ref}>
            <div className="section-container">
                <div className={`heading-section ${introAnimationsActive ? "heading-enter" : ""}`}>
                    <h1 className="main-heading">{data.home.heading}</h1>
                    <img src={flag} alt="Greek flag" />
                </div>
                <div className="main-content">
                    <TiltImage imageUrl={me} caption={data.home.image_caption} introAnimationsActive={introAnimationsActive} />
                    <div className="cloud-and-btns">
                        <div className={`cloud ${introAnimationsActive ? "text-cloud-enter" : ""}`}>
                            <p>{data.home.cloud_text}</p>
                        </div>
                        <div className={`btn-group ${introAnimationsActive ? "btn-group-enter" : ""}`}>
                            <a href="#contact" className="cta-contact">
                                {data.home.buttons.contact}{" "}
                                <span style={{ fontSize: "26px", verticalAlign: "middle" }}>{data.home.buttons.contact_emoji}</span>
                            </a>
                            <a href="#about" className="cta-more">
                                {data.home.buttons.learn_more}
                                <span style={{ fontSize: "26px", verticalAlign: "middle", marginLeft: "5px" }}>
                                    {data.home.buttons.learn_more_emoji}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Home.displayName = "Home";

export default Home;
