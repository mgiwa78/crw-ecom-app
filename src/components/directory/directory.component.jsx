import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";
import styledComponents from "styled-components";

import { DirectoryStyles } from "./directory.styles";

const Directory = ({ categories }) => {
  return (
    <DirectoryStyles>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryStyles>
  );
};

export default Directory;
