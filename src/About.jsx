import { forwardRef, useContext, useRef } from "react";
import { LanguageContext } from "./App";
import { motion, useScroll, useTransform } from "framer-motion";
import ResumePDF from "../Petros_Skoulas_FrontEnd_Developer_Resume.pdf";

const About = forwardRef((props, ref) => {
    const data = useContext(LanguageContext);
    const styleRef = useRef(0);
    const { scrollYProgress } = useScroll({
        target: styleRef,
        offset: ["0.4 1", "1. 1"],
    });

    const bgColorProgress = useTransform(scrollYProgress, [0, 0.9], ["hsla(267, 75%, 27%, 0.5)", "hsla(238, 44%, 15%, 0.6)"]);
    const colorProgress = useTransform(scrollYProgress, [0, 0.9], ["hsl(146, 100%, 50%)", "hsla(0, 0%, 100%)"]);

    return (
        <section id="about" className="about" ref={ref}>
            <article>
                <div className="heading-section">
                    <h2 className="heading-about">{data.about.heading}</h2>
                </div>
                <div ref={styleRef} className="styling"></div>
                <div className="main-content">
                    <div className="about-content-wrap" style={{ position: "relative" }}>
                        <motion.div style={{ backgroundColor: bgColorProgress, color: colorProgress }} className="main-text">
                            <p>{data.about.paragraphs[0]}</p>
                            <p>{data.about.paragraphs[1]}</p>
                            <p>{data.about.paragraphs[2]}</p>
                            <p>{data.about.paragraphs[3]}</p>
                        </motion.div>
                    </div>

                    <div className="btn-group">
                        <div className="drawing">
                            <span className="line-top">
                                <span className="line-bottom">
                                    <span className="mini-line-left"></span>
                                    <span className="mini-line-right"></span>
                                </span>
                            </span>
                        </div>
                        <div className="action-btns">
                            <a href={ResumePDF} target="_blank" rel="noreferrer" className="resume-btn">
                                {data.about.buttons.services}
                            </a>
                            <a href="#tech-stack" className="portfolio-btn">
                                {data.about.buttons.portfolio}
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
});

About.displayName = "About";

export default About;
