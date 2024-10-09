'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../components/AuthProvider';

interface Project {
  id: string;
  name: string;
  clientId: string;
  packageId: string;
  status: 'Sitemap y Wireframes' | 'Diseño' | 'Contenido' | 'Desarrollo' | 'Publicación';
  startDate: string;
  endDate: string;
}

interface Client {
  id: string;
  name: string;
}

interface Package {
  id: string;
  name: string;
}

const ProyectosPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    clientId: '',
    packageId: '',
    status: 'Sitemap y Wireframes',
    startDate: '',
    endDate: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchClients();
      fetchPackages();
    }
  }, [user]);

  const fetchProjects = async () => {
    const projectsCollection = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCollection);
    const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    setProjects(projectList);
  };

  const fetchClients = async () => {
    const clientsCollection = collection(db, 'clients');
    const clientSnapshot = await getDocs(clientsCollection);
    const clientList = clientSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name } as Client));
    setClients(clientList);
  };

  const fetchPackages = async () => {
    const packagesCollection = collection(db, 'packages');
    const packageSnapshot = await getDocs(packagesCollection);
    const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name } as Package));
    setPackages(packageList);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, 'projects'), newProject);
      setNewProject({
        name: '',
        clientId: '',
        packageId: '',
        status: 'Sitemap y Wireframes',
        startDate: '',
        endDate: '',
      });
      fetchProjects();
    }
  };

  const handleUpdateProjectStatus = async (id: string, newStatus: Project['status']) => {
    if (user) {
      await updateDoc(doc(db, 'projects', id), { status: newStatus });
      fetchProjects();
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>
      
      <form onSubmit={handleAddProject} className="mb-8 space-y-4">
        <input
          type="text"
          value={newProject.name}
          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
          placeholder="Nombre del proyecto"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={newProject.clientId}
          onChange={(e) => setNewProject({...newProject, clientId: e.target.value})}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccionar cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        <select
          value={newProject.packageId}
          onChange={(e) => setNewProject({...newProject, packageId: e.target.value})}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccionar paquete</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={newProject.startDate}
          onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={newProject.endDate}
          onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn-primary">Agregar Proyecto</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Paquete
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Fecha Inicio
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Fecha Fin
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {clients.find(c => c.id === project.clientId)?.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {packages.find(p => p.id === project.packageId)?.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.status}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.startDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {project.endDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <select
                    value={project.status}
                    onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value as Project['status'])}
                    className="p-2 border rounded"
                  >
                    <option value="Sitemap y Wireframes">Sitemap y Wireframes</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Contenido">Contenido</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Publicación">Publicación</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProyectosPage;