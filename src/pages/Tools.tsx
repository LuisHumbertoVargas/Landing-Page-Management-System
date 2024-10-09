import React from 'react'
import { ExternalLink } from 'lucide-react'

const Tools = () => {
  const tools = [
    { name: 'Relume AI', description: 'Generate sitemaps and wireframes', url: 'https://relume.io/' },
    { name: 'Figma', description: 'Design and prototyping tool', url: 'https://www.figma.com/' },
    { name: 'AI Color', description: 'Generate color palettes', url: 'https://aicolors.co/' },
    { name: 'MidJourney', description: 'AI-powered image generation', url: 'https://www.midjourney.com/' },
    { name: 'Vectorizer AI', description: 'Convert images to vector graphics', url: 'https://vectorizer.ai/' },
    { name: 'ChatGPT', description: 'AI-powered text generation and editing', url: 'https://chat.openai.com/' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Design and Development Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Open Tool <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tools