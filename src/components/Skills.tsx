import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SkillCategory = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.5rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SkillName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const SkillBar = styled.div`
  height: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

const SkillLevel = styled(motion.div)<{ level: number }>`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ level }) => level}%;
  border-radius: 4px;
`;

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = {
    'Languages': [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Go', level: 80 },
      { name: 'Java', level: 75 },
    ],
    'Databases': [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'Elasticsearch', level: 75 },
    ],
    'Cloud & DevOps': [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 80 },
      { name: 'CI/CD', level: 85 },
    ],
    'Architecture': [
      { name: 'Microservices', level: 90 },
      { name: 'REST APIs', level: 95 },
      { name: 'gRPC', level: 80 },
      { name: 'Event-Driven', level: 85 },
    ],
  };

  return (
    <SkillsSection id="skills">
      <SkillsContainer ref={ref}>
        <Title>Skills</Title>
        <SkillsGrid>
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <SkillCategory
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <CategoryTitle>{category}</CategoryTitle>
              <SkillList>
                {items.map((skill, index) => (
                  <SkillItem key={skill.name}>
                    <SkillName>{skill.name}</SkillName>
                    <SkillBar>
                      <SkillLevel
                        level={skill.level}
                        initial={{ width: 0 }}
                        animate={inView ? { width: skill.level } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills; 