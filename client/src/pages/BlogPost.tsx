import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Placeholder for blog post data - will be fetched from API later
  const blogPosts: { [key: string]: { title: string; date: string; content: string } } = {
    '1': {
      title: 'The Future of Diamonds: Lab-Grown vs. Mined',
      date: 'June 15, 2025',
      content: `
        <p>The debate between lab-grown and mined diamonds continues to evolve as technology advances and consumer preferences shift. Both have their unique appeals, but understanding their differences is key to making an informed decision.</p>
        <h3>Origin and Formation</h3>
        <p>Mined diamonds are formed deep within the Earth's mantle over billions of years, brought to the surface through volcanic activity. Lab-grown diamonds, on the other hand, are created in highly controlled environments using advanced technological processes that replicate natural conditions.</p>
        <h3>Environmental and Ethical Considerations</h3>
        <p>One of the most significant advantages of lab-grown diamonds is their ethical and environmental footprint. They are guaranteed conflict-free, and their production requires significantly less energy and water compared to traditional mining, which can have substantial ecological impacts.</p>
        <h3>Physical and Chemical Properties</h3>
        <p>It's crucial to understand that lab-grown diamonds are not imitations; they are real diamonds. They possess the exact same chemical, physical, and optical properties as mined diamonds. This means they have the same brilliance, fire, and sparkle.</p>
        <h3>Value and Affordability</h3>
        <p>Generally, lab-grown diamonds offer a more accessible price point for comparable quality and size. This allows consumers to acquire larger or higher-quality stones within their budget, without compromising on the beauty or authenticity of a diamond.</p>
        <p>Ultimately, the choice between lab-grown and mined diamonds is a personal one. Both are beautiful, durable, and valuable. At GemDia, we are proud to offer ethically-sourced lab-grown diamonds, providing a responsible and brilliant choice for your jewelry.</p>
      `,
    },
    '2': {
      title: 'Choosing the Perfect Engagement Ring: A Comprehensive Guide',
      date: 'June 10, 2025',
      content: `
        <p>Choosing an engagement ring is a momentous occasion, filled with excitement and a touch of overwhelm. This guide will walk you through the essential steps to find the perfect symbol of your love.</p>
        <h3>Understanding the 4 C's</h3>
        <p>The foundation of diamond selection lies in the 4 C's: Cut, Color, Clarity, and Carat Weight. Each plays a crucial role in a diamond's beauty and value. Prioritize Cut for maximum sparkle, then consider Color and Clarity based on your budget and preferences.</p>
        <h3>Selecting the Setting</h3>
        <p>The setting not only holds the diamond but also defines the ring's overall style. Popular settings include solitaire (classic and elegant), pave (for added sparkle), halo (to enhance the center stone's size), and bezel (for modern protection).</p>
        <h3>Choosing the Metal</h3>
        <p>Your choice of metal impacts the ring's aesthetic and durability. Options include classic yellow gold, modern white gold, romantic rose gold, and durable platinum. Consider your partner's skin tone and existing jewelry collection.</p>
        <h3>Personal Touches</h3>
        <p>Make the ring truly unique with personalized touches like engraving, hidden gems, or custom designs. These thoughtful details add sentimental value and make the ring one-of-a-kind.</p>
        <p>Remember, the perfect engagement ring is one that resonates with your partner's style and your shared love story. Take your time, enjoy the process, and don't hesitate to seek expert advice.</p>
      `,
    },
    '3': {
      title: 'Sustainable Luxury: Our Commitment to Ethical Jewelry',
      date: 'June 01, 2025',
      content: `
        <p>In an era where conscious consumerism is paramount, the demand for ethically and sustainably produced goods has extended to the luxury market, including fine jewelry. At GemDia, we are at the forefront of this movement, committed to offering beautiful jewelry that aligns with your values.</p>
        <h3>The Ethical Choice: Lab-Grown Diamonds</h3>
        <p>Our core commitment to sustainability begins with our diamonds. We exclusively use lab-grown diamonds, which are chemically, physically, and optically identical to mined diamonds but are created in controlled environments. This eliminates the ethical concerns associated with traditional diamond mining, such as conflict funding and human rights abuses.</p>
        <h3>Minimizing Environmental Impact</h3>
        <p>The production of lab-grown diamonds has a significantly smaller environmental footprint. It requires less energy and water, and avoids the extensive land disruption and waste generated by mining operations. We also strive to use recycled precious metals in our settings, further reducing the demand for newly extracted resources.</p>
        <h3>Transparent Practices</h3>
        <p>Transparency is key to building trust. We are committed to providing clear information about our sourcing, manufacturing processes, and environmental initiatives. We believe you have the right to know where your jewelry comes from and how it's made.</p>
        <h3>A Future of Responsible Luxury</h3>
        <p>Our dedication to sustainable luxury is an ongoing journey. We continuously research and implement new practices to minimize our impact and contribute positively to the industry and the planet. When you choose GemDia, you're not just buying a piece of jewelry; you're investing in a future where luxury and responsibility go hand in hand.</p>
      `,
    },
  };

  const post = blogPosts[id || ''];

  if (!post) {
    return <div className="content-page"><h1>Blog Post Not Found</h1><p>The blog post you are looking for does not exist.</p></div>;
  }

  return (
    <div className="content-page blog-post-detail">
      <h1>{post.title}</h1>
      <p className="post-date">Published on: {post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p><Link to="/blog">Back to Blog</Link></p>
    </div>
  );
};

export default BlogPost;
