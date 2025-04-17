import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import avatar from '../assets/avatar.png'; // Make sure to add your avatar image to assets folder
import avatarHover from '../assets/avatar-hover.png';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 6rem 2rem;
  margin-top: -15vh;
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
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
    text-align: center;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  margin: 0 auto;
  transform: translateZ(0);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `radial-gradient(circle at center, ${theme.colors.primary}10 0%, transparent 70%)`};
    filter: blur(40px);
    opacity: 0.5;
    animation: pulse 4s ease-in-out infinite;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: translateZ(0); // Force GPU acceleration

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${({ theme }) => `linear-gradient(45deg, ${theme.colors.primary}30, ${theme.colors.accent}30)`};
    border-radius: 20px;
    z-index: -1;
    filter: blur(15px);
    transition: all 0.3s ease;
    transform: translateZ(0); // Force GPU acceleration
  }

  &:hover::before {
    filter: blur(20px);
    background: ${({ theme }) => `linear-gradient(45deg, ${theme.colors.primary}40, ${theme.colors.accent}40)`};
  }
`;

const StyledImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 
    0 0 0 1px ${({ theme }) => `${theme.colors.primary}10`},
    0 20px 40px -20px ${({ theme }) => `${theme.colors.primary}30`};
  position: relative;
  padding: 0;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}15, transparent)`};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: none;
    transition: transform 0.5s ease, opacity 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    will-change: transform, opacity;

    &:last-child {
      opacity: 0;
      transform: scale(1.05) translateZ(0);
    }
  }

  &:hover {
    img:first-child {
      opacity: 0;
      transform: scale(0.95) translateZ(0);
    }
    img:last-child {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }
  }
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  padding: 1.2rem 1.8rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}98, ${theme.colors.background}98)`};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 
    0 0 0 1px ${({ theme }) => `${theme.colors.primary}15`},
    0 20px 40px -20px ${({ theme }) => `${theme.colors.primary}30`};
  z-index: 2;
  white-space: nowrap;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.background}98)`};
    box-shadow: 
      0 0 0 1px ${({ theme }) => `${theme.colors.primary}25`},
      0 25px 45px -25px ${({ theme }) => `${theme.colors.primary}40`};
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SectionTitle = styled(motion.div)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
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

    @media (max-width: 1024px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 3rem;
    height: 4px;
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
  font-size: 1.25rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  padding-left: 1.5rem;
  margin: 0;
  letter-spacing: 0.2px;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    padding-left: 0;
  }
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 2rem;
`;

const SkillsHeader = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`;

const SkillCard = styled(motion.div)`
  padding: 1.2rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}90, ${theme.colors.background}90)`};
  backdrop-filter: blur(10px);
  border-radius: 12px;
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

  return (
    <AboutSection id="about">
      <AboutContainer>
        <ContentGrid>
          <ImageWrapper>
            <ImageContainer
              style={{
                rotateY: imageRotateY,
                rotateX: imageRotateX,
                scale: imageScale,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <StyledImage>
                <img src={avatar} alt="Aryan Chandna" />
                <img src={avatarHover} alt="Aryan Chandna Hover" />
              </StyledImage>
              <FloatingCard
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: -80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ left: 0, top: '20%' }}
              >
                🚀 Backend Engineer
              </FloatingCard>
              <FloatingCard
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{ right: 0, bottom: '20%' }}
              >
                💻 System Architect
              </FloatingCard>
            </ImageContainer>
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