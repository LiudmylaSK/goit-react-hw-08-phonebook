
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/filterSlice';
import { selectFilterValue } from 'redux/contacts/contactsSelectors';
import css from './SearchFilter.module.css';

export const SearchFilter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);
  const handleFilterChange = (event) => {
  dispatch(setFilter(event.target.value));
};
  return (
    <form className={css.searchForm}>
      <label className={css.searchLabel}>
        <span>Find contacts by name</span>
        <input
          className={css.searchInput}
          type="text"
          name="filter"
          placeholder='Filter by name...'
          value={filterValue}
          onChange={handleFilterChange}
           aria-label="Filter contacts by name"
        />
      </label>
    </form>
  );
};