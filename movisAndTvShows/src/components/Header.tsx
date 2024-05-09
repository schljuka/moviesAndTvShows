import React from "react";
import { useDispatch } from "react-redux";
import { changeCategory } from "../store/reducer/CategorySlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = (category: string) => {
    dispatch(changeCategory(category));
  };

  return (
    <div>
      <button onClick={() => handleClick("movie")}>Movies</button>
      <button onClick={() => handleClick("tv")}>TV Shows</button>
    </div>
  );
};

export default Header;