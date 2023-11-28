import {BrowserRouter as Router, Routes, Route} from'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import MyPdf from './Components/PDFfile';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route  path='/' element={<SignUp/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/pdf' element={<MyPdf />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
