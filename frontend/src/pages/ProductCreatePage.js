import ProductCreate from '../components/ProductCreate';
import Header from '../components/Header';

function ProductCreatePage() {
  return (
    <div className="bg-white">
      <Header />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <ProductCreate />
      </div>
    </div>
  );
}

export default ProductCreatePage;
