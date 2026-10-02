// ==================================================
// TU LISTA — Formato: [icono, ruta, título, descripción, etiquetas, idGo]
// ==================================================
const paginas = [
    ["musica", "musica", "Música", "Disfruta de la mejor música, canciones y melodías de todos los géneros.", "musica, canciones, melodias, sonido, audio", "S100"],
    ["juegos", "juegos-friv", "Juegos Friv", "Los mejores juegos en línea para divertirte sin descargas, gratis y seguro.", "juegos, friv, entretenimiento, diversion, juegos online", "S123"],
    ["lectura", "libros", "Libros y Lectura", "Cuentos, novelas, conocimientos y lecturas para todas las edades.", "libros, lectura, aprender, cuentos, educacion", "S200"],
    ["video", "videos", "Videos", "Mira videos, películas y contenido entretenido en un solo lugar.", "videos, peliculas, ver, entretenimiento, streaming", "S300"],
    ["herramientas", "herramientas", "Herramientas", "Utilidades prácticas para tu día a día.", "herramientas, utilidades, recursos, ayuda, practico", "S400"],
    ["comida", "recetas", "Recetas de Cocina", "Platos deliciosos, recetas fáciles y consejos de gastronomía.", "comida, recetas, cocina, gastronomia, platos", "S500"],
    // Agrega más:
    // ["icono", "ruta", "Título", "Descripción", "etiquetas", "Sxxx"]
];

// ==================================================
// PALABRAS DE RELLENO — se ignoran en la búsqueda
// ==================================================
const PALABRAS_RELLENO = new Set([
    "de", "la", "el", "los", "las", "un", "una", "y", "a", "en", "que",
    "del", "al", "se", "es", "son", "lo", "le", "me", "te", "nos", "por",
    "con", "sin", "para", "como", "su", "sus", "mi", "tu", "o", "ya", "más"
]);

// ==================================================
// ICONOS SVG
// ==================================================
const iconos = {
    musica: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>`,
    juegos: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>`,
    lectura: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
    video: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
    herramientas: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    comida: `<svg class="icon-svg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    defecto: `<svg class="icon-svg text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg>`
};

let historial = [];
let indiceHistorial = -1;

// ==================================================
// NORMALIZACIÓN — quita tildes, mayúsculas, signos
// ==================================================
function normalizar(texto) {
    return texto.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[.,;:!?]/g, "")
        .trim()
        .replace(/\s+/g, " ");
}

// ==================================================
// FILTRAR PALABRAS DE RELLENO
// ==================================================
function limpiarPalabras(texto) {
    return normalizar(texto)
        .split(" ")
        .filter(palabra => palabra.length > 0 && !PALABRAS_RELLENO.has(palabra))
        .filter((p, i, arr) => arr.includes(p)); // quita duplicados
}

// ==================================================
// IR A SECCIÓN go:Sxxx
// ==================================================
function irGo(idGo) {
    const pag = paginas.find(p => p[5] === idGo);
    if (pag) abrirPaginaPorRuta(pag[1]);
}

// ==================================================
// PÁGINA DE INICIO — SOLO icono + título
// ==================================================
function mostrarInicio() {
    document.getElementById("browser-url").value = "";
    const cont = document.getElementById("browser-content");
    cont.innerHTML = `
        <div class="py-6">
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    <svg class="icon-svg-lg text-win-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <h2 class="text-xl font-semibold mb-2">Bienvenido</h2>
                <p class="text-gray-500 text-sm mb-6">Selecciona una página o busca algo arriba</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                ${paginas.map(pag => `
                    <div class="p-4 rounded-lg bg-gray-50 hover:bg-win-lightBlue cursor-pointer transition-colors border border-transparent hover:border-win-blue/20"
                         onclick="irGo('${pag[5]}')">
                        <div class="flex justify-center mb-3 text-gray-600">
                            ${iconos[pag[0]] || iconos.defecto}
                        </div>
                        <h3 class="font-semibold text-center text-sm">${pag[2]}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ==================================================
// BÚSQUEDA INTELIGENTE — SOLO título + etiquetas, sin relleno
// ==================================================
function buscar() {
    const entrada = document.getElementById("browser-url").value.trim();
    
    // Si es go:Sxxx directo
    const matchGo = entrada.match(/^go:([A-Za-z0-9]+)$/i);
    if (matchGo) {
        irGo(matchGo[1]);
        return;
    }
    
    if (!entrada) {
        mostrarInicio();
        return;
    }

    // Quita palabras de relleno antes de buscar
    const palabrasClave = limpiarPalabras(entrada);
    
    // Si todo eran palabras de relleno → muestra todo
    if (palabrasClave.length === 0) {
        mostrarInicio();
        return;
    }
    
    // 🔍 SOLO busca en TÍTULO y ETIQUETAS
    const resultados = paginas.filter(pag => {
        const buscarEn = normalizar(`${pag[2]} ${pag[4]}`);
        return palabrasClave.some(palabra => buscarEn.includes(palabra));
    });

    // Historial
    if (indiceHistorial < historial.length - 1) historial = historial.slice(0, indiceHistorial + 1);
    historial.push(entrada);
    indiceHistorial = historial.length - 1;
    actualizarBotones();

    const cont = document.getElementById("browser-content");

    if (resultados.length === 0) {
        cont.innerHTML = `
            <div class="py-10 text-center max-w-md mx-auto">
                <svg class="icon-svg-lg mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <h3 class="font-bold text-lg mb-2">Sin resultados</h3>
                <p class="text-sm text-gray-600 mb-4">No se encontró: "${entrada}"</p>
                <button onclick="mostrarInicio()" class="text-win-blue underline text-sm">Volver al inicio</button>
            </div>
        `;
        return;
    }

    // Resultados
    cont.innerHTML = `
        <div class="py-4 max-w-2xl mx-auto">
            <div class="space-y-4">
                ${resultados.map(pag => `
                    <div class="resultado p-3 rounded-lg cursor-pointer transition-colors"
                         onclick="irGo('${pag[5]}')">
                        <div class="flex items-start gap-3">
                            <div class="mt-1 flex-shrink-0">${iconos[pag[0]] || iconos.defecto}</div>
                            <div>
                                <div class="text-win-url text-xs mb-1">${pag[1]}/</div>
                                <h3 class="text-win-link text-lg font-medium hover:underline mb-1">${pag[2]}</h3>
                                <p class="text-gray-600 text-sm leading-relaxed">${pag[3]}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="mt-6">
                <button onclick="mostrarInicio()" class="text-win-blue underline text-sm">← Volver al inicio</button>
            </div>
        </div>
    `;
}

// ==================================================
// ABRIR PÁGINA
// ==================================================
function abrirPaginaPorRuta(ruta) {
    const pag = paginas.find(p => p[1] === ruta);
    if (!pag) return;

    document.getElementById("browser-url").value = pag[2];
    
    const cont = document.getElementById("browser-content");
    cont.innerHTML = `
        <div class="py-4 max-w-2xl mx-auto">
            <div class="mb-6">
                <div class="flex items-start gap-3 mb-3">
                    <div>${iconos[pag[0]] || iconos.defecto}</div>
                    <div>
                        <div class="text-win-url text-xs mb-1">${pag[1]}/</div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">${pag[2]}</h2>
                    </div>
                </div>
                <p class="text-gray-700 leading-relaxed mb-4">${pag[3]}</p>
            </div>
            <button onclick="mostrarInicio()" class="text-win-blue underline text-sm">← Volver al inicio</button>
        </div>
    `;
    
    if (indiceHistorial < historial.length - 1) historial = historial.slice(0, indiceHistorial + 1);
    historial.push(pag[2]);
    indiceHistorial = historial.length - 1;
    actualizarBotones();
}

// ==================================================
// NAVEGACIÓN
// ==================================================
function irAtras() {
    if (indiceHistorial > 0) {
        indiceHistorial--;
        document.getElementById("browser-url").value = historial[indiceHistorial];
        buscar();
    }
}
function irAdelante() {
    if (indiceHistorial < historial.length - 1) {
        indiceHistorial++;
        document.getElementById("browser-url").value = historial[indiceHistorial];
        buscar();
    }
}
function actualizarBotones() {
    document.getElementById("btn-back").style.opacity = indiceHistorial > 0 ? "1" : "0.4";
    document.getElementById("btn-forward").style.opacity = indiceHistorial < historial.length - 1 ? "1" : "0.4";
}

// Eventos
document.getElementById("btn-back").addEventListener("click", irAtras);
document.getElementById("btn-forward").addEventListener("click", irAdelante);
document.getElementById("btn-refresh").addEventListener("click", buscar);
document.getElementById("browser-url").addEventListener("keydown", e => {
    if (e.key === "Enter") buscar();
});

// Iniciar
mostrarInicio();
