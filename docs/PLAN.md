# Plano do Portfólio Aurora Hospital

Meta: em ~8 semanas (6 a 8 h/semana), publicar a biblioteca **Aurora UI** no npm, um Storybook público e um site de vitrine com playground de tema e painel hospitalar de demonstração. Cada fase termina com o repositório no ar e funcionando.

> Cópia do plano original no Claude. Marque as tarefas aqui com `[x]` conforme avançar.

## Fase 0 · Fundação (semana 1)
- [x] Criar o repositório público `aurora-ui` no GitHub, com README inicial em inglês
- [x] Gerar o workspace Angular com a biblioteca `aurora-ui` e o app `showcase`
- [x] Configurar ESLint, Prettier e Jest
- [x] Instalar e configurar o Storybook com o addon de acessibilidade (a11y)
- [x] Criar o GitHub Actions rodando lint, testes e build a cada push

Pronto quando: o CI fica verde e o Storybook abre localmente.

## Fase 1 · Tokens e temas (semana 2)
- [x] Usar `design/tokens/` dentro da biblioteca
- [x] Script que gera `tokens.css` (variáveis CSS para tema claro e escuro)
- [x] `ThemeService` com Signal para alternar `data-theme` e lembrar a escolha
- [x] Carregar as fontes Bricolage Grotesque, Figtree e IBM Plex Mono
- [x] Páginas no Storybook: Cores, Tipografia, Espaçamento

Pronto quando: trocar o tema muda todas as cores do Storybook.

## Fase 2 · Componentes base (semana 3)
- [x] Icon (39 ícones curados, SVG inline — ver decisão sobre `lucide-angular` abaixo)
- [x] Button: primary, secondary, ghost, danger, só ícone, desabilitado
- [x] StatusPill: critical, warning, stable, info
- [x] Para cada um: teste Jest, story e zero erros de acessibilidade

Pronto quando: os 3 passam na Definição de Pronto (CLAUDE.md).

## Fase 3 · Formulários e feedback (semana 4)
- [ ] TextField com Reactive Forms (`ControlValueAccessor`), estados de ajuda e erro
- [ ] AlertBanner: critical e info, com ação de confirmar
- [ ] OccupancyMeter: três faixas de ocupação e `role="meter"`

Pronto quando: um formulário de exemplo valida e mostra erros acessíveis.

## Fase 4 · Componentes clínicos (semanas 5 e 6)
- [ ] VitalSign com sparkline SVG, valor por Signal e estado fora da faixa
- [ ] BedCard com faixa de status, leito livre e dados resumidos
- [ ] Serviço de dados fictícios com RxJS (`interval`) simulando sinais vitais ao vivo

Pronto quando: um VitalSign atualiza sozinho no Storybook sem os números "pularem".

## Fase 5 · Vitrine (semana 7)
- [ ] Home com a identidade Aurora, componentes reais e trechos de código
- [ ] Playground de tema: cor principal, arredondamento, densidade, claro/escuro, ao vivo
- [ ] Tela demo: painel de ocupação da Ala 4B só com componentes da biblioteca
- [ ] Página "Case study" em inglês: problema real, decisões de design, arquitetura, resultado

Pronto quando: alguém entende o projeto em 30 segundos na home.

## Fase 6 · Publicação e polimento (semana 8)
- [ ] Publicar a biblioteca no npm (ex.: `@aurora-hospital/ui`)
- [ ] Deploy da vitrine e do Storybook com links públicos
- [ ] README em inglês com GIF, links, decisões de arquitetura e como rodar
- [ ] Auditoria: Lighthouse acima de 90 e zero erros de acessibilidade
- [ ] Links no currículo, no LinkedIn e repositório fixado no GitHub

Pronto quando: os três links funcionam e estão no currículo.

## Em paralelo
- [ ] Semana 1: preencher os campos em amarelo do currículo
- [ ] Semanas 1-2: LinkedIn em inglês
- [ ] Todo dia: 30 min de inglês (conversação)
- [ ] Semana 7 em diante: começar candidaturas com o Storybook no ar
- [ ] Semanas 6-8: treinar a apresentação do projeto em inglês (2 minutos)
