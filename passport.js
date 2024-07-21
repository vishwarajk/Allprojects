// React component for Login
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


// React component for Homepage
import React from 'react';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to Our Travel Agency</h1>
      <p>Explore our exclusive travel packages and food items.</p>
      <button>Get Started</button>
      <div>
        <h2>Testimonials</h2>
        {/* Add testimonials here */}
      </div>
    </div>
  );
};

export default Homepage;



// React component for Search and Filtering
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;


// React component for Product Listings
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`/api/products?page=${currentPage}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ProductList;


// React component for Product Detail
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetail;



  // React component for Booking/Order Form
import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [details, setDetails] = useState({ name: '', email: '', packageId: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/bookings', details);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="text"
        value={details.packageId}
        onChange={(e) => setDetails({ ...details, packageId: e.target.value })}
        placeholder="Package ID"
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;





// React component for User Dashboard
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/user');
      setUser(res.data);
    };
    const fetchBookings = async () => {
      const res = await axios.get('/api/bookings');
      setBookings(res.data);
    };
    fetchUser();
    fetchBookings();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <div>
        <h2>Your Bookings</h2>
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>{booking.packageName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;



// React component for Admin Panel
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    };
    const fetchUsers = async () => {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    };
    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Manage Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Manage Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;




// React component for Reviews
import React, { useState } from 'react';
import axios from 'axios';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`/api/reviews/${productId}`);
      setReviews(res.data);
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reviews', { productId, review: newReview });
      setReviews([...reviews, res.data]);
      setNewReview('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Reviews;




// Node.js example for sending email with Nodemailer
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
  }
};





/* Example CSS for responsiveness */
@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}




// Example of using helmet in Express
const helmet = require('helmet');
app.use(helmet());


// Example of using React Helmet
import { Helmet } from 'react-helmet';

const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export default SEO;


