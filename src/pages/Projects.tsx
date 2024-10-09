import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'

const Projects = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Acme Corp Website', client: 'Acme Corp', status: 'In Progress', dueDate: '2023-06-30' },
    { id: 2, name: 'Startup Inc Landing Page', client: 'Startup Inc', status: 'Planning', dueDate: '2023-07-15' },
    { id: 3, name: 'Tech Solutions Portal', client: 'Tech Solutions', status: 'Completed', dueDate: '2023-05-31' },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" /> New Project
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Search className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full outline-none"
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.client}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Projects