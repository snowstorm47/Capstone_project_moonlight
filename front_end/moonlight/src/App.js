import './register.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Register from './register';
import Login from './login';
import Landing from './landing';
import Footer from './footer';
import Header from './header';

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
       <Footer/>
    </Router>
 
  );
}

export default App;
