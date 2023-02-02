// get total
// create product
// save localstorage
// clear input
// read
// count
// delete
// update
// search
// clean data

// CREATE STATUS FOR APP
let statusApp = "create";
// CREATE GLOBAL VAR FOR INDEX MY UPDATE  ITEM
let tmp;

// --------inputs id---------
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const total = document.getElementById("total");

// get total
function getTotal() {
  if (price.value >= 1) {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#10f12b";
    // console.log(price.value)
  } else {
    total.innerHTML = " ";
    total.style.backgroundColor = "#f03304";
  }
}

// clear input
onload = clearData();

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
 
    const newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (statusApp === "create") {
    // to repeat count
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
    // set in localStorage
    localStorage.setItem("product", JSON.stringify(dataPro));
    clearData();
    showData();
    // return submit input to creat
    submit.innerHTML = "creat";
    // ----------------------

    // turn on input get count
    count.style.display = "block";
    // ----------------------
  } else if (statusApp === "update") {
    dataPro[tmp]=newPro;
    getTotal();
    showData();
    clearData();

  // ----------------------
  // turn off get count
  count.style.display = "block";
  // ----------------------
  submit.innerHTML = "Create";
  //   CHANGE STATUS APP
  statusApp = "create";
  localStorage.setItem("product", JSON.stringify(dataPro));
  }
};

function clearData() {
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  title.value = "";
  count.value = "";
  category.value = "";
}

//   read---
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
                    <tr >
                        <td> ${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="updata" onclick="update(${i})">update</button></td>
                        <td><button id="delete" onclick="removeItem(${i})" >delete</button></td>
                    </tr>
                `;
  }

  document.getElementById("tbody").innerHTML = table;
  const clear = document.getElementById("clear");
  if (dataPro.length > 0) {
    clear.innerHTML = `<button id="delete" onclick="clearAll()" >Delete All (${dataPro.length})</button>`;
  }
}
showData();
//   delete item---
function removeItem(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//   delete item---
//   delete all---
function clearAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
  clear.innerHTML = ` `;
}
//   delete all---

// update the data
function update(i) {
  scroll({top:0})
  //   up the data
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  total.value = dataPro[i].total;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  // ----------------------
  // turn on get total
  getTotal();
  // ----------------------
  // turn off get count
  count.style.display = "none";
  // ----------------------
  submit.innerHTML = "Update";
  //   CHANGE STATUS APP
  statusApp = "update";
//   tem == i 
tmp= i;
}
//  search--------------------------------------------------------------------
let searchMood = "title";

function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.value = "";
  showData();
}
function search(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
                <tr >
                    <td> ${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="updata" onclick="update(${i})">update</button></td>
                    <td><button id="delete" onclick="removeItem(${i})" >delete</button></td>
                </tr>
            `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.includes(value)) {
          table += `
                  <tr >
                      <td> ${i + 1}</td>
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button id="updata" onclick="update(${i})">update</button></td>
                      <td><button id="delete" onclick="removeItem(${i})" >delete</button></td>
                  </tr>
              `;
        }
      }
  }

  document.getElementById("tbody").innerHTML = table;
}
