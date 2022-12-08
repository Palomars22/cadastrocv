import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import ListRegister from './pages/ListRegister'
import Footer from './components/footer/Footer'

function Routes() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='/listar' element={<ListRegister />} />
        </Router>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default Routes