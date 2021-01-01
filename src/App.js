import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;

const url = `https://www.googleapis.com/books/v1/volumes?q=philosophy&orderBy=relevance&key=${REACT_APP_API_KEY}`

const App = () => {
  const [books, setBooks] = useState([])
  console.log(books);

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        const filteredBooks = new Set(res.data.items);
        const arrayOfFilteredBooks = [...filteredBooks];
        setBooks(arrayOfFilteredBooks)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="App">
      <main>
        <h1>Bookshelf App</h1>
          {books.map(book => (
            <div key={book.id}>
              <p><strong>{book.volumeInfo.title}</strong> by {book.volumeInfo.authors}</p>
              <img alt="" src={book.volumeInfo.imageLinks.thumbnail}/>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
