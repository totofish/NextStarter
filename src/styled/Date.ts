import styled, { css } from 'styled-components'

interface DateProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  $loading?: boolean
}

export default styled.div<DateProps>`
  position: relative;

  &:before {
    position: absolute;
    display: block;
    width: 129%;
    height: 30%;
    content: '';
    /* background-color: rgb(233 30 99 / 29%); */
    background: repeating-linear-gradient(
      45deg,
      rgb(233 30 99 / 50%) 25%,
      rgb(233 30 99 / 50%) 50%,
      transparent 50%,
      transparent 75%
    );
    background-size: 4px 4px;
    border-radius: 10px;
    transition: 0.6s;
    animation: stripeBackgroundPosition 2s linear infinite;
  }

  @keyframes stripeBackgroundPosition {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: calc(48px * -1) 0;
    }
  }

  ${(props) => props.$loading && css`
    &:before {
      width: 0;
      transition: 0.1s;
    }
  `}
`
