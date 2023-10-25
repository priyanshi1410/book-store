const express = require('express');
const app = express();
const port = 8090;
const connected = require('./db');
const booksdatas = require('./schema');
const validateData = require('./middle');
app.use(express.json());


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the book store');
});

// Get all books
app.get('/books', async (req, res) => {
  const books = await booksdatas.find();
  res.json(books);
});

// Get book by ID

app.get('/books/book/:id', async (req, res) => {
  const book = await booksdatas.findById(req.params.id);
  if (book) {
    res.json(book);
  }
  else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// delete
app.delete("/books/delete/:id", async (req, res) => {
  let { id } = req.params
  let data = await booksdatas.findByIdAndDelete(id)
  res.status(200).send(data)
})

// post
app.post("/books/addbooks", validateData, async (req, res) => {

  let data = await booksdatas.create(req.body);
  res.status(200).send(data);
})

// update
app.patch("/books/update/:id", async (req, res) => {
  let { id } = req.params
  let data = await booksdatas.findByIdAndUpdate(id, req.body)
  res.status(200).send(data)
})

// filter

app.get("/books/filter", async (req, res) => {
  const { author, category, title, price } = req.query;
  const filter = {}

  if (author) {
    filter.author = author;
  }
  else if (title) {
    filter.title = title;
  }
  else if (category) {
    filter.category = category;
  }

  const sortoption = {}

  if (price == "lth") {
    sortoption.price = 1
  }
  else if (price == "htl") {
    sortoption.price = -1
  }

  let data = await booksdatas.find(filter).sort(sortoption)
  res.send(data)
})

// server
app.listen(port, () => {
  connected()
  console.log(`Server is running on port ${port}`);
});





