"use client";

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SearchCategoryProps } from '@/types';
import { categories } from '@/constants';

const SearchCategory = ({category, setCategory} : 
  SearchCategoryProps) => {
  const [query, setQuery] = useState('');

  const filteredCategories = 
    query === ""
      ? categories
      : categories.filter((item) => (
      item.toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g,""))
  ))

  return (
    <div className="search-recipe">
      <Combobox value={category} onChange={setCategory}>
        <div className="relative w-full">
          <Combobox.Input 
            className="search-recipe__input"
            displayValue={(category: string) => category}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder="Specify Category..."
          />

          <Transition 
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}>

            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
              static
            >
              {filteredCategories.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) => `
                    relative search-recipe__option
                    ${active ? 'main_button text-white' : 'text-gray-900'}
                    `}
                    value={item}
                  >
                    {({selected, active}) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item}
                        </span>
                        { selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}
                          >
                          </span>
                        ) : null }
                      </>
                    )}
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>

        </div>
      </Combobox>
    </div>
  )
}

export default SearchCategory