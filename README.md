# ⚡ PokéDex — Challenge Técnico React

Aplicación Pokédex construida sobre [PokeAPI](https://pokeapi.co) como solución al Challenge Técnico de Desarrollador React. Permite explorar el catálogo completo, buscar y filtrar, ver el detalle de cada Pokémon, armar un equipo de hasta 6 integrantes y comparar estadísticas entre dos Pokémon, con **caché persistente** que permite seguir navegando datos ya consultados aun sin conexión.

- **Repositorio:** `https://github.com/pancho95/challenge-pokedex`
- **Demo:** `https://challenge-pokedex.vercel.app/`

---

## Tabla de contenidos

1. [Stack tecnológico](#stack-tecnológico)
2. [Instalación y ejecución](#instalación-y-ejecución)
3. [Funcionalidades](#funcionalidades)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Decisiones técnicas](#decisiones-técnicas)
6. [Limitaciones conocidas y mejoras futuras](#limitaciones-conocidas-y-mejoras-futuras)

---

## Stack tecnológico

| Área                 | Tecnología                  | Versión instalada |
| -------------------- | --------------------------- | ----------------- |
| UI                   | React                       | 18.3.1            |
| Bundler / dev server | Vite                        | 5.4.x             |
| Estado global        | Redux Toolkit + react-redux | 2.13.0 / 9.3.0    |
| Capa de datos        | RTK Query (incluido en RTK) | 2.13.0            |
| Persistencia         | redux-persist               | 6.0.0             |
| Ruteo                | React Router                | 6.30.x            |
| Estilos              | styled-components           | 6.6.0             |
| Formularios          | Formik + Yup                | 2.4.9 / 1.7.1     |
| Lenguaje             | JavaScript (sin TypeScript) | —                 |
| Calidad de código    | ESLint (flat config)        | 8.57.x            |

---

## Instalación y ejecución

### Requisitos previos

- **Node.js 18 o superior** (recomendado: 20 LTS)
- **npm** 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/pancho95/challenge-pokedex.git
cd pokedex-challenge

# 2. Instalar dependencias
npm install
```

```bash
# 3. Crear el archivo .env en la raíz del proyecto con la URL base de la API
echo "VITE_POKEMON_API_ENDPOINT=https://pokeapi.co/api/v2/" > .env
```

> En Windows (PowerShell) también funciona el mismo comando. Alternativamente, creá manualmente un archivo llamado `.env` con ese contenido.

```bash
# 4. Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en **http://localhost:5173**.

### Variables de entorno

| Variable                    | Descripción                         | Valor                        |
| --------------------------- | ----------------------------------- | ---------------------------- |
| `VITE_POKEMON_API_ENDPOINT` | URL base de PokeAPI (con `/` final) | `https://pokeapi.co/api/v2/` |

> ⚠️ El archivo `.env` está en el `.gitignore` y no se versiona, por eso es necesario crearlo al clonar el proyecto. Sin esta variable, las peticiones no tienen URL base y la app no carga datos. Tras cambiar el `.env`, reiniciá `npm run dev`.

### Scripts disponibles

| Comando           | Descripción                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR          |
| `npm run build`   | Build de producción en `dist/`          |
| `npm run preview` | Sirve localmente el build de producción |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto        |
| `npm run test`    | Ejecuta los Tests del proyecto          |

---

## Funcionalidades

### 🏠 Catálogo (`/`)

- **Infinite scroll** con `IntersectionObserver`: se renderizan 40 Pokémon y se amplía el lote al acercarse al final de la lista.
- **Carga progresiva de imágenes**: spinner como placeholder + `loading="lazy"` hasta que la imagen termina de cargar.
- Cada tarjeta muestra **sprite, nombre, número (`#001`) y tipos** con badges de colores por tipo.
- **Skeletons** (12 tarjetas) durante la carga inicial.
- **Buscador en tiempo real** por nombre o número, con **debounce de 300 ms**.
- **Filtros combinables** por **tipo** (18 tipos) y **generación** (1 a 9).
- **Filtros persistentes en la URL** (`/?search=char&type=fire&gen=1`), por lo que cualquier búsqueda se puede compartir o recargar.
- Botón "Limpiar filtros" y mensaje cuando no hay resultados.
- **Manejo de errores de red** con botón **"Reintentar conexión"**.

### 🔎 Detalle (`/pokemon/:idPokemon`)

- Imagen principal (ilustración oficial) y **galería de sprites alternativos**: frontal, trasera, shiny frontal y shiny trasera.
- **Estadísticas base con barras de progreso** (con atributos ARIA `progressbar`) y total acumulado.
- Tipos, **habilidades** (identificando las ocultas) y datos físicos: **altura, peso** y experiencia base.
- Botón para agregar/quitar del equipo.
- Ante un error de carga, muestra el mensaje junto con un botón **"Reintentar"**.

### ⭐ Mi Equipo (`/team`)

- Agregar/quitar Pokémon desde el catálogo o el detalle.
- **Límite de 6 integrantes**, validado en el reducer y en la UI (con aviso al usuario).
- **Reordenamiento con drag & drop** (HTML5 Drag and Drop nativo).
- Contador `n / 6` y estado vacío con ilustración y botón hacia el catálogo.
- El equipo **persiste** entre sesiones. Al agregar un Pokémon se guarda siempre su ilustración oficial, sin importar el sprite seleccionado en la galería del detalle.

### ⚔️ Comparador (`/compare`)

- Formulario con **Formik + Yup** para elegir dos Pokémon con selector con búsqueda (`<input list>` + `<datalist>`).
- Validaciones: ambos campos requeridos, el valor debe ser un Pokémon existente y **no se puede comparar un Pokémon consigo mismo**.
- Vista de comparación con tarjetas de ambos Pokémon y **barras enfrentadas por cada estadística**, resaltando al ganador de cada una.
- Reutiliza el listado completo ya cacheado por el catálogo, sin una petición adicional.

### 🌐 Experiencia de usuario y modo offline

- **Caché persistente**: los datos consultados sobreviven al refresh del navegador y se muestran sin conexión.
- **Indicador Online/Offline** permanente en el header.
- **Indicador de sincronización** en el catálogo: _Cargando…_, _Actualizando datos frescos…_ o _Datos desde caché_.
- **Toasts** al agregar/remover del equipo y al alcanzar el límite de 6.
- **Responsive**: grilla de 4 → 2 → 1 columnas, y ajustes específicos en navbar, buscador, detalle y comparador.
- Ruta `404` para URLs inexistentes.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── AppRoutes.jsx          # Router y definición de rutas
│   └── store.js               # configureStore + redux-persist
├── components/
│   ├── PokemonCard/           # Tarjeta reutilizable (catálogo, equipo, comparador)
│   ├── PokemonCardSkeleton/   # Placeholder de carga
│   └── common/                # Navbar, SearchFilter, Toast, Grid, SyncStatusIndicator, PokeballSpinner
├── features/
│   └── pokemon/pokemonSlice.js   # Slice de favoritos / equipo
├── hooks/
│   └── usePokemonFilter.js    # Combina URL + queries + filtrado (usado por Home y Compare)
├── pages/                     # Home, Detail, Team, Compare (cada una con sus estilos)
├── services/                  # baseApi + endpoints RTK Query por dominio
├── utils/                     # Colores de tipos, traducciones, generaciones
├── App.jsx
└── main.jsx                   # Provider + PersistGate
```

---

## Decisiones técnicas

### 1. RTK Query como única capa de acceso a datos

Toda la comunicación con PokeAPI pasa por RTK Query. Se definió **una única `baseApi`** (`createApi` + `fetchBaseQuery`) y los endpoints se agregan por dominio mediante `injectEndpoints`, evitando un archivo monolítico y manteniendo un solo reducer y middleware en el store.

| Archivo               | Endpoints                                                                            |
| --------------------- | ------------------------------------------------------------------------------------ |
| `pokemonListApi.js`   | `getPokemons` (listado), `getPokemonsByGen` (generación), `getPokemonsByType` (tipo) |
| `pokemonDetailApi.js` | `getPokemonDetail` (detalle)                                                         |

- **`transformResponse`**:
  - Los listados se normalizan a `{ id, name, sprite }`. El `id` se extrae de la URL del recurso y el sprite apunta a la ilustración oficial, evitando una petición de detalle por cada elemento solo para obtener la imagen.
  - El detalle **descarta la mayor parte de la respuesta** de `pokemon/{id}` (que incluye cientos de movimientos, juegos e historiales) y conserva solo lo que la UI usa: `id`, `name`, `types`, `sprites`, `stats`, `abilities`, `height`, `weight` y `base_experience`. Esto reduce el uso de memoria y, sobre todo, el peso de lo que se persiste en `localStorage`.
- **Caché automático y deduplicación**: RTK Query reutiliza la respuesta si se vuelve a pedir el mismo recurso con los mismos argumentos y comparte una única petición entre componentes que la solicitan a la vez.
- **`keepUnusedDataFor`**: se configuró un valor global de **300 s** (los listados cambian muy poco) y uno específico de **60 s** para el detalle, que es más voluminoso y se consulta de forma más puntual. Así se equilibra memoria y número de peticiones.
- **Tags (`providesTags`)**: cada endpoint declara qué recursos provee, usando los `tagTypes` `Pokemon` y `Type`:
  - el listado provee un tag por Pokémon más un tag `LIST`;
  - el detalle provee `{ type: "Pokemon", id }`;
  - el filtro por generación provee `GEN_{n}` y el de tipo provee `{ type: "Type", id }`.

  De esta forma cada recurso queda identificado y puede invalidarse de forma selectiva (por ejemplo con `baseApi.util.invalidateTags`) sin descartar todo el caché. Por ahora, la recarga ante errores se resuelve con `refetch()` sobre la consulta que falló, ya que la API es de solo lectura y no existen mutaciones que invaliden datos (ver mejoras futuras).

### 2. Estrategia de listado: una petición cacheada + paginación en cliente

PokeAPI **no ofrece búsqueda parcial por nombre** ni permite combinar filtros de tipo y generación. Por eso:

1. El catálogo completo se pide **una sola vez** (`pokemon?limit=1302`), se cachea y se normaliza.
2. La **búsqueda por nombre o número** se aplica localmente sobre esa lista, lo que la hace instantánea y no genera tráfico por cada tecla.
3. El **infinite scroll** es de presentación: se incrementa un contador `visibleCount` en lotes de 40 cuando el `IntersectionObserver` detecta el final de la lista (`rootMargin: 50px`).

Para los filtros se usa el endpoint más específico disponible: `type/{nombre}` cuando hay tipo y `generation/{id}` cuando solo hay generación. Si se combinan, el tipo define el conjunto base y la generación se aplica con rangos de ID por generación, junto con la búsqueda de texto.

### 3. La URL como fuente de verdad de los filtros

Búsqueda, tipo y generación viven en los **query params** (`useSearchParams`) y no en estado local. Esto permite compartir enlaces, usar el botón "atrás" con sentido y recuperar los filtros al recargar.

- El **debounce de 300 ms** se aplica al escribir en el input; el estado local del campo se sincroniza con la URL.
- Se usa `{ replace: true }` para no llenar el historial con una entrada por cada filtro o cambio.
- El hook `usePokemonFilter` centraliza la lectura de los parámetros, la selección de la query activa (con `skip` para no disparar peticiones innecesarias) y el filtrado, y expone también `refetch` para el botón de reintento. `Home` solo se ocupa de renderizar. El comparador reutiliza el mismo hook para obtener el listado completo, compartiendo la misma entrada de caché que el catálogo.

### 4. Tipos en las tarjetas del catálogo

El listado base no incluye los tipos. Cada tarjeta los resuelve consultando `getPokemonDetail` con `skip` cuando ya los recibe por props. Como el detalle queda cacheado y deduplicado por RTK Query, abrir luego el detalle de ese Pokémon (o volver a verlo en el listado) no genera una nueva petición. Solo se piden los tipos de las tarjetas que efectivamente se renderizan gracias al infinite scroll.

### 5. Persistencia del caché y rehidratación del store

Es la decisión central de la aplicación para soportar el uso offline. Se integró **redux-persist con RTK Query** de la siguiente manera:

- **Store (`store.js`)**: se combinan el reducer de RTK Query y el slice de favoritos, y se envuelve el reducer raíz con `persistReducer`, usando **`localStorage`** como almacenamiento y una **`whitelist: ["favorites", baseApi.reducerPath]`**. Así se persisten tanto el equipo del usuario como el caché de las consultas.
- **Rehidratación (`baseApi.js`)**: se configuró `extractRehydrationInfo` en `createApi`. Cuando redux-persist dispara la acción `REHYDRATE`, el estado guardado de la API se entrega a RTK Query, que lo recupera como si fuera un caché ya poblado. Gracias a esto, los datos consultados **sobreviven al refresh del navegador** y se muestran sin pedirse de nuevo.
- **`PersistGate`** (`main.jsx`): la aplicación no se renderiza hasta completar la rehidratación, evitando parpadeos o consultas innecesarias antes de que el caché esté disponible.
- **`serializableCheck`**: se ignoran las acciones de redux-persist (`FLUSH`, `REHYDRATE`, `PAUSE`, `PERSIST`, `PURGE`, `REGISTER`) para evitar advertencias falsas.
- **Control del tamaño**: como `localStorage` tiene una cuota limitada (~5 MB), el `transformResponse` del detalle recorta la respuesta antes de que llegue al store (ver sección 1).

### 6. Favoritos / "Mi Equipo": slice propio y persistido

- El equipo vive en un **slice independiente** (`favorites`) con tres acciones: `addToTeam`, `removeFromTeam` y `reorderTeam`.
- La regla de **máximo 6** y la prevención de duplicados se aplican en el **reducer** (fuente de verdad), y además se comprueban en la UI para mostrar un toast explicativo.
- Se guarda un objeto normalizado `{ id, name, sprite, types }`, suficiente para renderizar la tarjeta del equipo sin volver a consultar la API (funciona también sin conexión).

### 7. Indicadores de estado de red y de datos

- **Conexión:** el `Navbar` escucha los eventos `online`/`offline` y muestra un badge permanente en el header.
- **Datos frescos vs. caché:** en el catálogo, un indicador usa `isLoading` / `isFetching` de RTK Query para informar si se están pidiendo datos o si se muestran los ya cacheados.

### 8. Manejo de errores

Los estados de error de red del catálogo y del detalle muestran un mensaje claro y un **botón de reintento** que ejecuta `refetch()` sobre la consulta activa, sin necesidad de recargar la página. Gracias al caché persistente, los datos ya consultados siguen disponibles aunque la red falle.

### 9. Estilos con styled-components

- Cada componente/página tiene su archivo `*.styles.js`, manteniendo la lógica y la presentación separadas.
- Se usan **transient props** (`$isFavorite`, `$typeName`, `$imageLoaded`…) para que las props de estilo no se propaguen al DOM.
- Los **colores de tipos**, sus nombres en español y las etiquetas de estadísticas se centralizan en `utils/pokemonColors.js`, evitando duplicación entre catálogo, detalle y comparador.
- El diseño responsive se resuelve con `grid` y media queries (breakpoints en 480, 600, 768 y 900 px).

### 10. Formularios con Formik + Yup

El comparador define un esquema Yup que valida que ambos campos existan, que el nombre pertenezca a la lista real de Pokémon (obtenida vía RTK Query) y que el segundo **no sea igual al primero** (`notOneOf([Yup.ref("pokemon1")])`). El botón de envío se deshabilita mientras el formulario es inválido o se están cargando los datos. Al enviar, se disparan dos consultas de detalle que reutilizan el caché si el Pokémon ya había sido consultado.

### 11. Accesibilidad y detalles de UX

Barras de estadísticas con `role="progressbar"`, `aria-pressed` en botones de alternancia, `alt` descriptivos, `prefers-reduced-motion` respetado en las animaciones del detalle y toasts con auto-cierre de 5 s y barra de progreso.

---

## Limitaciones conocidas y mejoras futuras

Mejoras identificadas, ordenadas por prioridad:

**Experiencia de usuario**

1. **Mejorar la interfaz del comparador** (jerarquía visual, selector con búsqueda más rico como `react-select`) y sumar un **gráfico radar** (`recharts`) para la comparación.
2. **Virtualización** de la lista (`react-window`) para listas muy largas, y paginación del lado del servidor si se quisiera evitar cargar el listado completo.
3. Reordenamiento táctil del equipo con `@dnd-kit` (el drag & drop nativo HTML5 no funciona bien en móviles).

**Calidad y mantenimiento**

4. Extraer un componente reutilizable para los estados de error con reintento (hoy el botón se repite con estilos en línea en Home y Detail) y un componente de estado vacío.
