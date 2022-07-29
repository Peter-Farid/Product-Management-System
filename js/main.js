var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCatInp = document.getElementById("productCatInp");
var productDescInp = document.getElementById("productDescInp");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var tableBody = document.getElementById("tableBody");

var productsContainer;

if(localStorage.getItem("myProducts") != null)
{
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts(productsContainer);
}
else
{
    productsContainer = [];
}


function addProduct()
{
    if(productNameValidation() == true)
    {
        var product = 
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            cat: productCatInp.value,
            desc: productDescInp.value
        }
        productsContainer.push(product);
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
    }
    else
    {
        window.alert("Product Name Invalid");
    }
}

function displayProducts(productsList)
{
    var container = "";
    for(var i=0; i<productsList.length; i++)
    {
        container += `
        <tr>
            <td>${i}</td>
            <td>${productsList[i].name}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].cat}</td>
            <td>${productsList[i].desc}</td>
            <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa fa-trash-can" aria-hidden="true"></i></button></td>
        </tr>`
    }
    tableBody.innerHTML = container;
}

function clearForm()
{
    productNameInp.value = "";
    productPriceInp.value = "";
    productCatInp.value = "";
    productDescInp.value = "";
    productNameInp.classList.remove("is-valid");
}

function searchProduct(searchTerm)
{
    var searchResults = [];
    for(var i=0; i<productsContainer.length; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            searchResults.push(productsContainer[i]);
        }
    }
    displayProducts(searchResults);
}

function deleteProduct(deleteIndex)
{
    productsContainer.splice(deleteIndex,1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}
var itemUpdateIndex;
function setFormForUpdate(updateIndex)
{
    productNameInp.value = productsContainer[updateIndex].name;
    productPriceInp.value = productsContainer[updateIndex].price;
    productCatInp.value = productsContainer[updateIndex].cat;
    productDescInp.value = productsContainer[updateIndex].desc;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    itemUpdateIndex = updateIndex;
}
function updateProduct(updateIndex)
{
    var product = 
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        cat: productCatInp.value,
        desc: productDescInp.value
    }
    productsContainer[updateIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}


function productNameValidation()
{
    var regex = /^[A-Z][a-z]{3,8}$/
    if(regex.test(productNameInp.value) == true)
    {
        productNameInp.classList.replace("is-invalid","is-valid");
        return true;
    }
    else
    {
        productNameInp.classList.add("is-invalid");
        return false;
    }
}