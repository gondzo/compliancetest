import {connect} from 'react-redux';
import ReportsPage from '../components/ReportsPage';
import {State} from '@src/types';
import {refresh} from '@src/modules/reports/actions';

const mapState = (state: State) => ({
  error: state.reports.error,
  result: state.reports.result,
  isRefreshing: state.reports.isRefreshing,
  user: state.global.user,
});

export default connect(mapState, {refresh})(ReportsPage);

