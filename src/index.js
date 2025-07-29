import homeTab from "./page-load";
import menuTab from "./menu";
import aboutTab from "./about";
import "./style.css";

function setTab(tabFn, btn) {
    const content = document.querySelector("#content");
    content.innerHTML = "";
    content.appendChild(tabFn());
    // Highlight active button
    document
        .querySelectorAll("nav button")
        .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const [homeBtn, menuBtn, aboutBtn] =
        document.querySelectorAll("nav button");
    homeBtn.addEventListener("click", () => setTab(homeTab, homeBtn));
    menuBtn.addEventListener("click", () => setTab(menuTab, menuBtn));
    aboutBtn.addEventListener("click", () => setTab(aboutTab, aboutBtn));
    setTab(homeTab, homeBtn); // Default to Home
});
