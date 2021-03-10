import React, {useState, useRef, useCallback} from 'react';
import useBookSearch from "./useBookSearch";
import Header from "./Header";
import "./App.css";

const App = () => {

  const [query, setquery] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookELementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setpageNumber(pageNumber+1);
      }
    }, {})
    if (node) observer.current.observe(node)
  }, [loading, hasMore, pageNumber]);
 
  const handleSearch = (e) => {
    setquery(e.target.value);
    setpageNumber(1);
  }
  
  return (
    <>
      <Header>
        <input
          className="input"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="What Books do You want.."></input>
      </Header>

        <div className={books.length ? "container-full": "container"}>
          {books.map((book, index) => {
            if (books.length === index + 1) {
              return <div className="book" ref={lastBookELementRef} key={book}>{book}</div>
            } else {
              return <div className="book" key={book}>{book}</div>
            }
          })}
          <div>{loading && <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}</div>
        <div>{error && 'error'}</div>
        </div>
    </>
  );
}

export default App;
