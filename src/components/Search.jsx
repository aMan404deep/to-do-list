import { useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ searchInput, handleSearch }) => {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        className={styles.input}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default SearchBox;
