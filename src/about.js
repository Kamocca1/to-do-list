export default function aboutTab() {
    const aboutDiv = document.createElement("div");
    const headline = document.createElement("h1");
    headline.textContent = "About Us";
    const aboutText = document.createElement("p");
    aboutText.textContent =
        "Our restaurant was founded in 2020 with a passion for great food and community. We believe in sustainable practices and supporting local farmers. Our team is dedicated to making every guest feel at home.";
    aboutDiv.appendChild(headline);
    aboutDiv.appendChild(aboutText);
    return aboutDiv;
}
