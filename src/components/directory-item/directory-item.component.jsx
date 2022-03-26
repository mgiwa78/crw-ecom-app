import "./directory-item.styles.scss";

import {
  DirectoryItemContainer,
  DirectoryItemBackground,
  DirectoryItemBody,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, id } = category;
  console.log(category);

  return (
    <DirectoryItemContainer key={id}>
      <DirectoryItemBackground
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p> Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
