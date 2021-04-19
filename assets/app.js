let gt = document.querySelector("#gt");
let sum = 0;
let sNum = 0;
let myCart = {};
let request = new XMLHttpRequest();

function get() {
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myCart = JSON.parse(this.response);
            myCart.forEach(element => {
                element.total = element.price*element.quantity;
            });
            for(i=0; i<myCart.length; i++) {
                myCart[i].id = i+1;
            }
            render();
            document.querySelector(".btn").addEventListener("click", function(event){
                // event.preventDefault();
                event.stopPropagation();
              });
        }
    }
    request.open('get', 'http://localhost:3000/mycart');
    request.send();
}

function post() {
    let itemName = document.querySelector("#item-name").value;
    let itemPrice = document.querySelector("#item-price").value;
    let params = `name=${itemName}&price=${itemPrice}&quantity=1`;
    request.open('post', 'http://localhost:3000/mycart');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
}

function del(id) {
    let url = 'http://localhost:3000/mycart/'+id;
    request.open('delete', url);
    request.send(null);
}

function add(id) {
    let data = {"name": myCart[id-1].name, "price": myCart[id-1].price};
    data.quantity = Number(myCart[id-1].quantity) + 1;
    let url = 'http://localhost:3000/mycart/'+id;;
    let params = `name=${data.name}&price=${data.price}&quantity=${data.quantity}`;
    request.open('put', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);
}
function sub(id) {
    if(Number(myCart[id-1].quantity) > 0) {
        let data = {"name": myCart[id-1].name, "price": myCart[id-1].price};
        data.quantity = Number(myCart[id-1].quantity) - 1;
        let url = 'http://localhost:3000/mycart/'+id;;
        let params = `name=${data.name}&price=${data.price}&quantity=${data.quantity}`;
        request.open('put', url);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(params);
    }
}


function render() {
    document.querySelector("tbody").innerHTML = "";
    for(i=0; i<myCart.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td> ${myCart[i].id} </td>
                        <td> ${myCart[i].name}</td>
                        <td> <button type="button" class="btn" onclick="sub(${i+1})"> - </button>
                             ${myCart[i].quantity} <button type="button" class="btn" onclick="add(${i+1})"> + </button>
                        </td>
                        <td> ${myCart[i].price} </td>
                        <td> ${myCart[i].total} </td>
                        <td> <button type="button" class="btn" onclick="del(${myCart[i].id})"> X </button> </td>`;
        document.querySelector("tbody").appendChild(tr);
    }
    gtotal();
    gt.innerText = sum;
    sum = 0;
}

function gtotal() {
    for(i=0; i<myCart.length; i++) {
        sum += myCart[i].total;
    }
    return sum;
}

get();