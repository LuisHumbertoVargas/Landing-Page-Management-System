import { useState } from 'react'
import { ChartPie, Users, Briefcase, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const [stats] = useState({
    totalProjects: 12,
    activeClients: 8,
    completedProjects: 5,
    ongoingProjects: 7,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Proyectos Totales"
        value={stats.totalProjects}
        icon={<ChartPie className="h-8 w-8 text-blue-500" />}
      />
      <StatCard
        title="Clientes Activos"
        value={stats.activeClients}
        icon={<Users className="h-8 w-8 text-green-500" />}
      />
      <StatCard
        title="Proyectos Completados"
        value={stats.completedProjects}
        icon={<CheckCircle className="h-8 w-8 text-yellow-500" />}
      />
      <StatCard
        title="Proyectos en Curso"
        value={stats.ongoingProjects}
        icon={<Briefcase className="h-8 w-8 text-purple-500" />}
      />
    </div>
  )
}

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <div className="card flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="bg-gray-100 rounded-full p-3">{icon}</div>
  </div>
)

export default Dashboard