/* 
  Renders a create product component. 
  Within the ProductCreate function, several state variables are defined using the useState hook. 
  These include error, startDate, productName, scrumMaster, productOwner, developers, and methodology. 
  The handleDeveloperChange, handleAddDeveloper, handleRemoveDeveloper, handleMethodologyChange, and handleSubmit 
  functions are also defined within this function.

  The handleSubmit function is called when the form is submitted. It sends a POST request to the 
  http://localhost:3000/api/product/ endpoint, passing in the state variables as parameters. The response from 
  the server is then used to navigate to a new URL using the navigate hook.

  If an error occurs during the execution of the handleSubmit function, the error state variable is updated to reflect this. 
  If this occurs, an error message is displayed to the user.
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProductCreate() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [productName, setProductName] = useState('');
  const [scrumMaster, setScrumMaster] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [methodology, setMethodology] = useState('');

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
      const response = await fetch(`http://localhost:3000/api/product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          productOwnerName: productOwner,
          Developers: developers,
          scrumMasterName: scrumMaster,
          startDate: startDate,
          methodology: methodology,
        }),
      });
      const newProductId = await response.json();
      navigate(`/product/${newProductId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-16 border-2 border-gray-100 rounded-md">
          <dl>
            <div className="flex items-center bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
              <dt className="text-sm font-medium text-gray-500">
                Product Name
              </dt>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="first-name"
                  id="first-name"
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
                required
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
                required
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
                      required
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
              <DatePicker
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                showTimeSelect={false}
                placeholderText="Select a date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Methodology</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <select
                  required
                  id="methodology"
                  name="methodology"
                  value={methodology}
                  onChange={handleMethodologyChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Methodology</option>
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
    </>
  );
}

export default ProductCreate;
