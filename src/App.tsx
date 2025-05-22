import { useEffect, useState } from 'react';
import './App.css';

interface UserData {
  name: string;
  role: string;
  description: string;
  email: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) throw new Error('Network response was not ok');
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        setError('Failed to load user data');
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage">
      <header className="homepage__header">
        <img src="/vite.svg" className="homepage__logo" alt="Logo" />
        <h1>{userData?.name || 'Name Unavailable'}</h1>
        <p>{userData?.role || 'Role Unavailable'}</p>
      </header>

      <nav className="homepage__nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <main className="homepage__main">
        <section id="about" className="homepage__section">
          <h2>About Me</h2>
          <p>{userData?.description || 'No description available.'}</p>
        </section>

        <section id="projects" className="homepage__section">
          <h2>Projects</h2>
          <ul>
            <li>
              <strong>Project One</strong>: A brief description of your project.
            </li>
            <li>
              <strong>Project Two</strong>: Another project description.
            </li>
          </ul>
        </section>

        <section id="contact" className="homepage__section">
          <h2>Contact</h2>
          <p>
            Email: <a href={`mailto:${userData?.email}`}>{userData?.email}</a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;