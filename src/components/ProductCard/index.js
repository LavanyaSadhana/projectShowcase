import './index.css'

const ProductData = props => {
  const {productData} = props
  const {name, imageUrl} = productData

  return (
    <li className="list-items">
      <img src={imageUrl} alt={name} className="product-image" />
      <h1 className="heading">{name}</h1>
    </li>
  )
}
export default ProductData
