import React, { useEffect, useState, useRef } from 'react';
// import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import { useRouter, usePathname } from 'next/navigation'

interface searchBarProps {
  filterSearch: () => void;
}

const SearchBar: React.FC = ({ filterSearch }) => {
  const [userQuery, setUserQuery] = useState('');
  const router = useRouter();

  // Create a ref to keep track of the input element
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the pressed key is Enter
      if (event.key === "Enter" && document.activeElement === inputRef.current) {

        // Next time, This whole if else statement should be passed on from page
        // so that component can reused by other pages i.e events and people pages
        // Check if input is not empty string. If empty string, then do nothing.
        if (inputRef.current.value !== '') {
          const userQuery: string = inputRef.current.value;


          const userQueryList = userQuery.split(',').map(query => query.trim());


          // At the moment, it will use the last valid project name for fuzzy search
          let userQueryProjectName = '';
          userQueryList.forEach(query => {
            if (!/@|#/.test(query)) {
              userQueryProjectName = query;
            }
          });

          let queryTagsString: string = '';
          let queryCreatorsString: string = '';


          // Get all the tags in userquery
          userQueryList.forEach(query => {
              if (query.includes('#')) {
                let removeHash = query.replace(/#/g, "");
                queryTagsString = queryTagsString + query;
              };
          });
          queryTagsString.replace(/#/g, " ");

          // Get all the users in userquery
          userQueryList.forEach(query => {
            if (query.includes('@')) {
              let removeAt = query.replace(/@/g, "");
              queryCreatorsString =  queryCreatorsString + query;

            };
          });
          queryCreatorsString.replace(/@/g, " ");

          // Sets up the query url
          let paramsTitle = '';
          let paramsTags = '';
          let paramsCreators = '';
          let paramsUrl = '';
          if (userQueryProjectName.length !== 0) {
            paramsTitle = 'title=' + userQueryProjectName.replace(" ", "+");
            if (paramsUrl.length === 0) {
              paramsUrl = paramsTitle;
            }
          }

          if (queryTagsString.length !== 0) {
            console.log('slice', queryTagsString.replace(/#/g, "+").slice(1)); 
            paramsTags = 'tags=' + queryTagsString.replace(/#/g, "+").slice(1);
            if (paramsUrl.length === 0) {
              paramsUrl = paramsTags;
            } else {
              paramsUrl = paramsUrl + '&' + paramsTags;

            }
          }
          if (queryCreatorsString.length !== 0) {
            paramsCreators = 'creators=' + queryCreatorsString.replace(/@/g, "+").slice(1);
            if (paramsUrl.length === 0) {
              paramsUrl = paramsCreators;
            } else {
              paramsUrl = paramsUrl + '&' + paramsCreators;
            }
          }

          // This changes the url. Unfortunately, it does not update the state with my hardcoded database.
          router.push("/projects/dashboard?" + paramsUrl);
          // Used to update the state. i.e filter out the projects depending on query
          filterSearch(inputRef.current.value);
          setUserQuery(inputRef.current.value);
        
        } else {
          // Resets the search when user enters nothing to search bar
          filterSearch('');
          setUserQuery('');
          router.push("/projects/dashboard");
        }
      }
    }
    // Add event listener for keydown event
    document.addEventListener("keydown", handleKeyDown);


    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const styles = {
    searchBarContainer: {
      height: '50px',
      borderWidth: '2px',
      borderColor: '#C7C7C7',
      borderStyle: 'solid none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchInputBar: {
      border: 'none',
      width: '50%',
      height: '30px',
      fontSize: '1.2em',
      outline: 'none',
    },
    searchIcon: {
      marginRight: '5px',
      // Might want to look up how to make the icon reflect
    }
  }

  return (
    <>
      <div style={styles.searchBarContainer}>
          <span style={styles.searchIcon}><Search/></span>
          <input ref={inputRef} style={styles.searchInputBar} type='text' placeholder='Search projects by keyword, #tag, @username, and more...' />
      </div>
    </>
  );
}

export default SearchBar;