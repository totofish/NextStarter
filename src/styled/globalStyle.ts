import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .container {
    min-width: 340px;
    padding: 0 2rem;
  }

  .language {
    position: fixed;
    top: 10px;
    right: 20px;
    padding: 0;
    margin: 0;
    font-family: "Noto Sans TC", Roboto;
    font-size: 14px;
    font-weight: 400;
    list-style: none;

    li {
      display: inline-block;

      &:not(:last-child) {
        &::after {
          display: inline-block;
          width: 1px;
          height: 10px;
          margin: 0 10px;
          vertical-align: middle;
          content: '';
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }

    a {
      color: #fff;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 4rem 0;
  }

  .title {
    margin: 0;
    font-size: 4rem;
    line-height: 1.15;
    text-align: center;
  }
`
