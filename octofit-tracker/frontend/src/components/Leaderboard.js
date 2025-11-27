import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="error-message">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="no-data-message">
          <p>No leaderboard data found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Points</th>
                <th>Total Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    <strong>
                      {index === 0 && '🥇 '}
                      {index === 1 && '🥈 '}
                      {index === 2 && '🥉 '}
                      {index + 1}
                    </strong>
                  </td>
                  <td><strong>{entry.user}</strong></td>
                  <td>{entry.team || <span className="text-muted">No team</span>}</td>
                  <td><span className="badge bg-success">{entry.total_points}</span></td>
                  <td>{entry.total_activities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
