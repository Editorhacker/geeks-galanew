import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import bgmiImage from './assets/bgmi.jpg';
import ctfImage from './assets/capture_the_flag.jpeg';
import quizImage from './assets/quiz.jpg';
import triviaImage from './assets/trivia.jpg';
import tradingImage from './assets/trading_tournament.jpg';
import techSharkImage from './assets/tech_shark.png';
import squidGameImage from './assets/squid_game.jpg';
import { useInView } from 'react-intersection-observer';
import EventPage from './pages/EventPage';
import './App.css';

const events = [
  { 
    name: 'BGMI',
    src: bgmiImage
  },
  { 
    name: 'CAPTURE THE FLAG',
    src: ctfImage
  },
  { 
    name: 'TECH DARBAR',
    src: quizImage
  },
  { 
    name: 'TRADER TOURNAMENT',
    src: tradingImage
  },
  { 
    name: 'TRIVIA SHOWDOWN',
    src: triviaImage
  },
  { 
    name: 'TECH SHARK',
    src: techSharkImage
  },
  {
    name: 'SQUID GAME',
    src: squidGameImage
  }
];

const Header = styled(motion.header)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
    z-index: -1;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
  }
`;

const Logo = styled(motion.img)`
  width: 200px;
  height: 200px;
  margin-top: 4rem;
  border-radius: 50%;
  border: 3px solid #e2c35d;
  animation: glowPulse 3s infinite;
  filter: drop-shadow(0 0 10px rgba(226, 195, 93, 0.3));
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-top: 2rem;
  }
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  color: #e2c35d;
  text-align: center;
  font-family: 'Cinzel Decorative', cursive;
  text-shadow: 0 0 15px rgba(226, 195, 93, 0.7);
  letter-spacing: 12px;
  margin-bottom: 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
    letter-spacing: 8px;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 6px;
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 50%;
    background: linear-gradient(to right, transparent, #e2c35d, transparent);
    bottom: -10px;
  }
  
  &::before {
    left: 0;
    transform: translateX(20%);
  }
  
  &::after {
    right: 0;
    transform: translateX(-20%);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  color: #c4a43d;
  text-align: center;
  font-family: 'Philosopher', serif;
  margin-top: 2rem;
  margin-bottom: 3rem;
  letter-spacing: 4px;
  text-shadow: 0 0 8px rgba(226, 195, 93, 0.3);
`;

const EventsSection = styled.section`
  padding: 8rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 1rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(15, 15, 15, 0.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2c35d;
  box-shadow: 0 0 15px rgba(226, 195, 93, 0.2);
  cursor: pointer;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    border: 1px solid transparent;
    background: linear-gradient(135deg, rgba(226, 195, 93, 0.2), transparent 50%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    box-shadow: 0 0 30px rgba(226, 195, 93, 0.4);
    transform: translateY(-5px);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  opacity: 0.8;
  transition: all 0.4s ease;
  filter: saturate(0.8) contrast(1.2);

  ${EventCard}:hover & {
    opacity: 1;
    filter: saturate(1) contrast(1.1);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const EventTitle = styled.h3`
  padding: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  margin: 0;
  color: #e2c35d;
  font-family: 'Cinzel Decorative', cursive;
  letter-spacing: 3px;
  position: relative;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 1px;
    background: linear-gradient(to right, transparent, #e2c35d, transparent);
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem;
  }
`;

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, 
    [0, 0.3, 0.4], 
    [1, 2, 2]  
  );
  
  const opacity = useTransform(scrollYProgress,
    [0, 0.3, 0.4],
    [1, 1, 0]
  );

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const navigate = useNavigate();

  const handleEventClick = (eventName) => {
    navigate(`/event/${eventName.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="App">
      <Header>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          GEEKS GALA
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Unlock the Ancient Secrets of Technology
        </Subtitle>
        
        <Logo
          src={logo}
          style={{ scale, opacity }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        />
      </Header>

      <EventsSection ref={ref}>
        <EventsGrid>
          {events.map((event, index) => (
            <Tilt
              key={event.name}
              options={{
                max: 25,
                scale: 1.05,
                speed: 1000,
                glare: true,
                "max-glare": 0.5,
              }}
            >
              <EventCard
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onClick={() => handleEventClick(event.name)}
              >
                <EventImage src={event.src} alt={event.name} />
                <EventTitle>{event.name}</EventTitle>
              </EventCard>
            </Tilt>
          ))}
        </EventsGrid>
      </EventsSection>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:eventName" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
