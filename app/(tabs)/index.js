import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { initDB, salvarOrcamento } from '../../lib/db';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => { initDB(); }, []);
  const simularValor = () => Math.floor(Math.random() * (500 - 100 + 1)) + 100;

  const enviarWhatsApp = async () => {
    if (!nome || !telefone || !descricao) {
      Alert.alert('Atenção', 'Preencha ao menos Nome, Telefone e Descrição.');
      return;
    }
    const valor = simularValor();
    await salvarOrcamento({ nome, telefone, endereco, descricao, valor });

    const mensagem =
      `📋 *Novo orçamento*%0A` +
      `👤 Nome: ${nome}%0A` +
      `📞 Telefone: ${telefone}%0A` +
      `🏠 Endereço: ${endereco}%0A` +
      `📝 Descrição: ${descricao}%0A` +
      `💰 Valor estimado: R$ ${valor},00`;

    const telEmpresa = '55SEUNUMEROAQUI'; // Exemplo: 5511999999999
    Linking.openURL(`https://wa.me/${telEmpresa}?text=${mensagem}`);
  };

  const enviarEmail = async () => {
    if (!nome || !telefone || !descricao) {
      Alert.alert('Atenção', 'Preencha ao menos Nome, Telefone e Descrição.');
      return;
    }
    const valor = simularValor();
    await salvarOrcamento({ nome, telefone, endereco, descricao, valor });

    const assunto = 'Novo orçamento';
    const corpo =
`Nome: ${nome}
Telefone: ${telefone}
Endereço: ${endereco}
Descrição: ${descricao}
Valor estimado: R$ ${valor},00`;

    const emailEmpresa = 'contato@seudominio.com';
    Linking.openURL(`mailto:${emailEmpresa}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RC VIDROS</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>

        <Link href="/servicos/box" asChild>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: 'https://picsum.photos/seed/box/600/350' }} style={styles.image} />
            <Text style={styles.cardTitle}>Box de Banheiro</Text>
            <Text style={styles.cardText}>Modelos sob medida em vidro temperado.</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/servicos/espelhos" asChild>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: 'https://picsum.photos/seed/espelho/600/351' }} style={styles.image} />
            <Text style={styles.cardTitle}>Espelhos Decorativos</Text>
            <Text style={styles.cardText}>Soluções modernas para todos os ambientes.</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/servicos/vidros" asChild>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: 'https://picsum.photos/seed/vidros/600/352' }} style={styles.image} />
            <Text style={styles.cardTitle}>Vidros em Geral</Text>
            <Text style={styles.cardText}>Janelas, portas, corrimãos e mais.</Text>
          </TouchableOpacity>
        </Link>

        <Text style={styles.sectionTitle}>Solicitar Orçamento</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descrição do serviço"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TouchableOpacity style={styles.buttonWhats} onPress={enviarWhatsApp}>
          <Text style={styles.buttonText}>📲 Enviar para WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEmail} onPress={enviarEmail}>
          <Text style={styles.buttonText}>📧 Enviar por E-mail</Text>
        </TouchableOpacity>

        <Link href="/historico">
          <Text style={styles.linkHistorico}>📚 Ver histórico de orçamentos</Text>
        </Link>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#0077b6' },
  scroll: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { fontSize: 14, color: '#444' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  buttonWhats: { backgroundColor: '#25d366', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 5 },
  buttonEmail: { backgroundColor: '#0077b6', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkHistorico: { textAlign: 'center', marginTop: 12, color: '#0077b6', fontWeight: 'bold' },
});
