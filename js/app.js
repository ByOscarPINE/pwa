const container = document.querySelector(".container");

const coffees = [
  { name: "Espresso", image: "images/01-espresso.jpg" },
  { name: "Cappuccino", image: "images/02-cappuccino.jpg" },
  { name: "Iced Coffee", image: "images/03-iced-coffee.jpg" },
  { name: "Coffee Beans", image: "images/04-coffee-beans.jpg" },
  { name: "French Press", image: "images/05-french-press.jpg" },
  { name: "Turkish Coffee", image: "images/06-turkish-coffee.jpg" },
  { name: "Latte Art", image: "images/07-latte-art.jpg" },
  { name: "Americano", image: "images/08-americano.jpg" },
  { name: "Pour Over", image: "images/09-pour-over.jpg" }
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card-img" src="${image}" alt="${name}" />
                <div class="card-body">
                  <h3 class="card-title">${name}</h3>
                </div>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);
