"use client";
import { useState } from 'react';
import { SearchCategory } from ".";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SearchButton = ({otherClasses} : { otherClasses: string}) => (
  <button type="submit" className={`-m1-3 z-10 ${otherClasses}`}>
    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying-glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState<string>('');
  const router =  useRouter();

  const handleKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trimStart());
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(category === '' && keyword === '') {
      return alert('Please select a category or type a keyword to search.');
    }

    updateSearchParams(category, keyword);
  };

  const updateSearchParams = (category: string, keyword:string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if(category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }

    if(keyword) {
      searchParams.set('keyword', keyword);
    } else {
      searchParams.delete('keyword');
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}#discover`;

    router.push(newPathname);
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchCategory
          category={category}
          setCategory={setCategory}
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className="searchbar__item">
        <input 
          type="text" 
          placeholder='Search Keyword...'
          className="searchbar__input"
          onChange={handleKeyword}
          value={keyword}
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar