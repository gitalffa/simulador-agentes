# 🤖 Simulador de Agentes IA

Proyecto de aprendizaje de JavaScript vanilla que simula un debate entre agentes de inteligencia artificial con personalidades distintas, usando la API de Claude (Anthropic).

## ✨ ¿Qué hace?

1. El usuario escribe un tema a debatir
2. Se crean 5 agentes con personalidades distintas
3. Cada agente opina sobre el tema desde su perspectiva
4. Un moderador genera un resumen final del debate

## 👥 Agentes

| Agente | Perfil |
|---|---|
| 👩‍🎓 Ana | Estudiante universitaria, práctica y directa |
| 👨‍💼 Carlos | Profesionista de 35 años, analítico y cauteloso |
| 🧑‍🎨 Luna | Artista joven, creativa e idealista |
| 👴 Don Roberto | Jubilado de 65 años, tradicional y experimentado |
| 👩‍💻 Sofía | Desarrolladora de software, lógica y escéptica |

## 🛠️ Tecnologías

- HTML5 semántico con BEM
- CSS3 con variables personalizadas (dark mode)
- JavaScript vanilla (ES6+)
- API de Claude (Anthropic) — modelo `claude-haiku-4-5`
- Fuentes: Syne + Space Mono (Google Fonts)

## 🚀 Cómo usarlo

1. Clona el repositorio:
```bash
git clone https://github.com/gitalffa/simulador-agentes.git
cd simulador-agentes
```

2. Abre `app.js` y reemplaza `TU_API_KEY_AQUI` con tu API key de Anthropic:
```javascript
const API_KEY = "sk-ant-...";
```

3. Obtén tu API key en: https://console.anthropic.com/settings/keys

4. Abre el proyecto con un servidor local:
```bash
npx serve .
```

5. Abre `http://localhost:3000` en tu navegador

## ⚠️ Importante

Nunca subas tu API key a GitHub. El archivo `app.js` incluye el placeholder `TU_API_KEY_AQUI` — reemplázalo localmente pero no lo commitees.

## 💡 Conceptos de JS practicados

- `fetch()` y `async/await`
- Manipulación del DOM con `createElement` y `appendChild`
- Arrays y objetos JSON
- `forEach` y `for...of`
- Template literals
- `addEventListener`
- Manejo del historial de conversación para APIs de LLM

## 👨‍💻 Autor

Fabricio Galindo — [LinkedIn](https://www.linkedin.com/in/fabricio-galindo-copado/) — [GitHub](https://github.com/gitalffa)

Proyecto desarrollado durante el bootcamp de TripleTen como ejercicio de aprendizaje de JavaScript.
