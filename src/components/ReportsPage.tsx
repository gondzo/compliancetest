import * as React from 'react';
import moment from 'moment';
import { JobResult, User } from '@src/types';
import Result from '@src/components/Result';
import { Table, Button } from 'reactstrap';

interface ReportsPageProps {
  result: JobResult;
  error: string;
  user: User;
  refresh: () => any;
  isRefreshing: boolean;
}

const ReportsPage: React.SFC<ReportsPageProps> = ({
  result,
  error,
  user,
  isRefreshing,
  refresh,
}) => {
  return (
    <div className="reports-page container">
      <div className="placeholder">LOGO</div>
      {user.isAdmin && (
        <div>
          {isRefreshing ? (
            <Button outline color="primary" disabled>
              Refresh...
            </Button>
          ) : (
            <Button outline color="primary" onClick={refresh}>
              Refresh data
            </Button>
          )}
        </div>
      )}
      {error && (
        <div className="alert alert-danger my-2" role="alert">
          {error}
        </div>
      )}
      {!result && !error && <div className="text-center m-5">loading...</div>}
      {result && (
        <div className="my-3">
          <Table>
            <tbody>
              <tr>
                <td>Result:</td>
                <td>{result.result}</td>
              </tr>
              {result.message && (
                <tr>
                  <td>Error:</td>
                  <td>{result.message}</td>
                </tr>
              )}
              {result.started && (
                <tr>
                  <td>Started at:</td>
                  <td>{moment(result.started).format('LL LTS')}</td>
                </tr>
              )}
              {result.started && (
                <tr>
                  <td>Finished at:</td>
                  <td>
                    {moment(result.started)
                      .add(result.duration)
                      .format('LL LTS')}
                  </td>
                </tr>
              )}
              {result.duration && (
                <tr>
                  <td>Duration:</td>
                  <td>{result.duration}ms</td>
                </tr>
              )}
            </tbody>
          </Table>
          {result.result === 'success' && (
            <div>
              {result.rules.map((item, i) => <Result {...item} key={i} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
