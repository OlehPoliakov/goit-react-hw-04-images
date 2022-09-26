import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import { ReactComponent as SearchButton } from '../../icons/search.svg';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('Enter a search term!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    this.setState({ query: '' });
    onSubmit(query);
  };

  render() {
    const { query: query } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmitForm}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChangeInput}
          />

          <button type="submit" className={s.SearchFormButton}>
            Search
            <SearchButton className={s.SearchFormButtonLabel} />
          </button>
        </form>
      </header>
    );
  }
}
