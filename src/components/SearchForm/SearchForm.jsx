import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchButton } from '../../assets/icons/search.svg';
import styles from './SearchForm.module.scss';

const SearchFrom = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Наблюдает за инпутом и пишет значние в стейт
  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  // Наблюдает за отправкой и отдает значение во внешний компонент
  const handleSubmit = e => {
    e.preventDefault();

    // Запрещает отправку пустого инпута
    if (!query.trim()) return;

    // Отдать данные внешнему компоненту
    onSearch(query);

    resetForm();
  };

  // Сбрасывает поле после отправки
  const resetForm = () => setQuery('');

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <input
        className={styles['SearchForm-input']}
        type="text"
        name="query"
        value={query}
        onChange={handleSearchInput}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />

      <button type="submit" className={styles['SearchForm-button']}>
        Search
        <SearchButton className={styles['SearchForm-button-label']} />
      </button>
    </form>
  );
};

SearchFrom.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchFrom;

// Вариант формы на классах

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import styles from './SearchForm.module.scss';

// class SearchFrom extends Component {
//   state = {
//     query: '',
//   };

//   handleSearchInput = e => {
//     const { name, value } = e.currentTarget;

//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     // Запрещает отправку пустого инпута
//     if (!this.state.query) return;

//     // Отдать данные внешнему компоненту
//     this.props.onSearch(this.state.query);

//     this.resetForm();
//   };

//   resetForm = () =>
//     this.setState({
//       query: '',
//     });

//   render() {
// return (
//   <form className={styles.SearchForm} onSubmit={handleSubmit}>
//     <input
//       className={styles['SearchForm-input']}
//       type="text"
//       name="query"
//       value={query}
//       onChange={handleSearchInput}
//       autoComplete="off"
//       autoFocus
//       placeholder="Search images and photos"
//     />

//     <button type="submit" className={styles['SearchForm-button']}>
//       Search
//       <SearchButton className={styles['SearchForm-button-label']} />
//     </button>
//   </form>
// );
//   }
// }

// SearchFrom.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

// export default SearchFrom;
