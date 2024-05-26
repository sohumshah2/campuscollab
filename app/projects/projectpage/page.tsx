import React from 'react';
import Navbar from "@/components/navbar/navbar";
import Image from "@/components/image/image";
import TeammateCard from "@/components/teammate/teammate";
import ProjectName from "@/components/projectname/projectname";
import Description from "@/components/projectdescription/projectdescription";
import './page.css';

const App: React.FC = () => {
  const descriptionContent = `
    ## About This Project

    This project showcases the top football players around the world, including Neymar, Messi, and Ronaldo.

    ### Features

    - Professional football players
    - Dribbling, speed, technique
    - Playmaking, precision
    - Heading and athleticism

    Enjoy exploring this project!

    **Football Allstars Team**
  `;

  return (
    <div className="preview">
      <Navbar />
      <div className="content-container">
        <div className="project-name-container">
          <ProjectName name="FOOTBALL ALLSTARS" /> 
          <div className="image-container">
            <Image alt="projectimage" />
          </div>
        </div>
        <div className="teammates-grid">
          <h2 className="team-header">TEAM:</h2> 
          <TeammateCard
            name="Neymar Dos Santos"
            description="Professional football player known for his dribbling skills."
            skills={['Dribbling', 'Speed', 'Technique']}
          />
          <TeammateCard
            name="Lionel Messi"
            description="Argentine footballer widely regarded as one of the greatest players of all time."
            skills={['Playmaking', 'Precision']}
          />
          <TeammateCard
            name="Cristiano Ronaldo"
            description="Portuguese footballer known for his goal-scoring ability and athleticism."
            skills={['Heading']}
          />
        </div>
      </div>
      <Description content={descriptionContent} />
    </div>
  );
}

export default App;
