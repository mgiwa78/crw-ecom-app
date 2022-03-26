import "./directory-item.styles.scss";

import { Link } from "react-router-dom";
import {
  DirectoryItemContainer,
  DirectoryItemBackground,
  DirectoryItemBody,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, id } = category;

  return (
    <DirectoryItemContainer key={id}>
      <DirectoryItemBackground imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>
          <Link to={`/shop/${title}`}> Shop Now</Link>
        </p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
