import React from 'react';
import Link from 'next/link';

const ongs = [
  {
    nome: "Saúde para Todos",
    descricao: "ONG dedicada a fornecer tratamento médico e medicamentos para pessoas em situação de vulnerabilidade social.",
    foco: "Acesso universal à saúde",
    site: "https://www.saudeparatodos.org.br"
  },
  {
    nome: "Pesquisa Avançada",
    descricao: "Instituto que financia pesquisas científicas para o desenvolvimento de novos tratamentos e vacinas.",
    foco: "Pesquisa médica",
    site: "https://www.pesquisaavancada.org.br"
  },
  {
    nome: "Cuidar é Preciso",
    descricao: "Organização que oferece suporte psicológico e emocional para pacientes e familiares afetados por doenças crônicas.",
    foco: "Saúde mental",
    site: "https://www.cuidarepreciso.org.br"
  },
  {
    nome: "Prevenção em Ação",
    descricao: "ONG focada em programas de prevenção e educação em saúde para comunidades carentes.",
    foco: "Prevenção de doenças",
    site: "https://www.prevencaoemacao.org.br"
  },
  {
    nome: "Esperança Viva",
    descricao: "Instituto que trabalha com reabilitação e inclusão social de pessoas que superaram doenças graves.",
    foco: "Reabilitação",
    site: "https://www.esperancaviva.org.br"
  }
];

export default function DoacoesPage() {
  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-100 mb-8">Faça a Diferença</h1>
          <p className="text-xl text-gray-300 mb-12">
            Conheça algumas organizações que trabalham incansavelmente para melhorar a saúde e qualidade de vida de milhares de pessoas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ongs.map((ong, index) => (
            <div key={index} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:bg-gray-600 transition-colors">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">{ong.nome}</h2>
                <p className="text-gray-300 mb-4">{ong.descricao}</p>
                <p className="text-sm font-medium text-blue-400 mb-4">Foco: {ong.foco}</p>
                <a
                  href={ong.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Visitar Site
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Sua doação pode fazer a diferença na vida de muitas pessoas. Escolha uma organização e ajude a transformar vidas.
          </p>
        </div>
      </div>
    </div>
  );
} 