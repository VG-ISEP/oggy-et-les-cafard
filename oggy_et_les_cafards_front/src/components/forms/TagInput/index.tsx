import React, { useState } from 'react';
import './style.css';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  label: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, label }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      <label>{label}</label>
      <div className="tags-display">
        {tags.map(tag => (
          <div key={tag} className="tag-item">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>&times;</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add a tag"
      />
    </div>
  );
};

export default TagInput; 