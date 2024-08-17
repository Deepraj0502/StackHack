import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
