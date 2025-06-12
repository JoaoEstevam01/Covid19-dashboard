'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Lista de ONGs disponíveis para doação
// TODO: No futuro, buscar essa lista de uma API
const ongs = [
  {
    id: 1, // adicionei ids para facilitar o mapeamento
    nome: "Saúde para Todos",
    descricao: "ONG dedicada a fornecer tratamento médico e medicamentos para pessoas em situação de vulnerabilidade social.",
    foco: "Acesso universal à saúde",
    site: "#"
  },
  {
    id: 2,
    nome: "Pesquisa Avançada",
    descricao: "Instituto que financia pesquisas científicas para o desenvolvimento de novos tratamentos e vacinas.",
    foco: "Pesquisa médica",
    site: "#"
  },
  {
    id: 3,
    nome: "Cuidar é Preciso",
    descricao: "Organização que oferece suporte psicológico e emocional para pacientes e familiares afetados por doenças crônicas.",
    foco: "Saúde mental",
    site: "#"
  },
  {
    id: 4,
    nome: "Prevenção em Ação",
    descricao: "ONG focada em programas de prevenção e educação em saúde para comunidades carentes.",
    foco: "Prevenção de doenças",
    site: "#"
  },
  {
    id: 5,
    nome: "Esperança Viva",
    descricao: "Instituto que trabalha com reabilitação e inclusão social de pessoas que superaram doenças graves.",
    foco: "Reabilitação",
    site: "#"
  },
  {
    id: 6,
    nome: "Unidos pela Vida",
    descricao: "Organização que promove ações de apoio e assistência a pacientes em tratamento de COVID-19 e suas famílias.",
    foco: "Suporte COVID-19",
    site: "#"
  }
];

// Estilos comuns que são reutilizados
const styles = {
  input: "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
  label: "block text-sm font-medium text-gray-300 mb-2",
  card: "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 rounded-lg shadow-lg overflow-hidden hover:bg-gray-700/50 transition-colors"
};

export default function DoacoesPage() {
  const router = useRouter();
  const [showThanks, setShowThanks] = useState(false);
  
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    valor: '',
    ong: ''
  });

  // Função que lida com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mostra mensagem de agradecimento
    setShowThanks(true);

    // Redireciona após 2 segundos
    setTimeout(() => {
      router.push('/');
    }, 2000);

    // TODO: Implementar integração com API de pagamento
    console.log('Dados do formulário:', formData);
  };

  // Função que atualiza os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Componente do formulário de doação
  const DonationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className={styles.label}>Nome Completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          value={formData.nome}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="ong" className={styles.label}>Selecione a ONG</label>
        <select
          id="ong"
          name="ong"
          required
          value={formData.ong}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Selecione uma ONG</option>
          {ongs.map((ong) => (
            <option key={ong.id} value={ong.nome}>
              {ong.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="valor" className={styles.label}>Valor da Doação (R$)</label>
        <input
          type="number"
          id="valor"
          name="valor"
          required
          min="1"
          value={formData.valor}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors font-medium"
      >
        Enviar Doação
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Modal de agradecimento */}
      {showThanks && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Obrigado!</h2>
            <div className="text-red-500 text-6xl mb-4">❤️</div>
            <p className="text-gray-300">Redirecionando...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-100 mb-8">Faça a Diferença</h1>
          <p className="text-xl text-gray-300 mb-12">
            Conheça algumas organizações que trabalham incansavelmente para melhorar a saúde e qualidade de vida de milhares de pessoas.
          </p>
        </div>

        {/* Lista de ONGs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ongs.map((ong) => (
            <div key={ong.id} className={styles.card}>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">{ong.nome}</h2>
                <p className="text-gray-300 mb-4">{ong.descricao}</p>
                <p className="text-sm font-medium text-blue-500 mb-4">Foco: {ong.foco}</p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Visitar Site
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de doação */}
        <div className={`mt-16 max-w-md mx-auto ${styles.card} p-8`}>
          <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Faça sua Doação</h2>
          <DonationForm />
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