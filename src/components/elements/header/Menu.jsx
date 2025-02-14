import React, { useState, useEffect } from "react";
import { bool } from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GlobalButton from "../GlobalButton";
import { useNavigate } from "react-router-dom";
import {
  __getItemCategories,
  getTwoCategory,
  addPage,
  pageToZero,
  doubleListToZero,
} from "../../../redux/modules/market/postSlice";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile_img_sm.svg";
import { ReactComponent as CateSnackIcon } from "../../../assets/icons/cate_snack.svg";
import { ReactComponent as CateMealIcon } from "../../../assets/icons/cate_meal.svg";
import { ReactComponent as CateClothesIcon } from "../../../assets/icons/cate_clothes.svg";
import { ReactComponent as CateBeautyIcon } from "../../../assets/icons/cate_beauty.svg";
import { ReactComponent as CateToyIcon } from "../../../assets/icons/cate_toy.svg";
import { ReactComponent as CateBoxIcon } from "../../../assets/icons/cate_box.svg";

const Menu = ({ open, setOpen, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const isLogin = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const categoryPage = useSelector((state) => state.marketPost.page);
  // const [page, setPage] = useState(categoryPage);
  const onPathHandler = () => {
    navigate(`/login`);
  };

  const item = localStorage.getItem("itemCategory");
  const petCategory = localStorage.getItem("petCategory");
  const onRequestHandler = (itemCategory) => {
    navigate("/");
    const currentDate = new Date(Date.now());
    const itemCategoryObj = {
      itemCategory: itemCategory,
      expire: currentDate.setMinutes(currentDate.getMinutes() + 1),
    };
    localStorage.setItem("itemCategory", JSON.stringify(itemCategoryObj));
    dispatch(pageToZero());
    dispatch(doubleListToZero());
    setState(itemCategory);
    setOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user-info"));

  const nickname = user?.nickname;

  useEffect(() => {
    if (item === state && petCategory === null) {
      // dispatch(__getItemCategories({ itemCategory: item, page: categoryPage }));
    }
  }, [dispatch, item, state, petCategory, categoryPage]);

  return (
    <StMenu open={open} aria-hidden={!isHidden} {...props}>
      {!isLogin && (
        <>
          <StBtnWrapper>
            <GlobalButton
              content={"로그인"}
              fontSize={"1.4rem"}
              fontWeight={900}
              width={"15.5rem"}
              height={"5rem"}
              onClick={onPathHandler}
            />
          </StBtnWrapper>
          <StLink href="/signup" tabIndex={tabIndex}>
            <span aria-hidden="true"></span>
            <StText>회원가입</StText>
          </StLink>
        </>
      )}
      {isLogin && (
        <>
          <StUserWrapper>
            <StUserBox>
              <UserImgBox>
                <StProfileIcon />
              </UserImgBox>
              <h3>{nickname}</h3>
            </StUserBox>
            <StLink href="/mypage" tabIndex={tabIndex}>
              <span aria-hidden="true"></span>
              <StText>마이페이지</StText>
            </StLink>
          </StUserWrapper>
        </>
      )}
      <StText>카테고리</StText>
      <StCategoryWrapper>
        <StCategoryBtnWrapper>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => {
              onRequestHandler("사료");
            }}
          >
            <CateMealIcon />
          </StCategoryBtn>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => {
              onRequestHandler("간식");
            }}
          >
            <CateSnackIcon />
          </StCategoryBtn>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => {
              onRequestHandler("의류");
            }}
          >
            <CateClothesIcon />
          </StCategoryBtn>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => onRequestHandler("미용")}
          >
            <CateBeautyIcon />
          </StCategoryBtn>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => onRequestHandler("장난감")}
          >
            <CateToyIcon />
          </StCategoryBtn>
          <StCategoryBtn
            tabIndex={tabIndex}
            onClick={() => onRequestHandler("기타용품")}
          >
            <CateBoxIcon />
          </StCategoryBtn>
        </StCategoryBtnWrapper>
      </StCategoryWrapper>
    </StMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

const StUserWrapper = styled.div``;

const StMenu = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${({ theme }) => theme.white};
  transform: ${({ open }) => (open ? "translateX(17%)" : "translateX(100%)")};
  height: 100vh;
  text-align: left;

  position: absolute;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.black};
  transition: transform 0.3s ease-in-out;
  z-index: 99998;
  box-shadow: ${({ open }) => (open ? " rgba(0, 0, 0, 0.5) 0 0 0 9999px" : "")};
  @media screen and (min-width: 1024px) {
    /* Desktop */
    transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-100%)")};
    width: 28rem;
    padding: 4rem 4rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-100%)")};
    width: 25rem;
    padding: 4rem 2rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-100%)")};
    width: 20rem;
    padding: 4rem 0rem;
  }
`;

const StText = styled.h3`
  font-size: 1.5rem;
  padding: 2.4rem 0 0 1.6rem;
  color: ${({ theme }) => theme.black};
`;

const StLink = styled.a`
  text-transform: uppercase;
  font-weight: 900;
  color: ${({ theme }) => theme.white};
  border-radius: 1rem;
  text-decoration: none;
  transition: color 0.3s linear;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    font-size: 1.5rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    font-size: 1.5rem;
  }

  &:hover {
    /* color: ${({ theme }) => theme.hoverButtonTextColor}; */
  }
`;

const StBtnWrapper = styled.div`
  padding: 2.4rem 0 0 1.6rem;
`;

const StCategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.white};

  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const StCategoryBtnWrapper = styled.div`
  margin: 2.4rem 0 0 1.6rem;
  width: 17.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const StCategoryBtn = styled.button`
  text-transform: uppercase;
  width: 8rem;
  height: 8rem;
  font-weight: 100;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.white};
  border-radius: 1rem;
  text-decoration: none;
  transition: color 0.3s linear;
  border: none;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.mainColor};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 8rem;
    height: 8rem;
    font-size: 1.7rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 8rem;
    height: 8rem;
    font-size: 1.6rem;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 7rem;
    height: 7rem;
    font-size: 1.5rem;
  }
`;

const StUserBox = styled.div`
  display: flex;
  width: 100%;
  padding: 2.4rem 0 0 1.6rem;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin: 20px 0px;
  @media (max-width: 767px) {
    /* Mobile */
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
`;

const UserImgBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  @media screen and (min-width: 1024px) {
    /* Desktop */
    width: 50px;
    height: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
    width: 50px;
    height: 50px;
  }

  @media (max-width: 767px) {
    /* Mobile */
    width: 50px;
    height: 50px;
  }
`;

const StProfileIcon = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Menu;
