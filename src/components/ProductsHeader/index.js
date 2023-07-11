import './index.css'

const ProductsHeader = props => {
  const {activeOptionId, categoriesList, updateActiveOptionId} = props
  const onChangeCategory = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="header-container">
      <select
        className="sort-by-select"
        value={activeOptionId}
        onChange={onChangeCategory}
      >
        {categoriesList.map(eachOption => (
          <option
            key={eachOption.id}
            value={eachOption.id}
            className="select-option"
          >
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}
export default ProductsHeader
