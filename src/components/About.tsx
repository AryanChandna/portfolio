import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import avatar from '../assets/avatar.png';
import avatarHover from '../assets/avatar-hover.png';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  scroll-margin-top: 5rem;
  z-index: 2;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: ${({ theme }) => `linear-gradient(to bottom, ${theme.colors.background}, transparent)`};
    pointer-events: none;
    z-index: 1;
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

  @media (max-width: 1024px) {
    padding: 1rem;
    min-height: auto;
    padding-top: 4rem;
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
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
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
    margin: 0 auto;
    min-height: 450px;
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

const GradientText = styled.span`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
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
  cursor: pointer;

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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const DecorativeCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  border: 2px dashed ${({ theme }) => `${theme.colors.primary}30`};
  pointer-events: none;
  z-index: -1;
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.accent}10)`};
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 15px ${({ theme }) => `${theme.colors.primary}10`};
  z-index: -1;
`;

const ImageDecorations = styled(motion.div)`
  position: absolute;
  inset: -20px;
  pointer-events: none;
`;

const SkillCard = styled(motion.div)`
  position: relative;
  padding: 1.25rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.surface}90, ${theme.colors.background}80)`};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 4px 20px ${({ theme }) => `${theme.colors.primary}05`},
    inset 0 0 0 1px ${({ theme }) => `${theme.colors.primary}10`};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.accent}05)`};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      ${({ theme }) => `${theme.colors.primary}15`} 0%,
      transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => `${theme.colors.primary}30`};
    box-shadow: 
      0 8px 30px ${({ theme }) => `${theme.colors.primary}15`},
      inset 0 0 0 1px ${({ theme }) => `${theme.colors.primary}20`};

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }

    .skill-icon {
      transform: scale(1.1);
    }
  }
`;

const SkillIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.accent}10)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 
    0 2px 10px ${({ theme }) => `${theme.colors.primary}10`},
    inset 0 0 0 1px ${({ theme }) => `${theme.colors.primary}15`};

  &.skill-icon {
    transition: transform 0.3s ease;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const SkillCategory = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  color: white;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 2rem;
  box-shadow: 0 4px 15px ${({ theme }) => `${theme.colors.primary}20`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => `${theme.colors.primary}30`};
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-10, 10]), springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.skill-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Smooth scroll handling
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > window.innerHeight) {
          aboutSection.style.transform = `translateY(${Math.max(0, -rect.top * 0.1)}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const decorationVariants = {
    initial: { 
      opacity: 0, 
      scale: 0,
      y: 0
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: [-5, 5],
      transition: {
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" },
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    }
  };

  const skills: Skill[] = [
    { name: 'Backend Development', icon: '⚙️', category: 'Core Expertise' },
    { name: 'System Design', icon: '🏗️', category: 'Architecture' },
    { name: 'Node.js', icon: '💻', category: 'Runtime' },
    { name: 'Python', icon: '🐍', category: 'Language' },
    { name: 'Java', icon: '☕', category: 'Language' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Kubernetes', icon: '⛵', category: 'Orchestration' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const techBadges = [
    { icon: '⚡', position: { top: '15%', left: '-5%' } },
    { icon: '🚀', position: { top: '40%', right: '-5%' } },
    { icon: '🔧', position: { bottom: '20%', left: '-5%' } },
    { icon: '💻', position: { bottom: '30%', right: '-5%' } },
  ];

  return (
    <AboutSection id="about" ref={containerRef}>
      <AboutContainer>
        <ContentGrid>
          <ImageWrapper style={{ y, opacity }}>
            <ImageDecorations>
              <DecorativeCircle
                style={{ width: '400px', height: '400px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                variants={decorationVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              />
              <DecorativeCircle
                style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }}
                variants={decorationVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              />
              <DecorativeShape
                style={{ top: '10%', right: '5%' }}
                variants={decorationVariants}
                initial="initial"
                animate="animate"
                whileHover={{ rotate: 360 }}
                transition={{ delay: 0.6 }}
              />
              <DecorativeShape
                style={{ bottom: '15%', left: '0%', borderRadius: '50%' }}
                variants={decorationVariants}
                initial="initial"
                animate="animate"
                whileHover={{ rotate: -360 }}
                transition={{ delay: 0.8 }}
              />
              <DecorativeShape
                style={{ top: '20%', left: '10%', transform: 'rotate(45deg)' }}
                variants={decorationVariants}
                initial="initial"
                animate="animate"
                whileHover={{ rotate: 405 }}
                transition={{ delay: 1 }}
              />
            </ImageDecorations>
            <ImageFrame
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <StyledImage>
                <img src={avatar} alt="Profile" loading="eager" />
                <img src={avatarHover} alt="Profile Hover" loading="eager" />
              </StyledImage>
            </ImageFrame>
            <FloatingCard
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: -60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease: "easeOut" }}
              style={{ left: 0, top: '25%' }}
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
            >
              🎯 Backend Engineer
            </FloatingCard>
            <FloatingCard
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ease: "easeOut" }}
              style={{ right: 0, bottom: '35%' }}
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
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
                  I'm a <GradientText>passionate Backend Engineer</GradientText> with a deep love for building scalable and efficient systems.
                  With expertise in <GradientText>distributed systems</GradientText> and <GradientText>cloud architecture</GradientText>, I specialize in creating
                  robust backend solutions that power modern applications.
                </Bio>
                <Bio style={{ marginTop: '1.5rem' }}>
                  My approach combines <GradientText>technical excellence</GradientText> with practical problem-solving,
                  ensuring that every solution I build is not just functional, but also
                  maintainable and future-proof.
                </Bio>
              </BioContainer>
              <ResumeButton 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </ResumeButton>
            </motion.div>
            <SkillsContainer variants={itemVariants}>
              <SkillsHeader>Technologies I Work With</SkillsHeader>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={`${skill.name}-${index}`}
                    className="skill-card"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                    viewport={{ once: true }}
                  >
                    <SkillIcon className="skill-icon">
                      <span role="img" aria-label={`${skill.name} icon`}>
                        {skill.icon}
                      </span>
                    </SkillIcon>
                    <SkillInfo>
                      <SkillName>{skill.name}</SkillName>
                      <SkillCategory>{skill.category}</SkillCategory>
                    </SkillInfo>
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