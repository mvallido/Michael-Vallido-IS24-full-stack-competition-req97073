import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {
    const handleDelete = () => {
        onDelete(product.productId);
    };
    

    return (
        <div className="rounded overflow-hidden shadow-md">
            <div className="px-6 py-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{ product.productName }</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Product ID: { product.productId }</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Scrum Master</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.scrumMasterName }</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Product Owner</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.productOwnerName }</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 h-40">
                        <dt className="text-sm font-medium text-gray-500">Developers</dt>
                        
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.Developers.map((developer, index) => (
                        <li key={index}>{ developer }</li>
                        )) }</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.startDate }</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Methodology</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{ product.methodology }</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:flex sm:justify-between sm:items-center">
                        <button className="w-full sm:w-auto bg-red-500 hover:text-red-700 text-white rounded py-2 px-4 mb-2 sm:mb-0" onClick={handleDelete}>
                            Delete
                        </button>
                        <div className="flex flex-col sm:flex-row">
                            <Link to={`/product/${product.productId}`} className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mr-2 mb-2 sm:mb-0">View</Link>
                            <Link to={`/product/${product.productId}/edit`} className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">Edit</Link>
                        </div>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default ProductCard