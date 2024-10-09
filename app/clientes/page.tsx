'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../components/AuthProvider';

interface Client {
  id: string;
  name: string;
  email: string;
  package: string;
}

const ClientesPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', package: 'Básico' });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchClients();
    }
  }, [user]);

  const fetchClients = async () => {
    const clientsCollection = collection(db, 'clients');
    const clientSnapshot = await getDocs(clientsCollection);
    const clientList = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    setClients(clientList);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, 'clients'), newClient);
      setNewClient({ name: '', email: '', package: 'Básico' });
      fetchClients();
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
      
      <form onSubmit={handleAddClient} className="mb-8 space-y-4">
        <input
          type="text"
          value={newClient.name}
          onChange={(e) => setNewClient({...newClient, name: e.target.value})}
          placeholder="Nombre del cliente"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={newClient.email}
          onChange={(e) => setNewClient({...newClient, email: e.target.value})}
          placeholder="Email del cliente"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={newClient.package}
          onChange={(e) => setNewClient({...newClient, package: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
        <button type="submit" className="btn-primary">Agregar Cliente</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Paquete
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {client.package}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesPage;