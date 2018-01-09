import React from 'react';
import Head from 'next/head';
// styles
import stylesheet from '../styles/index.scss';

export default class Error extends React.Component {
  static getInitialProps ({ res, jsonPageRes }) {
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
    return { statusCode }
  }

  render () {
    console.log(this.props.statusCode);
    return (
      <div className="page-not-found">
        <Head>
          <title>{ this.props.statusCode || 'Error' }</title>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <style jsx>{`
          .page-not-found {
            width: 100vw;
            height: 100vh;
            color: #757575;
            // background-color: #e2fffa;
            padding: 0;
            margin: 0;
          }
          .icon {
            font-size: 150px;
            margin-bottom: 10px;
          }
          .center-box {
            text-align: center;
            height: 100%;
          }
          .center-box:before {
            content: "";
            width: 0;
            height: 100%;
            position: relative;
            vertical-align: middle;
            display: inline-block;
          }
          .area {
            position: relative;
            vertical-align: middle;
            display: inline-block;
          }
        `}</style>
        
        <div className="center-box">
          <div className="area">
            <i className="material-icons icon">&#xE87B;</i>
            <br/>
            {
              this.props.statusCode === 404 ?
                'The requested URL was not found'
                : 'An error occurred on client'
            }
          </div>
        </div>
      </div>
    )
  }
}