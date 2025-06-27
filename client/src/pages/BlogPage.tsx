import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const blogPosts = [
    { id: '1', title: 'The Future of Diamonds: Lab-Grown vs. Mined', date: 'June 15, 2025', excerpt: 'Explore the fascinating world of lab-grown diamonds and how they compare to their mined counterparts...' },
    { id: '2', title: 'Choosing the Perfect Engagement Ring: A Comprehensive Guide', date: 'June 10, 2025', excerpt: 'Navigating the world of engagement rings can be daunting. Our guide simplifies the process...' },
    { id: '3', title: 'Sustainable Luxury: Our Commitment to Ethical Jewelry', date: 'June 01, 2025', excerpt: 'Discover how [Your Chosen Brand Name Here] is leading the way in environmentally conscious jewelry production...' },
  ];

  return (
    <div className="content-page">
      <h1>Our Blog</h1>
      <p>Stay updated with the latest trends, insights, and stories from the world of lab-grown diamond jewelry.</p>
      <div className="blog-posts-list">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post-preview">
            <h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2>
            <p className="post-date">{post.date}</p>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more-link">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
