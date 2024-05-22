import React from "react";
import styled from "styled-components";
import { ICommonComponentProperty } from '../types';
interface ISearchInput extends ICommonComponentProperty {
  value: string;
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
}

const SearchInputComponent = ({ className, value, inputChange, search }: ISearchInput) => {
  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      search();
    }
  }

  return (
    <div className={className}>
      <input type="text" value={value} placeholder="請輸入地區" onChange={(e) => { inputChange(e) }} onKeyDown={handleKeyPress} />
      <button onClick={search}>Search</button>
    </div>
  )
};

const SearchInput = styled(SearchInputComponent)`
  input {
    height: 34px;
    min-width: 120px;
    border-radius: 5px;
    margin-right: 10px;
    border: 1px gray solid;
    padding-left: 10px;
    font-size: 16px;
    color: #3B0404;
    &:focus {
      border: 1.5px solid #3B0404;
      outline: none;
    }
  }
  button {
    height: 35px;
    min-width: 60px;
    font-size: 13px;
    border-radius: 5px;
    border: none;
    color: #F9F1F0;
    background-color: #3B0404;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #DE847B;
      color: #3B0404;
    }
  }
  @media screen and (min-width: 640px) {
    input {
      width: 220px;
      font-size: 16px;
    }
    button {
      height: 35px;
      width: 80px;
      font-size: 16px;
    }
  }
`

export default SearchInput;