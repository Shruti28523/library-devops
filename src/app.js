const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Sample books
let books = [
  { id: 1, name: "Harry Potter" },
  { id: 2, name: "Atomic Habits" },
  { id: 3, name: "Rich Dad Poor Dad" }
];

// Orders
let orders = [];

// Home route
app.get('/', (req, res) => {
  res.send(" Library DevOps App Running ");
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Request book (pickup/delivery)
app.post('/request', (req, res) => {
  const { userName, bookId, type, address } = req.body;

  if (!userName || !bookId || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const order = {
    id: orders.length + 1,
    userName,
    bookId,
    type, // pickup or delivery
    address: type === "delivery" ? address : "Library Pickup",
    status: "Pending"
  };

  orders.push(order);

  res.json({ message: "Order placed successfully", order });
});

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Update order status
app.put('/order/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;

  res.json({ message: "Order updated", order });
});

// Delete order
app.delete('/order/:id', (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.filter(o => o.id !== id);

  res.json({ message: "Order deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});