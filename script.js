document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const setHiddenState = (el) => {
        el.style.opacity = "0";
        if (el.classList.contains("fade-up")) {
            el.style.transform = "translateY(40px)";
        } else if (el.classList.contains("fade-left")) {
            el.style.transform = "translateX(-40px)";
        } else if (el.classList.contains("fade-right")) {
            el.style.transform = "translateX(40px)";
        } else if (el.classList.contains("zoom")) {
            el.style.transform = "scale(0.5)";
        } else {
            el.style.transform = "translate(0, 40px)";
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = "all 0.9s ease-out";
                entry.target.style.opacity = "1";

                if (entry.target.classList.contains("zoom")) {
                    entry.target.style.transform = "scale(1)";
                } else {
                    entry.target.style.transform = "translate(0,0)";
                }
            } else {
                setHiddenState(entry.target);
            }
        });
    });

    reveals.forEach(el => {
        setHiddenState(el);
        observer.observe(el);
    });
});
