import { useEffect } from "react";

function Skillsbox({ technology, img, paragraph }) {
    const technologyToLowerCase = technology.split(" ")[0].toLowerCase();

    useEffect(() => {
        const handleMouseEnter = (e) => {
            const el = e.target.closest(".skills-box");
            let count = parseInt(el.dataset.mouseEnterCount || 0);

            if (count >= 1) return;

            el.classList.add("tilt");
            setTimeout(() => {
                el.classList.remove("tilt");
                count++;
                el.dataset.mouseEnterCount = count;
            }, 500);
        };

        const els = document.querySelectorAll(".skills-box");
        els.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
        });

        return () => {
            els.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
            });
        };
    }, []);

    return (
        <div className={`skills-box ${technologyToLowerCase}`} data-mouse-enter-count="0">
            <div className="section-heading-4">
                <h4>{technology}</h4>
            </div>
            <div className="skills-text">{paragraph}</div>
            <div className="skill-img-container">
                <img src={img} alt={technology} className="skill-img" />
            </div>
        </div>
    );
}

export default Skillsbox;
