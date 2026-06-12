const root = document.documentElement;
const THEME_KEY = "theme-preference";
const toggleButton = document.getElementById("theme-toggle");

function getInitialTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeUi(theme) {
    const isDark = theme === "dark";
    toggleButton.textContent = isDark ? "Light mode" : "Dark mode";
    toggleButton.setAttribute("aria-pressed", String(isDark));
    toggleButton.setAttribute("aria-label", isDark ? "Enable light mode" : "Enable dark mode");
}

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeUi(theme);
}

if (toggleButton) {
    setTheme(getInitialTheme());

    toggleButton.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });
}

const interactiveElements = document.querySelectorAll(
    ".hero-content, .section-container, .career-item, .shows-list li"
);

interactiveElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

interactiveElements.forEach((element) => observer.observe(element));
