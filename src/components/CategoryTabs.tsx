import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty } from '../types';

const CategoryTabsComponet = ({ className }: ICommonComponentProperty) => {
  return (
    <ul className={className}>
      <li className="selected">未來四天氣候</li>
      <li>未來四天氣溫圖</li>
      <li>未來四天濕度圖</li>
    </ul>
  )
};

const CategoryTabs = styled(CategoryTabsComponet)`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  li {
    flex-grow: 1;
    border: 1px solid red;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    &.selected {
      background-color: yellow;
    }
  }
`

export default CategoryTabs;