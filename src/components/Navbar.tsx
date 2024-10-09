import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Users, Briefcase, Package, Tool, Settings } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="font-bold text-xl text-gray-800">LandingPro</span>
          </Link>
          <div className="flex space-x-4">
            <NavLink to="/" icon={<Home />} text="Dashboard" />
            <NavLink to="/clients" icon={<Users />} text="Clients" />
            <NavLink to="/projects" icon={<Briefcase />} text="Projects" />
            <NavLink to="/packages" icon={<Package />} text="Packages" />
            <NavLink to="/tools" icon={<Tool />} text="Tools" />
            <NavLink to="/settings" icon={<Settings />} text="Settings" />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center text-gray-600 hover:text-indigo-600">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
)

export default Navbar