
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import ScrollToTop from "./components/ScrollToTop";
function App() {
  

  return (
    <>
    <AuthProvide>
      <ScrollToTop/>
      <Navbar/>
      <main className='min-h-screen max-w-screen-2xl mx-16 px-4 py-6'>
      <Outlet/>
      </main>
     <Footer/>
    </AuthProvide>
    
    </>
  )
}

export default App;
