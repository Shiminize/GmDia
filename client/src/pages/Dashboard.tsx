import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Placeholder user data and order history
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const orderHistory = [
    { id: 'ORD001', date: '2025-06-20', total: 1500, status: 'Delivered', items: ['Classic Solitaire Ring'] },
    { id: 'ORD002', date: '2025-06-25', total: 2200, status: 'Processing', items: ['Custom Emerald Necklace', 'Diamond Tennis Bracelet'] },
  ];

  const savedDesigns = [
    { id: 'DESIGN001', name: 'My Custom Ring', imageUrl: 'https://via.placeholder.com/150x100?text=Custom+Ring', dateSaved: '2025-06-26' },
    { id: 'DESIGN002', name: 'Engagement Idea', imageUrl: 'https://via.placeholder.com/150x100?text=Engagement+Idea', dateSaved: '2025-06-20' },
  ];

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user.name}!</h1>

      <div className="dashboard-section">
        <h2>Account Information</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="btn">Edit Profile</button>
      </div>

      <div className="dashboard-section">
        <h2>Order History</h2>
        {orderHistory.length > 0 ? (
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toLocaleString()}</td>
                  <td>{order.items.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no past orders.</p>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Saved Designs</h2>
        {savedDesigns.length > 0 ? (
          <div className="saved-designs-list">
            {savedDesigns.map(design => (
              <div key={design.id} className="saved-design-item">
                <img src={design.imageUrl} alt={design.name} />
                <div className="saved-design-details">
                  <h4>{design.name}</h4>
                  <p>Saved: {design.dateSaved}</p>
                  <Link to={`/customize?designId=${design.id}`}><button className="btn">Load Design</button></Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no saved designs yet. Start customizing your perfect piece!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;