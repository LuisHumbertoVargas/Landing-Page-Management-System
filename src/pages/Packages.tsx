import React from 'react'
import { Package, Check } from 'lucide-react'

const Packages = () => {
  const packages = [
    {
      name: 'Basic',
      price: '$499',
      features: [
        '1 page',
        'Basic logo design',
        'Simple design',
        'Contact form',
        '1 revision',
        '5 days delivery',
      ],
    },
    {
      name: 'Intermediate',
      price: '$999',
      features: [
        '2-3 pages',
        'Professional logo design',
        'Custom design',
        'Contact form',
        'Product gallery',
        '2 revisions',
        '10 days delivery',
      ],
    },
    {
      name: 'Advanced',
      price: '$1999',
      features: [
        '4-6 pages',
        'Premium logo design',
        'Highly customized design',
        'Contact form',
        'E-commerce integration',
        'Booking system',
        '3 revisions',
        '15 days delivery',
      ],
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-indigo-600 text-white">
              <Package className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold">{pkg.name}</h2>
              <p className="text-4xl font-bold mt-2">{pkg.price}</p>
            </div>
            <ul className="p-6">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="p-6 bg-gray-50">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Packages