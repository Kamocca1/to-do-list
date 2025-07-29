export default function menuTab() {
    const menuDiv = document.createElement("div");
    const headline = document.createElement("h1");
    headline.textContent = "Menu";
    const menuList = document.createElement("ul");
    const items = [
        {
            name: "Grilled Salmon",
            desc: "Fresh salmon with lemon butter sauce",
        },
        { name: "Steak Frites", desc: "Juicy steak with crispy fries" },
        {
            name: "Caesar Salad",
            desc: "Classic salad with house-made dressing",
        },
        {
            name: "Chocolate Lava Cake",
            desc: "Warm cake with gooey chocolate center",
        },
    ];
    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.name}</strong>: ${item.desc}`;
        menuList.appendChild(li);
    });
    menuDiv.appendChild(headline);
    menuDiv.appendChild(menuList);
    return menuDiv;
}
