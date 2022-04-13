import './styles/register.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import Landing from './components/landing';
import Footer from './components/footer';
import Header from './components/header';
import Forgot from './components/forgot';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
       </Routes>
       <Routes>
        <Route path='/register' element={<Register/>}/>
       </Routes>
       <Routes>
       <Route path='/login' element={<Login />}/>
       </Routes>
       <Routes>
         <Route path='/forgot' element={<Forgot />}/>
       </Routes>
       {/* <Routes>
         <Route path='/notification' element={<Notification/>}/>
        </Routes> */}
       <Footer/>
    </Router>
  
 
  );
}

export default App;
