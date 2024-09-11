import { forwardRef, useEffect, useContext } from "react";
import { LanguageContext } from "./App";

const Services = forwardRef(({ lang }, ref) => {
    const data = useContext(LanguageContext);
    useEffect(() => {
        const handleMouseEnter = (e) => {
            const el = e.target.closest(".services-wrapper");
            if (!el.classList.contains("scaleUp")) {
                el.classList.add("scaleUp");
                el.closest("section").classList.add("blur");
            }
        };

        const handleMouseLeave = (e) => {
            const el = e.target.closest(".services-wrapper");
            if (el.classList.contains("scaleUp")) {
                el.classList.remove("scaleUp");
                el.classList.add("scaleDown");
                el.closest("section").classList.add("unblur");
                el.closest("section").classList.remove("blur");
                setTimeout(() => {
                    el.classList.remove("scaleDown");
                    el.closest("section").classList.remove("unblur");
                }, 500);
            }
        };

        const els = document.querySelectorAll(".services-wrapper");
        els.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            els.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <section id="services" className={`services ${lang === "el" ? "greek" : ""}`} ref={ref}>
            <div className="heading-section">
                <h2 className="services">{data.services.title}</h2>
            </div>
            <div className="content-wrap">
                <article className="services-wrapper react">
                    <div className="heading-area react">
                        <h3>{data.services.front_end_development.title}</h3>
                    </div>
                    <div className="body-content">
                        <div className="card-wrapper react">
                            <h4 className="list-item-heading">{data.services.front_end_development.heading}</h4>
                            <ul className="wp-list">
                                {data.services.front_end_development.details.map((detail, i) => (
                                    <li key={i} className="item">
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
                <article className="services-wrapper css">
                    <div className="heading-area css">
                        <h3>{data.services.css_specific_projects.title}</h3>
                    </div>
                    <div className="body-content">
                        <div className="card-wrapper css">
                            <h4 className="list-item-heading">{data.services.css_specific_projects.heading}</h4>
                            <ul className="wp-list">
                                {data.services.css_specific_projects.details.map((detail, i) => (
                                    <li key={i} className="item">
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
                <article className="services-wrapper wordpress">
                    <div className="heading-area wordpress">
                        <h3>{data.services.wordpress_development.title}</h3>
                    </div>
                    <div className="body-content">
                        <div className="card-wrapper wordpress">
                            <h4 className="list-item-heading">{data.services.wordpress_development.heading}</h4>
                            <ul className="wp-list">
                                {data.services.wordpress_development.details.map((detail, i) => (
                                    <li key={i} className="item">
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
});

Services.displayName = "Services";

export default Services;
