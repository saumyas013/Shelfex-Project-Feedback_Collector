//// src/pages/AdminDashboard.js
//import React from 'react';
//import './AdminDashboard.css'; // We'll add some CSS later
//
//const AdminDashboard = () => {
//  return (
//    <div className="admin-dashboard-container">
//      <h2>Admin Dashboard</h2>
//      <p>Welcome, Admin! This is your dashboard.</p>
//      {/* We will add feedback list and charts here in the next step */}
//    </div>
//  );
//};
//
//export default AdminDashboard;



//// src/pages/AdminDashboard.js
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import {
//  Chart as ChartJS,
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  ArcElement,
//  Title,
//  Tooltip,
//  Legend,
//  PointElement,
//  LineElement,
//} from 'chart.js';
//import { Bar, Pie, Line } from 'react-chartjs-2';
//import './AdminDashboard.css';
//
//// Register Chart.js components
//ChartJS.register(
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  ArcElement,
//  Title,
//  Tooltip,
//  Legend,
//  PointElement,
//  LineElement
//);
//
//const API_BASE_URL = 'http://localhost:8080/admin'; // Base URL for admin APIs
//
//const AdminDashboard = () => {
//  const [feedbacks, setFeedbacks] = useState([]);
//  const [stats, setStats] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState('');
//
//  // Filter and Sort states
//  const [filterProductId, setFilterProductId] = useState('');
//  const [filterRating, setFilterRating] = useState('');
//  const [sortBy, setSortBy] = useState('createdAt');
//  const [sortOrder, setSortOrder] = useState('desc');
//
//  // Headers for authenticated requests
//  const getAuthHeaders = () => {
//    const token = localStorage.getItem('jwtToken');
//    return {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    };
//  };
//
//  const fetchFeedbacks = async () => {
//    setLoading(true);
//    setError('');
//    try {
//      const params = {
//        productId: filterProductId || undefined, // Send undefined if empty
//        rating: filterRating ? parseInt(filterRating) : undefined, // Convert to int
//        sortBy,
//        sortOrder,
//      };
//
//      const response = await axios.get(`${API_BASE_URL}/feedbacks`, {
//        ...getAuthHeaders(),
//        params,
//      });
//      setFeedbacks(response.data);
//    } catch (err) {
//      console.error('Error fetching feedbacks:', err);
//      setError('Failed to load feedback data.');
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  const fetchStats = async () => {
//    try {
//      const response = await axios.get(`${API_BASE_URL}/stats`, getAuthHeaders());
//      setStats(response.data);
//    } catch (err) {
//      console.error('Error fetching stats:', err);
//      setError('Failed to load statistics.');
//    }
//  };
//
//  useEffect(() => {
//    fetchFeedbacks();
//    fetchStats();
//  }, [filterProductId, filterRating, sortBy, sortOrder]); // Re-fetch when filters/sort change
//
//  // Chart Data Preparation
//  const getRatingDistributionData = () => {
//    if (!stats || !stats.ratingDistribution) return { labels: [], datasets: [] };
//    const labels = Object.keys(stats.ratingDistribution).sort((a, b) => parseInt(a) - parseInt(b)); // Sort labels numerically
//    const data = labels.map(key => stats.ratingDistribution[key]);
//    return {
//      labels: labels.map(label => `${label} Star`),
//      datasets: [
//        {
//          label: 'Number of Feedbacks',
//          data: data,
//          backgroundColor: [
//            'rgba(255, 99, 132, 0.6)', // 1 star
//            'rgba(255, 159, 64, 0.6)', // 2 star
//            'rgba(255, 206, 86, 0.6)', // 3 star
//            'rgba(75, 192, 192, 0.6)', // 4 star
//            'rgba(54, 162, 235, 0.6)', // 5 star
//          ],
//          borderColor: [
//            'rgba(255, 99, 132, 1)',
//            'rgba(255, 159, 64, 1)',
//            'rgba(255, 206, 86, 1)',
//            'rgba(75, 192, 192, 1)',
//            'rgba(54, 162, 235, 1)',
//          ],
//          borderWidth: 1,
//        },
//      ],
//    };
//  };
//
//  const getFeedbackPerProductData = () => {
//    if (!stats || !stats.feedbackPerProduct) return { labels: [], datasets: [] };
//    const labels = stats.feedbackPerProduct.map(p => p._id);
//    const data = stats.feedbackPerProduct.map(p => p.feedbackCount);
//    return {
//      labels: labels,
//      datasets: [
//        {
//          label: 'Feedback Count',
//          data: data,
//          backgroundColor: [
//            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
//          ],
//          hoverBackgroundColor: [
//            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
//          ],
//        },
//      ],
//    };
//  };
//
//  const getDailyActiveUsersData = () => {
//    // This part is for "Daily active users" which is not directly available from our current backend stats.
//    // For a real implementation, you'd need a backend endpoint that groups feedback by date.
//    // For now, we can simulate or explain this is a placeholder.
//    // Let's create dummy data for demonstration.
//    const dummyDates = ['2025-06-10', '2025-06-11', '2025-06-12', '2025-06-13', '2025-06-14', '2025-06-15'];
//    const dummyUserCounts = [10, 15, 12, 18, 20, 16]; // Placeholder counts
//
//    return {
//      labels: dummyDates,
//      datasets: [
//        {
//          label: 'Daily Feedbacks Submitted (Placeholder)',
//          data: dummyUserCounts,
//          fill: false,
//          borderColor: 'rgb(75, 192, 192)',
//          tension: 0.1,
//        },
//      ],
//    };
//  };
//
//  const chartOptions = {
//    responsive: true,
//    maintainAspectRatio: false, // Allows flexible sizing
//    plugins: {
//      legend: {
//        position: 'top',
//      },
//      title: {
//        display: true,
//        text: 'Chart Title', // Will be overridden per chart
//      },
//    },
//  };
//
//  const ratingDistributionOptions = {
//    ...chartOptions,
//    plugins: {
//      ...chartOptions.plugins,
//      title: { display: true, text: 'Rating Distribution' },
//    },
//    scales: {
//        y: {
//            beginAtZero: true,
//            title: {
//                display: true,
//                text: 'Number of Feedbacks'
//            }
//        },
//        x: {
//            title: {
//                display: true,
//                text: 'Star Rating'
//            }
//        }
//    }
//  };
//
//  const feedbackPerProductOptions = {
//    ...chartOptions,
//    plugins: {
//      ...chartOptions.plugins,
//      title: { display: true, text: 'Feedback Per Product' },
//    },
//  };
//
//  const dailyActivityOptions = {
//    ...chartOptions,
//    plugins: {
//      ...chartOptions.plugins,
//      title: { display: true, text: 'Daily Feedback Activity (Placeholder)' },
//    },
//    scales: {
//        y: {
//            beginAtZero: true,
//            title: {
//                display: true,
//                text: 'Number of Feedbacks'
//            }
//        },
//        x: {
//            title: {
//                display: true,
//                text: 'Date'
//            }
//        }
//    }
//  };
//
//
//  if (loading) return <div className="loading-spinner">Loading dashboard...</div>;
//  if (error) return <div className="error-message">{error}</div>;
//
//  return (
//    <div className="admin-dashboard-container">
//      <h2>Admin Dashboard</h2>
//
//      <div className="stats-summary">
//        <div className="stat-card">
//          <h3>Total Feedbacks</h3>
//          <p>{stats?.totalRecords || 0}</p>
//        </div>
//        <div className="stat-card">
//          <h3>Average Rating</h3>
//          <p>{stats?.averageRating ? stats.averageRating.toFixed(2) : 'N/A'}</p>
//        </div>
//      </div>
//
//      <div className="charts-section">
//        <h3>Analytics Overview</h3>
//        <div className="chart-grid">
//          <div className="chart-card">
//            <Bar data={getRatingDistributionData()} options={ratingDistributionOptions} />
//          </div>
//          <div className="chart-card">
//            <Pie data={getFeedbackPerProductData()} options={feedbackPerProductOptions} />
//          </div>
//           <div className="chart-card">
//            <Line data={getDailyActiveUsersData()} options={dailyActivityOptions} />
//          </div>
//        </div>
//      </div>
//
//      <div className="feedback-list-section">
//        <h3>All Feedbacks</h3>
//        <div className="filters-sort-controls">
//          <div className="filter-group">
//            <label htmlFor="filterProductId">Product ID:</label>
//            <input
//              type="text"
//              id="filterProductId"
//              value={filterProductId}
//              onChange={(e) => setFilterProductId(e.target.value)}
//              placeholder="e.g., general_product_v1"
//            />
//          </div>
//          <div className="filter-group">
//            <label htmlFor="filterRating">Rating:</label>
//            <select
//              id="filterRating"
//              value={filterRating}
//              onChange={(e) => setFilterRating(e.target.value)}
//            >
//              <option value="">All</option>
//              {[1, 2, 3, 4, 5].map(r => (
//                <option key={r} value={r}>{r} Star</option>
//              ))}
//            </select>
//          </div>
//          <div className="filter-group">
//            <label htmlFor="sortBy">Sort By:</label>
//            <select
//              id="sortBy"
//              value={sortBy}
//              onChange={(e) => setSortBy(e.target.value)}
//            >
//              <option value="createdAt">Date</option>
//              <option value="rating">Rating</option>
//            </select>
//          </div>
//          <div className="filter-group">
//            <label htmlFor="sortOrder">Order:</label>
//            <select
//              id="sortOrder"
//              value={sortOrder}
//              onChange={(e) => setSortOrder(e.target.value)}
//            >
//              <option value="desc">Descending</option>
//              <option value="asc">Ascending</option>
//            </select>
//          </div>
//        </div>
//
//        <div className="feedback-table-container">
//          {feedbacks.length === 0 && !loading && !error ? (
//            <p className="no-feedback">No feedback available matching current filters.</p>
//          ) : (
//            <table>
//              <thead>
//                <tr>
//                  <th>ID</th>
//                  <th>Product ID</th>
//                  <th>Rating</th>
//                  <th>Feedback Text</th>
//                  <th>Name</th>
//                  <th>Email</th>
//                  <th>Submitted At</th>
//                </tr>
//              </thead>
//              <tbody>
//                {feedbacks.map((feedback) => (
//                  <tr key={feedback.id}>
//                    <td>{feedback.id.substring(feedback.id.length - 6)}</td> {/* Shorten ID */}
//                    <td>{feedback.productId}</td>
//                    <td>{feedback.rating}</td>
//                    <td className="feedback-text-cell">{feedback.feedbackText}</td>
//                    <td>{feedback.name || 'Anonymous'}</td>
//                    <td>{feedback.email || 'N/A'}</td>
//                    <td>{new Date(feedback.createdAt).toLocaleString()}</td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//          )}
//        </div>
//      </div>
//    </div>
//  );
//};
//
//export default AdminDashboard;




// src/pages/AdminDashboard.js
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import SockJS from 'sockjs-client'; // Import SockJS
import { Client } from '@stomp/stompjs'; // Import Stomp
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const API_BASE_URL = 'http://localhost:8080/admin'; // Base URL for admin APIs

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter and Sort states
  const [filterProductId, setFilterProductId] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Stomp client and flag to prevent multiple connections
  const stompClient = useRef(null);

  // Headers for authenticated requests
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        productId: filterProductId || undefined, // Send undefined if empty
        rating: filterRating ? parseInt(filterRating) : undefined, // Convert to int
        sortBy,
        sortOrder,
      };

      const response = await axios.get(`${API_BASE_URL}/feedbacks`, {
        ...getAuthHeaders(),
        params,
      });
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to load feedback data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`, getAuthHeaders());
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load statistics.');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();

    // Initialize WebSocket connection only once
    if (!stompClient.current) {
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log(str);
        }
      });

      stompClient.current.onConnect = () => {
        console.log('WebSocket connected!');
        stompClient.current.subscribe('/topic/newFeedback', (message) => {
          const webSocketMessage = JSON.parse(message.body);
          if (webSocketMessage.type === 'newFeedback') {
            console.log('New feedback received:', webSocketMessage.payload);
            // Update the feedbacks list and fetch stats
            setFeedbacks((prevFeedbacks) => [webSocketMessage.payload, ...prevFeedbacks]); // Add new feedback to the beginning
            fetchStats(); // Re-fetch stats to update charts
          }
        });
      };

      stompClient.current.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      stompClient.current.activate();

      return () => {
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.deactivate();
          console.log('WebSocket disconnected.');
        }
      };
    }
  }, [filterProductId, filterRating, sortBy, sortOrder]); // Re-fetch when filters/sort change

  // Chart Data Preparation - (Same as before)
  const getRatingDistributionData = () => {
    if (!stats || !stats.ratingDistribution) return { labels: [], datasets: [] };
    const labels = Object.keys(stats.ratingDistribution).sort((a, b) => parseInt(a) - parseInt(b)); // Sort labels numerically
    const data = labels.map(key => stats.ratingDistribution[key]);
    return {
      labels: labels.map(label => `${label} Star`),
      datasets: [
        {
          label: 'Number of Feedbacks',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // 1 star
            'rgba(255, 159, 64, 0.6)', // 2 star
            'rgba(255, 206, 86, 0.6)', // 3 star
            'rgba(75, 192, 192, 0.6)', // 4 star
            'rgba(54, 162, 235, 0.6)', // 5 star
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getFeedbackPerProductData = () => {
    if (!stats || !stats.feedbackPerProduct) return { labels: [], datasets: [] };
    const labels = stats.feedbackPerProduct.map(p => p._id);
    const data = stats.feedbackPerProduct.map(p => p.feedbackCount);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Feedback Count',
          data: data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
        },
      ],
    };
  };

  const getDailyActiveUsersData = () => {
    // This part is for "Daily active users" which is not directly available from our current backend stats.
    // For a real implementation, you'd need a backend endpoint that groups feedback by date.
    // For now, we can simulate or explain this is a placeholder.
    // Let's create dummy data for demonstration.
    const dummyDates = ['2025-06-10', '2025-06-11', '2025-06-12', '2025-06-13', '2025-06-14', '2025-06-15'];
    const dummyUserCounts = [10, 15, 12, 18, 20, 16]; // Placeholder counts

    return {
      labels: dummyDates,
      datasets: [
        {
          label: 'Daily Feedbacks Submitted (Placeholder)',
          data: dummyUserCounts,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexible sizing
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart Title', // Will be overridden per chart
      },
    },
  };

  const ratingDistributionOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: { display: true, text: 'Rating Distribution' },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Feedbacks'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Star Rating'
            }
        }
    }
  };

  const feedbackPerProductOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: { display: true, text: 'Feedback Per Product' },
    },
  };

  const dailyActivityOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: { display: true, text: 'Daily Feedback Activity (Placeholder)' },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Feedbacks'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Date'
            }
        }
    }
  };


  if (loading) return <div className="loading-spinner">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p>{stats?.totalRecords || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{stats?.averageRating ? stats.averageRating.toFixed(2) : 'N/A'}</p>
        </div>
      </div>

      <div className="charts-section">
        <h3>Analytics Overview</h3>
        <div className="chart-grid">
          <div className="chart-card">
            <Bar data={getRatingDistributionData()} options={ratingDistributionOptions} />
          </div>
          <div className="chart-card">
            <Pie data={getFeedbackPerProductData()} options={feedbackPerProductOptions} />
          </div>
           <div className="chart-card">
            <Line data={getDailyActiveUsersData()} options={dailyActivityOptions} />
          </div>
        </div>
      </div>

      <div className="feedback-list-section">
        <h3>All Feedbacks</h3>
        <div className="filters-sort-controls">
          <div className="filter-group">
            <label htmlFor="filterProductId">Product ID:</label>
            <input
              type="text"
              id="filterProductId"
              value={filterProductId}
              onChange={(e) => setFilterProductId(e.target.value)}
              placeholder="e.g., general_product_v1"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filterRating">Rating:</label>
            <select
              id="filterRating"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="">All</option>
              {[1, 2, 3, 4, 5].map(r => (
                <option key={r} value={r}>{r} Star</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sortOrder">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <div className="feedback-table-container">
          {feedbacks.length === 0 && !loading && !error ? (
            <p className="no-feedback">No feedback available matching current filters.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Rating</th>
                  <th>Feedback Text</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.id.substring(feedback.id.length - 6)}</td> {/* Shorten ID */}
                    <td>{feedback.productId}</td>
                    <td>{feedback.rating}</td>
                    <td className="feedback-text-cell">{feedback.feedbackText}</td>
                    <td>{feedback.name || 'Anonymous'}</td>
                    <td>{feedback.email || 'N/A'}</td>
                    <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;