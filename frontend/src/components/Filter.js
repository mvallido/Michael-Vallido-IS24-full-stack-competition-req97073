import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Search from './Search'
import ProductList from './ProductList'

const filters = [
  {
    id: 'methodology',
    name: 'Methodology',
    options: [
      { value: 'agile', label: 'Agile', checked: false },
      { value: 'water', label: 'Waterfall', checked: false },
    ],
  },
]

function Filter() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/product`);
                const json = await response.json();
                setTotalCount(json.totalCount);
            } catch (error) {
                setError(error.message);
            }
        }
        
        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    function handleProductDeleted() {
        // Decrement the product count when a product is deleted
        setTotalCount((prevCount) => prevCount - 1);
    }
    

    return (
        <div className="bg-white">
        <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                        >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                        {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                            <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                    </span>
                                </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                    {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                        {option.label}
                                        </label>
                                    </div>
                                    ))}
                                </div>
                                </Disclosure.Panel>
                            </>
                            )}
                        </Disclosure>
                        ))}
                    </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            
            <div className="mt-16">
                <h1 className="text-2xl md:text4xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0">Products: Total {totalCount}</h1>
                <div className="max-w-xl py-5 rounded-md">
                    <Link to="/product/new" className="grow bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded">Create Product</Link>
                </div>
                <Search className="max-w-xl" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="md:col-span-4">
                        <div class="h-screen overflow-y-auto">
                            <ProductList searchQuery={searchQuery} onProductDeleted={handleProductDeleted}/>
                        </div>        
                    </div>
            </section>
            </main>
        </div>
    </div>
    )
}

export default Filter