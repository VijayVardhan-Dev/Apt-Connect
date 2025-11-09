import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-blue-500 h-screen flex items-center justify-center">
       <h1 className='text-white-600 font-bold text-9xl'>Apt Connect</h1>
      </div>
    </>
  )
}

export default App
