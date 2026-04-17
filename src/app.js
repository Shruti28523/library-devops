const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, name: "Harry Potter" },
  { id: 2, name: "Atomic Habits" }
];

let orders = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/request', (req, res) => {
  const { bookId, type } = req.body;

  const order = {
    id: orders.length + 1,
    bookId,
    type
  };

  orders.push(order);

  res.json({ message: "Order placed", order });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});