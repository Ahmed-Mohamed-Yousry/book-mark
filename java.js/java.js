var productNameSite = document.getElementById('siteName');
var productUrlSite = document.getElementById('siteUrl');
var addButton = document.getElementById('addpro');
var errorBox = document.getElementById('errorBox');
var productContainer;
var closeError = document.getElementById('closeError');


if (localStorage.getItem("products") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayproducts(productContainer);
}
function addproduct() {
    if(productNameSite.value == ''||productUrlSite.value == '' || productUrlSite.classList.contains('is-invalid')||productNameSite.classList.contains('is-invalid')) {
        errorBox.classList.remove('d-none')
    }else{
        var product = {
        code: productNameSite.value,
        url: productUrlSite.value,
    }
    productContainer.push(product);
    localStorage.setItem('products', JSON.stringify(productContainer));

    clearall();
    displayproducts(productContainer);
    validateInputs()

    }
    
}


function clearall() {
    productNameSite.value = null
    productUrlSite.value = null
}

function displayproducts(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        var http= 'https://'+(arr[i].url)
        cartona += `
        <tr>
          <td>${i + 1} </td>
          <td>${arr[i].code}</td>
          <td>  <a class="btn btn-warning text-white" href="${http}"><i class="fa-solid fa-eye"></i> visit </a> </td>
          <td> <button onclick=" deleteproduct(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i> Delete </button></td>
        </tr>
        `
    }
    document.getElementById('myRow').innerHTML = cartona;
}

function deleteproduct(deletindex) {
    productContainer.splice(deletindex, 1);
    displayproducts(productContainer);
    localStorage.setItem('products', JSON.stringify(productContainer));
}

function validateInputs(element) {

    var regex = {
        siteName: /^[a-z]{3,}$/,
        siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    }
    if (regex[element.id].test(element.value) == true) {
        console.log("match");
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementsibiling.classList.replace('d-block', 'd-none');
        return true;
    } 
    else {
        console.log(" no match");
  
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementsibiling.classList.replace('d-none' , 'd-block');
        return true;
    } 
  }

  closeError.addEventListener('click', function(){
    errorBox.classList.add('d-none')
  })