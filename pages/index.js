import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';
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
	static async getInitialProps({ store, isServer, pathname, query }) {
		// Async await
		const res = await fetch(
			'https://api.github.com/repos/zeit/next.js'
		);
		const json = await res.json();

		// Async promise
		let action_IP = getIP();
		store.dispatch(action_IP);

		return Promise.all([action_IP]).then((value) => {
			return { stars: json.stargazers_count, ip:value[0].ip };
		}).catch(function(error){
			return { stars: json.stargazers_count };
		});

		/*
		return action_IP.Promise.then((value) => {
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

	render() {
		const { stars, url, info, ip } = this.props;
		return (
			<Layout title='Index' url={url}>

				{ stars ? <h4 style={{marginBottom: 10}}>NEXT.JS STARS :</h4> : null }
				{ stars }
				{ ip ? <h4 style={{marginBottom: 10}}>IP :</h4> : null }
				{ ip }
			</Layout>
		);
	}
}

export default withRedux(
  initStore,
  state => ({
    info: state.sys.info
  }),
  dispatch => bindActionCreators({
		getUTCDate, apiActionCancel
  }, dispatch)
)(Index);