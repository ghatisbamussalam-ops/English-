import React from 'react';

interface InputFormProps {
  onSubmit: () => void;
  isLoading: boolean;
  phrase: string;
  onPhraseChange: (value: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, phrase, onPhraseChange }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phrase.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <textarea
          value={phrase}
          onChange={(e) => onPhraseChange(e.target.value)}
          placeholder="أدخل عبارة إنجليزية هنا لتحليلها..."
          disabled={isLoading}
          className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-4 pr-32 text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors disabled:opacity-50"
          rows={2}
        />
        <button
          type="submit"
          disabled={isLoading || !phrase.trim()}
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-teal-600 text-white font-bold py-2 px-6 rounded-md hover:bg-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <>
              <i className="fas fa-magic mr-2"></i>
              حلّل
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;