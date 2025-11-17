// Importa React e o hook useState para controlar estados
import React, { useState } from "react";

// Importa componentes do React Native
// ScrollView → permite rolar a lista
// Text → textos
// Image → imagens
// View → contêiner
// TouchableOpacity → botão clicável
// StyleSheet → estilos
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

// -------------------------------------------------------------------------
// 🔹 CENTRALIZAÇÃO DAS IMAGENS
// Aqui você coloca todas as imagens em um objeto,
// facilitando chamar por chave (ex: IMAGENS.fachada)
// -------------------------------------------------------------------------
const IMAGENS = {
  fachada: require("../../assets/images/fachada.jpg"),
  boxe: require("../../assets/images/boxe.jpg"),
  fechamento: require("../../assets/images/fechamento de porta.jpg"),
  armario: require("../../assets/images/armario.jpg"),
};

export default function RealizadosScreen() {
  // imagemSelecionada guarda a chave da imagem aberta no overlay
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  // ---------------------------------------------------------------------
  // Abre o overlay com a imagem clicada
  // chave → "fachada", "boxe" etc.
  // ---------------------------------------------------------------------
  const abrirImagem = (chave) => {
    setImagemSelecionada(chave);
  };

  // Fecha o overlay ao tocar na tela
  const fecharImagem = () => {
    setImagemSelecionada(null);
  };

  // Retorna a imagem correspondente à chave selecionada
  // ou null se nenhuma estiver aberta
  const fonteImagemModal = imagemSelecionada
    ? IMAGENS[imagemSelecionada]
    : null;

  return (
    <View style={{ flex: 1 }}>
      {/* Scroll da lista de serviços realizados */}
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Trabalhos realizados</Text>
        <Text style={styles.subTitle}>
          Alguns serviços que já executamos para nossos clientes.
        </Text>

        {/* -----------------------------------------------------------------
           CARD 1 — Fachada
        ----------------------------------------------------------------- */}
        <View style={styles.card}>
          {/* Ao tocar na imagem, abre o overlay */}
          <TouchableOpacity onPress={() => abrirImagem("fachada")}>
            <Image source={IMAGENS.fachada} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>Fachada em vidro</Text>
          <Text style={styles.cardText}>
            Instalação de fachada em vidro temperado com perfis em alumínio,
            garantindo segurança e valorização da fachada comercial.
          </Text>
        </View>

        {/* -----------------------------------------------------------------
           CARD 2 — Boxe
        ----------------------------------------------------------------- */}
        <View style={styles.card}>
          <TouchableOpacity onPress={() => abrirImagem("boxe")}>
            <Image source={IMAGENS.boxe} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>Box de banheiro</Text>
          <Text style={styles.cardText}>
            Box de vidro temperado sob medida, com ferragens inox e acabamento
            fino.
          </Text>
        </View>

        {/* -----------------------------------------------------------------
           CARD 3 — Fechamento
        ----------------------------------------------------------------- */}
        <View style={styles.card}>
          <TouchableOpacity onPress={() => abrirImagem("fechamento")}>
            <Image source={IMAGENS.fechamento} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>Fechamento de porta</Text>
          <Text style={styles.cardText}>
            Fechamento em vidro para porta/janela, ajudando na iluminação
            natural e proteção.
          </Text>
        </View>

        {/* -----------------------------------------------------------------
           CARD 4 — Armário
        ----------------------------------------------------------------- */}
        <View style={styles.card}>
          <TouchableOpacity onPress={() => abrirImagem("armario")}>
            <Image source={IMAGENS.armario} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.cardTitle}>Armário com vidro</Text>
          <Text style={styles.cardText}>
            Vidros aplicados em mobiliário interno, trazendo modernidade e
            fácil limpeza.
          </Text>
        </View>
      </ScrollView>

      {/* -------------------------------------------------------------------
         OVERLAY DE IMAGEM EM TELA CHEIA
         Exibido somente se fonteImagemModal NÃO for null
      ------------------------------------------------------------------- */}
      {fonteImagemModal && (
        <View style={styles.overlay}>

          {/* TouchableOpacity permite fechar clicando em qualquer lugar */}
          <TouchableOpacity style={styles.overlayTouch} onPress={fecharImagem}>

            {/* Imagem ampliada na tela cheia */}
            <Image
              source={fonteImagemModal}
              style={styles.fullImage}
              resizeMode="contain"  // mostra a imagem inteira sem cortar
            />

          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container principal com padding e fundo branco
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12
  },

  // Título na parte superior
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 4,
    color: "#0077b6",
  },

  // Subtitulo explicativo
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#555",
  },

  // Card onde cada serviço é apresentado
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // Imagem principal do card
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 8,
  },

  // Título do card
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },

  // Texto descritivo do card
  cardText: {
    fontSize: 14,
    color: "#444",
  },

  // Overlay escuro cobrindo a tela inteira
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Área clicável que ocupa a tela inteira
  overlayTouch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // Imagem ampliada dentro do overlay
  fullImage: {
    width: "95%",   // deixa uma margem bonita
    height: "80%",
    borderRadius: 12,
  },
});
