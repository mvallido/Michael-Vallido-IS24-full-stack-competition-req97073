import ProductEdit from '../components/ProductEdit'
import Header from '../components/Header'

function ProductEditPage() {
  return (
    <div className="bg-white">
      <Header />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <ProductEdit />
      </div>
    </div>
  )
}

export default ProductEditPage
