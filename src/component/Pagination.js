import React, { memo, useState } from "react";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./pagination.css";

const Pagination = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
  deleteSelected,
}) => {
  const [isActive, setIsActive] = useState(false);

  const showButtons = (totalPosts, postPerPage) => {
    const noOfPages = Math.ceil(totalPosts / postPerPage);
    const buttonsValue = [];
    for (let i = 1; i <= noOfPages; i++) {
      buttonsValue.push(i);
    }
    return buttonsValue;
  };

  const handleArrowButtons = (pageNumber, doubleArrow = false) => {
    const maxPage = Math.ceil(totalPosts / postPerPage);
    if (pageNumber < 1 || pageNumber > maxPage) {
      alert(
        doubleArrow
          ? "Cannot go beyond this page."
          : "Cannot go beyond this page."
      );
      return;
    }
    setIsActive(doubleArrow || pageNumber === 1 || pageNumber === maxPage);
    setCurrentPage(doubleArrow ? maxPage : pageNumber);
  };

  const handleArrowClick = (pageNumber, doubleArrow = false) => {
    handleArrowButtons(pageNumber, doubleArrow);
  };

  return (
    <div>
      <div className="pagination">
        <div className="btn">
          <button className="delete-all-btn" onClick={() => deleteSelected()}>
            Delete Selected
          </button>
        </div>
        <ul>
          <button
            className={isActive ? "doubleArrowBack" : "doubleArrowBack active"}
            onClick={() => {
              handleArrowClick(1, false);
            }}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>
          <button
            className={isActive ? "backButton" : "backButton active"}
            onClick={() => {
              handleArrowClick(currentPage - 1);
            }}
          >
            <ArrowBackIosNewSharpIcon />
          </button>

          {showButtons(totalPosts, postPerPage).map((number) => {
            const isActive = number === currentPage;
            const liActiveclassName = isActive ? "link active" : "link";
            return (
              <li
                className={liActiveclassName}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          })}
          <button
            className={isActive ? "nextButton" : "nextButton active"}
            onClick={() => {
              handleArrowClick(currentPage + 1);
            }}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
          <button
            className={isActive ? "lastPage" : "lastPage active"}
            onClick={() => {
              handleArrowClick(Math.ceil(totalPosts / postPerPage), false);
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default memo(Pagination);
