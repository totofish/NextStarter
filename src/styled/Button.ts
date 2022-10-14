import styled, { css } from 'styled-components'

interface ButtonProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  red?: boolean
}

export default styled.button<ButtonProps>`
  min-width: 60px;
  padding: 2px 4px;
  margin-left: 8px;
  font-family: "Noto Sans TC", Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.15;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0px;
  outline: none;
  transition: 0.25s;
  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.25);
  }

  ${(props) => props.red && css`
    color: ${props.theme.colors.red};
    border: 1px solid ${props.theme.colors.red};

    &:hover {
      color: white;
      background-color: ${props.theme.colors.red};
    }
  `}
`
