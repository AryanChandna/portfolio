import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.colors.surface}, ${theme.colors.background})`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 20px ${({ theme }) => `${theme.colors.primary}10`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => `${theme.colors.primary}20`};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '🌞 Light' : '🌙 Dark'}
        </ThemeToggle>
        <Router>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
