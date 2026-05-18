import { useContext, forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import NoirKitchenHero from "./assets/img/portfolio/noir-kitchen/noir-01-desktop-hero-1920.png";
import NoirKitchenAbout from "./assets/img/portfolio/noir-kitchen/noir-02-desktop-about-1920.png";
import NoirKitchenMenu from "./assets/img/portfolio/noir-kitchen/noir-03-desktop-menu-1920.png";
import NoirKitchenGallery from "./assets/img/portfolio/noir-kitchen/noir-04-desktop-gallery-1920.png";
import NoirKitchenReservation from "./assets/img/portfolio/noir-kitchen/noir-05-desktop-reservation-1920.png";
import VaultexHero from "./assets/img/portfolio/vaultex/vaultex-01-desktop-hero-1920.png";
import VaultexPricing from "./assets/img/portfolio/vaultex/vaultex-02-desktop-pricing-1920.png";
import VaultexTestimonials from "./assets/img/portfolio/vaultex/vaultex-03-desktop-testimonials-1920.png";
import VaultexCta from "./assets/img/portfolio/vaultex/vaultex-04-desktop-cta-1920.png";
import VaultexMobileHero from "./assets/img/portfolio/vaultex/vaultex-05-mobile-hero-2x.png";
import ThinkCreateV2Dashboard from "./assets/img/portfolio/thinkcreate-v2/thinkcreate-v2-dashboard.png";

const visibleProjectCount = 8;

const carouselVariants = {
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? "110%" : "-110%",
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? "-110%" : "110%",
    }),
};

const projectAssets = [
    {
        id: "tic-tac-toe",
        cardClass: "project1",
        imageWrapperClass: "img-1",
        imageClass: "tictactoe",
        href: "https://skoulasp.github.io/Tic-Tac-Toe/",
        githubHref: "https://github.com/skoulasp/Tic-Tac-Toe",
        image: TicTacToe,
        srcSet: `${TicTacToe} 1x, ${TicTacToe2x} 2x, ${TicTacToe3x} 3x`,
        alt: "Tic Tac Toe mini game",
    },
    {
        id: "analog-clock",
        cardClass: "project2",
        imageWrapperClass: "img-2",
        imageClass: "analog-clock",
        href: "https://skoulasp.github.io/Analog-Clock/",
        githubHref: "https://github.com/skoulasp/Analog-Clock",
        image: AnalogClock,
        srcSet: `${AnalogClock} 1x, ${AnalogClock2x} 2x, ${AnalogClock3x} 3x`,
        alt: "Analog Clock app",
    },
    {
        id: "calorie-tracker",
        cardClass: "project3",
        imageWrapperClass: "img-3",
        imageClass: "calorie-tracker",
        href: "https://skoulasp.github.io/Calorie-Tracker/",
        githubHref: "https://github.com/skoulasp/Calorie-Tracker",
        image: CalorieTracker,
        srcSet: `${CalorieTracker} 1x, ${CalorieTracker2x} 2x, ${CalorieTracker3x} 3x`,
        alt: "Calorie Tracker app",
    },
    {
        id: "brain-trainer",
        cardClass: "project5",
        imageWrapperClass: "img4",
        imageClass: "numbers-game",
        href: "https://skoulasp.github.io/numbers-game/",
        githubHref: "https://github.com/skoulasp/numbers-game",
        image: BrainTrainer,
        srcSet: `${BrainTrainer} 1x, ${BrainTrainer2x} 2x, ${BrainTrainer3x} 3x`,
        alt: "Brain Trainer app",
    },
    {
        id: "todo-app",
        cardClass: "project6",
        imageWrapperClass: "img5",
        imageClass: "todo-app",
        href: "https://skoulasp.github.io/todo-app/",
        githubHref: "https://github.com/skoulasp/todo-app",
        image: TodoApp,
        srcSet: `${TodoApp} 1x, ${TodoApp2x} 2x, ${TodoApp3x} 3x`,
        alt: "Todo App",
    },
    {
        id: "wordpress-theme",
        cardClass: "project4",
        imageWrapperClass: "img-3",
        imageClass: "calorie-tracker",
        githubHref: "https://github.com/skoulasp/xing",
        image: WordPress,
        srcSet: `${WordPress} 1x, ${WordPress2x} 2x, ${WordPress3x} 3x`,
        alt: "Generic WordPress Theme",
        disabledDemo: true,
    },
    {
        id: "thinkcreate",
        cardClass: "project6",
        imageWrapperClass: "img-3",
        imageClass: "thinkcreate",
        githubHref: "https://github.com/skoulasp/thinkcreate",
        image: thinkcreate,
        srcSet: `${thinkcreate} 1x, ${thinkcreate2x} 2x, ${thinkcreate3x} 3x`,
        alt: "THINKCREATE Django CMS",
        disabledDemo: true,
    },
    {
        id: "portfolio-website",
        cardClass: "project7",
        imageWrapperClass: "img-8",
        imageClass: "portfolio",
        githubHref: "https://github.com/skoulasp/my-portfolio-website",
        image: portfolio,
        srcSet: `${portfolio} 1x, ${portfolio2x} 2x, ${portfolio3x} 3x`,
        alt: "My Portfolio Website",
        disabledDemo: true,
        currentProject: true,
    },
];

const futureProjectAssets = [
    {
        id: "thinkcreate-v2",
        cardClass: "project-thinkcreate-v2",
        imageWrapperClass: "img-thinkcreate-v2",
        githubHref: "https://github.com/skoulasp/thinkcreate-v2",
        preview: "thinkcreate-v2",
        modalScreenshots: [
            {
                src: ThinkCreateV2Dashboard,
                alt: "ThinkCreate v2 Laravel CMS admin dashboard",
            },
        ],
    },
    {
        id: "noir-kitchen",
        cardClass: "project-noir-kitchen",
        imageWrapperClass: "img-noir-kitchen",
        image: NoirKitchenHero,
        imageClass: "noir-kitchen",
        modalScreenshots: [
            {
                src: NoirKitchenHero,
            },
            {
                src: NoirKitchenAbout,
            },
            {
                src: NoirKitchenMenu,
            },
            {
                src: NoirKitchenGallery,
            },
            {
                src: NoirKitchenReservation,
            },
        ],
    },
    {
        id: "vaultex",
        cardClass: "project-vaultex",
        imageWrapperClass: "img-vaultex",
        image: VaultexHero,
        imageClass: "vaultex",
        modalScreenshots: [
            {
                src: VaultexHero,
            },
            {
                src: VaultexPricing,
            },
            {
                src: VaultexTestimonials,
            },
            {
                src: VaultexCta,
            },
            {
                src: VaultexMobileHero,
                className: "mobile-screenshot",
            },
        ],
    },
];

function chunkProjects(projects) {
    return Array.from({ length: Math.ceil(projects.length / visibleProjectCount) }, (_, index) =>
        projects.slice(index * visibleProjectCount, (index + 1) * visibleProjectCount),
    );
}

function ThinkCreateV2Preview() {
    return (
        <span className="thinkcreate-v2-preview" aria-hidden="true">
            <span className="thinkcreate-v2-topbar">
                <span>THINKCREATE</span>
                <span>ADMIN</span>
            </span>
            <span className="thinkcreate-v2-sidebar">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <span className="thinkcreate-v2-content">
                <span className="thinkcreate-v2-title"></span>
                <span className="thinkcreate-v2-grid">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <span className="thinkcreate-v2-stats">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </span>
        </span>
    );
}

function localizeProject(project, translation = {}) {
    return {
        ...project,
        ...translation,
        modalScreenshots: project.modalScreenshots?.map((screenshot, index) => ({
            ...screenshot,
            alt: translation.screenshot_alts?.[index] || translation.alt || "",
        })),
    };
}

function ProjectCard({ project, onOpenModal }) {
    return (
        <li className={`project ${project.cardClass}`}>
            <figure>
                <div className={`proj-img ${project.imageWrapperClass}`}>
                    {project.preview === "thinkcreate-v2" ? (
                        project.modalScreenshots ? (
                            <button
                                type="button"
                                className="project-modal-trigger"
                                aria-label={project.preview_label}
                                onClick={() => onOpenModal(project)}
                            >
                                <ThinkCreateV2Preview />
                            </button>
                        ) : (
                            <ThinkCreateV2Preview />
                        )
                    ) : project.placeholder ? (
                        <span className="unknown-project-image" aria-hidden="true">
                            ?
                        </span>
                    ) : project.modalScreenshots ? (
                        <button type="button" className="project-modal-trigger" onClick={() => onOpenModal(project)}>
                            <img src={project.image} alt={project.alt} className={project.imageClass} />
                        </button>
                    ) : project.disabledDemo ? (
                        <span
                            className={`project-link-disabled ${project.currentProject ? "project-link-current" : ""}`}
                            aria-disabled="true"
                        >
                            <img src={project.image} srcSet={project.srcSet} alt={project.alt} className={project.imageClass} />
                        </span>
                    ) : (
                        <a href={project.href} target="_blank" rel="noreferrer">
                            <img src={project.image} srcSet={project.srcSet} alt={project.alt} className={project.imageClass} />
                        </a>
                    )}
                </div>
                <figcaption>{project.name}</figcaption>
                <div className="github-repo">
                    {project.githubHref ? (
                        <a href={project.githubHref} target="_blank" rel="noreferrer" className="link">
                            {project.github}
                        </a>
                    ) : project.modalScreenshots ? (
                        <button type="button" className="link project-modal-link" onClick={() => onOpenModal(project)}>
                            {project.github}
                        </button>
                    ) : (
                        <span className="link placeholder-link">{project.github}</span>
                    )}
                </div>
            </figure>
            <div className="project-category">{project.description}</div>
        </li>
    );
}

function PortfolioProjectModal({ project, onClose, closeLabel }) {
    return (
        <motion.div
            className="portfolio-modal-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="portfolio-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-modal-title"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="portfolio-modal-header">
                    <h4 id="portfolio-modal-title">{project.name}</h4>
                    <button type="button" className="portfolio-modal-close" onClick={onClose}>
                        {closeLabel}
                    </button>
                </div>
                <div className="portfolio-modal-screenshots">
                    {project.modalScreenshots.map((screenshot) => (
                        <img key={screenshot.src} src={screenshot.src} alt={screenshot.alt} className={screenshot.className || ""} />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

const Portfolio = forwardRef(({ lang }, ref) => {
    const data = useContext(LanguageContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1);
    const [activeModalProject, setActiveModalProject] = useState(null);

    useEffect(() => {
        if (!activeModalProject) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.body.classList.add("portfolio-modal-open");

        function closeOnEscape(event) {
            if (event.key === "Escape") {
                setActiveModalProject(null);
            }
        }

        window.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.classList.remove("portfolio-modal-open");
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [activeModalProject]);

    const existingProjects = projectAssets.map((project, index) => ({
        ...project,
        ...data.portfolio.practice_projects.projects[index],
    }));
    const futureProjects = futureProjectAssets.map((project, index) =>
        localizeProject(project, data.portfolio.practice_projects.future_projects[index]),
    );
    const placeholderProject = data.portfolio.practice_projects.placeholder_project;
    const placeholderProjects = Array.from({ length: visibleProjectCount - futureProjects.length }, (_, index) => ({
        ...placeholderProject,
        id: `unknown-project-${index + 1}`,
        cardClass: "project-placeholder",
        imageWrapperClass: "img-placeholder",
        placeholder: true,
    }));
    const projectPages = chunkProjects([...existingProjects, ...futureProjects, ...placeholderProjects]);
    const lastPage = projectPages.length - 1;

    function showProjectPage(direction) {
        setSlideDirection(direction);
        setCurrentPage((page) => Math.min(Math.max(page + direction, 0), lastPage));
    }

    return (
        <section id="portfolio" className={`portfolio ${lang === "el" ? "greek" : ""}`} ref={ref}>
            <div className="heading-section-portfolio">
                <h2>{data.portfolio.section_heading}</h2>
            </div>
            <article className="content-wrapper">
                <h3 className="portfolio-subheading">
                    <span>{data.portfolio.practice_projects.subheading}</span>
                    <button
                        type="button"
                        className="portfolio-carousel-dot portfolio-carousel-back"
                        aria-label={data.portfolio.controls.previous_projects}
                        onClick={() => showProjectPage(-1)}
                        disabled={currentPage === 0}
                    />
                    <button
                        type="button"
                        className="portfolio-carousel-dot portfolio-carousel-next"
                        aria-label={data.portfolio.controls.next_projects}
                        onClick={() => showProjectPage(1)}
                        disabled={currentPage === lastPage}
                    />
                </h3>
                <div className="projects">
                    <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                        <motion.ul
                            className="projects-list"
                            key={currentPage}
                            custom={slideDirection}
                            variants={carouselVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                        >
                            {projectPages[currentPage].map((project) => (
                                <ProjectCard key={project.id} project={project} onOpenModal={setActiveModalProject} />
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </div>
                <hr className="separator" />
                <div className="github-profile">
                    <a href="https://github.com/skoulasp" target="_blank" rel="noreferrer" className="link">
                        {data.portfolio.gh_profile}
                    </a>
                </div>
            </article>
            <AnimatePresence>
                {activeModalProject && (
                    <PortfolioProjectModal
                        project={activeModalProject}
                        closeLabel={data.portfolio.controls.close_modal}
                        onClose={() => setActiveModalProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;
