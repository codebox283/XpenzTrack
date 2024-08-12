import React from 'react';
import '../styles/Team.css'; // Assuming you have a CSS file for styling
import Github from'../assets/github.svg';
import LinkedIn from '../assets/linkedin-in.svg';
import '../styles/TrackMoney.css';

const teamMembers = [
    {
        name: 'Nakshatra',
        email: 'nakshatra@example.com', 
        linkedin: 'https://www.linkedin.com/in/nakshatra',
        github: 'https://github.com/codebox283',
    },
    {
        name: 'Soyeb',
        email: 'soyebsk3861@gmail.com', 
        linkedin: 'https://www.linkedin.com/in/soyeb',
        github: 'https://github.com/soyeb5047',
    },
    {
        name: 'Sahil',
        email: 'sahilsk03860@gmail.com',
        linkedin: 'https://www.linkedin.com/in/sahil',
        github: 'https://github.com/sahil5046',
    },
    {
        name: 'Soumya',
        email: 'soumyaghosh693@gmail.com', 
        linkedin: 'https://www.linkedin.com/in/soumya',
        github: 'https://github.com/soumya7602',
    },
];

const Team = () => {
    return (
        <div className="team-container">
            '<h2 className="team-heading">Meet Our Team :</h2>'
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-email">Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
                        <p className="member-socials">
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <img className='social-icon' src={LinkedIn} alt=''></img>
                            </a>
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <img className='social-icon' src={Github} alt=''></img>
                            </a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
