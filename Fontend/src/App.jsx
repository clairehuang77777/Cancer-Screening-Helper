import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './page/MainPage'
import './components/layout.scss'
import { FormPage } from './page/FormPage'
import { ResultPage } from './page/ResultPage'
import { NearByPage } from './page/NearByPage'
import { TypeContext } from './TypeContext'
import { useState } from 'react'
import { UserAddressContext } from './UserAddressContext'
import { UserLngContext } from './UserLngContext'
import { UserLatContext } from './UserLatContext'
import { NotSupportingPage } from './page/NotSupportingPage'

function App() {
const [type, SetType] = useState('')
const [userAddress, SetUserAddress] = useState('')
const [UserLng, SetUserLng] = useState('')
const [UserLat, SetUserLat] = useState('')

  return (
    <>
    <TypeContext.Provider value={{type, SetType}}>
    <UserAddressContext.Provider value ={{userAddress,SetUserAddress}}>
    <UserLngContext.Provider value={{UserLng, SetUserLng}}>
    <UserLatContext.Provider value={{UserLat,SetUserLat}}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path="/formPage" element={<FormPage/>}></Route>
            <Route path="/ResultPage" element={<ResultPage/>}></Route>
            <Route path="/NearByPage" element={<NearByPage/>}></Route>
            <Route path="/NotSupportingPage" element={<NotSupportingPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </UserLatContext.Provider>
    </UserLngContext.Provider>
    </UserAddressContext.Provider>
    </TypeContext.Provider>        
    </>
  )
}

export default App
