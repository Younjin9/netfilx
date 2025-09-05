import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Outlet, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';


const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  )
}


function App() {
  return  (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  )
  
}

export default App;
