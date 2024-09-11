# Petros Skoulas' Portfolio Website

This is my personal portfolio website, designed to showcase my journey as a front-end web developer and to feature a collection of practice projects I've developed along the way. The site provides information about me, highlights my technical skills, and demonstrates my ability to create custom web solutions.

You can explore the live version of the website [here](https://petros.skoulas.me) or at the default GitHub domain at [skoulasp.github.io](https://skoulasp.github.io).

## Overview

The portfolio is built with **React** and powered by **Vite**, styled using **Sass**. It follows a single-page layout with distinct sections, each serving a unique purpose:

1. **Home**: A brief welcome introduction to the website.
2. **About Me**: Details about my background, education, and professional interests.
3. **Tech Stack**: An overview of the technologies I use and my proficiency in each.
4. **Services**: A summary of the front-end web development services I offer.
5. **Portfolio**: A collection of projects showcasing my work.
6. **Contact Me**: Information on how to get in touch with me, including a contact form.

## Key Features

### Dynamic Navbar

The website includes an interactive, responsive navigation bar that adapts to user interaction:

-   **Mouse Hover**: The navbar appears smoothly when the mouse approaches the top of the page, then disappears after a brief period of inactivity.
-   **Click Interaction**: Clicking anywhere on the navbar (outside of links) locks it into a sticky position, enabling it to remain fixed at the top while scrolling.
-   **Scroll Behavior**: Once the navbar is locked by the user’s click, it stays sticky during scrolling. This functionality also activates automatically when accessed from a mobile device, providing a consistent navigation experience.
-   **Mobile View**: On mobile devices, a sticky navbar is accompanied by a hamburger menu to optimize the user experience, making navigation easier in smaller screen dimensions.

### Intersection Observers

Intersection observers are used to enhance the experience by dynamically updating the URL to reflect the current section being viewed. Additionally, the corresponding navbar item is highlighted, offering clear navigation feedback.

## Dependencies

Here are the core dependencies used in the project:

### Main Dependencies

-   **[React](https://reactjs.org/)**: The main framework used for building the UI.
-   **[React DOM](https://reactjs.org/docs/react-dom.html)**: Manages DOM rendering.
-   **[React Router DOM](https://reactrouter.com/web/guides/quick-start)**: Handles page navigation.
-   **[React Router Hash Link](https://www.npmjs.com/package/react-router-hash-link)**: Facilitates smooth scrolling to different sections of the page.
-   **[Framer Motion](https://www.framer.com/motion/)**: Used for animations, particularly to animate color changes during scroll.
-   **[React Google reCAPTCHA](https://www.npmjs.com/package/react-google-recaptcha)**: Adds Google's reCAPTCHA to secure the website's contact form.
-   **[EmailJS](https://www.emailjs.com/)**: Allows receiving form data directly to my email address without needing a server.
-   **[Mobile Detect](https://www.npmjs.com/package/mobile-detect)**: Detects device types to handle mobile-specific functionality.

### Dev Dependencies

-   **[@vitejs/plugin-react-swc](https://vitejs.dev/)**: The plugin for enabling React in Vite.
-   **[Sass](https://sass-lang.com/)**: The CSS preprocessor used for styling.
-   **[ESLint](https://eslint.org/)** and **[ESLint plugins](https://www.npmjs.com/package/eslint-plugin-react)**: For enforcing code quality and best practices.

## License

This project is licensed under the [MIT License](LICENSE.md).

---

Feel free to explore my portfolio website and reach out for collaborations or inquiries!

_Petros Skoulas_
