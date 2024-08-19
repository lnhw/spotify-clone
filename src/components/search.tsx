'use client';
import { FormEvent } from 'react';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import searchAction from '@/actions/searchAction';
import useSearch from '@/hooks/useSearch';

const Search = () => {
  const router = useRouter();
  const { setResults } = useSearch();
  const [query, setQuery] = useState<string>('');

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;

    // Call your search action to fetch data from the API route
    const results = await searchAction(query);
    setResults(results);
    router.push(`/search?query=${query}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      id="search-box"
      className="bg-[#242424] px-3 py-2 flex items-center justify-center rounded-full"
      role="search"
    >
      <CiSearch className="pr-2" color="white" size={30} />
      <input
        className="items-start bg-transparent text-white focus:none outline-none"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
      />
    </form>
  );
};
export default Search;
