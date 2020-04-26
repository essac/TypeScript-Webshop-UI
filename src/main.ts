import $ from "jquery";
import { Product } from "./modules/product";

window.onload = function () {

    let main = new Main();
    main.makeProducts();

}

const products = [
    { id: 1, title: "Anthem", image: "./img/0.jpg", type: "PlayStation 4", price: 50, quantity: 1 },
    { id: 2, title: "Spider-Man", image: "./img/1.jpg", type: "PlayStation 4", price: 50, quantity: 1 },
    { id: 3, title: "Minecraft", image: "./img/2.jpg", type: "PlayStation 4", price: 50, quantity: 1 },
    { id: 4, title: "Modren-warfare", image: "./img/3.jpg", type: "Xbox One", price: 45, quantity: 1 },
    { id: 5, title: "Fifa 19", image: "./img/4.jpg", type: "Xbox One", price: 45, quantity: 1 },
    { id: 6, title: "The Witcher 3: WH", image: "./img/5.jpg", type: "Xbox One", price: 45, quantity: 1 },
    { id: 7, title: "Zelda", image: "./img/6.jpg", type: "Nintendo Switch", price: 60, quantity: 1 }
];

const cart: Product[] = [];


export class Main {
    start() {

    }
    makeProducts() {

        const ItemsList: Product[] = products.map(product => new Product(product.id, product.title, product.image, product.type, product.price, product.quantity));

        let contentElement = document.getElementById("content") as HTMLElement;
        for (let x = 0; x < ItemsList.length; x++) {

            //Main container
            let newProduct = document.createElement("div");
            newProduct.setAttribute("id", "product" + x);
            contentElement.appendChild(newProduct);
            //Title
            let htmlTitle = document.createElement("p");
            htmlTitle.setAttribute("id", "p-title");
            var t = document.createTextNode("Title: " + ItemsList[x].title);
            htmlTitle.appendChild(t);
            newProduct.appendChild(htmlTitle);
            //Type
            let htmlType = document.createElement("p");
            htmlType.setAttribute("id", "p-type");
            var ty = document.createTextNode("Type: " + ItemsList[x].type);
            htmlType.appendChild(ty);
            newProduct.appendChild(htmlType);
            //Price
            let htmlPrice = document.createElement("p");
            htmlPrice.setAttribute("id", "p-price");
            var pr = document.createTextNode("Price: $" + ItemsList[x].price);
            htmlPrice.appendChild(pr);
            newProduct.appendChild(htmlPrice);
            //Images
            let htmlImage = document.createElement("img");
            htmlImage.setAttribute("id", "p-image");
            htmlImage.setAttribute("src", "img/" + x + ".jpg");
            newProduct.appendChild(htmlImage);
            //Add to cart Button
            var buyBtn = document.createElement("BUTTON");
            buyBtn.setAttribute("class", "cartBtn");
            let xString = ItemsList[x].id.toString();
            buyBtn.setAttribute("id", xString);
            buyBtn.innerHTML = "Add to cart <i class='fas fa-shopping-basket'></i>";
            newProduct.appendChild(buyBtn);
        }
    }
}


//Add to cart + plus sign in cart
function addToCart(ProductId: number) {
    const productObj = products.find(element => element.id == ProductId);

    const productExsitsInCart: boolean = !!cart.find(element => element.id == ProductId);
    if (!productExsitsInCart) {
        const cartProduct: any = { ...productObj, quantity: 1 };
        cart.push(cartProduct);

    } else {
        const productInCartIndex = cart.findIndex(element => element.id == ProductId);
        cart[productInCartIndex].quantity = cart[productInCartIndex].quantity + 1;
    }

    //Cart items
    let output = "<ul>";
    $.each(cart, function (index, value) {

        output += "<li>" + value.title + " - " + `$${value.price}` + ` - Q(${value.quantity})` + " <button id=' " + value.id + "' class='plus-item btn btn-primary input-group-addon' data-name=''>+</button>" + " <button id=' " + value.id + "' + class='minus-item input-group-addon btn btn-primary' data-name=''>-</button>" + " <button id=' " + value.id + "' + class='delete-item btn btn-danger' data-name=''>Remove</button>" + "</li>";
    });
    output += "</ul>";

    //Product info.
    $(".show-cart-table").html(output);

    //Add to cart button count
    $(".total-count").html(cart.length as any);

    //Cart Total
    let totalPrice: any | number = 0;
    let tempAddValue: number = 0;
    $.each(cart, function (index, value) {
        if (value.quantity >= 2) {
            tempAddValue = value.price * value.quantity;
            totalPrice = totalPrice + tempAddValue;
        } else {
            totalPrice = totalPrice + value.price;
        }
    });
    $(".total-cart").html(totalPrice);
}


//Minus sign in cart
function minusToCart(ProductId: number) {

    const productInCartIndex = cart.findIndex(element => element.id == ProductId);
    if (cart[productInCartIndex].quantity > 1) {
        cart[productInCartIndex].quantity = cart[productInCartIndex].quantity - 1;
    }

    //Cart items
    let output = "<ul>";
    $.each(cart, function (index, value) {

        output += "<li>" + value.title + " - " + `$${value.price}` + ` - Q(${value.quantity})` + " <button id=' " + value.id + "' class='plus-item btn btn-primary input-group-addon' data-name=''>+</button>" + " <button id=' " + value.id + "' + class='minus-item input-group-addon btn btn-primary' data-name=''>-</button>" + " <button id=' " + value.id + "' + class='delete-item btn btn-danger' data-name=''>Remove</button>" + "</li>";
    });
    output += "</ul>";

    //Product info.
    $(".show-cart-table").html(output);

    //Add to cart button count
    $(".total-count").html(cart.length as any);

    //Cart Total
    let totalPrice: any | number = 0;
    let tempAddValue: number = 0;
    $.each(cart, function (index, value) {
        if (value.quantity >= 2) {
            tempAddValue = value.price * value.quantity;
            totalPrice = totalPrice + tempAddValue;
        } else {
            totalPrice = totalPrice + value.price;
        }
    });
    $(".total-cart").html(totalPrice);
}


//Remove sign in cart
function removeToCart(ProductId: number) {
    const productExsitsInCart: boolean = !!cart.find(element => element.id == ProductId);

    if (productExsitsInCart) {
        const productInCartIndex = cart.findIndex(element => element.id == ProductId);
        cart.splice(productInCartIndex, 1);
    }

    let output = "<ul>";
    $.each(cart, function (index, value) {

        output += "<li>" + value.title + " - " + `$${value.price}` + ` - Q(${value.quantity})` + " <button id=' " + value.id + "' class='plus-item btn btn-primary input-group-addon' data-name=''>+</button>" + " <button id=' " + value.id + "' + class='minus-item input-group-addon btn btn-primary' data-name=''>-</button>" + " <button id=' " + value.id + "' + class='delete-item btn btn-danger' data-name=''>Remove</button>" + "</li>";
    });
    output += "</ul>";

    //Product info.
    $(".show-cart-table").html(output);

    //Add to cart button count
    $(".total-count").html(cart.length as any);

    //Cart Total
    //Cart Total
    let totalPrice: any | number = 0;
    let tempAddValue: number = 0;
    $.each(cart, function (index, value) {

        if (cart.length > 1 || value.quantity >= 2) {
            tempAddValue = value.price * value.quantity;
            totalPrice = totalPrice + tempAddValue;
        } else if (value.quantity < 2 || value.quantity > 0) {
            totalPrice = totalPrice + value.price;
        }
        else {
            totalPrice = 0;
        }
    });
    $(".total-cart").html(totalPrice);
}



//Add to cart
$(document).on('click', '.cartBtn', (e) => {
    addToCart(e.target.id);
});

//Plus sign in cart
$(document).on('click', '.plus-item', (e) => {
    addToCart(e.target.id);
});

//Minus sign in cart
$(document).on('click', '.minus-item', (e) => {
    minusToCart(e.target.id);
});

//remove sign in cart
$(document).on('click', '.delete-item', (e) => {
    removeToCart(e.target.id);
});