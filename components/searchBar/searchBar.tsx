import React from 'react';
// import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';


const SearchBar: React.FC = () => {
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
          <input style={styles.searchInputBar} type='text' placeholder='Search projects by keyword, #tag, @username, and more...'/>
      </div>
    </>
  );
}

export default SearchBar;