/* 
  Allows a user to edit a product's details. 
  The component fetches the product's details using a productId parameter passed from the parent component and updates the 
  product details on the form. The user can update the details of the product and submit the form using the handleSubmit function. 
  
  The component also has handlers to add and remove developers from the product and change the methodology of the product. 
  The component renders a form with input fields to edit the product's details, and two links to navigate back 
  to the home page or view the product. 
*/

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProductEdit() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [productName, setProductName] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [scrumMaster, setScrumMaster] = useState('');
  const [methodology, setMethodology] = useState('');

  const { productId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/${productId}`
        );
        const json = await response.json();

        setStartDate(json.startDate);
        setProductName(json.productName);
        setProductOwner(json.productOwnerName);
        setDevelopers(json.Developers);
        setScrumMaster(json.scrumMasterName);
        setMethodology(json.methodology);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [productId]);

  const handleDeveloperChange = (event, index) => {
    const newDevelopers = [...developers];
    newDevelopers[index] = event.target.value;
    setDevelopers(newDevelopers);
  };

  const handleAddDeveloper = () => {
    if (developers.length < 5) {
      setDevelopers([...developers, '']);
    }
  };

  const handleRemoveDeveloper = (name) => {
    setDevelopers((cur) => cur.filter((dev) => dev !== name));
  };

  const handleMethodologyChange = (e) => {
    setMethodology(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          productOwnerName: productOwner,
          Developers: developers,
          scrumMasterName: scrumMaster,
          methodology: methodology,
        }),
      });
      navigate(`/product/${productId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-24">
      <Link
        to={`/`}
        className=" bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded"
      >
        Home
      </Link>
      <Link
        to={`/product/${productId}`}
        className=" bg-blue-500 hover:bg-blue-700 text-white text-center font-bold mx-5 py-2 px-4 rounded"
      >
        View Product
      </Link>

      <form onSubmit={handleSubmit} className="my-8">
        <div className="border-2 border-gray-100 rounded-md">
          <dl>
            <div className="flex items-center bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
              <dt className="text-sm font-medium text-gray-500">
                Product Name
              </dt>
              <div className="mt-2">
                <input
                  type="text"
                  name="product-name"
                  id="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Scrum Master
              </dt>
              <input
                type="text"
                name="scrum-master"
                id="scrum-master"
                value={scrumMaster}
                onChange={(e) => setScrumMaster(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Product Owner
              </dt>
              <input
                type="text"
                name="product-owner"
                id="product-owner"
                value={productOwner}
                onChange={(e) => setProductOwner(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Developers (Max. 5 developers)
              </dt>

              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {developers.map((developer, index) => (
                  <div key={index} className="flex my-2">
                    <input
                      key={index}
                      type="text"
                      name="developers"
                      id="developers"
                      value={developer}
                      onChange={(e) => handleDeveloperChange(e, index)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 mr-5 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDeveloper(developer)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {developers.length < 5 ? (
                  <button
                    type="button"
                    onClick={handleAddDeveloper}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Developer
                  </button>
                ) : null}
              </dd>
            </div>
            <div className="flex items-center bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {startDate}
              </dd>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Methodology</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <select
                  id="methodology"
                  name="methodology"
                  value={methodology}
                  onChange={handleMethodologyChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Agile">Agile</option>
                  <option value="Waterfall">Waterfall</option>
                </select>
              </dd>
            </div>
            <div className="flex justify-end bg-white px-4 py-5 rounded-md">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save post
              </button>
            </div>
          </dl>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
