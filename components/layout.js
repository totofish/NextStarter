// import Link from 'next/link';
import Head from 'next/head';
import NProgress from 'nprogress';
import cn from 'classnames';
// import Router from 'next/router';
import { Link, Router } from '../routes'
// styles
import stylesheet from 'styles/index.scss';

Router.onRouteChangeStart = (url) => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


export default ({ children, title = 'NEXT.JS PWA', url }) => (
  <div className="layout">
    <Head>
      <title>{ title }</title>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </Head>

    <style jsx>{`
      .layout {
        text-align: center;
      }
      nav {
        width: 100%;
        height: 50px;
        position: fixed;
        background-color: rgba(34, 34, 34, 0.8);
      }
      header {
        height: 50px;
      }
      ul {
        display: flex;
        height: 50px;
        margin: 0;
        list-style: none;
        max-width: 500px;
        margin: auto;
        padding: 0;
      }
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        transition: all 0.3s;
        text-transform: uppercase;
      }
      li:hover {
        cursor: pointer;
        color: #fed136;
      }
      li.active {
        background-color: #fed136;
        color: #fff !important;
      }
      li.active:hover {
        background-color: #fec503;
      }
      .title {
        font-weight: 700;
        display: inline-block;
        margin: 30px 20px;
      }
    `}</style>

    <header>
      <nav>
        <ul>
          <Link route='/'>
            <li className={cn({ 'active': url.pathname === '/' })}><a>Index</a></li>
          </Link>
          <Link route='page' params={{ type: 'a' }}>
            <li className={cn({ 'active': url.pathname === '/page' && url.query.type.toLocaleLowerCase() === 'a' })}><a>page / a</a></li>
          </Link>
          <Link route='page' params={{ type: 'b' }}>
            <li className={cn({ 'active': url.pathname === '/page' && url.query.type.toLocaleLowerCase() === 'b' })}><a>page / b</a></li>
          </Link>
          <Link route='page' params={{ type: 'c' }}>
            <li className={cn({ 'active': url.pathname === '/page' && url.query.type.toLocaleLowerCase() === 'c' })}><a>page / c</a></li>
          </Link>
          <Link route='page' params={{ type: 'd' }}>
            <li className={cn({ 'active': url.pathname === '/page' && url.query.type.toLocaleLowerCase() === 'd' })}><a>page / d</a></li>
          </Link>
        </ul>
      </nav>
    </header>

    <i className="material-icons">&#xE8D0;</i>
    <h1 className="title">{ title }{ url.query.type && ` : ${url.query.type}` }</h1>
    <i className="material-icons">&#xE8D0;</i>

    { children }
  </div>
)