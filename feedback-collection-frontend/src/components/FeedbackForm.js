//// src/components/FeedbackForm.js
//import React, { useState } from 'react';
//import ReactStars from 'react-rating-stars-component'; // Our star rating component
//import axios from 'axios'; // For making API calls
//import './FeedbackForm.css'; // We'll create this CSS file next
//
//const FeedbackForm = () => {
//  const [name, setName] = useState('');
//  const [email, setEmail] = useState('');
//  const [feedbackText, setFeedbackText] = useState('');
//  const [rating, setRating] = useState(0); // Initialize rating to 0
//  const [message, setMessage] = useState(''); // For success/error messages
//  const [isError, setIsError] = useState(false); // To style messages
//
//  const ratingChanged = (newRating) => {
//    setRating(newRating);
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault(); // Prevent default form submission behavior
//
//    // Basic client-side validation
//    if (!feedbackText.trim()) {
//      setMessage('Feedback text is required.');
//      setIsError(true);
//      return;
//    }
//    if (rating === 0) {
//        setMessage('Rating is required.');
//        setIsError(true);
//        return;
//    }
//
//    const feedbackData = {
//      name,
//      email,
//      feedbackText,
//      rating,
//      // For now, let's assume a default product ID or omit it if your backend handles it as optional
//      productId: 'general_product_v1' // This should ideally come from context if multiple products
//    };
//
//    try {
//      // Make sure your backend is running on http://localhost:8080
//      const response = await axios.post('http://localhost:8080/api/feedback', feedbackData);
//      console.log('Feedback submitted successfully:', response.data);
//      setMessage('Thank you for your feedback!');
//      setIsError(false);
//      // Clear form after successful submission
//      setName('');
//      setEmail('');
//      setFeedbackText('');
//      setRating(0); // Reset stars
//    } catch (error) {
//      console.error('Error submitting feedback:', error);
//      if (error.response && error.response.data && error.response.data.message) {
//        // If backend provides a specific validation error message
//        setMessage(`Submission failed: ${error.response.data.message}`);
//      } else {
//        setMessage('Failed to submit feedback. Please try again.');
//      }
//      setIsError(true);
//    }
//  };
//
//  return (
//    <div className="feedback-form-container">
//      <h2>Provide Your Feedback</h2>
//      <form onSubmit={handleSubmit} className="feedback-form">
//        <div className="form-group">
//          <label htmlFor="name">Name (Optional):</label>
//          <input
//            type="text"
//            id="name"
//            value={name}
//            onChange={(e) => setName(e.target.value)}
//            placeholder="Your name"
//          />
//        </div>
//
//        <div className="form-group">
//          <label htmlFor="email">Email (Optional):</label>
//          <input
//            type="email"
//            id="email"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            placeholder="your.email@example.com"
//          />
//        </div>
//
//        <div className="form-group">
//          <label htmlFor="feedbackText">Feedback <span className="required">*</span>:</label>
//          <textarea
//            id="feedbackText"
//            value={feedbackText}
//            onChange={(e) => setFeedbackText(e.target.value)}
//            placeholder="Enter your feedback here..."
//            rows="5"
//            required
//          ></textarea>
//        </div>
//
//        <div className="form-group">
//          <label>Rating <span className="required">*</span>:</label>
//          <ReactStars
//            count={5}
//            onChange={ratingChanged}
//            size={40}
//            activeColor="#ffd700"
//            value={rating} // Make sure the value prop is updated for resetting
//            isHalf={false} // Full stars only
//          />
//        </div>
//
//        <button type="submit" className="submit-button">Submit Feedback</button>
//
//        {message && (
//          <p className={`message ${isError ? 'error' : 'success'}`}>
//            {message}
//          </p>
//        )}
//      </form>
//    </div>
//  );
//};
//
//export default FeedbackForm;

//
//import React, { useState } from 'react';
//import axios from 'axios';
//// Remove the import for the rating component
//// import ReactStars from 'react-rating-stars-component';
//import './FeedbackForm.css';
//
//const API_BASE_URL = 'http://localhost:8080/api/feedback';
//
//const FeedbackForm = () => {
//  const [name, setName] = useState('');
//  const [email, setEmail] = useState('');
//  const [feedbackText, setFeedbackText] = useState('');
//  // Remove rating state initialization
//  // const [rating, setRating] = useState(0); // 0 or null as initial value
//  const [productId, setProductId] = useState('');
//  const [message, setMessage] = useState('');
//  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setMessage('');
//    setMessageType('');
//
//    try {
//      const feedbackData = {
//        name: name || undefined, // Send null or undefined if empty
//        email: email || undefined,
//        feedbackText,
//        // Removed rating from payload
//        // rating: rating || undefined, // Send null or undefined if 0
//        productId: productId || undefined,
//      };
//
//      const response = await axios.post(API_BASE_URL, feedbackData);
//
//      if (response.status === 201) {
//        setMessage('Thank you for your feedback!');
//        setMessageType('success');
//        // Clear form
//        setName('');
//        setEmail('');
//        setFeedbackText('');
//        // setRating(0); // Clear rating
//        setProductId('');
//      }
//    } catch (error) {
//      console.error('There was an error submitting the feedback!', error);
//      setMessage(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
//      setMessageType('error');
//    }
//  };
//
//  return (
//    <div className="feedback-form-container">
//      <h2>We'd Love Your Feedback!</h2>
//      {message && <div className={`message ${messageType}`}>{message}</div>}
//      <form onSubmit={handleSubmit}>
//        <div className="form-group">
//          <label htmlFor="feedbackText">Your Feedback: <span className="required-star">*</span></label>
//          <textarea
//            id="feedbackText"
//            value={feedbackText}
//            onChange={(e) => setFeedbackText(e.target.value)}
//            rows="5"
//            placeholder="Tell us what you think..."
//            required
//          ></textarea>
//        </div>
//
//        {/* Removed Rating Section */}
//        {/*
//        <div className="form-group">
//          <label>Overall Rating: <span className="required-star">*</span></label>
//          <ReactStars
//            count={5}
//            onChange={newRating => setRating(newRating)}
//            size={30}
//            activeColor="#ffd700"
//            value={rating}
//            isHalf={false}
//          />
//        </div>
//        */}
//
//        <div className="form-group">
//          <label htmlFor="name">Your Name (Optional):</label>
//          <input
//            type="text"
//            id="name"
//            value={name}
//            onChange={(e) => setName(e.target.value)}
//            placeholder="e.g., John Doe"
//          />
//        </div>
//        <div className="form-group">
//          <label htmlFor="email">Your Email (Optional):</label>
//          <input
//            type="email"
//            id="email"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            placeholder="e.g., john.doe@example.com"
//          />
//        </div>
//        <div className="form-group">
//          <label htmlFor="productId">Product ID (Optional):</label>
//          <input
//            type="text"
//            id="productId"
//            value={productId}
//            onChange={(e) => setProductId(e.target.value)}
//            placeholder="e.g., shelfex-v1"
//          />
//        </div>
//        <button type="submit" className="submit-button">Submit Feedback</button>
//      </form>
//    </div>
//  );
//};
//
//export default FeedbackForm;



// src/components/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import CustomStarRating from './CustomStarRating'; // <-- NEW: Import your custom component
import './FeedbackForm.css'; // Your existing CSS file

const API_BASE_URL = 'http://localhost:8080/api/feedback';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating state to 0
  const [productId, setProductId] = useState(''); // Assuming you want to capture this
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Handler for when the rating changes (now only via our custom component)
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    // Client-side validation: Feedback text and Rating are required
    if (!feedbackText.trim()) {
      setMessage('Feedback text is required.');
      setMessageType('error');
      return;
    }
    if (rating === 0) { // Check if rating is still 0 (meaning no stars selected)
      setMessage('Please provide a rating by selecting stars.');
      setMessageType('error');
      return;
    }

    const feedbackData = {
      name: name || undefined, // Send as undefined if empty
      email: email || undefined, // Send as undefined if empty
      feedbackText,
      rating, // Include the rating in the payload
      productId: productId || undefined, // Send as undefined if empty
    };

    try {
      const response = await axios.post(API_BASE_URL, feedbackData);

      if (response.status === 201) {
        setMessage('Thank you for your feedback! It has been submitted successfully.');
        setMessageType('success');
        // Clear form after successful submission
        setName('');
        setEmail('');
        setFeedbackText('');
        setRating(0); // Reset stars
        setProductId('');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error.response?.data?.message ||
                           error.response?.data?.errors?.[0]?.defaultMessage || // For backend @Valid errors
                           'Failed to submit feedback. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Share Your Experience</h2>
      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="feedbackText">Your Feedback <span className="required-star">*</span>:</label>
          <textarea
            id="feedbackText"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us about your experience..."
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group rating-group">
          <label>Overall Rating <span className="required-star">*</span>:</label>
          <div className="rating-stars-wrapper">
            <CustomStarRating // <-- NEW: Using your custom component
              count={5}
              onChange={ratingChanged}
              size="35px" // Pass size as a string for CSS units
              activeColor="#FFD700" // A vibrant gold color
              value={rating} // Bind to state for resetting
            />
          </div>
          {/* Removed the number input, as requested to focus on stars */}
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name (Optional):</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Jane Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email (Optional):</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.e.g., your.email@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productId">Product ID (Optional):</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="e.g., product-alpha-v1"
          />
        </div>

        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
//
//
