import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const FeedbackForm = ({ darkMode, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://feedbackform-efs9.onrender.com/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setSubmitSuccess(true);
      onSuccess && onSuccess();
      

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrors({
        ...errors,
        submit: 'Failed to submit feedback. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-semibold mb-4">Submit Your Feedback</h2>
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          Thank you for your feedback!
        </div>
      )}
      
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Feedback Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${darkMode ? 'text-white' : 'text-gray-900'}`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors ${isSubmitting ? 'bg-gray-400' : darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white w-full`}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <FiSend className="mr-2" />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;