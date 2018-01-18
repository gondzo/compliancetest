import * as React from 'react';

interface HomePageProps {
  isLoading?: boolean;
  error?: string;
  loading: () => any;
}

const HomePage: React.SFC<HomePageProps> = ({ isLoading, error, loading }) => {
  return (
    <div className="home-page">
      {!isLoading && (
        <a
          className="btn btn-default"
          onClick={loading}
          href={`${API_URL}/auth/heroku`}
        >
          Login with Heroku
        </a>
      )}
      {isLoading && <div>Loading...</div>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default HomePage;
