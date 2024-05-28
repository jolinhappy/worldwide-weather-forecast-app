import styled from "styled-components";
import { ICommonComponentProperty } from '../types';

const LoadingSpinnerComponent = ({ className }: ICommonComponentProperty) => {

  return (
    <div className={className}>
      <div className="spinner-loader"></div>
    </div>
  )
};

const LoadingSpinner = styled(LoadingSpinnerComponent)`
  display: flex;
  justify-content: center;
  padding: 8px;
  .spinner-loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: 
      radial-gradient(farthest-side,#45433f 94%,#0000) top/8px 8px no-repeat,
      conic-gradient(#0000 30%,#45433f);
    -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
    animation: l13 1s infinite linear;
  }
  @keyframes l13{ 
    100%{transform: rotate(1turn)}
  }
`

export default LoadingSpinner;