import { useState, useRef, useEffect, useContext, forwardRef } from "react";
import { LanguageContext } from "./App";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

const Contact = forwardRef(({ lang }, ref) => {
    const data = useContext(LanguageContext);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [initialRender, setInitialRender] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    // const isExitingRef = useRef(false);
    useEffect(() => {
        if (isFormVisible) {
            setInitialRender(false);
        }
    }, [initialRender, isFormVisible]);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const formRef = useRef(null);
    const recaptcha = useRef(null);

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
        setTimeout(() => {
            setFormState({
                name: "",
                email: "",
                message: "",
                username: "",
            });

            if (recaptcha.current) {
                recaptcha.current.reset();
                setCaptchaValue(null);
            }
        }, 1000);
    };

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
        username: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formState["username"]) {
            console.warn("Bot detected! Form submission aborted.");
            setFormState({ name: "", email: "", message: "", username: "" });
            return;
        }

        if (!captchaValue) {
            alert("Please complete the CAPTCHA");
            return;
        }

        if (formState.name.length < 2 || formState.name.length > 50) {
            alert("Name must be between 2 and 50 characters.");
            return;
        }

        if (formState.message.length < 50 || formState.message.length > 3000) {
            alert("Message must be between 50 and 3000 characters.");
            return;
        }

        setIsSubmitting(true);

        emailjs
            .send("service_q6wtdao", "template_6cqpvjc", formState, "SsljfYS9St-XeFKF7")
            .then(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    setIsSubmitted(true);

                    setSubmissionError(false);
                    setTimeout(() => {
                        setIsExiting(false);
                    }, 500);
                    setFormState({ name: "", email: "", message: "", username: "" });
                }, 500);
            })
            .catch((error) => {
                console.error("Form submission error: " + error.message);
                setIsExiting(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    setSubmissionError(true);
                    setTimeout(() => {
                        setIsExiting(false);
                    }, 500);

                    setFormState({ name: "", email: "", message: "", username: "" });
                }, 500);
            });
    };

    return (
        <section id="contact" className={`contact ${lang === "el" ? "greek" : ""}`} ref={ref}>
            <div className="heading-area">
                <h2>{data.contact.section_heading}</h2>
            </div>
            <article className="container">
                <div className="contact-info-wrapper">
                    <div className={`contact-info-content ${!initialRender && (isFormVisible ? "rotate" : "rotate-opposite")}`}>
                        <h3 className="contact-info-wrapper-heading">{data.contact.contact_media_heading}</h3>
                        <ul className="contact-info-list">
                            <li className="contact-list-item-wrapper name">
                                <span className="desc name">{data.contact.label}</span>
                            </li>
                            <li className="separator"></li>
                            <li className="contact-list-item-wrapper email">
                                <span className="desc">{data.contact.email_label}</span>{" "}
                                <a href="mailto:skoulasp@gmail.com" className="contact-item email">
                                    skoulasp@gmail.com
                                </a>
                            </li>
                            <li className="separator"></li>
                            <li className="contact-list-item-wrapper phone">
                                <span className="desc">{data.contact.phone_label}</span>{" "}
                                <a href="tel:+306932482249" className="contact-item phone">
                                    +306932482249
                                </a>
                            </li>
                            <li className="separator"></li>
                            <li className="contact-list-item-wrapper im">
                                <span className="desc">{data.contact.im_label}</span>{" "}
                                <a href="http://m.me/petros.skoulas" className="contact-item im">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path
                                            fill="#448AFF"
                                            d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18C43,12.1,34.5,4,24,4z"
                                        ></path>
                                        <path fill="#FFF" d="M12 28L22 17 27 22 36 17 26 28 21 23z"></path>
                                    </svg>
                                </a>
                                <a href="skype:petros.skoulas" className="contact-item im">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path>
                                        <path
                                            fill="#03a9f4"
                                            d="M33.5 22A11.5 11.5 0 1 0 33.5 45 11.5 11.5 0 1 0 33.5 22zM14.5 3A11.5 11.5 0 1 0 14.5 26 11.5 11.5 0 1 0 14.5 3z"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M24.602,36C18,36,15,32.699,15,30.199C15,28.898,15.898,28,17.199,28c2.801,0,2.102,4.102,7.402,4.102c2.699,0,4.199-1.5,4.199-3c0-0.902-0.402-1.902-2.199-2.402l-5.902-1.5C16,24,15.102,21.398,15.102,18.898c0-5.098,4.699-6.898,9.098-6.898C28.301,12,33,14.199,33,17.199c0,1.301-1,2.102-2.301,2.102c-2.398,0-2-3.402-6.801-3.402c-2.398,0-3.797,1.102-3.797,2.703c0,1.598,1.898,2.098,3.598,2.5l4.402,1C32.898,23.199,34,26,34,28.699C33.898,32.898,30.898,36,24.602,36z"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li className="separator"></li>
                            <li className="contact-list-item-wrapper social">
                                <span className="desc">{data.contact.social_label}</span>{" "}
                                <a
                                    href="https://www.linkedin.com/in/skoulasp/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-item social"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>
                                    </svg>
                                </a>{" "}
                                <a href="https://twitter.com/skoulasp" target="_blank" rel="noreferrer" className="contact-item social">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path
                                            fill="#212121"
                                            fillRule="evenodd"
                                            d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                                            clipRule="evenodd"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                                        ></path>
                                        <polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon>
                                        <polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                                    </svg>
                                </a>
                                <a href="https://github.com/skoulasp" target="_blank" rel="noreferrer" className="contact-item social">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <linearGradient
                                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                                            x1="4"
                                            x2="44"
                                            y1="23.508"
                                            y2="23.508"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#4c4c4c"></stop>
                                            <stop offset="1" stopColor="#343434"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                                        ></path>
                                        <path
                                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                                            opacity=".05"
                                        ></path>
                                        <path
                                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                                            opacity=".07"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li className="separator"></li>
                            <li className="contact-list-item-wrapper website">
                                <span className="desc">{data.contact.website}</span>{" "}
                                <a href="petros.skoulas.me" className="contact-item website">
                                    petros.skoulas.me
                                </a>
                            </li>{" "}
                            <li className="separator"></li>
                            <li className="switch">
                                <button className="btn" onClick={handleButtonClick}>
                                    {data.contact.form_use}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div
                        ref={formRef}
                        className={`container form-container ${!initialRender && (isFormVisible ? "rotate-opposite" : "rotate")} ${
                            isExiting ? "formFadeOut" : ""
                        }`}
                        style={{ pointerEvents: isFormVisible ? "auto" : "none" }}
                    >
                        <div className="form-heading">
                            <h3>{data.contact.form_heading}</h3>
                        </div>
                        {isSubmitted ? (
                            <div className="form-submitted-success formFadeIn">
                                <h4>Thank You for Your Message!</h4>
                                <p>
                                    Your message has been successfully submitted. I&apos;ll review it and get back to you as soon as
                                    possible. Thank you for your patience!
                                </p>
                                <div className="btn-div">
                                    <button
                                        className="success-back-btn"
                                        onClick={() => {
                                            setIsFormVisible(!isFormVisible);
                                            setTimeout(() => {
                                                setIsSubmitted(false);
                                            }, 1000);
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {submissionError ? (
                            <div className="form-submitted-failure formFadeIn">
                                <h4>ERROR: The form submission failed!</h4>
                                <p>Please try again later.</p>
                                <div className="btn-div">
                                    <button
                                        className="failure-back-btn"
                                        onClick={() => {
                                            setIsFormVisible(!isFormVisible);
                                            setTimeout(() => {
                                                setSubmissionError(false);
                                            }, 1000);
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <form
                            ref={formRef}
                            name="contact"
                            className={`contact-form ${isExiting ? "formFadeOut" : ""}`}
                            id="contact-form"
                            onSubmit={handleSubmit}
                            style={{ visibility: isSubmitted || submissionError ? "hidden" : "visible" }}
                        >
                            <input
                                type="text"
                                name="username"
                                style={{ display: "none" }}
                                onChange={handleInputChange}
                                value={formState["username"] || ""}
                                disabled={isSubmitting}
                            />
                            <div className="form-group">
                                <fieldset>
                                    <legend>
                                        <label htmlFor="name">{data.contact.form_name_label}</label>
                                    </legend>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        minLength="2"
                                        maxLength="50"
                                        spellCheck="false"
                                        placeholder={data.contact.form_name_placeholder}
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    />
                                </fieldset>
                            </div>
                            <div className="form-group">
                                <fieldset>
                                    <legend>
                                        <label htmlFor="email">{data.contact.form_email_label}</label>
                                    </legend>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        spellCheck="false"
                                        placeholder={data.contact.form_email_placeholder}
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    />
                                </fieldset>
                            </div>
                            <div className="form-group">
                                <fieldset>
                                    <legend>
                                        <label htmlFor="message">{data.contact.form_message_label}</label>{" "}
                                    </legend>
                                    <textarea
                                        id="message"
                                        name="message"
                                        minLength="50"
                                        maxLength="3000"
                                        placeholder={data.contact.form_message_placeholder}
                                        value={formState.message}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    ></textarea>{" "}
                                </fieldset>
                            </div>
                            <div className="ReCAPTCHA">
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    ref={recaptcha}
                                    onChange={handleCaptchaChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="btn-group">
                                <button
                                    type="submit"
                                    className={`button submit ${isSubmitting ? "submitting" : ""}`}
                                    disabled={isSubmitting}
                                >
                                    {data.contact.form_submit_label}
                                </button>
                                <button type="button" className="button cancel" onClick={handleButtonClick} disabled={isSubmitting}>
                                    {data.contact.form_cancel_label}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </section>
    );
});

Contact.displayName = "Contact";

export default Contact;
