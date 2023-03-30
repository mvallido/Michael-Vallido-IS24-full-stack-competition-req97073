import ProductView from '../components/ProductView'
import Header from '../components/Header'

function ProductViewPage() {
  return (
    <div className="bg-white">
      <Header />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <ProductView />
      </div>
    </div>
  )
}

export default ProductViewPage
