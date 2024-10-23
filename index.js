const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const { log } = require('console');

const app = express();
app.use(cors());
const port = 3000;

// Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart.

function addTocart(cart, productId, price, quantity, name) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let price = parseFloat(req.query.price);
  let name = req.query.name;

  let result = addTocart(cart, productId, price, quantity, name);
   let d =cart.pop()
   console.log(" d = ", d)
  res.json({ cartItems: result });
});

// Endpoint 2: Edit Quantity of an Item in the Cart.

function editCartQuantity(cart, quantity, productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let result = editCartQuantity(cart, quantity, productId);
  res.json({ cartItems: result });
});

// Endpoint 3: Delete an Item from the Cart.

function deleteFromCart(cart, productId) {
  return cart.filter((product) => product.productId !== productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  let result = deleteFromCart(cart, productId);
  res.json({ cartItems: result });
});

// Endpoint 4: Read Items in the Cart
function returnCurrentCart(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  let result = returnCurrentCart(cart);
  res.json({ cartItems: result });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart.

function calculateCartQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateCartQuantity(cart);
  res.json({ totalQuantity: result });
});

// Endpoint 6: Calculate Total Price of Items in the Cart

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].quantity * cart[i].price;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
