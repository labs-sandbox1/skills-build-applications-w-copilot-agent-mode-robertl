import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
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
        <p className="mt-3">Loading users...</p>
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
      <h2>👤 Users</h2>
      {users.length === 0 ? (
        <div className="no-data-message">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.username}</strong></td>
                  <td>{user.email || <span className="text-muted">No email</span>}</td>
                  <td>
                    {user.team ? (
                      <span className="badge bg-info">{user.team}</span>
                    ) : (
                      <span className="text-muted">No team</span>
                    )}
                  </td>
                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
