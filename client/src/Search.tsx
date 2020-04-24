import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import { useRouter } from 'next/router';
export const SearchBarComponent = () => {
    const router = useRouter();

  const [state, setState] = useState('');
  const searchQuery = (term:string): void => {
    router.push({
        pathname:'/search',
        query: {
            nameStartsWith: term
        }
    });
    setState('')
  };
  return (<SearchBar value={state} onChange={(state) => setState(state)} onRequestSearch={() => searchQuery(state)} />);
};
