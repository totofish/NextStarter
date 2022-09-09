import styled from 'styled-components'

interface TitleShakeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

export default styled.span<TitleShakeProps>`
  position: relative;
  display: inline-block;
  color: #ffffffb8;
  text-shadow: .06em .06em 0 ${(props) => props.theme.colors.green};
  -webkit-font-smoothing: antialiased;

  &:after {
    position: absolute;
    top: .06em; left: .06em;
    text-shadow: none;
    content: attr(data-shadow);
    background-image:
      linear-gradient(
        45deg,
        transparent 45%,
        hsla(48,20%,90%,1) 45%,
        hsla(48,20%,90%,1) 55%,
        transparent 0
      );
    -webkit-background-clip: text;
    background-clip: text;
    background-size: .05em .05em;
    -webkit-text-fill-color: transparent;
    animation: shad-anim 15s linear infinite;
  }

  @keyframes shad-anim {
    0% {background-position: 0 0}
    0% {background-position: 100% -100%}
  }
`
