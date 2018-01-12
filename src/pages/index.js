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
    store, isServer, pathname, query // eslint-disable-line no-unused-vars
  }) {
    // Async await
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();

    // Async promise
    const actionIP = getIP();
    store.dispatch(actionIP);

    return Promise.all([actionIP])
      .then(value => ({ stars: json.stargazers_count, ip: value[0].ip }))
      .catch(() => ({ stars: json.stargazers_count }));

    /*
    return actionIP.Promise.then((value) => {
      return { stars: json.stargazers_count };
    }, (error) => {
      return { stars: json.stargazers_count };
    });
    */

    /*
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
    stars: PropTypes.number.isRequired,
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
