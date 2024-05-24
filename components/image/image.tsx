import React from 'react';
import Image from 'next/image';
import './image.css';

interface ImageProps {
  alt?: string;
}

const ImageComponent: React.FC<ImageProps> = ({ alt }) => {
  return (
    <div className="image-container">
      <Image
        src="/react.png" 
        alt={alt || "Project Image"}
        className="cornered-image"
        layout="responsive"
        width={1200}
        height={800}
      />
    </div>
  );
}

export default ImageComponent;
