/* eslint-disable react/prop-types */
import React, { createRef, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { ThemeProvider } from 'styled-components';
import { useLang } from 'context/LanguageContext';
import StyledSearchBox from './StyledSearchBox';
import StyledSearchResult from './StyledSearchResult';
import StyledSearchRoot from './StyledSearchRoot';
import useClickOutside from './useClickOutside';

const theme = {
  foreground: '#050505',
  background: 'white',
  faded: '#888',
};

export default function Search({ indices }) {
  const { lang } = useLang();
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  );

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          // eslint-disable-next-line no-shadow
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <Configure filters={`langKey:${lang}`} />
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          <StyledSearchResult show={query && query.length > 0 && hasFocus} indices={indices} />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  );
}
