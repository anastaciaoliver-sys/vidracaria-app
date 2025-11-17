// Importa React e os hooks useEffect e useState
// useState → armazena dados na tela
// useEffect → executa algo quando a tela é aberta
import React, { useEffect, useState } from 'react';

// Importa componentes básicos do React Native
// View → contêiner
// Text → textos
// StyleSheet → estilização
// ScrollView → tela com rolagem
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Importa do banco de dados SQLite:
// initDB → inicializa o banco
// listarOrcamentos → retorna todos os registros salvos
import { initDB, listarOrcamentos } from '../../lib/db';

export default function HistoricoScreen() {

  // Estado que guarda todos os orçamentos retornados do banco
  const [itens, setItens] = useState([]);

  // useEffect → executado quando a tela abre
  useEffect(() => {
    // Inicializa banco (cria tabelas se não existirem)
    initDB();

    // Função autoexecutável para buscar os orçamentos
    (async () => {
      // Busca todos os orçamentos salvos
      const rows = await listarOrcamentos();
      // Atualiza estado para exibir na tela
      setItens(rows);
    })();
  }, []); // [] garante que roda apenas 1 vez ao abrir a tela

  return (
    // ScrollView permite rolagem caso a lista seja grande
    <ScrollView style={styles.container}>

      {/* Título da tela */}
      <Text style={styles.title}>Histórico de Orçamentos</Text>

      {/* Percorre cada orçamento retornado do banco */}
      {itens.map((o) => (
        <View key={o.id} style={styles.card}>

          {/* Nome + valor do serviço */}
          <Text style={styles.nome}>{o.nome} — R$ {o.valor},00</Text>

          {/* Telefone */}
          <Text style={styles.linha}>📞 {o.telefone}</Text>

          {/* Endereço */}
          <Text style={styles.linha}>🏠 {o.endereco}</Text>

          {/* Descrição do serviço solicitado */}
          <Text style={styles.desc}>📝 {o.descricao}</Text>

          {/* Data de criação convertida para formato legível */}
          <Text style={styles.data}>
            🕒 {new Date(o.created_at).toLocaleString()}
          </Text>

        </View>
      ))}

      {/* Caso não tenha nada salvo */}
      {itens.length === 0 && <Text>Nenhum orçamento salvo ainda.</Text>}
    </ScrollView>
  );
}


