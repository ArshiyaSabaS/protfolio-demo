/* =========================================================
   ARSHIYA SABA — FRONTEND DEVELOPER PORTFOLIO
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. DOM ELEMENTS
   ========================================================= */

const header = document.querySelector(".site-header");

const menuToggle = document.querySelector(".menu-toggle");

const mobileNav = document.querySelector(".mobile-nav");

const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

const sections = document.querySelectorAll("main section[id]");


/* =========================================================
   02. STICKY HEADER
   Adds a background when the user scrolls.
   ========================================================= */

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();



/* =========================================================
   03. MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    const isOpen =
        menuToggle.classList.toggle("active");

    mobileNav.classList.toggle("open");

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

}


menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);



/* =========================================================
   04. CLOSE MOBILE MENU
   When a mobile navigation link is clicked.
   ========================================================= */

mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});



/* =========================================================
   05. ESCAPE KEY
   Allows the user to close the mobile menu with Escape.
   ========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        mobileNav.classList.contains("open")
    ) {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});



/* =========================================================
   06. ACTIVE NAVIGATION
   Highlights the navigation item for the section
   currently visible on screen.
   ========================================================= */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.desktop-nav a[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();



/* =========================================================
   07. SCROLL REVEAL
   Adds reveal animation to important elements.
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-intro, " +
    ".about-statement, " +
    ".about-copy, " +
    ".capability, " +
    ".project, " +
    ".skill-item, " +
    ".experience-layout, " +
    ".learning-grid > div, " +
    ".contact-content"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});



const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   08. STAGGER CAPABILITY ANIMATION
   Gives each capability a slightly different delay.
   ========================================================= */

const capabilities =
    document.querySelectorAll(".capability");


capabilities.forEach((item, index) => {

    item.style.transitionDelay =
        `${index * 80}ms`;

});



/* =========================================================
   09. STAGGER SKILLS ANIMATION
   ========================================================= */

const skillItems =
    document.querySelectorAll(".skill-item");


skillItems.forEach((item, index) => {

    item.style.transitionDelay =
        `${index * 60}ms`;

});



/* =========================================================
   10. PROJECT VISUAL INTERACTION
   Adds subtle movement based on mouse position.
   ========================================================= */

const projectVisuals =
    document.querySelectorAll(".project-visual");


projectVisuals.forEach(project => {

    project.addEventListener(
        "mousemove",
        event => {

            const rect =
                project.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -1.5;

            const rotateY =
                ((x - centerX) / centerX) * 1.5;


            project.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            project.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            project.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            project.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        }
    );

});



/* =========================================================
   11. SMOOTH ANCHOR SCROLL
   Keeps navigation scrolling clean and consistent.
   ========================================================= */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});



/* =========================================================
   12. CONTACT EMAIL
   Prevents placeholder email from being accidentally used.
   ========================================================= */

const contactEmail =
    document.querySelector(".contact-email");


if (contactEmail) {

    contactEmail.addEventListener(
        "click",
        event => {

            const href =
                contactEmail.getAttribute("href");


            if (
                href ===
                "mailto:your-email@example.com"
            ) {

                event.preventDefault();

                alert(
                    "Your email address will be added here."
                );

            }

        }
    );

}



/* =========================================================
   13. PROJECT LINKS
   Prevents placeholder "#" links from jumping to the top.
   ========================================================= */

const placeholderLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


placeholderLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

        }
    );

});



/* =========================================================
   14. CURRENT YEAR
   Automatically updates the footer year.
   ========================================================= */

const footerYear =
    document.querySelector(
        ".footer-container p:last-child"
    );


if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()}`;

}



/* =========================================================
   15. INITIAL PAGE STATE
   Makes sure the header and navigation are ready
   immediately after loading.
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        handleHeaderScroll();

        updateActiveNavigation();

    }
);