import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {State} from '@src/types';
import {logout} from '@src/modules/global/actions';
import {push} from 'react-router-redux';

const mapState = (state: State) => ({
  user: state.global.user
});

export default connect(mapState, {logout, push})(Layout);

