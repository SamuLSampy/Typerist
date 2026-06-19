const configItens = document.querySelectorAll(".config-checkbox");

const defaultConfig = {
    parallax: true,
    firefly: true,
    explosion: true
};

if (localStorage.getItem("preferences") === null) {
    localStorage.setItem("preferences", JSON.stringify(defaultConfig));
}

function getPreferences() {
    return JSON.parse(localStorage.getItem("preferences")) || defaultConfig;
}

function updatePreferences(key, value) {
    const preferences = getPreferences();

    const newPreferences = {
        ...preferences,
        [key]: value
    };

    localStorage.setItem("preferences", JSON.stringify(newPreferences));

    window.dispatchEvent(new CustomEvent("preferences:change", {
        detail: newPreferences
    }));
}

const preferences = getPreferences();

configItens.forEach((el) => {
    const key = el.dataset.config;

    el.checked = preferences[key];

    el.addEventListener("change", () => {
        updatePreferences(key, el.checked);
    });
});