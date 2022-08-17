const newItem = document.getElementById("new-item");
const form = document.getElementById("form");

newItem.addEventListener("click", () => {
  form.classList.remove("hidden");
  newItem.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Form Values
  const priceInput = document.getElementById("price").value;
  const storeInput = document.getElementById("store").value;
  const itemInput = document.getElementById("item").value;

  // Confirm
  const confirm = window.confirm(
    `Er du sikker på at du vil tilføje: ${itemInput} fra ${storeInput} med en pris på Kr ${priceInput}?`
  );

  if (confirm) {
    // save to local storage
    const item = {
      id: Math.floor(Math.random() * 1000000),
      price: priceInput,
      store: storeInput,
      item: itemInput,
    };
    let items = [];
    if (localStorage.getItem("items") === null) {
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem("items"));
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    }
    // Clear form
    document.getElementById("form").reset();
    // Hide form
    form.classList.add("hidden");
    // Show new item button
    newItem.classList.remove("hidden");

    window.reload();
    alert("Tilføjet til liste");
  } else {
    alert("Du har afbrudt");
  }
});

const List = document.getElementById("list");

const items = JSON.parse(localStorage.getItem("items"));

if (items.length == 0) {
  List.innerHTML = `<p style="color: #444">Ingen varer i liste</p>`;
}

items.forEach((item) => {
  const ul = document.getElementById("ul");
  const li = document.createElement("li");
  li.classList.add("list-group-item");

  li.setAttribute("id", item.id);
  li.innerHTML = `
  
   <strong>Varer:</strong> <span>${item.item}</span><br>
   <strong>Butik:</strong> <span>${item.store}</span> <br>
   <strong>Pris:</strong> <span>${item.price} Kr</span> <br>
   <button id="delete" class="delete">Slet</button>
    
  `;
  ul.appendChild(li);
});

// Delete an item from local storage
const deleteBtn = document.getElementsByClassName("delete");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", (e) => {
    const id = e.target.parentElement.getAttribute("id");

    const items = JSON.parse(localStorage.getItem("items"));

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items.splice(i, 1);
      }
    }
    localStorage.setItem("items", JSON.stringify(items));
    e.target.parentElement.remove();

    window.reload();
    alert("Vare slettet");
  }),
    (e) => {
      alert("Du har afbrudt");
    };
}

const total = document.getElementById("total");

const totalPrice = items.reduce((acc, item) => {
  return acc + parseInt(item.price);
}, 0);

total.innerHTML = `Total: <strong>${totalPrice}</strong>`;
