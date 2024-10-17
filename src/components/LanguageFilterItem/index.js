import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, updateActiveLanguageId} = props
  const {id, language} = languageDetails
  const languageBtnClassName = isActive ? 'item-btn active' : 'item-btn'

  const onClickItemBtn = () => updateActiveLanguageId(id)

  return (
    <li className="language-item">
      <button
        type="button"
        className={languageBtnClassName}
        onClick={onClickItemBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
