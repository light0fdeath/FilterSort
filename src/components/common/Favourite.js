import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Favourite = (props) => {
  //const [favourite, setFavourite] = useState(false);

  if (props.favourite) {
    return <FavoriteIcon onClick={props.onClick} sx={{ cursor: "pointer" }} />;
  } else {
    return (
      <FavoriteBorderIcon onClick={props.onClick} sx={{ cursor: "pointer" }} />
    );
  }
};

export default Favourite;
