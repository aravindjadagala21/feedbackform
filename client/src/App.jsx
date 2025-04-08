import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      // 
      const response = await fetch('https://feedbackform-efs9.onrender.com/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAdmin) {
      fetchFeedbacks();
    }
  }, [showAdmin]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feedback Collector</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className={`px-4 py-2 rounded-md transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {showAdmin ? 'Hide Feedback' : 'View Submitted Feedback'}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`transition-opacity ${showAdmin ? 'opacity-50' : 'opacity-100'}`}>
            <FeedbackForm darkMode={darkMode} onSuccess={() => showAdmin && fetchFeedbacks()} />
          </div>
          
          {showAdmin && (
            <div className="animate-fade-in">
              <FeedbackList feedbacks={feedbacks} isLoading={isLoading} darkMode={darkMode} />
            </div>
          )}
        </main>

        <footer className={`mt-12 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className="text-center">
            Created by <span className="font-semibold">Aravind</span> | Feedback Collector App
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;