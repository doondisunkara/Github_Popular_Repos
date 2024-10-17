import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryItemDetails
  return (
    <li className="repo-item">
      <img className="repo-avatar" src={avatarUrl} alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-details-container">
        <div className="repo-details-item">
          <img
            className="repo-icon"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="repo-details-count">{starsCount} stars</p>
        </div>
        <div className="repo-details-item">
          <img
            className="repo-icon"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="repo-details-count">{forksCount} forks</p>
        </div>
        <div className="repo-details-item">
          <img
            className="repo-icon"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="repo-details-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
