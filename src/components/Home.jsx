import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(false);
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const todosPerPage = 20;
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) {
          throw new Error(`Response error, status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = posts.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(posts.length / todosPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Handles real-time input changes
  const handleChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Debounced function to update URL params
  const debouncedSearch = debounce((value) => {
    setSearchParams(value.trim() ? { search: value.trim() } : {});
  }, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchQuery.trim() !== "");
  };
  const cancelSearch = (e) => {
    e.preventDefault();
    setSearchParams({});
    setSearch(false);
  }

  const onChecked = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <>
      <section className="section_container">
        <form className="search-form mb-[10vh]" onSubmit={handleSearch}>
          <input
            aria-keyshortcuts="Enter"
            type="text"
            placeholder="Search Todo"
            onChange={handleChange}
            value={searchQuery}
            className="search-input"
          />
          <button aria-label="search-btn" type="submit" className="search-btn text-white">
            <CiSearch />
          </button>
          <button aria-label="cancel-btn" className="search-btn text-white" onClick={cancelSearch}>
          <MdOutlineCancel />
          </button>
        </form>

        {search ? (
          <h1 className="text-30-semibold">
            Search Results for "<span className="text-blue-500">{searchQuery}</span>"
          </h1>
        ) : (
          <h1 className="text-30-semibold">All Todos</h1>
        )}

        <ul className="mt-7 card_grid">
          {error && <p className="text-red-400 text-2xl">{error}</p>}
          {(search ? filteredPosts : currentTodos).map((Todo, i) => (
            <li key={i} className="startup-card group">
              <div className="flex flex-col text-black">
                <p className="text-xl">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    onChange={onChecked}
                    checked={Todo.completed}
                  />
                  {Todo.title}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <footer className="flex flex-row w-full mt-5 h-[3vh] justify-center mb-5">
          {pageNumbers.map((num) => (
            <div key={num} className="flex flex-row">
              <button
                onClick={() => setCurrentPage(num)}
                className={` mr-2 bg-gray-500 rounded-full w-3 flex justify-center h-3 ${
                  num === currentPage ? " bg-black-200 text-white" : " bg-gray-500"
                }`}
              >
                .
              </button>
            </div>
          ))}
        </footer>
      </section>

      {loading && <p className="self-center flex justify-center text-xl animate-pulse duration-200">Loading ....</p>}
    </>
  );
};

export default Home;
