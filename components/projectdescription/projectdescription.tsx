import React from 'react';
import ReactMarkdown from 'react-markdown';
import './projectdescription.css';

interface DescriptionProps {
  content: string;
}

const Description: React.FC<DescriptionProps> = ({ content }) => {
  return (
    <div className="description-container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Description;
