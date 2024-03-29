import { useMemo, useState } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/appContext';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          ></FormRowSelect>

          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          ></FormRowSelect>

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
