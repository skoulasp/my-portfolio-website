import { forwardRef, useContext } from "react";
import ReactImg from "./assets/img/react.png";
import JavaScriptImg from "./assets/img/javascript.png";
import TypeScriptImg from "./assets/img/typescript.png";
import CSSImg from "./assets/img/css.png";
import SassImg from "./assets/img/sass.png";
import HTMLImg from "./assets/img/html.png";
import WordPressImg from "./assets/img/wordpress.png";
import PHPImg from "./assets/img/php.png";
import NPMImg from "./assets/img/npm.png";
import GITImg from "./assets/img/version-control.png";
import DjangoImg from "./assets/img/django.png";
import VariousImg from "./assets/img/various.png";
import PenImg from "./assets/img/pen.png";
import SQLImg from "./assets/img/sql.png";
import Skillsbox from "./Skillsbox";
import { LanguageContext } from "./App";

const TechStack = forwardRef(({ lang }, ref) => {
    const data = useContext(LanguageContext);
    return (
        <section ref={ref} id="tech-stack" className={`skills ${lang === "el" ? "greek" : ""}`}>
            <div className="heading-section">
                <h2 className="heading-services">{data.tech_stack.title}</h2>
            </div>
            <article className="skills">
                <div className="heading3-wrapper">
                    <span className="style-before"></span>
                    <h3 className="skills core">{data.tech_stack.core_technologies[0].title}</h3>
                    <span className="style-after"></span>
                </div>
                <Skillsbox technology={"React"} img={ReactImg} paragraph={data.tech_stack.core_technologies[1].description} />
                <Skillsbox technology={"JavaScript"} img={JavaScriptImg} paragraph={data.tech_stack.core_technologies[2].description} />
                <Skillsbox technology={"TypeScript"} img={TypeScriptImg} paragraph={data.tech_stack.core_technologies[3].description} />
                <Skillsbox technology={"CSS"} img={CSSImg} paragraph={data.tech_stack.core_technologies[4].description} />
                <Skillsbox technology={"Sass (scss)"} img={SassImg} paragraph={data.tech_stack.core_technologies[5].description} />
                <Skillsbox technology={"HTML"} img={HTMLImg} paragraph={data.tech_stack.core_technologies[6].description} />
                <Skillsbox technology={"WordPress"} img={WordPressImg} paragraph={data.tech_stack.core_technologies[7].description} />
                <Skillsbox technology={"PHP"} img={PHPImg} paragraph={data.tech_stack.core_technologies[8].description} />
            </article>
            <article className="secondary-skills">
                <div className="heading3-wrapper">
                    <span className="style-before"></span>
                    <h3 className="skills tools">{data.tech_stack.workflow_tools[0].title}</h3>
                    <span className="style-after"></span>
                </div>
                <Skillsbox
                    technology={data.tech_stack.workflow_tools[1].technology}
                    img={NPMImg}
                    paragraph={data.tech_stack.workflow_tools[1].description}
                />
                <Skillsbox
                    technology={"Version Control | Git & Github"}
                    img={GITImg}
                    paragraph={data.tech_stack.workflow_tools[2].description}
                />
            </article>
            <article className="other-skills">
                <div className="heading3-wrapper">
                    <span className="style-before"></span>
                    <h3 className="skills college">{data.tech_stack.college_education[0].title}</h3>
                    <span className="style-after"></span>
                </div>
                <Skillsbox technology={"Python & Django"} img={DjangoImg} paragraph={data.tech_stack.college_education[1].description} />
                <Skillsbox technology={"SQL Databases"} img={SQLImg} paragraph={data.tech_stack.college_education[2].description} />
                <Skillsbox
                    technology={data.tech_stack.college_education[3].technology}
                    img={VariousImg}
                    paragraph={data.tech_stack.college_education[3].description}
                />
            </article>
            <div className="decor">
                <img className="pen" src={PenImg} alt="A decorative pen" />
            </div>
        </section>
    );
});

TechStack.displayName = "TechStack";

export default TechStack;
