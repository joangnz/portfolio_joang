import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState<String | null>(null)

  useEffect(() => {
    fetch('/api/getCV')
    .then(res => res.json())
    .then(setName);
  })

  return (
    <div className="homepage">
      <header>
        <img src="/vite.svg" className="logo" alt="Logo" />
        <h1>{name}</h1>
        <p>Web Developer & Designer</p>
      </header>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            Welcome! I'm a passionate web developer specializing in building modern, responsive web applications with React, TypeScript, and more.
          </p>
        </section>
        <section id="projects">
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
        <section id="contact">
          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:your.email@example.com">your.email@example.com</a>
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
