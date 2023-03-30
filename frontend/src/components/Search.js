function Search({ searchQuery, setSearchQuery }) {
  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="max-w-xl block  pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring-blue-300 focus:text-gray-900 sm:text-sm"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
