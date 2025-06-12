import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">404 - Página não encontrada</h1>
        <p className="text-gray-300 mb-8">A página que você está procurando não existe.</p>
        <Link 
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  )
} 