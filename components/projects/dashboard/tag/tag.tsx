import React from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./styles.module.css";

interface tagProps {
  tag: string;
}

const Tag: React.FC<tagProps> = ({
  tag
}) => {
  // Add hover effect on card when you get how CSS works !!!!
  const styles = {
    tagContainer: {
      borderRadius: '10px',
      backgroundColor: '#F9C80E',
      textAlign: 'center',
      fontSize: '1.0em',
      padding: '1px 10px',
    }
  }

  return (
    <>
      <div style={styles.tagContainer}>
        {tag}
      </div>
    </>
  );
};

export default Tag;
