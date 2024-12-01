// //==================== بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ====================\\ ||
const errorMsg = document.getElementById("errorAlert");
const alertMsg = document.getElementById("alert");
const createBtn = document.getElementById("create");
const total = document.getElementById("total");
const allInputs = document.querySelectorAll("input");
const title = document.getElementById("title");
const price = document.getElementById("price");
const ads = document.getElementById("ads");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const count = document.getElementById("count");
const category = document.getElementById("category");
const table = document.getElementById("table");
const delBtn = document.getElementById("deleteAll");
const search = document.getElementById("search");
let createMode = true;
let updateIndex;
let searchMode = "title";
calculteTotal = () => {
  if (price.value > 0) {
    totalPrice = +price.value + +ads.value + +tax.value - +discount.value;
    total.textContent = totalPrice;
    total.style.backgroundColor = "#040";
  } else {
    total.textContent = "Please Enter the Price";
    total.style.backgroundColor = "red";
  }
};
priceInputs = [price, ads, tax, discount];
priceInputs.forEach((element) => {
  element.addEventListener("input", calculteTotal);
});
clearInputs = () => {
  allInputs.forEach((element) => {
    element.value = "";
  });
};
let productData;
localStorage.product != null
  ? (productData = JSON.parse(localStorage.product))
  : (productData = []);

createProduct = () => {};

showProduct = () => {
  let tableContainer = "";
  let productData = JSON.parse(localStorage.product);
  if (productData.length === 0) {
    table.innerHTML = "";
    return;
  }
  productData.forEach((element, i) => {
    tableContainer += `<tr>
              <td>${i}</td>
              <td>${element.title}</td>
              <td>${element.price}</td>
              <td>${element.ads}</td>
              <td>${element.tax}</td>
              <td>${element.discount}</td>
              <td>${element.category}</td>
              <td>${element.total}</td>
              <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
              <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
    `;
  });
  table.innerHTML = tableContainer;
};
deleteProduct = (i) => {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  showProduct();
};

createBtn.addEventListener("click", function () {
  if (
    title.value.trim() === "" &&
    category.value.trim() === "" &&
    price.value.trim() === ""
  ) {
    errorMsg.classList.remove("animation");
    void errorMsg.offsetWidth;
    errorMsg.classList.add("animation");
  } else {
    let newProduct = {
      title: title.value.toLowerCase(),
      price: price.value,
      ads: ads.value,
      tax: tax.value,
      discount: discount.value,
      count: count.value || 1,
      category: category.value.toLowerCase(),
      total: total.innerHTML,
    };
    if (createMode === true) {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else {
      productData[updateIndex] = newProduct;
      count.style.display = "block";
      createBtn.innerHTML = "Create";
      createBtn.style.backgroundColor = "rgb(12, 12, 68)";
      createBtn.style.color = "white";
      createMode = true;
    }

    localStorage.setItem("product", JSON.stringify(productData));
    alertMsg.classList.remove("animation");
    void alertMsg.offsetWidth;
    alertMsg.classList.add("animation");
  }
  clearInputs();
  showProduct();
  if (productData.length > 0) {
    delBtn.innerHTML = `<button onclick="deleteAll()">Delete all</button>`;
  } else {
    delBtn.textContent = "";
  }
});
if (productData.length > 0) {
  delBtn.innerHTML = `<button onclick="deleteAll()">Delete all</button>`;
} else {
  delBtn.textContent = "";
}
deleteAll = () => {
  localStorage.clear();
  productData.splice(0);
  delBtn.innerHTML = "";
};
delBtn.onclick = () => {
  location.reload();
};
showProduct();

updateProduct = (i) => {
  title.value = productData[i].title;
  price.value = productData[i].price;
  tax.value = productData[i].tax;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  category.value = productData[i].category;
  calculteTotal();
  count.style.display = "none";
  createBtn.innerHTML = "update";
  createBtn.style.backgroundColor = "white";
  createBtn.style.color = "black";
  createMode = false;
  updateIndex = i;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

searchType = (id) => {
  if (id === "titleSearch") {
    searchMode = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
};

searchValue = (value) => {
  if (searchMode === "title") {
    let tableContainer = "";
    productData.forEach((element, i) => {
      if (element.title.includes(value)) {
        tableContainer += `<tr>
        <td>${i}</td>
        <td>${element.title}</td>
        <td>${element.price}</td>
        <td>${element.ads}</td>
        <td>${element.tax}</td>
        <td>${element.discount}</td>
        <td>${element.category}</td>
        <td>${element.total}</td>
        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
      </tr>`;
      }
    });
    table.innerHTML = tableContainer;
  } else {
    let tableContainer = "";
    productData.forEach((element, i) => {
      if (element.category.includes(value)) {
        tableContainer += `<tr>
      <td>${i}</td>
      <td>${element.title}</td>
      <td>${element.price}</td>
      <td>${element.ads}</td>
      <td>${element.tax}</td>
      <td>${element.discount}</td>
      <td>${element.category}</td>
      <td>${element.total}</td>
      <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
      <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
    </tr>`;
      }
    });
    table.innerHTML = tableContainer;
  }
};
