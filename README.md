# Portfólio Musical Interativo — Eduardo Lopes

Portfólio em que uma **guitarra 3D** (Three.js / React Three Fiber) é a navegação:
cada uma das seis cordas abre um projeto. As cordas vibram fisicamente e tocam a nota
real (afinação padrão), com som sintetizado na hora pela Web Audio API (Karplus-Strong),
sem arquivos de áudio.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Os 6 projetos (um por corda) | `src/data/projects.ts` |
| Tecnologias (pedais) | `src/data/skills.ts` |
| Trajetória e links de contato | `src/data/experience.ts` |
| Textos da seção Sobre | `src/sections/About/About.tsx` |
| Imagens dos projetos | coloque em `public/projects/` e use `image: '/projects/arquivo.webp'` |

> Os links de contato (GitHub, LinkedIn, e-mail) ainda são exemplos.

## Como a guitarra funciona

- `components/Guitar/dimensions.ts` — medidas reais de uma Strat (escala 25,5", trastes pela regra 2^(n/12)).
- `GuitarBody.tsx` — corpo, escudo, captadores, ponte, braço, trastes, headstock e tarraxas, modelados em código.
- `GuitarStrings.tsx` — cordas com onda estacionária (fundamental + 2º harmônico) e área de clique invisível.
- `textures.ts` — sunburst, jacarandá e maple gerados em canvas (nada para baixar).
- `hooks/useAudio.ts` — síntese da corda dedilhada.

Interação: clique/toque abre o projeto; arrastar por cima das cordas toca sem abrir.
No celular a guitarra fica em pé. Sem WebGL, os botões das cordas continuam funcionando.

## Acessibilidade

Botões das cordas acessíveis por teclado e leitor de tela, painel fecha com Esc, foco visível,
som opcional (lembrado entre visitas), `prefers-reduced-motion` desliga vibração e animação de entrada.
