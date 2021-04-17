let gt = document.querySelector("#gt");
let sum = 0;

class item {
    constructor(sNum, name, quant, price) {
        this.sNumber = sNum;
        this.name = name;
        this.quantity = quant;
        this.price = price;
        this.total = this.price*this.quantity;
    }
    add() {
        this.quantity++ ;
        this.total = this.price*this.quantity;
        render();
    }
    sub() {
        if(this.quantity>0){
            this.quantity-- ;
            this.total = this.price*this.quantity;
            render();
        }
    }
}

myCart = [new item(1, "Ford", 2, 10), new item(2, "mazda", 3, 100), new item(3, "Suzuki", 50, 2), new item(4, "Tata", 5, 10)];
let sNum = myCart.length + 1;

function render() {
    document.querySelector("tbody").innerHTML = "";
    for(i=0; i<myCart.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td> ${myCart[i].sNumber} </td>
                        <td> ${myCart[i].name} </td>
                        <td> <button onclick="myCart[${i}].sub()"> - </button>
                             ${myCart[i].quantity} <button onclick="myCart[${i}].add()"> + </button>
                        </td>
                        <td> ${myCart[i].price} </td>
                        <td> ${myCart[i].total} </td>`;
        document.querySelector("tbody").appendChild(tr);
    }
    gtotal();
    gt.innerText = sum;
    sum = 0;
}

function submitBtn() {
    let itemName = document.querySelector("#item-name").value;
    let itemPrice = document.querySelector("#item-price").value;
    myCart.push(new item(sNum, itemName, 1, itemPrice)); 
    sNum++;
    render();
    document.querySelector("#item-name").value = "";
    document.querySelector("#item-price").value = "";
}


function gtotal() {
    for(i=0; i<myCart.length; i++) {
        sum += myCart[i].total;
    }
    return sum;
}

render();