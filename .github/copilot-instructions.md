# Copilot Instructions for vidracaria-app

## Visão Geral
Este projeto é um app universal (Android, iOS, Web) criado com [Expo](https://expo.dev) e [React Native], utilizando roteamento baseado em arquivos via [expo-router]. O objetivo principal é fornecer uma base para apps de vidraçaria, incluindo um fluxo de solicitação de orçamento via WhatsApp.

## Estrutura e Arquitetura
- **Roteamento**: O diretório `app/` define as rotas. Arquivos `.tsx` são páginas, e subpastas criam rotas aninhadas. O arquivo `_layout.tsx` define o layout e navegação para cada grupo de rotas.
- **Componentes**: Componentes reutilizáveis ficam em `components/`, com subpastas para UI e temas. Exemplos:
  - `themed-text.tsx` e `themed-view.tsx`: componentes que adaptam cores ao tema (claro/escuro).
  - `ui/icon-symbol.tsx` e `icon-symbol.ios.tsx`: abstraem ícones nativos (SF Symbols) e Material Icons para multiplataforma.
  - `haptic-tab.tsx`: adiciona feedback háptico em abas no iOS.
- **Hooks**: Hooks customizados para tema e cor em `hooks/` (`use-color-scheme`, `use-theme-color`).
- **Temas**: Definições de cores e fontes em `constants/theme.ts`.
- **Imagens**: `assets/images/` contém ícones e imagens, com suporte a múltiplas densidades (`@2x`, `@3x`).

## Fluxos e Convenções
- **Solicitação de Orçamento**: O arquivo `app/(tabs)/index.tsx` implementa um formulário que envia dados via WhatsApp usando o link `https://wa.me/`.
- **Roteamento**: Use imports relativos a partir de `@/` (configurado em `tsconfig.json`).
- **Tema**: Sempre utilize os hooks e componentes themed para garantir suporte a dark/light mode.
- **Animações**: Use `react-native-reanimated` para animações (exemplo: `components/hello-wave.tsx`).
- **Colapsáveis**: Use `components/ui/collapsible.tsx` para seções expansíveis.

## Workflows de Desenvolvimento
- **Instalação**: `npm install`
- **Rodar o app**:
  - `npm start` ou `npx expo start` (abre menu interativo)
  - `npm run android`, `npm run ios`, `npm run web` para plataformas específicas
- **Resetar projeto**: `npm run reset-project` (executa `scripts/reset-project.js`)
- **Lint**: `npm run lint` (usa `eslint-config-expo`)
- **Debug web**: Use o launch config `.vscode/launch.json` para depurar no Chrome

## Integrações e Dependências
- **Navegação**: `@react-navigation/*`, `expo-router`
- **Ícones**: `@expo/vector-icons`, `expo-symbols`
- **Haptics**: `expo-haptics`
- **Imagens**: `expo-image`
- **Animações**: `react-native-reanimated`

## Padrões Específicos
- **Importação absoluta**: Use `@/` para acessar arquivos da raiz.
- **Componentes themed**: Sempre prefira `ThemedText`/`ThemedView` para textos e containers.
- **Mapeamento de ícones**: Adicione novos mapeamentos em `icon-symbol.tsx` para suportar ícones multiplataforma.
- **Configuração de tema**: Adicione novas cores/fontes em `constants/theme.ts`.

## Exemplos
- Para criar uma nova tela, adicione um arquivo `.tsx` em `app/` ou subpasta.
- Para adicionar um botão com feedback háptico, use `<HapticTab />`.
- Para links externos, use `<ExternalLink href="..." />`.

Consulte o `README.md` para instruções detalhadas de uso e links para a documentação do Expo.
