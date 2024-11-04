import React from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: string | null;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comment }) => {
  if (!isOpen || !comment) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Comment</h2>
        <p className="text-gray-700">{comment}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
