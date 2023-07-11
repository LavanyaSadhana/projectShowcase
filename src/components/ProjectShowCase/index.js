import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProjectShowCase extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeOptionId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeOptionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      console.log(updatedData)
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderSuccessView = () => {
    const {activeOptionId, productsList} = this.state

    return (
      <>
        <ProductsHeader
          activeOptionId={activeOptionId}
          categoriesList={categoriesList}
          updateActiveOptionId={this.updateActiveOptionId}
        />
        <ul className="list-container">
          {productsList.map(each => (
            <ProductCard key={each.id} productData={each} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>we cannot seem tp find the page you are looking for</p>
      <button type="button" onClick={this.getProducts()}>
        Retry
      </button>
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="project-showcase-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </nav>
        <div>{this.getApiStatus()}</div>
      </div>
    )
  }
}
export default ProjectShowCase
