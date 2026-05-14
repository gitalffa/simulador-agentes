//========== CONFIGURACION ==========
const API_KEY = "TU_API_KEY_AQUI";
const API_URL = "https://api.anthropic.com/v1/messages";
const MODELO = "claude-haiku-4-5-20251001";

//==============DEFINICION DE AGENTES ============
const AGENTES = [
  {
    nombre: "Ana",
    emoji: "👩‍🎓",
    perfil: "Estudiante universitaria, práctica y directa",
  },
  {
    nombre: "Carlos",
    emoji: "👨‍💼",
    perfil: "Profesionista de 35 años, analítico y cauteloso",
  },
  {
    nombre: "Luna",
    emoji: "🧑‍🎨",
    perfil: "Artista joven, creativa e idealista",
  },
  {
    nombre: "Don Roberto",
    emoji: "👴",
    perfil: "Jubilado de 65 años, tradicional y experimentado",
  },
  {
    nombre: "Sofía",
    emoji: "👩‍💻",
    perfil: "Desarrolladora de software, lógica y escéptica",
  },
];

// ===== REFERENCIAS AL DOM =====
const btnSimular = document.getElementById("btn-simular");
const textareaTema = document.getElementById("tema");
const seccionAgentes = document.getElementById("agentes");
const seccionDebate = document.getElementById("debate");
const seccionResumen = document.getElementById("resumen");

//==============FUNCION PARA LLAMAR A LA API ================

async function preguntarAgente(agente, tema, historial) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 200,
      system: `Eres ${agente.nombre}. Tu perfil es ${agente.perfil}.
      Responde siempre en español, de forma breve (máximo 3 oraciones),
      desde tu perspectiva personal. No uses listas ni titulos.`,
      messages: historial,
    }),
  });
  const datos = await respuesta.json();
  return datos.content[0].text;
}

//==========MOSTRAR AGENTES EN PANTALLA ==============

function mostrarAgentes() {
  seccionAgentes.innerHTML = "";

  AGENTES.forEach(function (agente) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("agente-card");

    tarjeta.innerHTML = `
    <div class="agente-card__emoji">${agente.emoji}</div>
    <div class="agente-card__nombre">${agente.nombre}</div>
    <div class="agente-card__perfil">${agente.perfil}</div>`;
    seccionAgentes.appendChild(tarjeta);
  });
}

//================MOSTRAR UN MENSAJE EN EL DEBATE =============

function mostrarMensaje(agente, texto) {
  const mensaje = document.createElement("div");
  mensaje.classList.add("mensaje");

  mensaje.innerHTML = `
  <div class="mensaje__header">
    <span class="mensaje__emoji">${agente.emoji}</span>
    <span class="mensaje__nombre">${agente.nombre}</span>
  </div>
  <p class="mensaje__texto">${texto}</p>`;

  seccionDebate.appendChild(mensaje);
  mensaje.scrollIntoView({ behavior: "smooth" });
}

// ===== MOSTRAR EL RESUMEN FINAL =====
function mostrarResumen(texto) {
  seccionResumen.innerHTML = `
    <h2 class="resumen__titulo">🧠 Resumen del debate</h2>
    <p class="resumen__texto">${texto}</p>
  `;
}

// ===== FUNCIÓN PRINCIPAL =====
async function iniciarSimulacion() {
  const tema = textareaTema.value.trim();

  if (tema === "") {
    alert("Por favor escribe un tema para debatir");
    return;
  }

  // Limpiar secciones anteriores
  seccionDebate.innerHTML = "";
  seccionResumen.innerHTML = "";

  // Deshabilitar botón mientras procesa
  btnSimular.disabled = true;
  btnSimular.textContent = "Simulando...";

  // Mostrar tarjetas de agentes
  mostrarAgentes();

  // Historial de la conversación
  const historial = [
    { role: "user", content: `El tema a debatir es: ${tema}` },
  ];

  // Cada agente opina
  for (const agente of AGENTES) {
    const texto = await preguntarAgente(agente, tema, historial);
    mostrarMensaje(agente, texto);

    // Agregar respuesta al historial alternando user/assistant
    historial.push({ role: "assistant", content: texto });
    historial.push({
      role: "user",
      content: `${agente.nombre} opina eso. ¿Tú qué piensas?`,
    });
  }

  // Generar resumen final
  const textoResumen = await preguntarAgente(
    {
      nombre: "Moderador",
      emoji: "🧠",
      perfil:
        "Eres un moderador imparcial. Tu única tarea es hacer un resumen objetivo de los puntos principales del debate sin dar tu propia opinión. No preguntes nada, solo resume.",
    },
    tema,
    historial,
  );
  mostrarResumen(textoResumen);

  // Rehabilitar botón
  btnSimular.disabled = false;
  btnSimular.textContent = "Iniciar simulación";
}

// ===== EVENTO DEL BOTÓN =====
btnSimular.addEventListener("click", iniciarSimulacion);
