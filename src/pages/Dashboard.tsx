import React from 'react'
import { BarChart, Users, Briefcase, Package } from 'lucide-react'

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Total Clients" value="24" />
        <StatCard icon={<Briefcase />} title="Active Projects" value="12" />
        <StatCard icon={<Package />} title="Completed Projects" value="36" />
        <StatCard icon={<BarChart />} title="Revenue" value="$48,000" />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
        {/* Add a table or list of recent projects here */}
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div className="text-indigo-600">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
    <div className="mt-2 text-gray-600">{title}</div>
  </div>
)

export default Dashboard