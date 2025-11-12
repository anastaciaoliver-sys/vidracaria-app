import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { initDB, listarOrcamentos } from '../../lib/db';

export default function HistoricoScreen() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    initDB();
    (async () => {
      const rows = await listarOrcamentos();
      setItens(rows);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico de Orçamentos</Text>
      {itens.map((o) => (
        <View key={o.id} style={styles.card}>
          <Text style={styles.nome}>{o.nome} — R$ {o.valor},00</Text>
          <Text style={styles.linha}>📞 {o.telefone}</Text>
          <Text style={styles.linha}>🏠 {o.endereco}</Text>
          <Text style={styles.desc}>📝 {o.descricao}</Text>
          <Text style={styles.data}>🕒 {new Date(o.created_at).toLocaleString()}</Text>
        </View>
      ))}
      {itens.length === 0 && <Text>Nenhum orçamento salvo ainda.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#0077b6' },
  card: { backgroundColor: '#f8f8f8', padding: 12, borderRadius: 10, marginBottom: 10 },
  nome: { fontWeight: 'bold', marginBottom: 4 },
  linha: { color: '#333' },
  desc: { color: '#333', marginTop: 4 },
  data: { color: '#666', marginTop: 6, fontSize: 12 },
});
