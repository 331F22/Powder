import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #B8BCBF;
  margin-bottom: 20px;
  border-bottom: 2px black;
  display: flex;
  justify-content: space-between;
  padding: padding: 20px;
  z-index: 12;
`;

export const NavLink = styled(Link)`
  text-align: right;  
  color: black;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #333;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: right;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;