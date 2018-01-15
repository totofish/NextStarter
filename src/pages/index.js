import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// stores
import initStore from '../stores/store';
// actions
import { getIP } from '../actions/getIP';
import { getUTCDate } from '../actions/getUTC';
import { apiActionCancel } from '../actions/multiAction';
// components
import Layout from '../components/layout';

class Index extends React.Component {
  static async getInitialProps({
    store, isServer, pathname, query, req, res // eslint-disable-line no-unused-vars
  }) {
    const stargazers = fetch('https://api.github.com/repos/zeit/next.js')
      .then(r => r.json())
      .then(json => json.stargazers_count || json.message)
      .catch(() => 'fetch stargazers error');

    // Async promise
    const actionIP = getIP();
    store.dispatch(actionIP);

    // 處理錯誤時預設回應
    // const actionIPPromise = actionIP.Promise.catch(() => ({ ip: 'xx.xx.xx.xx' }));

    // 並發以加快回應
    const data = await Promise.all([stargazers, actionIP])
      .then(value => ({ stars: value[0], ip: value[1].ip }))
      .catch(() => ({ stars: '', ip: '' }));

    return data;

    // 也可以直接回傳 Promise
    // return Promise.all([actionIP, stargazers])
    //   .then(value => ({ stars: json.stargazers_count, ip: value[0].ip }))
    //   .catch(() => ({ stars: json.stargazers_count }));

    /*
    // 其他寫法
    return actionIP.Promise.then((value) => {
      return { stars: json.stargazers_count };
    }, (error) => {
      return { stars: json.stargazers_count };
    });

    return new Promise((resolve, reject) => {
      store.dispatch(getIP({
        callback: (res) => {
          resolve(res);
        }
      }));
    }).then((res) => {
      return { stars: json.stargazers_count };
    });
    */
  }

  static propTypes = {
    stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    url: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    ip: PropTypes.string.isRequired
  }

  static defaultProps = {}

  render() {
    const {
      stars,
      url,
      ip
    } = this.props;

    return (
      <Layout title="Index" url={url}>
        {stars ? <h4 style={{ marginBottom: 10 }}>NEXT.JS STARS :</h4> : null}
        {stars}
        {ip ? <h4 style={{ marginBottom: 10 }}>IP :</h4> : null}
        {ip}
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  dispatch =>
    bindActionCreators(
      {
        getUTCDate,
        apiActionCancel
      },
      dispatch
    )
)(Index);
