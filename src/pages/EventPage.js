import React, { useEffect } from 'react';
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

const RegisterButton = styled(motion.a)`
  display: block;
  margin: 2rem auto;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-family: 'Cinzel Decorative', cursive;
  color: #0a0a0a;
  width: fit-content;
  background: #e2c35d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(226, 195, 93, 0.3);
  text-decoration: none;

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
      'Participants must show proof of following all sponsor socials before entry.',
      'Entry fee of Rs.80 /- per Team.',
      'Each team must have 4 playing members (1 substitute optional). Only playing members are allowed in the venue.',
      'Participants must wear their ID cards.',
      'Teams arriving late will be disqualified.',
      'No charging points will be provided; participants must bring their own charging equipment.'
    ],
    eventRules: [
      'No finger sleeves, triggers, or additional gadgets are allowed.',
      'Hacking or using glitches is strictly prohibited.',
      'Participants may use any device (Android, iPhone, iPad, etc.).',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'Participants may carry power banks and pocket Wi-Fi at their own risk. The college is not responsible for misplaced items.'
    ]
  },
  'CAPTURE THE FLAG': {
    generalRules: [
      'Participants must show proof of following all sponsor socials before entry.',
      'Individual or team of 2 or 3 participation allowed',
      'Participants must wear their ID cards.',
      'Must be completed via the online portal before the deadline. Late entries will not be accepted.',
      'Internet access will be provided',
      'Event will be started at 11:00 am'
    ],
    eventRules: [
      'Duration: The event will have three rounds:',
      ' 	Round 1 - Quiz (1 Hour): Test participants general knowledge and technical skills through a timed quiz.',
      '   Round 2 - Capture the Flag (1 Hour): Solve challenges related to hacking and problem-solving',
      '   Round 3 (Optional) - Phishing Page or Task Development (1 Hour):Participants will create a phishing page simulation or complete another specified cybersecurity-related task.',
      'Participants may use their own laptops, or college PCs will be provided.'
    ]
  },
  'TECH DARBAR': {
    generalRules: [
'      Participants must show proof of following all sponsor socials before entry.',
      'Individual or team of 2 or 3 participation allowed',
      'Participants must wear their ID cards.',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'Event will be started at 11:00 am'
    ],
    eventRules: [
      'A maximum of 3 members are allowed in a team. ',
      'Participants points below threshold are disqualified from next round.',
      'There will be 3 rounds:',
      '1. Round 1 - elimination ',
      '2. Round 2 - Rapid fire (answer as many questions in 5-10 mins)',
      '3. Round 3 - Visual/Audio rounds ',
      'Per Question 30 seconds',
      'Buzzer must be pressed before answering question'
    ]
  },
  'TRADER TOURNAMENT': {
    generalRules: [
      'Participants must show proof of following all sponsor socials before entry.',
      'Individualentry is mandatory.',
      'Basic knowledge of trading required',      
      'Participants must wear their ID cards.',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'Only First 20 Teams only will get Opportuinity in the Trader Tournament.'
    ],
    eventRules: [
      'The event will start at 11:00 am',
      'Initial virtual capital provided',
      'Trading duration: 1 hours',
      'Highest portfolio value wins', 
      'Participants will trade within the following markets and constraints:',
          '1. Commodity Market (Gold - XAU/USD Pair)',
              'Quantity: 10',
          '2. Commodity Market (USOil)',
              'Quantity: 80',
          '3. Forex Market (EUR/USD Pair)',
              'Quantity: 25,000',
      'Participants must use TradingView to perform their analysis and structure their strategies around these specific markets and quantities.'
    ]
  },
  'TRIVIA SHOWDOWN': {
    generalRules: [
      'Participants must show proof of following all sponsor socials before entry.',
      'Individual entry is mandatory. ',
      'Participants must wear their ID cards.',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'The buzzer will be installed on the participant’s mobile, which must be kept strictly on the table. The participant is not allowed to hold it in their hands.',
      'Click the buzzer first will get the chance to answer.',
      'Cheating of any kind is grounds for strict disqualification',
      'All participants must adhere to ensure respectful and fair behaviour.',
      'Only first 60 entries will be considered.'

    ],
    eventRules: [
      'The event will consist of three rounds each having four categories.',
      'Each round will have disqualifications on the basis of points gained by each team.',
      'Volunteers decision will be the final decision regarding disqualification and point related decisions.',
      'The event will start at 11:00 am',
    ]
  },
  'TECH SHARK': {
    generalRules: [
      'Participants must show proof of following all sponsor socials before entry.',    
      'Participants must wear their ID cards.',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'Team Size: Individual or teams of up to 3 members.',
      'Must be completed via the online portal before the deadline. Late entries will not be accepted.',
      'Event will be started at 11:00 am',

    ],
    eventRules: [
      'Initial pitch presentation',
      'Pitch Duration: 4 minutes for presentation + 3-5 minutes for Q&A.',
      'Medium: Use digital slides or videos or 3D model (projector and laptop provided).',
      'Language Medium: Presentations can be in English, Hindi, or Marathi.',
      'Originality: Only original ideas allowed.',
      'Focus: Solutions must address a specific social issue.',
      'Judging Criteria: Creativity, innovation, and impact.',
      'Feasibility: Real-world applicability.',
      'Prizes: First, Second, and Third place prizes.'
    ]
  },
  'SQUID GAME': {
    generalRules: [
      'Individual entry is mandatory. ',
      'Participants must show proof of following all sponsor socials before entry.',    
      'Participants must wear their ID cards.',
      'Misbehavior with event management or other teams will lead to disqualification.',
      'Must be completed via the online portal before the deadline. Late entries will not be accepted.',
      'Event will be started at 11:00 am'

    ],
    eventRules: [
      'Event consists of 4 rounds:',
      '1. Round 1 - Memory Game',
      '2. Round 2 - 2 Moves Checkmate',
      '3. Round 3 - Tower Builder',
      '4. Round 4 - Jenga',
      'Teams must complete all challenges to qualify for prizes'
    ]
  },
};

const eventRegistrationLinks = {
  'BGMI': 'https://forms.gle/66vcrkpBY3YnGdB68',
  'CAPTURE THE FLAG': 'https://forms.gle/U6J3ZnP3qbw5G17s7',
  'TECH SHARK': 'https://forms.gle/VHpMX86MeNCeMidn6',
  'TRADER TOURNAMENT': 'https://forms.gle/6JHwsdypsXaesEZA7',
  'TECH DARBAR': 'https://forms.gle/oWef5Q97A4EEFAAa6',
  'TRIVIA SHOWDOWN': 'https://forms.gle/8RQEUX1sD7jQFrk36',
  'SQUID GAME': 'https://forms.gle/HsHEGqa1NttPiePv6'
};

const EventPage = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  // Convert URL format back to event name format
  const formattedEventName = eventName
    .split('-')
    .map(word => word.toUpperCase())
    .join(' ');

  const rules = eventRules[formattedEventName];
  const registrationLink = eventRegistrationLinks[formattedEventName];

  if (!rules) {
    return (
      <EventContainer>
        <BackButton onClick={handleBack}>← Back to Events</BackButton>
        <EventHeader>
          <EventTitle>Event Not Found</EventTitle>
        </EventHeader>
      </EventContainer>
    );
  }

  return (
    <EventContainer>
      <BackButton onClick={handleBack}>← Back to Events</BackButton>
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

      {registrationLink && (
        <RegisterButton 
          href={registrationLink} 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Register Now
        </RegisterButton>
      )}
    </EventContainer>
  );
};

export default EventPage;
