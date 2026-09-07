/* =========================================================
   💗 DATOS DE LA BODA — EDITA SOLAMENTE ESTA PARTE
   ========================================================= */

const BODA = {
  novia: "Juan",
  novio: "Jessi",

  fechaBoda: "2026-10-17T12:00:00",
  fechaTexto: "17 · 10 · 2026",

  ceremonia: {
    hora: "12:00 PM",
    lugar: "Iglesia Encuentro con Dios",
    direccion: "Dirección de la ceremonia",
    mapa: "https://maps.app.goo.gl/vGVwhiEJa6qUYLoi8"
  },

  recepcion: {
    hora: "4:00 PM",
    lugar: "Salón El Mayo",
    direccion: "Dirección de la recepción",
    mapa: "https://maps.app.goo.gl/jqPcbL7X7roBsNRW9"
  },

  historia: "No nos estábamos buscando, pero nos encontramos.",

  vestimenta: {
    titulo: "Elegante",
    texto: "Nos encantará verte celebrar con nosotros. El código de vestimenta es elegante."
  },

  ninos: {
    titulo: "¡Dios ha sido bueno!",
    texto: "Queremos disfrutar este día rodeados de nuestras personas favoritas."
  },

  fraseFinal: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos... Cantares 8:7",

  musica: "musica/nuestra-cancion.mp3",

  itinerario: [
    { hora: "12:00 PM", titulo: "Ceremonia", detalle: "Uniremos nuestras vidas delante de Dios" },
    { hora: "4:00 PM", titulo: "Bienvenida", detalle: "Recibimiento de invitados" },
    { hora: "4:30 PM", titulo: "Entrada de los esposos", detalle: "Nuestro primer momento como esposos" },
    { hora: "4:30 PM", titulo: "Comida", detalle: "Un banquete para celebrar juntos" },
    { hora: "7:00 PM", titulo: "Canción", detalle: "¡Nuestra canción!" }
  ]
};

const FOTOS = {
  portada: "fotos/portada.jpg",
  historia1: "fotos/historia1.jpg",
  galeria1: "fotos/galeria1.jpg",
  galeria2: "fotos/galeria2.jpg",
  galeria3: "fotos/galeria3.jpg",
  galeria4: "fotos/galeria4.jpg",
  final: "fotos/final.jpg"
};

/* =========================================================
   NO NECESITAS EDITAR NADA DEBAJO DE ESTA LÍNEA
   ========================================================= */

const $ = (id) => document.getElementById(id);

function poner(id, texto) {
  const el = $(id);
  if (el) el.textContent = texto;
}

function aplicarDatos() {
  poner("introFecha", BODA.fechaTexto);
  poner("paperNovia", BODA.novia);
  poner("paperNovio", BODA.novio);
  poner("paperFecha", BODA.fechaTexto);

  poner("noviaHero", BODA.novia);
  poner("novioHero", BODA.novio);

  const partes = BODA.fechaTexto.split(/[·\-\/]/).map(x => x.trim());
  if (partes.length >= 3) {
    poner("diaHero", partes[0]);
    poner("mesHero", partes[1].toUpperCase());
    poner("anioHero", partes[2]);
  }

  poner("historiaTexto", BODA.historia);

  poner("ceremoniaHora", BODA.ceremonia.hora);
  poner("ceremoniaLugar", BODA.ceremonia.lugar);
  poner("ceremoniaDireccion", BODA.ceremonia.direccion);
  $("mapaCeremonia").href = BODA.ceremonia.mapa;

  poner("recepcionHora", BODA.recepcion.hora);
  poner("recepcionLugar", BODA.recepcion.lugar);
  poner("recepcionDireccion", BODA.recepcion.direccion);
  $("mapaRecepcion").href = BODA.recepcion.mapa;

  poner("vestimentaTitulo", BODA.vestimenta.titulo);
  poner("vestimentaTexto", BODA.vestimenta.texto);

  poner("ninosTexto", BODA.ninos.texto);
  const ninosTitulo = document.querySelector(".children h2");
  if (ninosTitulo) ninosTitulo.textContent = BODA.ninos.titulo;

  poner("fraseFinal", BODA.fraseFinal);
  poner("firmaFinal", `${BODA.novia} & ${BODA.novio}`);
  poner("footerNombres", `${BODA.novia} & ${BODA.novio}`);

  Object.entries(FOTOS).forEach(([key, src]) => {
    const id = "foto" + key.charAt(0).toUpperCase() + key.slice(1);
    const el = $(id);
    if (el) el.src = src;
  });

  $("musicaSource").src = BODA.musica;
  $("musica").load();

  const lista = $("itinerario");
  lista.innerHTML = BODA.itinerario.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-time">${item.hora}</div>
      <span class="timeline-dot"></span>
      <div class="timeline-content">
        <h3>${item.titulo}</h3>
        <p>${item.detalle}</p>
      </div>
    </div>
  `).join("");
}

let intervalo;

function iniciarContador() {
  const objetivo = new Date(BODA.fechaBoda).getTime();

  intervalo = setInterval(() => {
    const ahora = Date.now();
    let diferencia = objetivo - ahora;

    if (diferencia <= 0) {
      diferencia = 0;
      clearInterval(intervalo);
    }

    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    poner("dias", String(dias).padStart(2, "0"));
    poner("horas", String(horas).padStart(2, "0"));
    poner("minutos", String(minutos).padStart(2, "0"));
    poner("segundos", String(segundos).padStart(2, "0"));
  }, 1000);
}

function prepararAnimaciones() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function prepararMusica() {
  const audio = $("musica");
  const btn = $("musicaBtn");

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.textContent = "❚❚";
      } else {
        audio.pause();
        btn.textContent = "♫";
      }
    } catch {
      alert("Sube primero tu canción a la carpeta musica y revisa el nombre en script.js.");
    }
  });
}

let yaAbierto = false;

function abrirInvitacion() {
  if (yaAbierto) return;
  yaAbierto = true;

  const envelope = $("envelope");
  const intro = $("intro");
  const pagina = $("pagina");
  const audio = $("musica");

  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("closed");
    pagina.classList.remove("hidden");
    window.scrollTo(0, 0);

    audio.play().then(() => {
      $("musicaBtn").textContent = "❚❚";
    }).catch(() => {
      $("musicaBtn").textContent = "♫";
    });
  }, 1400);
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarDatos();
  iniciarContador();
  prepararAnimaciones();
  prepararMusica();

  $("abrirBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    abrirInvitacion();
  });

  $("envelopeWrap").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirInvitacion();
    }
  });
});
