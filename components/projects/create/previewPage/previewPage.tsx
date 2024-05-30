import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: ["400", "700"],
});

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
    <div className={`${styles.preview} ${montserrat.className}`}>
      <ReactMarkdown>
        {`# ${projectName} \n ##### ${description} \n ![${projectName} Image](${imageUrl}) \n ${longDescription}`}
      </ReactMarkdown>
    </div>
  );
};

export default PreviewPage;
