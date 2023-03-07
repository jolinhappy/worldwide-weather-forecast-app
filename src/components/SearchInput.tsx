import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty } from '../types';

const SearchInputComponent = ({ className }: ICommonComponentProperty) => {
  return (
    <div className={className}>
      <input type="text" />
      <button>Search</button>
    </div>
  )
};

const SearchInput = styled(SearchInputComponent)`
  input {
    height: 30px;
    width: 220px;
    border-radius: 5px;
    margin-right: 10px;
    border: 1px gray solid;
    padding-left: 10px;
    font-size: 16px;
  }
  button {
    height: 35px;
    width: 80px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`

export default SearchInput;