import React from 'react'
import Statistics from './components/Statistics'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import PlatformList from './components/PlatformList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Social Media Manager</h1>
          <p>Share your thoughts and manage your platforms</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Statistics Dashboard */}
          <Statistics />

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column - Posts */}
            <div className="left-column">
              <PostForm />
              <PostList />
            </div>

            {/* Right Column - Platforms */}
            <div className="right-column">
              <PlatformList />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with React & Redux • Built for learning state management</p>
      </footer>
    </div>
  )
}

export default App
