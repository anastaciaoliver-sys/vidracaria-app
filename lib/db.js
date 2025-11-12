import { Platform } from 'react-native';

export function initDB() {
  if (Platform.OS !== 'web') console.log('Banco ativo no celular.');
  else console.warn('⚠️ Banco desativado no modo Web.');
}

export function salvarOrcamento({ nome, telefone, endereco, descricao, valor }) {
  console.log('Simulando salvamento (modo web):', { nome, telefone, endereco, descricao, valor });
  return Promise.resolve(1);
}

export function listarOrcamentos() {
  console.log('Simulando listagem (modo web).');
  return Promise.resolve([]);
}
