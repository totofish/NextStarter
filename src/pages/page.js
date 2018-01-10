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

class Page extends React.Component {

	componentDidMount () {
		this.props.apiActionCancel();
		this.props.getUTCDate();
	}

	render() {
		return (
			<Layout title='Page' url={this.props.url}>
				
				<h4 style={{marginBottom: 10}}>DATE :</h4>
				{ this.props.info && this.props.info.message }
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
)(Page);