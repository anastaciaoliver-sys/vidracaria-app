// Importa o módulo Platform do React Native
// Platform permite saber se o app está rodando no Android, iOS ou Web.
import { Platform } from 'react-native';

// ------------------------------------------------------------
// 🔧 initDB()
// Função que inicializa o banco de dados.
// Aqui, como estamos no modo Web, ela apenas exibe logs.
// ------------------------------------------------------------
export function initDB() {

  // Verifica se o app NÃO está no modo Web
  // Se estiver no Android/iOS → banco estaria ativo
  if (Platform.OS !== 'web') 
    console.log('Banco ativo no celular.');
  
  // Se estiver na Web, o banco está desativado
  else 
    console.warn('⚠️ Banco desativado no modo Web.');
}

// ------------------------------------------------------------
// 💾 salvarOrcamento()
// Simula salvar dados no banco (somente no modo Web).
// No app real, aqui entraria o comando SQL INSERT.
// ------------------------------------------------------------
export function salvarOrcamento({ nome, telefone, endereco, descricao, valor }) {

  // Exibe no console o que seria salvo no banco
  console.log('Simulando salvamento (modo web):', { 
    nome, 
    telefone, 
    endereco, 
    descricao, 
    valor 
  });

  // Retorna uma Promise resolvida para simular sucesso
  return Promise.resolve(1); 
}

// ------------------------------------------------------------
// 📚 listarOrcamentos()
// Simula retornar os dados armazenados.
// No mobile real, aqui seria um SELECT * FROM orcamentos.
// ------------------------------------------------------------
export function listarOrcamentos() {

  // Apenas exibe a simulação no console
  console.log('Simulando listagem (modo web).');

  // Retorna um array vazio (nenhum registro no modo Web)
  return Promise.resolve([]);
}

