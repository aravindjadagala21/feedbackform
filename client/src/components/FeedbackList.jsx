import { FiUser, FiMail, FiMessageSquare, FiClock } from 'react-icons/fi';

const FeedbackList = ({ feedbacks, isLoading, darkMode }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-semibold mb-4">Submitted Feedback</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-semibold mb-4">Submitted Feedback</h2>
      
      {feedbacks.length === 0 ? (
        <p className={`py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No feedback submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-center mb-2">
                <FiUser className="mr-2" />
                <span className="font-medium">{feedback.name}</span>
              </div>
              <div className="flex items-center mb-2">
                <FiMail className="mr-2" />
                <a 
                  href={`mailto:${feedback.email}`} 
                  className="text-blue-500 hover:underline"
                >
                  {feedback.email}
                </a>
              </div>
              <div className="flex items-start mb-3">
                <FiMessageSquare className="mr-2 mt-1 flex-shrink-0" />
                <p className="whitespace-pre-wrap">{feedback.message}</p>
              </div>
              <div className="flex items-center text-sm">
                <FiClock className="mr-2" />
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Submitted: {formatDate(feedback.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;