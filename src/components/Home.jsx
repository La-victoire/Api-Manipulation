  import React,{ useState,useEffect } from 'react'
  import { useSearchParams } from 'react-router-dom';
  import { debounce } from "lodash";
  import { CiSearch } from "react-icons/ci";

  const Home = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(false);
    const [check, setCheck] = useState(false);
    const [load, setLoad] = useState(false);
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const todosPerPage = 20; 
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
      
      const getPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/todos',
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Response error, status:${response.status}`);
          }   
        const data = await response.json();
        setPosts(data);
        
      } catch (error) {
        console.error(error)
        if (response.status === 404) {
          setError('Api Not found')
        }
        setError(error)
      } finally {
        setLoading(false)
        }
      
      } 
      getPosts()
    }, [])

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = posts.slice(indexOfFirstTodo, indexOfLastTodo);  

    const totalPages = Math.ceil(posts.length / todosPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);


    const filteredPosts = posts.filter((post)=> 
        post.title === searchQuery.trim() 
      );
    
    const handleChange= (e) => {
      const value = e.target.value;
      setSearchParams(value ? {search:value} : {} )
    }
    const btn = debounce(() => {
      setSearch((prev)=>!prev)
    }, 500)
    const onChecked = (e) => {
      setCheck(e.target.checked);
    }
    return (
      <>
      
      <section className="section_container">

      <form className='search-form mb-[10vh]'>
      <input aria-keyshortcuts='Enter' type="text"
            aria-placeholder='Todo-searchbar'
            placeholder='Search Todo'
            onChange={handleChange}
            value={searchQuery}
            className='search-input'
       />
            <button aria-label='search-btn' onClick={btn} className='search-btn text-white'>
            <CiSearch />
            </button>
      </form>
  
            {search ? (     
            <h1 className="text-30-semibold">
              Search Results for "<span className="text-blue-500">Todos</span>"
            </h1>
            ): (
          <h1 className="text-30-semibold">
            All Todos
          </h1>
            )}
          
          
          <ul className="mt-7 card_grid">
            {error && (<p className='text-red-400 text-2xl'>{error}</p>)}
          {!search && (currentTodos.map((Todo,i)=> (
                <ul key={(i + 200)} className=' startup-card group '>
                  <li key={i} className='text-yellow-200 '>
                    <div key={(i + 400)} className='flex flex-col text-black'> 
                      
                      <p key={(i+300)} className='text-xl'>  
                        <input className='h-4 w-4' type="checkbox" onChange={onChecked} checked={Todo.completed}/> {Todo.title}
                      </p>
                      
                    </div>
                  </li>
                </ul>
                )))}
          </ul>
                <footer className='flex flex-row w-full mt-5 h-[3vh] justify-center mb-5'>
                {pageNumbers.map((num) => (
                  <div className='flex flex-row'>
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`content-none mr-2 bg-gray-500 rounded-full w-5 flex justify-center h-3${num === currentPage ? "bg-black-200 text-white" : "bg-gray-500"}`}
                    >
                      .
                    </button>
                  </div>
                  ))}
                </footer>
        </section>

        {loading && (<p className=' self-center flex justify-center text-xl animate-pulse duration-200'>
          Loading ....
        </p>)}
      
      </>
    )
  }

  export default Home