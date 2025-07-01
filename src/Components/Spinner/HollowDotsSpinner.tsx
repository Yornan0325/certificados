import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Define las props
interface HollowSpinnerProps {
  size: number;
  color: string;
  animationDuration: number;
  dotsNum: number;
  animationDelay: number;
}

// Evita pasar props personalizadas al DOM
const HollowSpinner = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['dotsNum', 'animationDelay', 'animationDuration'].includes(prop),
})<HollowSpinnerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => 2 * props.size * props.dotsNum}px;

  * {
    box-sizing: border-box;
  }

  .dot {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    margin: 0 calc(${(props) => props.size}px / 2);
    border: calc(${(props) => props.size}px / 5) solid ${(props) => props.color};
    border-radius: 50%;
    float: left;
    transform: scale(0);
    animation: hollow-dots-spinner-animation ${(props) => props.animationDuration}ms ease infinite 0ms;
  }

  .dot:nth-child(1) {
    animation-delay: calc(${(props) => props.animationDelay}ms * 1);
  }
  .dot:nth-child(2) {
    animation-delay: calc(${(props) => props.animationDelay}ms * 2);
  }
  .dot:nth-child(3) {
    animation-delay: calc(${(props) => props.animationDelay}ms * 3);
  }

  @keyframes hollow-dots-spinner-animation {
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const propTypes = {
  size: PropTypes.number,
  animationDuration: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

function generateDots(num: number) {
  return Array.from({ length: num }).map((_, index) => (
    <div key={index} className="dot" />
  ));
}

const HollowDotsSpinner: React.FC<{
  size?: number;
  color?: string;
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  size = 15,
  color = '#fff',
  animationDuration = 1000,
  className = '',
  style,
  ...props
}) => {
  const dotsNum = 3;
  const animationDelay = animationDuration * 0.3;

  return (
    <HollowSpinner
      size={size}
      color={color}
      animationDuration={animationDuration}
      dotsNum={dotsNum}
      animationDelay={animationDelay}
      className={`hollow-dots-spinner${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {generateDots(dotsNum)}
    </HollowSpinner>
  );
};

HollowDotsSpinner.propTypes = propTypes;

export default HollowDotsSpinner;