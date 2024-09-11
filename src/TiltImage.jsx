import { useState } from "react";

function TiltImage({ imageUrl, caption, introAnimationsActive }) {
    const [transform, setTransform] = useState("perspective(1500px) scale(1) rotateX(0) rotateY(0)");

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const width = el.clientWidth;
        const height = el.clientHeight;
        const xVal = e.nativeEvent.layerX;
        const yVal = e.nativeEvent.layerY;
        const maxRotation = 25;
        const yRotation = Math.max(-maxRotation, Math.min(maxRotation, 40 * ((xVal - width / 2) / width)));
        const xRotation = Math.max(-maxRotation, Math.min(maxRotation, -40 * ((yVal - height / 2) / height)));

        const newTransform = `perspective(1500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        setTransform(newTransform);
    };

    const handleMouseOut = () => {
        setTransform("perspective(1500px) scale(1) rotateX(0) rotateY(0)");
    };

    const handleMouseDown = () => {
        setTransform("perspective(1500px) scale(0.95) rotateX(0) rotateY(0)");
    };

    const handleMouseUp = () => {
        setTransform("perspective(1500px) scale(1.05) rotateX(0) rotateY(0)");
    };

    return (
        <div
            className={`tilt-container ${introAnimationsActive ? "polaroid-img-enter" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <figure
                className="image-container"
                style={{
                    transform,
                    transition: "transform 0.3s ease-out",
                }}
            >
                <img src={imageUrl} alt="Petros Skoulas, web developer" />
                <figcaption className="image-caption">{caption}</figcaption>
            </figure>
        </div>
    );
}

export default TiltImage;
