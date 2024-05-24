import React from 'react';
import Image from 'next/image';
import styles from './image.module.css'; 

interface ImageProps {
  alt?: string;
}

const ImageComponent: React.FC<ImageProps> = ({ alt }) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src="/react.png" 
        alt={alt || "Project Image"}
        className={styles.corneredImage}
        layout="responsive"
        width={1200}
        height={800}
      />
    </div>
  );
}

export default ImageComponent;
