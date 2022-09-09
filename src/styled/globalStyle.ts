import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .container {
    padding: 0 2rem;
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

  .footer {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
  }

  .title {
    margin: 0;
    font-size: 4rem;
    line-height: 1.15;
    text-align: center;
  }

  .logo {
    height: 1em;
    margin-left: 0.5rem;
  }

  @media (prefers-color-scheme: dark) {
    .footer {
      border-color: #222;
    }
    .logo img {
      filter: invert(1);
    }
  }
`
