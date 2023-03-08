import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty, IDisplayTabs, Category } from '../types';

interface ICategoryTabsProperty extends ICommonComponentProperty {
  currentSelectedTab: Category;
  tabSelect: (category: Category) => void;
}

const CategoryTabsComponet = ({ className, currentSelectedTab, tabSelect }: ICategoryTabsProperty) => {
  const displayTabs: IDisplayTabs[] = [
    {
      type: 'weather',
      name: '四日天氣'
    },
    {
      type: 'temperature',
      name: '四日氣溫'
    },
    {
      type: 'humidity',
      name: '四日濕度'
    }
  ] 
  return (
    <ul className={className}>
      {
        displayTabs.map((item: IDisplayTabs) => (
          <li
            key={item.type}
            className={currentSelectedTab === item.type ? 'selected': ''}
            onClick={() => tabSelect(item.type)}
          >
            {item.name}
          </li>
        ))
      }
    </ul>
  )
};

const CategoryTabs = styled(CategoryTabsComponet)`
  width: 100%;
  display: flex;
  margin-bottom: 6px;
  li {
    flex-grow: 1;
    text-align: center;
    background-color: #DE847B;
    color: #3B0404;
    padding: 15px 0;
    cursor: pointer;
    & + li {
      border-left: 1px #EED6D3 solid;
    }
    &.selected, &:hover {
      background-color: #B95C50;
      color: #F9F1F0;
    }
  }
  @media screen and (min-width: 640px) {
    li {
      padding: 18px 0px;
      font-size: 18px;
    }
  }
`

export default CategoryTabs;