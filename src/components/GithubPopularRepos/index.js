import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    activeLanguageId: languageFiltersData[0].id,
    repositoryItemList: [],
  }

  componentDidMount() {
    this.getRepositoryItemsList()
  }

  getRepositoryItemsList = async () => {
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos
      this.setState({
        repositoryItemList: updatedData.map(each => ({
          id: each.id,
          name: each.name,
          avatarUrl: each.avatar_url,
          starsCount: each.stars_count,
          forksCount: each.forks_count,
          issuesCount: each.issues_count,
        })),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveLanguageId = activeLanguageId => {
    this.setState(
      {activeLanguageId, apiStatus: apiStatusConstants.inProgress},
      this.getRepositoryItemsList,
    )
  }

  renderSuccessView = () => {
    const {repositoryItemList} = this.state
    return (
      <ul className="repository-item-container">
        {repositoryItemList.map(each => (
          <RepositoryItem repositoryItemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-title">Something went wrong</h1>
    </div>
  )

  renderReposComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    const {repositoryItemList, activeLanguageId} = this.state
    console.log(repositoryItemList)
    return (
      <div className="repos-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-items-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageDetails={each}
              updateActiveLanguageId={this.updateActiveLanguageId}
              isActive={activeLanguageId === each.id}
              key={each.id}
            />
          ))}
        </ul>
        {this.renderReposComponent()}
      </div>
    )
  }
}

export default GithubPopularRepos
