import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  padding: 0 2rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 60vmax;
    height: 60vmax;
    border-radius: 50%;
    background-color: ${({ theme }) => `${theme.colors.primary}05`};
    animation: move 15s linear infinite;
    z-index: 0;
  }

  &::before {
    top: -30vmax;
    left: -20vmax;
    animation-delay: -5s;
  }

  &::after {
    bottom: -30vmax;
    right: -20vmax;
  }

  @keyframes move {
    0% { transform: rotate(0deg) translate(2%, 2%); }
    100% { transform: rotate(360deg) translate(2%, 2%); }
  }
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(${({ theme }) => `${theme.colors.primary}08`} 1px, transparent 1px),
                    linear-gradient(90deg, ${({ theme }) => `${theme.colors.primary}08`} 1px, transparent 1px);
  background-size: 3rem 3rem;
  opacity: 0.5;
  z-index: 1;
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 2;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const ContentSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px ${({ theme }) => `${theme.colors.primary}30`});
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  max-width: 600px;
  margin: 0;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const Terminal = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.background})`};
  border-radius: 24px;
  box-shadow: 0 25px 100px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px ${({ theme }) => `${theme.colors.primary}10`};
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16/10;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => `${theme.colors.primary}10`},
      ${({ theme }) => `${theme.colors.accent}10`}
    );
    mask-image: radial-gradient(circle at 50% 0%, black, transparent 70%);
  }
`;

const TerminalHeader = styled.div`
  background-color: ${({ theme }) => `${theme.colors.surface}`};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
`;

const TerminalButton = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: ${({ color }) => color};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.2;
  }
`;

const TerminalContent = styled.div`
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.8;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  .prompt {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 1rem;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background-color: ${({ theme }) => theme.colors.primary};
    animation: blink 1s infinite;
    margin-left: 4px;
    vertical-align: middle;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.background})`};
  box-shadow: 0 4px 20px ${({ theme }) => `${theme.colors.primary}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const { scrollYProgress } = useScroll();
  const terminalY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const terminalRotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullText = `> const developer = {
  name: "Aryan Chandna",
  role: "Software Engineer",
  passion: "Building robust, scalable systems",
  status: "Ready to build something amazing!"
  funFact: "Thinks in threads, speaks in APIs.",
};`;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection id="hero">
      <BackgroundGrid />
      <HeroContainer>
        <ContentSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi there, Nice to meet you!
</Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
I specialize in Java, Spring Boot, and system design, creating backend solutions that are fast, reliable, and ready to scale.
</Subtitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
Open to exciting opportunities. Let’s build something impactful together!
</Description>
          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <SocialLink
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
            </SocialLink>
            <SocialLink
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </ContentSection>
        <Terminal
          style={{ y: terminalY, rotateX: terminalRotate, opacity }}
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          <TerminalHeader>
            <TerminalButton color="#ff5f56" />
            <TerminalButton color="#ffbd2e" />
            <TerminalButton color="#27c93f" />
          </TerminalHeader>
          <TerminalContent>
            <pre>
              {typedText}
              {typedText.length < fullText.length && <span className="cursor" />}
            </pre>
          </TerminalContent>
        </Terminal>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero; 