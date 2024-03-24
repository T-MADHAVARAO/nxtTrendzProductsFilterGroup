import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    onSearch,
    updateCategory,
    updateRating,
    search,
    onClearFilter,
    updateInput,
  } = props
  const searchedProducts = event => {
    onSearch(event)
  }
  const categoryProducts = event => {
    console.log(event.target.id)
    updateCategory(event.target.id)
  }
  const ratingProducts = event => {
    console.log(event.target.id)
    updateRating(event.target.id)
  }
  const clearFilter = () => {
    onClearFilter()
  }
  const updateSearch = event => {
    updateInput(event.target.value)
  }
  return (
    <div className="filters-group-container">
      <div className="search-sec">
        <input
          value={search}
          type="search"
          placeholder="Search"
          onKeyDown={searchedProducts}
          onChange={updateSearch}
        />
        <BsSearch className="search-icon" />
      </div>
      <h1>Category</h1>
      <ul className="category-cont">
        {categoryOptions.map(each => (
          <li key={each.categoryId}>
            <button
              id={each.categoryId}
              onClick={categoryProducts}
              type="button"
            >
              <p>{each.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h1>Rating</h1>
      <ul className="category-cont">
        {ratingsList.map(eachItem => (
          <li key={eachItem.ratingId}>
            <button
              id={eachItem.ratingId}
              onClick={ratingProducts}
              type="button"
              className="rating-item"
            >
              <img
                src={eachItem.imageUrl}
                alt={`rating ${eachItem.ratingId}`}
                className="rating"
              />
              <p>&up</p>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={clearFilter}>
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
