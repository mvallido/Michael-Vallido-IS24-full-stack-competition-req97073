import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductViewPage from './pages/ProductViewPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductEditPage from './pages/ProductEditPage'
import ProductCreatePage from './pages/ProductCreatePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product">
        <Route index element={<Home />} />
        <Route path=":productId" element={<ProductViewPage />} />
        <Route path=":productId/edit" element={<ProductEditPage />} />
        <Route path="new" element={<ProductCreatePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
