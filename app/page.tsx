import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-text">Dashboard de Administración</h1>
        <Dashboard />
      </div>
    </main>
  )
}