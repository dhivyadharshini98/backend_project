import Book from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) res.json(book);
  else res.status(404).json({ message: "Book not found" });
};

export const createBook = async (req, res) => {
  const { title, author, genre, price, inStock } = req.body;
  const book = new Book({ title, author, genre, price, inStock });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

export const updateBook = async (req, res) => {
  const { title, author, genre, price, inStock } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.price = price || book.price;
    book.inStock = inStock !== undefined ? inStock : book.inStock;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else res.status(404).json({ message: "Book not found" });
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(req.params.id); // DB
    res.json({ message: "Book removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
