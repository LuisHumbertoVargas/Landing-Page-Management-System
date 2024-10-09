import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Packages from './pages/Packages'
import Tools from './pages/Tools'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App