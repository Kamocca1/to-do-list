import restaurantImg from "./jason-leung-poI7DelFiVA-unsplash-restaurant.jpg";

export default function homeTab() {
    const homeDiv = document.createElement("div");
    const headline = document.createElement("h1");
    headline.textContent = "Restaurant Page";
    const image = document.createElement("img");
    image.setAttribute("src", restaurantImg);
    const description = document.createElement("p");
    description.textContent =
        "Welcome to our cozy bistro, where every meal is a celebration! Enjoy fresh, locally sourced ingredients and a warm, inviting atmosphere. Join us for an unforgettable dining experience.";
    homeDiv.appendChild(headline);
    homeDiv.appendChild(image);
    homeDiv.appendChild(description);
    return homeDiv;
}
