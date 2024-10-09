import Link from 'next/link'
import { Home, Users, Briefcase, Package, Tool, Settings } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            LandingAdmin
          </Link>
          <div className="flex space-x-4">
            <NavItem href="/" icon={<Home size={20} />} text="Inicio" />
            <NavItem href="/clientes" icon={<Users size={20} />} text="Clientes" />
            <NavItem href="/proyectos" icon={<Briefcase size={20} />} text="Proyectos" />
            <NavItem href="/paquetes" icon={<Package size={20} />} text="Paquetes" />
            <NavItem href="/herramientas" icon={<Tool size={20} />} text="Herramientas" />
            <NavItem href="/ajustes" icon={<Settings size={20} />} text="Ajustes" />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
  <Link href={href} className="flex items-center text-text hover:text-primary transition duration-300">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
)

export default Navbar