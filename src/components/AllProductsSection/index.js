import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const isStatusList = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  noProducts: 'NO',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isStatus: isStatusList.progress,
    activeOptionId: sortbyOptions[0].optionId,
    search: '',
    category: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isStatus: isStatusList.progress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, search, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${search}&category=${category}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      if (fetchedData.products.length > 0) {
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        this.setState({
          productsList: updatedData,
          isStatus: isStatusList.success,
        })
      } else {
        this.setState({isStatus: isStatusList.noProducts})
      }
    } else {
      this.setState({isStatus: isStatusList.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  noProductsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1>No Products Found</h1>
      <p>We cound not found any products. try again some time.</p>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  onFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1>Oops! something Went Wrong</h1>
      <p>We have some nhjfjvh fbhfhud nfsbfdsfu</p>
    </div>
  )

  finalRenderView = () => {
    const {isStatus} = this.state
    switch (isStatus) {
      case isStatusList.success:
        return this.renderProductsList()
      case isStatusList.progress:
        return this.renderLoader()
      case isStatusList.failure:
        return this.onFailure()
      case isStatusList.noProducts:
        return this.noProductsView()
      default:
        return null
    }
  }

  onSearch = event => {
    if (event.key === 'Enter') {
      this.setState({search: event.target.value}, this.getProducts)
    }
  }

  updateCategory = id => {
    this.setState({category: id}, this.getProducts)
  }

  updateRating = id => {
    this.setState({rating: id}, this.getProducts)
  }

  onClearFilter = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        search: '',
        category: '',
        rating: '',
      },
      this.getProducts,
    )
  }

  updateInput = value => {
    this.setState({search: value})
  }

  render() {
    const {search} = this.state
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onSearch={this.onSearch}
          updateCategory={this.updateCategory}
          updateRating={this.updateRating}
          search={search}
          onClearFilter={this.onClearFilter}
          updateInput={this.updateInput}
        />

        <div>{this.finalRenderView()}</div>
      </div>
    )
  }
}

export default AllProductsSection
