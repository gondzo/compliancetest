import {connect} from 'react-redux';
import * as R from 'ramda';
import HomePage from '../components/HomePage';
import {State} from '@src/types';
import {loading} from '@src/modules/global/actions';

const mapState = (state: State) => R.pick(['error', 'isLoading'], state.global);

export default connect(mapState, {loading})(HomePage);

