import {Component} from 'react'

import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.loading,
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
    })
  }

  updateActiveLanguageId = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepositoryItemsList)
  }

  renderReposComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.loadingView()
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
