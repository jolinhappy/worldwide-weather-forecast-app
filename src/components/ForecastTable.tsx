import { table } from "console";
import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty } from '../types';

const CategoryTabsComponet = ({ className }: ICommonComponentProperty) => {
  return (
    <table className={className}>
      <thead>
          <tr>
            <th></th>
            <th>3/7</th>
            <th>3/8</th>
            <th>3/9</th>
            <th>3/10</th>
          </tr>
      </thead>
      <tbody>
          <tr>
            <th>白天</th>
            <td>30度</td>
            <td>30度</td>
            <td>30度</td>
            <td>30度</td>
          </tr>
          <tr>
            <th>晚上</th>
            <td>with two columns</td>
            <td>The table body</td>
            <td>with two columns</td>
            <td>d</td>
          </tr>
          <tr>
            <th>體感溫度</th>
            <td>with two columns</td>
            <td>The table body</td>
            <td>with two columns</td>
            <td>ds</td>
          </tr>
          <tr>
            <th>紫外線</th>
            <td>with two columns</td>
            <td>The table body</td>
            <td>with two columns</td>
            <td>ee</td>
          </tr>
      </tbody>
    </table>
  )
};

const CategoryTabs = styled(CategoryTabsComponet)`
  width: 100%;
  background-color: pink;
  th {
    padding: 10px;
  }
  td {
    padding: 10px;
    text-align: center;
  }
  tr {
    th {
      background-color: red;
    }
  }
`

export default CategoryTabs;