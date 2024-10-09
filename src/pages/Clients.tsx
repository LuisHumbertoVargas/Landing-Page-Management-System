import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'

const Clients = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Acme Corp', package: 'Advanced', projects: 3 },
    { id: 2, name: 'Startup Inc', package: 'Basic', projects: 1 },
    { id: 3, name: 'Tech Solutions', package: 'Intermediate', projects: 2 },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" /> Add Client
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Search className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full outline-none"
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.package}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.projects}</td>
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

export default Clients