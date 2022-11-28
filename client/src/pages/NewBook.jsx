import NewBookForm from '../components/books/NewBookForm';
import { addData } from '../helper';

const NewBook = () => {
  const handleAddBook = async bookData => {
    const res = await addData('http://localhost:4000/books', bookData);

    if (res.status !== 201) {
      console.log('Something went wrong');
      return;
    }

    console.log('Successfully added a new book!');
  };

  return <NewBookForm onAddBook={handleAddBook}></NewBookForm>;
};

export default NewBook;
