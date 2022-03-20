import "./product-card.styles.scss";

import Button from "../custom-btn/custom-btn.component";

const ProdectCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  );
};

export default ProdectCard;
