import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaBriefcase, FaCode, FaServer } from 'react-icons/fa';

const ExperienceSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 6rem 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary}40,
      transparent
    );
  }
`;

const ExperienceContainer = styled.div`
  width: 100%;
  max-width: 1400px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4rem;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.primary}30,
      ${({ theme }) => theme.colors.primary}30,
      transparent
    );

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  display: flex;
  justify-content: ${({ isLeft }) => (isLeft ? 'flex-start' : 'flex-end')};
  padding-left: ${({ isLeft }) => (isLeft ? '0' : '50%')};
  padding-right: ${({ isLeft }) => (isLeft ? '50%' : '0')};
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    padding-left: 50px;
    padding-right: 0;
    justify-content: flex-start;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.background})`};
  border-radius: 24px;
  box-shadow: 0 25px 100px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}10`};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    ${({ theme }) => `box-shadow: 0 0 20px ${theme.colors.primary}50`};

    ${TimelineItem}:nth-child(odd) & {
      right: -60px;

      @media (max-width: 768px) {
        left: -40px;
        right: auto;
      }
    }

    ${TimelineItem}:nth-child(even) & {
      left: -60px;

      @media (max-width: 768px) {
        left: -40px;
      }
    }
  }
`;

const Role = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const Company = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Period = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const TechTag = styled(motion.span)`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Experience = () => {
  const experiences = [
    {
      role: 'Senior Backend Engineer',
      company: 'Tech Company A',
      period: 'Jan 2023 - Present',
      description: 'Led the development of high-performance microservices architecture, improving system scalability by 300%. Implemented robust CI/CD pipelines and mentored junior developers.',
      tech: ['Node.js', 'Kubernetes', 'AWS', 'MongoDB'],
      icon: FaServer
    },
    {
      role: 'Backend Developer',
      company: 'Tech Company B',
      period: 'Jun 2021 - Dec 2022',
      description: 'Designed and implemented RESTful APIs serving millions of requests daily. Optimized database queries resulting in 50% reduction in response time.',
      tech: ['Python', 'PostgreSQL', 'Docker', 'Redis'],
      icon: FaCode
    },
    {
      role: 'Software Engineer',
      company: 'Tech Company C',
      period: 'Jan 2020 - May 2021',
      description: 'Developed and maintained backend services for a large-scale e-commerce platform. Implemented real-time analytics processing pipeline.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Kafka'],
      icon: FaBriefcase
    }
  ];

  return (
    <ExperienceSection id="experience">
      <ExperienceContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Professional <span>Experience</span>
        </SectionTitle>
        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              isLeft={index % 2 === 0}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TimelineContent>
                <Role>{exp.role}</Role>
                <Company>{exp.company}</Company>
                <Period>{exp.period}</Period>
                <Description>{exp.description}</Description>
                <TechStack>
                  {exp.tech.map((tech, techIndex) => (
                    <TechTag
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </TechTag>
                  ))}
                </TechStack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience; 