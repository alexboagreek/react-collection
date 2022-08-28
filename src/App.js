import React, {useState, useEffect} from 'react';
import './index.scss';
import Collection from './components/Collection/Collection';


const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://630af2aaed18e825164bd680.mockapi.io/react-collections?page=${page}&limit=3&${category}`)
    .then((response) => response.json())
    .then((json) => {
      setCollections(json);
    })
    .catch((error) => {
      console.log('error', 'Ошибка при полчении данных');
    })
    .finally(() => setIsLoading(false));
  }, [categoryId, page]);


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((data, index) => 
              <li
                onClick={() => setCategoryId(index)}
                className={categoryId === index ? 'active' : ''} 
                key={data.name}>{data.name}
              </li>)
          }
        </ul>
        <input 
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading photos...</h2>
        ) : (
          collections
            .filter((data) => {
              return data.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((data, index) => (
          <Collection
            key={index}
            name={data.name}
            images={data.photos}  
          />
          ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, index) => (
            <li 
              key={index}
              onClick={() => setPage(index + 1) } 
              className={page === (index + 1) ? 'active' : ''}>
                {index + 1}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
