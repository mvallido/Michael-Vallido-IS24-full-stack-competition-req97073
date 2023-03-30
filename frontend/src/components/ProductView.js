import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductView() {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch(`http://localhost:3000/api/product/${productId}`);
            const json = await response.json();
            setProduct(json);
            console.log(json)
            } catch (error) {
            setError(error.message);
            }
        }
    
        fetchData();
    }, [productId]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div className="mt-24">
            <Link to={`/`} className=" bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">Home</Link>
            <div className="my-8 border-2 border-gray-100 rounded-md">
                <div className="px-4 pb-5 py-5 sm:px-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">{ product.productName}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Product ID: { product.productId }</p>
                </div>
                <div className="border-t border-gray-200 rounded-md">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Scrum Master</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.scrumMasterName }</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Product Owner</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.productOwnerName }</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Developers</dt>
                            
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.Developers && product.Developers.map((developer, index) => (
                                <li key={index}>{ developer }</li>)) }
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.startDate }</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Methodology</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.methodology }</dd>
                        </div>
                        <div className="flex justify-end bg-white px-4 py-5 rounded-md">
                            <Link to={`/product/${product.productId}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Product</Link>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default ProductView