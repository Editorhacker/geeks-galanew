import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const EventContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  color: #e2c35d;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const EventHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-top: 3rem;
  }
`;

const EventTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-family: 'Cinzel Decorative', cursive;
  margin-bottom: 2rem;
  text-shadow: 0 0 15px rgba(226, 195, 93, 0.7);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Section = styled.section`
  max-width: 800px;
  margin: 0 auto 4rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(226, 195, 93, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
    padding: 1.5rem;
    width: 90%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-family: 'Cinzel Decorative', cursive;
  color: #e2c35d;
  margin-bottom: 1.5rem;
  text-align: center;
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: linear-gradient(to right, transparent, #e2c35d, transparent);
    margin: 0.5rem auto;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    font-family: 'Philosopher', sans-serif;
    font-size: 1.1rem;
    &::before {
      content: '✧';
      position: absolute;
      left: 0;
      color: #e2c35d;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel Decorative', cursive;
  color: #e2c35d;
  background: transparent;
  border: 1px solid #e2c35d;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(226, 195, 93, 0.1);
    box-shadow: 0 0 15px rgba(226, 195, 93, 0.3);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
`;

const RegisterButton = styled(motion.button)`
  display: block;
  margin: 2rem auto;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-family: 'Cinzel Decorative', cursive;
  color: #0a0a0a;
  background: #e2c35d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(226, 195, 93, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(226, 195, 93, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 2rem;
    margin: 1.5rem auto;
  }
`;

const eventRules = {
  'BGMI': {
    generalRules: [
      'Players must be 16 years or older to participate',
      'All participants must have their own devices',
      'Use of emulators is strictly prohibited',
      'Players must be present 30 minutes before the event starts'
    ],
    eventRules: [
      'Squad matches only (4 players per team)',
      'Two rounds will be played',
      'Points system: Kills (1 point each), Victory (15 points)',
      'Top 3 teams qualify for finals'
    ]
  },
  'CAPTURE THE FLAG': {
    generalRules: [
      'Individual participation only',
      'Participants must bring their own laptops',
      'Internet access will be provided',
      'Time limit: 3 hours'
    ],
    eventRules: [
      'Multiple challenges of varying difficulty',
      'Points based on challenge difficulty',
      'Hints available with point deduction',
      'First to capture all flags wins'
    ]
  },
  'TECH DARBAR': {
    generalRules: [
      'Team size: 2-3 members',
      'Open to all college students',
      'Valid college ID required',
      'Pre-registration mandatory'
    ],
    eventRules: [
      'Technical presentation round',
      'Q&A session with judges',
      'Innovation scoring criteria',
      'Time limit: 15 minutes per team'
    ]
  },
  'TRADER TOURNAMENT': {
    generalRules: [
      'Individual participation',
      'Basic knowledge of trading required',
      'Registration fee applicable',
      'Limited slots available'
    ],
    eventRules: [
      'Virtual trading environment',
      'Initial virtual capital provided',
      'Trading duration: 2 hours',
      'Highest portfolio value wins'
    ]
  },
  'TRIVIA SHOWDOWN': {
    generalRules: [
      'Team size: 2 members',
      'Multiple rounds of quizzing',
      'No electronic devices allowed',
      'On-spot registration available'
    ],
    eventRules: [
      'Round 1: General Tech',
      'Round 2: Coding & Programming',
      'Round 3: Current Tech Trends',
      'Rapid fire final round'
    ]
  },
  'TECH SHARK': {
    generalRules: [
      'Team size: 3-4 members',
      'Pitch duration: 10 minutes',
      'Prototype/MVP required',
      'Pre-registration mandatory'
    ],
    eventRules: [
      'Initial pitch presentation',
      'Technical feasibility round',
      'Business model evaluation',
      'Final investor pitch'
    ]
  }
};

const EventPage = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();

  // Convert URL format back to event name format
  const formattedEventName = eventName
    .split('-')
    .map(word => word.toUpperCase())
    .join(' ');

  const rules = eventRules[formattedEventName];

  if (!rules) {
    return (
      <EventContainer>
        <BackButton
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Events
        </BackButton>
        <EventHeader>
          <EventTitle>Event Not Found</EventTitle>
        </EventHeader>
      </EventContainer>
    );
  }

  return (
    <EventContainer>
      <BackButton
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Events
      </BackButton>
      
      <EventHeader>
        <EventTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {formattedEventName}
        </EventTitle>
      </EventHeader>

      <Section>
        <SectionTitle>Rules & Regulations</SectionTitle>
        <SectionTitle as="h3" style={{ fontSize: '1.5rem' }}>General Rules</SectionTitle>
        <RulesList>
          {rules.generalRules.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {rule}
            </motion.li>
          ))}
        </RulesList>
      </Section>

      <Section>
        <SectionTitle as="h3" style={{ fontSize: '1.5rem' }}>Event Rules</SectionTitle>
        <RulesList>
          {rules.eventRules.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {rule}
            </motion.li>
          ))}
        </RulesList>
      </Section>

      <RegisterButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Register Now
      </RegisterButton>
    </EventContainer>
  );
};

export default EventPage;
