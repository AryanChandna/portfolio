import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import avatar from '../assets/avatar.png'; // Make sure to add your avatar image to assets folder
import avatarHover from '../assets/avatar-hover.png';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4rem 2rem;
  margin-top: -5vh;
  z-index: 2;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `linear-gradient(to bottom, transparent, ${theme.colors.background})`};
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    left: -10%;
    top: -10%;
    background: ${({ theme }) => `radial-gradient(circle at 30% 20%, ${theme.colors.primary}05, transparent 25%),
      radial-gradient(circle at 70% 80%, ${theme.colors.accent}05, transparent 25%)`};
    opacity: 0.8;
    z-index: -1;
    animation: pulse 10s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  position: relative;
  z-index: 1;
  padding-top: 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding-top: 1rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `radial-gradient(circle at center, ${theme.colors.primary}08, transparent 70%)`};
    filter: blur(60px);
    opacity: 0.6;
    transform-origin: center;
    animation: breathe 8s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  @media (max-width: 1024px) {
    justify-content: center;
    padding-left: 0;
    min-height: 480px;
  }
`;

const ImageFrame = styled(motion.div)`
  position: relative;
  width: 340px;
  height: 440px;
  border-radius: 30px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 
    0 0 0 1px ${({ theme }) => `${theme.colors.primary}15`},
    0 4px 20px ${({ theme }) => `${theme.colors.primary}10`},
    0 12px 40px -10px ${({ theme }) => `${theme.colors.primary}30`};
  transform: translateZ(0);
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => `linear-gradient(
      135deg,
      ${theme.colors.primary}10,
      transparent 40%,
      ${theme.colors.accent}10
    )`};
    opacity: 0.5;
  }
`;

const StyledImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transform: translateZ(0);
  will-change: transform;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 15%;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    image-rendering: -webkit-optimize-contrast;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    &:last-child {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }

  &:hover img {
    &:first-child {
      opacity: 0;
      transform: scale(1.05) translateZ(0);
    }
    &:last-child {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }
  }
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  padding: 0.875rem 1.25rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}98, ${theme.colors.background}95)`};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 
    0 0 0 1px ${({ theme }) => `${theme.colors.primary}15`},
    0 4px 20px ${({ theme }) => `${theme.colors.primary}20`};
  z-index: 2;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.background}98)`};
    box-shadow: 
      0 0 0 1px ${({ theme }) => `${theme.colors.primary}25`},
      0 8px 30px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const TechBadge = styled(motion.div)`
  position: absolute;
  padding: 0.5rem;
  background: ${({ theme }) => `${theme.colors.surface}90`};
  backdrop-filter: blur(8px);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 0 0 1px ${({ theme }) => `${theme.colors.primary}10`},
    0 4px 12px ${({ theme }) => `${theme.colors.primary}15`};
  font-size: 1.2rem;
  
  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 0;
  height: 100%;
  justify-content: flex-start;
  max-width: 600px;

  @media (max-width: 1024px) {
    justify-content: center;
    margin: 0 auto;
    gap: 2rem;
  }
`;

const SectionTitle = styled(motion.div)`
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 800;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.text}, ${theme.colors.primary})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  position: relative;
  
  &::before {
    content: '01';
    position: absolute;
    top: -2rem;
    left: 0;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 2px;
    opacity: 0.8;

    @media (max-width: 1024px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.75rem;
    width: 3rem;
    height: 3px;
    background: ${({ theme }) => `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`};
    border-radius: 2px;

    @media (max-width: 1024px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const BioContainer = styled(motion.div)`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: ${({ theme }) => `linear-gradient(to bottom, ${theme.colors.primary}, transparent)`};
    border-radius: 3px;
  }

  @media (max-width: 1024px) {
    &::before {
      display: none;
    }
  }
`;

const Bio = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  padding-left: 1.5rem;
  margin: 0;
  letter-spacing: 0.2px;

  & + & {
    margin-top: 1rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.text}, ${theme.colors.primary})`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 1024px) {
    padding-left: 0;
    font-size: 1.1rem;
  }
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 0;
`;

const SkillsHeader = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.25rem;
  font-weight: 700;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.text}, ${theme.colors.primary})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.875rem;
  margin-top: 0.5rem;

  @media (max-width: 1024px) {
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }
`;

const SkillCard = styled(motion.div)`
  padding: 0.875rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}90, ${theme.colors.background}90)`};
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}10`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  box-shadow: 0 4px 20px ${({ theme }) => `${theme.colors.primary}05`};
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary}10,
      transparent
    )`};
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => `${theme.colors.primary}15`};
    border-color: ${({ theme }) => `${theme.colors.primary}30`};
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}95, ${theme.colors.background}95)`};

    &::before {
      left: 100%;
    }
  }
`;

const About = () => {
  const { scrollYProgress } = useScroll();
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const imageRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -8]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skills = [
    'Backend Development',
    'System Design',
    'Node.js',
    'Python',
    'Java',
    'AWS',
    'Docker',
    'Kubernetes',
    'MongoDB',
    'PostgreSQL',
  ];

  const techBadges = [
    { icon: '⚡', position: { top: '15%', left: '-5%' } },
    { icon: '🚀', position: { top: '40%', right: '-5%' } },
    { icon: '🔧', position: { bottom: '20%', left: '-5%' } },
    { icon: '💻', position: { bottom: '30%', right: '-5%' } },
  ];

  return (
    <AboutSection id="about">
      <AboutContainer>
        <ContentGrid>
          <ImageWrapper>
            <ImageFrame
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <StyledImage>
                <img src={avatar} alt="Aryan Chandna" loading="eager" />
                <img src={avatarHover} alt="Aryan Chandna Hover" loading="eager" />
              </StyledImage>
            </ImageFrame>
            <FloatingCard
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: -60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease: "easeOut" }}
              style={{ left: 0, top: '25%' }}
            >
              🎯 Backend Engineer
            </FloatingCard>
            <FloatingCard
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ease: "easeOut" }}
              style={{ right: 0, bottom: '35%' }}
            >
              🌟 System Architect
            </FloatingCard>
            {techBadges.map((badge, index) => (
              <TechBadge
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                style={badge.position}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {badge.icon}
              </TechBadge>
            ))}
          </ImageWrapper>
          <ContentContainer
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionTitle>About Me</SectionTitle>
              <BioContainer>
                <Bio>
                  I'm a <strong>passionate Backend Engineer</strong> with a deep love for building scalable and efficient systems.
                  With expertise in <strong>distributed systems</strong> and <strong>cloud architecture</strong>, I specialize in creating
                  robust backend solutions that power modern applications.
                </Bio>
                <Bio style={{ marginTop: '1.5rem' }}>
                  My approach combines <strong>technical excellence</strong> with practical problem-solving,
                  ensuring that every solution I build is not just functional, but also
                  maintainable and future-proof.
                </Bio>
              </BioContainer>
            </motion.div>
            <SkillsContainer variants={itemVariants}>
              <SkillsHeader>Technologies I Work With</SkillsHeader>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </SkillCard>
                ))}
              </SkillsGrid>
            </SkillsContainer>
          </ContentContainer>
        </ContentGrid>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 