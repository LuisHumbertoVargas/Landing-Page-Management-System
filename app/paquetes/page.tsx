'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../components/AuthProvider';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

const PaquetesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: 0, features: [''] });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPackages();
    }
  }, [user]);

  const fetchPackages = async () => {
    const packagesCollection = collection(db, 'packages');
    const packageSnapshot = await getDocs(packagesCollection);
    const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Package));
    setPackages(packageList);
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, 'packages'), newPackage);
      setNewPackage({ name: '', description: '', price: 0, features: [''] });
      fetchPackages();
    }
  };

  const handleUpdatePackage = async (id: string, updatedPackage: Partial<Package>) => {
    if (user) {
      await updateDoc(doc(db, 'packages', id), updatedPackage);
      fetchPackages();
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, 'packages', id));
      fetchPackages();
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Paquetes</h1>
      
      <form onSubmit={handleAddPackage} className="mb-8 space-y-4">
        <input
          type="text"
          value={newPackage.name}
          onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
          placeholder="Nombre del paquete"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={newPackage.description}
          onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
          placeholder="Descripción del paquete"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={newPackage.price}
          onChange={(e) => setNewPackage({...newPackage, price: Number(e.target.value)})}
          placeholder="Precio"
          className="w-full p-2 border rounded"
          required
        />
        {newPackage.features.map((feature, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => {
                const newFeatures = [...newPackage.features];
                newFeatures[index] = e.target.value;
                setNewPackage({...newPackage, features: newFeatures});
              }}
              placeholder={`Característica ${index + 1}`}
              className="flex-grow p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setNewPackage({...newPackage, features: [...newPackage.features, '']})}
              className="btn-secondary"
            >
              +
            </button>
          </div>
        ))}
        <button type="submit" className="btn-primary">Agregar Paquete</button>
      </form>

      <div className="space-y-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <p className="text-xl font-semibold mb-4">${pkg.price}</p>
            <ul className="list-disc list-inside mb-4">
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdatePackage(pkg.id, { price: pkg.price + 100 })}
                className="btn-secondary"
              >
                Aumentar Precio
              </button>
              <button
                onClick={() => handleDeletePackage(pkg.id)}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaquetesPage;