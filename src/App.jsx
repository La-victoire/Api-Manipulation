import { useState } from 'react'
import Home from './components/Home'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        <Header />
        <Home />
      </div>
    </>
  )
}

export default App
