import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

interface PreviewPageProps {
  longDescription: string;
  projectName: string;
  description: string;
  imageUrl: string;
}

const PreviewPage: React.FC<PreviewPageProps> = ({
  longDescription,
  projectName,
  description,
  imageUrl,
}) => {
  return (
    <div className={styles.preview}>
      <ReactMarkdown>
        {`# ${projectName} \n ##### ${description} \n ![${projectName} Image](${imageUrl}) \n ${longDescription}`}
      </ReactMarkdown>
    </div>
  );
};

export default PreviewPage;
