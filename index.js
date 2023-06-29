let buttons = document.querySelectorAll("button");

const titleInput = document.querySelector(".input__title");
const priceInput = document.querySelector(".input__price");
const taxInput = document.querySelector(".input__taxes");
const adsInput = document.querySelector(".input__ads");
const discountInput = document.querySelector(".input__discount");
const countInput = document.querySelector(".input__count");
const categoryInput = document.querySelector(".input__category");
const totalOutput = document.querySelector(".output__total");
const totalEl = document.querySelector(".total");
let createBtn = document.getElementsByName("create")[0];

const buttonsElUpdate = () => {
  buttons = document.querySelectorAll("button");
};
const changeHandler = () => {
  let title = titleInput.value;
  let price = +priceInput.value;
  let tax = +taxInput.value;
  let ads = +adsInput.value;
  let discount = +discountInput.value;
  let total = price + tax + ads - discount;
  let count = +countInput.value;
  let category = categoryInput.value;
  totalEl.innerText = total >= 0 ? total : "0";
  title.trim().length > 0
    ? titleInput.classList.add("valid")
    : titleInput.classList.remove("valid");
  tax > 0
    ? taxInput.classList.add("valid")
    : taxInput.classList.remove("valid");
  ads > 0
    ? adsInput.classList.add("valid")
    : adsInput.classList.remove("valid");
  discount > 0
    ? discountInput.classList.add("valid")
    : discountInput.classList.remove("valid");
  price > 0
    ? priceInput.classList.add("valid")
    : priceInput.classList.remove("valid");
  total > 0 && price > 0
    ? totalOutput.classList.add("valid")
    : totalOutput.classList.remove("valid");
  count > 0
    ? countInput.classList.add("valid")
    : countInput.classList.remove("valid");
  category.trim().length > 0
    ? categoryInput.classList.add("valid")
    : categoryInput.classList.remove("valid");
};
const resetInput = () => {
  titleInput.value = "";
  priceInput.value = "";
  taxInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  totalEl.textContent = 0;
  countInput.value = "";
  categoryInput.value = "";
  changeHandler();
};
let products = [];

const createProduct = () => {
  let title = titleInput.value;
  let price = +priceInput.value;
  let tax = +taxInput.value;
  let ads = +adsInput.value;
  let discount = +discountInput.value;
  let total = price + tax + ads - discount;
  let count = +countInput.value;
  count === 0 && `${(count = 1)}`;
  let category = categoryInput.value;

  if (title.trim().length > 0 && price > 0) {
    for (let i = 0; i < count; i++) {
      let product = {
        id: products.length,
        key: products.length,
        title: title,
        price: price,
        tax: tax,
        ads: ads,
        discount: discount,
        total: total,
        count: count,
        category: category,
      };
      products.push(product);
    }
    generateProductRows();
    localStorage.setItem("products", JSON.stringify(products));
    resetInput();
  } else {
    alert("Kindly enter the title and price!");
  }
};
const generateProductRows = () => {
  let table = document.querySelector(".table");

  let tableBody = document.querySelectorAll(".table__body");

  tableBody.forEach((row) => {
    row.remove();
  });

  products.forEach((product) => {
    let rowCell = document.createElement("tr");
    rowCell.classList.add("table__body");
    rowCell.setAttribute("id", product.id);

    // ID cell
    let idCell = document.createElement("td");
    idCell.innerText = product.id;
    rowCell.appendChild(idCell);
    // Title cell
    let titleCell = document.createElement("td");
    titleCell.innerText = product.title;
    rowCell.appendChild(titleCell);

    // Price cell
    let priceCell = document.createElement("td");
    priceCell.innerText = product.price;
    rowCell.appendChild(priceCell);

    //Tax cell
    let taxCell = document.createElement("td");
    taxCell.innerText = product.tax;
    rowCell.appendChild(taxCell);

    //Ads cell
    let adsCell = document.createElement("td");
    adsCell.innerText = product.ads;
    rowCell.appendChild(adsCell);

    //Discount cell
    let discountCell = document.createElement("td");
    discountCell.innerText = product.discount;
    rowCell.appendChild(discountCell);

    //Total cell
    let totalCell = document.createElement("td");
    totalCell.innerText = product.total;
    rowCell.appendChild(totalCell);

    //Category cell
    let categoryCell = document.createElement("td");
    categoryCell.innerText = product.category;
    rowCell.appendChild(categoryCell);

    // Update button

    let updateCell = document.createElement("td");
    updateCell.classList.add("center");
    updateCell.classList.add("btn");
    let updateBtn = document.createElement("button");
    updateBtn.name = "update";
    updateBtn.type = "button";
    updateBtn.textContent = "Update";
    updateBtn.classList.add(product.id);
    updateBtn.addEventListener("click", () => getProductUpdate(product));
    updateCell.appendChild(updateBtn);
    rowCell.appendChild(updateCell);

    // Delete button

    let deleteCell = document.createElement("td");
    deleteCell.classList.add("center");
    deleteCell.classList.add("btn");
    let deleteBtn = document.createElement("button");
    deleteBtn.name = "delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(product.id);
    deleteBtn.addEventListener("click", () => deleteProduct(product.id));
    deleteCell.appendChild(deleteBtn);
    rowCell.appendChild(deleteCell);
    table.appendChild(rowCell);
  });
  buttonsElUpdate();
};
const getProductUpdate = (product) => {
  getProducts();
  titleInput.value = product.title;
  priceInput.value = product.price;
  taxInput.value = product.tax;
  adsInput.value = product.ads;
  discountInput.value = product.discount;
  totalEl.textContent = product.total;
  countInput.value = 1;
  categoryInput.value = product.category;
  changeHandler();
  let id = product.id;
  products.splice(id, 1);
  for (let i = 0; i < products.length; i++) {
    products[i].id = i;
    products[i].key = i;
  }
  generateProductRows();
  createBtn.textContent = "Update";
  createBtn.name = "update";
  console.log(document.getElementsByName("update"));
  console.log(`Get product: ${product.id}`);
  createBtn.setAttribute("data-product-id", product.id);
  createBtn.addEventListener("click", updateProductHandler);
};
const updateProductHandler = (event) => {
  const productId = event.target.getAttribute("data-product-id");
  updateProduct(productId);
  createBtn.removeAttribute("data-product-id", productId);
};
const updateProduct = (id) => {
  console.log(`Update: ${id}`);
  generateProductRows();
  let title = titleInput.value;
  let price = +priceInput.value;
  let tax = +taxInput.value;
  let ads = +adsInput.value;
  let discount = +discountInput.value;
  let total = price + tax + ads - discount;
  let count = +countInput.value;
  count === 0 && `${(count = 1)}`;
  let category = categoryInput.value;

  if (title.trim().length > 0 && price > 0) {
    for (let i = 0; i < count; i++) {
      let product = {
        id: id + i,
        key: id + i,
        title: title,
        price: price,
        tax: tax,
        ads: ads,
        discount: discount,
        total: total,
        count: count,
        category: category,
      };
      products.splice(id, 0, product);
    }
    let index = 0;
    products.forEach((product) => {
      product.id = index;
      index++;
    });
    console.log(products);
    generateProductRows();
    localStorage.setItem("products", JSON.stringify(products));
    createBtn.textContent = "Create";
    createBtn.name = "create";
    createBtn.addEventListener("click", () => createBtn);
    resetInput();
  }
};
const deleteProduct = (id) => {
  products.splice(id, 1);
  for (let i = 0; i < products.length; i++) {
    products[i].id = i;
    products[i].key = i;
  }
  localStorage.setItem("products", JSON.stringify(products));
  getProducts();
};

const getProducts = () => {
  let storedProducts = JSON.parse(localStorage.getItem("products"));
  if (storedProducts) {
    products = [...storedProducts];
    generateProductRows();
  }
};
getProducts();
// Search section
const searchInputEl = document.querySelector(".input__search");
let type = "title";
const searchType = (event) => {
  type = event.target.name;
  searchProduct();
};
const searchProduct = () => {
  getProducts();
  console.log(type);
  const searchInput = searchInputEl.value.toLowerCase().trim();
  console.log(searchInput);
  let filteredProducts;
  if (type === "title") {
    filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchInput);
    });
  } else {
    filteredProducts = products.filter((product) => {
      return product.category.toLowerCase().includes(searchInput);
    });
  }
  products = [...filteredProducts];
  generateProductRows();
};
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.name === "create" && createProduct();
    (event.target.name === "category" || event.target.name === "title") &&
      searchType(event);
  });
});
titleInput.onkeyup = changeHandler;
priceInput.onkeyup = changeHandler;
taxInput.onkeyup = changeHandler;
adsInput.onkeyup = changeHandler;
discountInput.onkeyup = changeHandler;
countInput.onkeyup = changeHandler;
categoryInput.onkeyup = changeHandler;
searchInputEl.onkeyup = searchProduct;
