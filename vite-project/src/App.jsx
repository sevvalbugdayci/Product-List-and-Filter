import './App.css'
import ProductList from './components/ProductList'
import ProductDetailsDialog from './components/ProductDetailsDialog'
import productForm from './components/ProductForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1>Ürün Listeleme ve Filtreleme</h1>
        </header>
        <main className='app-main'>
          <Routes>
            <Route path='/' exac Component={ProductList}/>
            <Route path='/detail/:productId' Component={ProductDetailsDialog}/>
            <Route path='/add' Component={productForm}/>
          </Routes>
        </main>
      </div>

    </Router>
  )
}

export default App