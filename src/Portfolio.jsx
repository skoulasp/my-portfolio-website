import { useContext, forwardRef } from "react";
import { LanguageContext } from "./App";
import TicTacToe from "./assets/img/portfolio/tic-tac-toe.png";
import TicTacToe2x from "./assets/img/portfolio/tic-tac-toe@2x.png";
import TicTacToe3x from "./assets/img/portfolio/tic-tac-toe@3x.png";
import AnalogClock from "./assets/img/portfolio/analog-clock.png";
import AnalogClock2x from "./assets/img/portfolio/analog-clock@2x.png";
import AnalogClock3x from "./assets/img/portfolio/analog-clock@3x.png";
import CalorieTracker from "./assets/img/portfolio/calorie-tracker.png";
import CalorieTracker2x from "./assets/img/portfolio/calorie-tracker@2x.png";
import CalorieTracker3x from "./assets/img/portfolio/calorie-tracker@3x.png";
import BrainTrainer from "./assets/img/portfolio/numbers-game.png";
import BrainTrainer2x from "./assets/img/portfolio/numbers-game@2x.png";
import BrainTrainer3x from "./assets/img/portfolio/numbers-game@3x.png";
import TodoApp from "./assets/img/portfolio/todo-app.png";
import TodoApp2x from "./assets/img/portfolio/todo-app@2x.png";
import TodoApp3x from "./assets/img/portfolio/todo-app@3x.png";
import WordPress from "./assets/img/portfolio/wp-theme.png";
import WordPress2x from "./assets/img/portfolio/wp-theme@2x.png";
import WordPress3x from "./assets/img/portfolio/wp-theme@3x.png";
import thinkcreate from "./assets/img/portfolio/thinkcreate.png";
import thinkcreate2x from "./assets/img/portfolio/thinkcreate@2x.png";
import thinkcreate3x from "./assets/img/portfolio/thinkcreate@3x.png";
import portfolio from "./assets/img/portfolio/portfolio.png";
import portfolio2x from "./assets/img/portfolio/portfolio@2x.png";
import portfolio3x from "./assets/img/portfolio/portfolio@3x.png";

const Portfolio = forwardRef(({ lang }, ref) => {
    const data = useContext(LanguageContext);
    return (
        <section id="portfolio" className={`portfolio ${lang === "el" ? "greek" : ""}`} ref={ref}>
            <div className="heading-section-portfolio">
                <h2>{data.portfolio.section_heading}</h2>
            </div>
            <article className="content-wrapper">
                <h3 className="portfolio-subheading">{data.portfolio.practice_projects.subheading}</h3>
                <div className="projects">
                    <ul className="projects-list">
                        <li className="project project1">
                            <figure>
                                <div className="proj-img img-1">
                                    <a href="https://skoulasp.github.io/Tic-Tac-Toe/" target="_blank" rel="noreferrer">
                                        <img
                                            src={TicTacToe}
                                            srcSet={`${TicTacToe} 1x, ${TicTacToe2x} 2x, ${TicTacToe3x} 3x`}
                                            alt="Tic Tac Toe mini game"
                                            className="tictactoe"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[0].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/Tic-Tac-Toe" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[0].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[0].description}</div>
                        </li>
                        <li className="project project2">
                            <figure>
                                <div className="proj-img img-2">
                                    <a href="https://skoulasp.github.io/Analog-Clock/" target="_blank" rel="noreferrer">
                                        <img
                                            src={AnalogClock}
                                            srcSet={`${AnalogClock} 1x, ${AnalogClock2x} 2x, ${AnalogClock3x} 3x`}
                                            alt="Analog Clock app"
                                            className="analog-clock"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[1].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/Analog-Clock" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[1].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[1].description}</div>
                        </li>
                        <li className="project project3">
                            <figure>
                                <div className="proj-img img-3">
                                    <a href="https://skoulasp.github.io/Calorie-Tracker/" target="_blank" rel="noreferrer">
                                        <img
                                            src={CalorieTracker}
                                            srcSet={`${CalorieTracker} 1x, ${CalorieTracker2x} 2x, ${CalorieTracker3x} 3x`}
                                            alt="Calorie Tracker app"
                                            className="calorie-tracker"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[2].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/Calorie-Tracker" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[2].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[2].description}</div>
                        </li>
                        <li className="project project5">
                            <figure>
                                <div className="proj-img img4">
                                    <a href="https://skoulasp.github.io/numbers-game/" target="_blank" rel="noreferrer">
                                        <img
                                            src={BrainTrainer}
                                            srcSet={`${BrainTrainer} 1x, ${BrainTrainer2x} 2x, ${BrainTrainer3x} 3x`}
                                            alt="Brain Trainer app"
                                            className="numbers-game"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[3].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/numbers-game" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[3].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[3].description}</div>
                        </li>
                        <li className="project project6">
                            <figure>
                                <div className="proj-img img5">
                                    <a href="https://skoulasp.github.io/todo-app/" target="_blank" rel="noreferrer">
                                        <img
                                            src={TodoApp}
                                            srcSet={`${TodoApp} 1x, ${TodoApp2x} 2x, ${TodoApp3x} 3x`}
                                            alt="Todo App"
                                            className="todo-app"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[4].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/todo-app" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[4].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[4].description}</div>
                        </li>
                        <li className="project project4">
                            <figure>
                                <div className="proj-img img-3">
                                    <a href="http://wp.skoulas.me/" target="_blank" rel="noreferrer">
                                        <img
                                            src={WordPress}
                                            srcSet={`${WordPress} 1x, ${WordPress2x} 2x, ${WordPress3x} 3x`}
                                            alt="Calorie Tracker app"
                                            className="calorie-tracker"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[5].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/xing" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[5].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[5].description}</div>
                        </li>
                        <li className="project project6">
                            <figure>
                                <div className="proj-img img-3">
                                    <a href="http://thinkcreate.skoulas.me:8080/" target="_blank" rel="noreferrer">
                                        <img
                                            src={thinkcreate}
                                            srcSet={`${thinkcreate} 1x, ${thinkcreate2x} 2x, ${thinkcreate3x} 3x`}
                                            alt="THINKCREATE Django CMS"
                                            className="thinkcreate"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[6].name}</figcaption>
                                <div className="github-repo">
                                    <a href="https://github.com/skoulasp/thinkcreate" target="_blank" rel="noreferrer" className="link">
                                        {data.portfolio.practice_projects.projects[6].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[6].description}</div>
                        </li>
                        <li className="project project7">
                            <figure>
                                <div className="proj-img img-8">
                                    <a target="_blank" rel="noreferrer">
                                        <img
                                            src={portfolio}
                                            srcSet={`${portfolio} 1x, ${portfolio2x} 2x, ${portfolio3x} 3x`}
                                            alt="My Portfolio Website"
                                            className="portfolio"
                                        />
                                    </a>
                                </div>
                                <figcaption>{data.portfolio.practice_projects.projects[7].name}</figcaption>
                                <div className="github-repo">
                                    <a
                                        href="https://github.com/skoulasp/my-portfolio-website"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="link"
                                    >
                                        {data.portfolio.practice_projects.projects[7].github}
                                    </a>
                                </div>
                            </figure>
                            <div className="project-category">{data.portfolio.practice_projects.projects[7].description}</div>
                        </li>
                    </ul>
                </div>
                <hr className="separator" />
                <div className="github-profile">
                    <a href="https://github.com/skoulasp" target="_blank" rel="noreferrer" className="link">
                        {data.portfolio.gh_profile}
                    </a>
                </div>
            </article>
        </section>
    );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
