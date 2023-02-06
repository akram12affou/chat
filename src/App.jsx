import { useState } from 'react'
import Header from './Component/Header'
import Login from './Component/Login'
import './styles/App.css'
import { BrowserRouter , Route,Routes } from 'react-router-dom'
import Room from './Component/Room'
import Chat from './Component/Chat'
function App() {
  

  return (
    <div class='App'>
      <BrowserRouter>
        <Header/>
        <Routes>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/roomnum' element={<Room/>}></Route>
         <Route path='/chat/:room' element={<Chat/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
