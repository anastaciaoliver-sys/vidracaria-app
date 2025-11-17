// Importa o componente Link do expo-router para navegação entre telas
import { Link } from 'expo-router';

// Barra de status do dispositivo
import { StatusBar } from 'expo-status-bar';

// Importa React e hooks useEffect e useState
import React, { useEffect, useState } from 'react';

// Importa componentes básicos do React Native
// Alert → alertas na tela
// Image → exibir imagens
// Linking → abrir links externos (WhatsApp / Email)
// ScrollView → rolagem
// TextInput, TouchableOpacity → inputs e botões
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Importa funções do banco SQLite (iniciar DB e salvar orçamento)
import { initDB, salvarOrcamento } from '../../lib/db';

export default function HomeScreen() {

  // Estados para armazenar os dados digitados pelo usuário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  // useEffect → executa assim que a tela abre
  // Aqui inicializa o banco de dados SQLite
  useEffect(() => {
    initDB();
  }, []);

  // Função que gera um valor entre 100 e 500 para simulação
  const simularValor = () => Math.floor(Math.random() * (500 - 100 + 1)) + 100;

  // 📲 Função para enviar orçamento via WhatsApp
  const enviarWhatsApp = async () => {

    // Validação para evitar enviar dados vazios
    if (!nome || !telefone || !descricao) {
      Alert.alert('Atenção', 'Preencha ao menos Nome, Telefone e Descrição.');
      return;
    }

    // Gera valor e salva no banco
    const valor = simularValor();
    await salvarOrcamento({ nome, telefone, endereco, descricao, valor });

    // Mensagem formatada com quebra de linha usando %0A
    const mensagem =
      `📋 *Novo orçamento*%0A` +
      `👤 Nome: ${nome}%0A` +
      `📞 Telefone: ${telefone}%0A` +
      `🏠 Endereço: ${endereco}%0A` +
      `📝 Descrição: ${descricao}%0A` +
      `💰 Valor estimado: R$ ${valor},00`;

    // Número da empresa (substituir pelo seu)
    const telEmpresa = '55SEUNUMEROAQUI';

    // Abre direto o WhatsApp Web ou App
    Linking.openURL(`https://wa.me/${telEmpresa}?text=${mensagem}`);
  };

  // 📧 Função para enviar orçamento via e-mail
  const enviarEmail = async () => {

    // Validação de campos obrigatórios
    if (!nome || !telefone || !descricao) {
      Alert.alert('Atenção', 'Preencha ao menos Nome, Telefone e Descrição.');
      return;
    }

    const valor = simularValor();
    await salvarOrcamento({ nome, telefone, endereco, descricao, valor });

    // Corpo do email (texto puro)
    const assunto = 'Novo orçamento';
    const corpo =
      `Nome: ${nome}
Telefone: ${telefone}
Endereço: ${endereco}
Descrição: ${descricao}
Valor estimado: R$ ${valor},00`;

    const emailEmpresa = 'contato@seudominio.com';

    // Abre o app de email
    Linking.openURL(`mailto:${emailEmpresa}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`);
  };

  return (
    // View principal — container da tela
    <View style={styles.container}>

      {/* Título da empresa */}
      <Text style={styles.header}>RC VIDROS</Text>

      {/* ScrollView → permite rolagem da tela */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Seção: Serviços */}
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>

        {/* Card que leva para galeria de serviços realizados */}
        <Link href="/servicos/realizados" asChild>
          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../../assets/images/fachada.jpg")}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Trabalhos realizados</Text>
            <Text style={styles.cardText}>
              Veja fotos de serviços já concluídos: fachadas, boxes, espelhos e muito mais.
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Seção: Formulário de orçamento */}
        <Text style={styles.sectionTitle}>Solicitar Orçamento</Text>

        {/* Campo Nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        {/* Campo Telefone */}
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        {/* Campo Endereço */}
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />

        {/* Campo Descrição (multilinha) */}
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descrição do serviço"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        {/* Botão WhatsApp */}
        <TouchableOpacity style={styles.buttonWhats} onPress={enviarWhatsApp}>
          <Text style={styles.buttonText}>📲 Enviar para WhatsApp</Text>
        </TouchableOpacity>

        {/* Botão Email */}
        <TouchableOpacity style={styles.buttonEmail} onPress={enviarEmail}>
          <Text style={styles.buttonText}>📧 Enviar por E-mail</Text>
        </TouchableOpacity>

        {/* Link para histórico */}
        <Link href="/historico">
          <Text style={styles.linkHistorico}>📚 Ver histórico de orçamentos</Text>
        </Link>

      </ScrollView>

      {/* Barra de status do celular */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,             // ocupa tela toda
    backgroundColor: '#f5f5f5',
    paddingTop: 50
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0077b6'
  },

  scroll: { paddingHorizontal: 20 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },

  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { fontSize: 14, color: '#444' },

  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },

  buttonWhats: {
    backgroundColor: '#25d366', // verde WhatsApp
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5
  },

  buttonEmail: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  linkHistorico: {
    textAlign: 'center',
    marginTop: 12,
    color: '#0077b6',
    fontWeight: 'bold'
  },
});
