import React, { useEffect, useState } from 'react';
import F1 from '../assets/T1.jpg';
import F2 from '../assets/T2.jpg';
import F3 from '../assets/T3.jpg';
import F4 from '../assets/T4.jpg';
import '../styles/Testimonials.css';

const testimonials = [
  {
    image: F1,
    text: "XpenZ changed the game for me! Its user-friendly interface and smart features helped me take control of my finances like never before. Thanks to XpenZ, I've redefined my financial success and couldn't be happier!",
    author: "John Doe"
  },
  {
    image: F2,
    text: "XpenZ has transformed my budgeting process! The app is intuitive, and I can easily track my expenses. Highly recommend it to anyone looking to improve their financial health.",
    author: "Jane Smith"
  },
  {
    image: F3,
    text: "I love how XpenZ provides insights into my spending habits. It's made managing my finances so much easier and more effective!",
    author: "Alice Johnson"
  },
  {
    image: F4,
    text: "With XpenZ, I've finally achieved my savings goals! The app's features are fantastic for anyone serious about their financial future.",
    author: "Bob Brown"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='Testimonials'>
      <div className='TL'>
        <img src={testimonials[currentIndex].image} alt='' />
      </div>
      <div className='TR'>
        <p>{testimonials[currentIndex].text}</p>
        <br />
        <p>{testimonials[currentIndex].author}</p>
      </div>
    </div>
  );
};

export default Testimonials;
