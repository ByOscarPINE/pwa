const container = document.querySelector("#coffee-container") || document.querySelector(".container");
const modal = document.getElementById("coffee-modal");
const toastContainer = document.getElementById("toast-container");
const cartBadge = document.getElementById("cart-count");

let cartTotalItems = 0;

// Lista de cafés con información rica y detallada
const coffees = [
  {
    id: "espresso",
    name: "Espresso Italiano",
    tag: "Clásico Intenso",
    price: "$45 MXN",
    basePrice: 45,
    image: "images/01-espresso.jpg",
    description: "Un café concentrado, potente y coronado con una capa aterciopelada de crema dorada.",
    origin: "Coatepec, Veracruz (1,250 msnm)",
    variety: "100% Arábica Typica",
    roast: "Tueste Oscuro Napolitano",
    intensity: 5,
    temperature: "90°C - 92°C",
    extraction: "Espresso en 25 - 30 segundos a 9 bares de presión",
    ingredients: "18g de café molido fino, 36ml de agua pura purificada",
    notes: ["Chocolate amargo", "Caramelo tostado", "Nuez de castaña"],
    pairing: "Biscotti de almendra o bombón de chocolate amargo 70%.",
    highlights: [
      "Extracción a 9 bares de presión constante",
      "Crema densa, persistente y atigrada",
      "Cero acidez estridente, final prolongado a cacao"
    ],
    fullDescription: "El Espresso es el alma de nuestra cafetería. Se elabora calibrando la molienda cada mañana para asegurar una extracción limpia y balanceada. Con cuerpo denso y una capa sedosa de crema color avellana, ofrece la dosis de energía y sabor que los amantes del café puro buscan."
  },
  {
    id: "cappuccino",
    name: "Cappuccino Cremoso",
    tag: "Favorito de la Casa",
    price: "$60 MXN",
    basePrice: 60,
    image: "images/02-cappuccino.jpg",
    description: "Equilibrio sublime de espresso con leche vaporizada y una nube de microespuma sedosa.",
    origin: "Huatusco, Veracruz & Chiapas",
    variety: "Arábica Bourbon & Caturra",
    roast: "Tueste Medio",
    intensity: 3,
    temperature: "65°C - 68°C",
    extraction: "Doble espresso + vaporizado de leche a 65°C",
    ingredients: "60ml de espresso doble, 120ml de leche fresca texturizada con microespuma",
    notes: ["Cacao dulce", "Vainilla suave", "Avellana cremosa"],
    pairing: "Croissant clásico de mantequilla o panqué de plátano.",
    highlights: [
      "Microespuma texturizada al estilo barista italiano",
      "Espolvoreado con cacao orgánico de Tabasco",
      "Temperatura perfecta para resaltar los azúcares naturales de la leche"
    ],
    fullDescription: "Nuestro Cappuccino respeta religiosamente la regla de los tercios: un tercio de espresso de especialidad, un tercio de leche vaporizada y un tercio de espuma sedosa y consistente. Cada sorbo envuelve el paladar en una textura aterciopelada sin perder la presencia del buen café."
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee Cold Brew",
    tag: "Refrescante 16h",
    price: "$58 MXN",
    basePrice: 58,
    image: "images/03-iced-coffee.jpg",
    description: "Extracción artesanal en frío durante 16 horas servido con abundante hielo cristalino.",
    origin: "Pluma Hidalgo, Oaxaca",
    variety: "Pluma Hidalgo (Typica Seleccionado)",
    roast: "Tueste Medio Claro",
    intensity: 4,
    temperature: "Servido frío a 4°C",
    extraction: "Inmersión lenta en frío de 16 horas en cámara refrigerada",
    ingredients: "Café de molienda gruesa macerado en frío, filtrado doble, hielos cúbicos",
    notes: ["Frutos rojos", "Caramelo suave", "Cítrico brillante y limpio"],
    pairing: "Cheesecake de frutos silvestres o brownie frío.",
    highlights: [
      "Baja acidez hasta un 65% menor que el café caliente",
      "Sabor dulce natural sin necesidad de añadir azúcar",
      "Máximo frescor para los días soleados"
    ],
    fullDescription: "Preparado meticulosamente por inmersión fría durante 16 horas seguidas. Este método permite que se liberen únicamente los compuestos aromáticos dulces y afrutados del grano, reduciendo la astringencia y ofreciendo una bebida cristalina, refrescante y con un empuje energético limpio."
  },
  {
    id: "coffee-beans",
    name: "Granos Selección Especial (250g)",
    tag: "Café en Grano o Molido",
    price: "$140 MXN",
    basePrice: 140,
    image: "images/04-coffee-beans.jpg",
    description: "Bolsa de 250g con granos de café de altura tostados semanalmente para máxima frescura.",
    origin: "Sierra Sur, Oaxaca (1,450 msnm)",
    variety: "Bourbon y Geisha Silvestre",
    roast: "Tueste Artesanal Medio",
    intensity: 4,
    temperature: "Conservar a temperatura ambiente en lugar fresco",
    extraction: "Molido al momento según tu cafetera favorita",
    ingredients: "100% Café en grano arábica de estricta altura con válvula desgasificadora",
    notes: ["Miel de azahar", "Chocolate con leche", "Mandarina dulce"],
    pairing: "Perfecto para preparar tus desayunos en casa con pan rústico.",
    highlights: [
      "Tostado reciente con fecha de tueste visible en empaque",
      "Válvula de frescura unidireccional y cierre hermético",
      "Molienda personalizada gratuita si lo deseas"
    ],
    fullDescription: "Lleva el sabor de Cafecito Chido a tu cocina. Seleccionamos cosechas de pequeños productores bajo sombra, garantizando un tueste artesanal en pequeños lotes que resalta notas acarameladas y florales. Disponible en grano entero para que disfrutes molerlo en casa o molido al punto exacto para tu método preferido."
  },
  {
    id: "french-press",
    name: "Prensa Francesa",
    tag: "Cuerpo Completo",
    price: "$55 MXN",
    basePrice: 55,
    image: "images/05-french-press.jpg",
    description: "Método de inmersión total que retiene aceites esenciales y ofrece un sabor robusto.",
    origin: "Tapachula, Chiapas (1,150 msnm)",
    variety: "Catimor y Maragogype",
    roast: "Tueste Medio Oscuro",
    intensity: 4,
    temperature: "92°C al servir",
    extraction: "Inmersión total de 4 minutos con émbolo de malla fina",
    ingredients: "22g de café molido grueso, 350ml de agua caliente a 92°C",
    notes: ["Nuez tostada", "Especias dulces", "Chocolate amargo"],
    pairing: "Muffin de mora azul o tarta rústica de manzana con canela.",
    highlights: [
      "Sin filtros de papel: conserva todos los aceites saludables del grano",
      "Textura untuosa y presencia plena en el paladar",
      "Tiempo exacto de cronometrado para evitar sobreextracción"
    ],
    fullDescription: "La prensa francesa es el método preferido de quienes disfrutan una taza de café densa, opaca y colmada de aroma. La ausencia de filtros de papel permite que los aceites y micropartículas aromáticas pasen intactos a tu taza, logrando un cuerpo generoso y reconfortante."
  },
  {
    id: "turkish-coffee",
    name: "Café Turco Especiado",
    tag: "Herencia Milenaria",
    price: "$50 MXN",
    basePrice: 50,
    image: "images/06-turkish-coffee.jpg",
    description: "Café con molienda ultrafina cocinado en cezve de cobre tradicional con un toque de cardamomo.",
    origin: "Mezcla de Altura Etiopía & Veracruz",
    variety: "Arábica Heirloom y Typica",
    roast: "Tueste Medio Tostado en Arena",
    intensity: 5,
    temperature: "95°C recién espumado",
    extraction: "Decocción lenta tradicional en 'cezve' de cobre martillado",
    ingredients: "Café molido como polvo de talco, agua caliente, semilla de cardamomo",
    notes: ["Cardamomo aromático", "Dátiles", "Cacao oscuro especiado"],
    pairing: "Delicias turcas (Lokum), higos secos o baklava de pistache.",
    highlights: [
      "Preparado siguiendo el método reconocido por la UNESCO",
      "Espuma dorada espesa e inconfundible",
      "Aromatizado naturalmente con semillas de cardamomo verde"
    ],
    fullDescription: "Una ceremonia ancestral en cada taza. El café se muele tan fino que parece talco y se hierve lentamente en una jarrita de cobre tradicional llamada cezve. Al no colarse, los posos se asientan lentamente en el fondo de la taza, regalando una bebida densa, aromática y con gran mística."
  },
  {
    id: "latte-art",
    name: "Caffè Latte con Arte",
    tag: "Textura Aterciopelada",
    price: "$65 MXN",
    basePrice: 65,
    image: "images/07-latte-art.jpg",
    description: "Espresso suave armonizado con abundante leche texturizada y decorado a mano por el barista.",
    origin: "Jaltenango, Chiapas",
    variety: "Mondo Novo y Caturra",
    roast: "Tueste Medio Suave",
    intensity: 2,
    temperature: "62°C - 65°C",
    extraction: "Espresso simple con vertido libre de microespuma (Free Pour)",
    ingredients: "35ml de espresso de especialidad, 210ml de leche emulsionada sedosa",
    notes: ["Crema de leche", "Vainilla dulce", "Toffee suave"],
    pairing: "Galleta artesanal red velvet o alfajor de maicena.",
    highlights: [
      "Diseño único vertido a mano libre en cada taza",
      "Equilibrio lácteo dulce y amable con el estómago",
      "Espuma ultrasedosa con microburbujas imperceptibles"
    ],
    fullDescription: "El lienzo del barista. Un shot de espresso suave y bien extraído se une a una generosa cantidad de leche texturizada con precisión térmica. El vertido se realiza con técnica artística creando tulipanes, rosetas o corazones en la superficie, logrando una bebida visualmente cautivadora y deliciosa."
  },
  {
    id: "americano",
    name: "Caffè Americano Clásico",
    tag: "Ligero y Puro",
    price: "$45 MXN",
    basePrice: 45,
    image: "images/08-americano.jpg",
    description: "Espresso doble alargado con agua caliente purificada, manteniendo intacta la crema dorada.",
    origin: "Atoyac de Álvarez, Guerrero",
    variety: "Arábica Typica de Sombra",
    roast: "Tueste Medio",
    intensity: 3,
    temperature: "85°C - 88°C",
    extraction: "Espresso doble servido directamente sobre agua filtrada caliente",
    ingredients: "60ml de espresso doble, 180ml de agua caliente a 88°C",
    notes: ["Cacao tostado", "Nuez pecana", "Sutil toque a cáscara de naranja"],
    pairing: "Bagel tostado con queso crema o sándwich rústico.",
    highlights: [
      "Preparado estilo Long Black para conservar la crema intacta",
      "Suavidad en boca sin perder el sabor auténtico del café",
      "Bebida perfecta para acompañar el trabajo y estudio"
    ],
    fullDescription: "Para quienes buscan la riqueza del espresso pero desean una bebida más larga y tranquila. Añadimos agua purificada a la temperatura justa para evitar quemar los aromas nobles del grano, logrando un balance perfecto de notas tostadas y una agradable ligereza al paladar."
  },
  {
    id: "pour-over",
    name: "Pour Over V60 Artesanal",
    tag: "Método de Goteo",
    price: "$58 MXN",
    basePrice: 58,
    image: "images/09-pour-over.jpg",
    description: "Filtrado manual por goteo con cono Hario V60 que resalta los matices florales más sutiles.",
    origin: "Finca Chelín, Sierra Sur de Oaxaca (1,600 msnm)",
    variety: "Geisha & Typica Lavado",
    roast: "Tueste Claro Nórdico",
    intensity: 3,
    temperature: "91°C con tetera cuello de cisne",
    extraction: "Filtrado en cono V60 de papel japonés durante 3 minutos y 15 segundos",
    ingredients: "20g café molienda media, 320ml de agua pura mineralizada",
    notes: ["Jazmín blanco", "Durazno maduro", "Miel de flores", "Lima fresca"],
    pairing: "Panqué cítrico de limón o tarta tibia de pera.",
    highlights: [
      "Extracción artesanal por vertido circular continuo",
      "Claridad y transparencia cristalina en taza",
      "Ideal para catar los perfiles más complejos y afrutados"
    ],
    fullDescription: "La máxima expresión de la tercera ola del café. Con un cono Hario V60 estriado en espiral y una tetera cuello de cisne, el barista vierte agua con precisión milimétrica sobre la cama de café. El resultado es una taza excepcionalmente limpia, sedosa, aromática y con una acidez cítrica deslumbrante."
  },
  {
    id: "mocha",
    name: "Café Mocha con Cacao",
    tag: "Delicia Dulce",
    price: "$68 MXN",
    basePrice: 68,
    image: "images/10-mocha.jpg",
    description: "Café espresso combinado con ganache artesanal de cacao amargo y leche vaporizada.",
    origin: "Chiapas & Cacao Criollo de Tabasco",
    variety: "Arábica Bourbon & Cacao Real 70%",
    roast: "Tueste Medio",
    intensity: 3,
    temperature: "68°C",
    extraction: "Espresso doble fusionado en caliente con salsa de cacao puro",
    ingredients: "Espresso doble, 30g de chocolate artesanal derretido, 150ml de leche entera",
    notes: ["Chocolate semiamargo", "Canela criolla", "Vainilla bourbon", "Toffee"],
    pairing: "Brownie caliente con nueces o galletas crujientes de avena.",
    highlights: [
      "Elaborado con cacao criollo mexicano 100% natural",
      "Equilibrio insuperable entre el amargor del café y la suntuosidad del chocolate",
      "Coronado con ligera espuma de leche y virutas de chocolate"
    ],
    fullDescription: "El postre hecho café. Una armoniosa y golosa combinación de ganache de cacao criollo elaborado en casa, espresso recién extraído y leche suavemente vaporizada. Cada trago es un abrazo cálido que equilibra el estímulo del café con la indulgencia del mejor chocolate."
  }
];

// Generar las tarjetas en la vista principal
const showCoffees = () => {
  if (!container) return;
  
  let output = "";
  coffees.forEach(({ id, name, tag, price, image, description, origin }) => {
    output += `
      <article class="card" data-id="${id}" tabindex="0" role="button" aria-label="Ver detalles de ${name}">
        <div class="card-img-wrapper">
          <img class="card-img" src="${image}" alt="${name}" loading="lazy" />
          <span class="card-tag">${tag}</span>
          <span class="card-price-badge">${price}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <span class="card-origin">📍 ${origin.split("(")[0].trim()}</span>
          <p class="card-description">${description}</p>
          <button class="btn btn-add" data-id="${id}" type="button">
            <span class="btn-icon">＋</span>
            <span>Agregar</span>
          </button>
        </div>
      </article>
    `;
  });

  container.innerHTML = output;

  // Asignar eventos de click a cada tarjeta y al botón "Agregar"
  const cards = container.querySelectorAll(".card");
  cards.forEach((card) => {
    const coffeeId = card.getAttribute("data-id");

    // Click en la tarjeta o en el botón "Agregar" abre la pantalla completa
    card.addEventListener("click", (e) => {
      openCoffeeDetail(coffeeId);
    });

    // Accesibilidad por teclado (Enter / Espacio)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCoffeeDetail(coffeeId);
      }
    });
  });
};

// Generar visualización de estrellas / intensidad
const renderIntensityIndicator = (intensity) => {
  let dots = "";
  for (let i = 1; i <= 5; i++) {
    dots += i <= intensity ? "●" : "○";
  }
  return dots;
};

// Abrir vista en pantalla completa con información detallada
const openCoffeeDetail = (coffeeId) => {
  const coffee = coffees.find((c) => c.id === coffeeId);
  if (!coffee || !modal) return;

  const notesHtml = coffee.notes
    .map((note) => `<span class="note-pill">✦ ${note}</span>`)
    .join("");

  const highlightsHtml = coffee.highlights
    .map((item) => `<li><span style="color: var(--brand-primary); font-weight: bold;">✔</span> ${item}</li>`)
    .join("");

  // Estructura completa de la vista a tamaño completo de la página
  modal.innerHTML = `
    <!-- Barra superior fija con botón de regreso -->
    <header class="modal-header-bar">
      <button class="btn-back" id="btn-modal-back" type="button" aria-label="Volver al menú">
        <span>←</span>
        <span>Volver al menú</span>
      </button>
      <span class="modal-header-title">Detalles de Selección</span>
      <button class="btn-close-modal" id="btn-modal-close" type="button" aria-label="Cerrar detalles">✕</button>
    </header>

    <!-- Contenido enriquecido con toda la información del café -->
    <div class="modal-content-container">
      <div class="detail-layout">
        
        <!-- Columna Izquierda: Imagen destacada y puntos clave -->
        <div class="detail-visual-col">
          <div class="detail-img-box">
            <img class="detail-img" src="${coffee.image}" alt="${coffee.name}" />
            <span class="detail-img-badge">${coffee.tag}</span>
            <span class="detail-price-tag" id="detail-display-price">${coffee.price}</span>
          </div>

          <div class="detail-highlights">
            <h4>☕ Puntos Clave de Calidad</h4>
            <ul>
              ${highlightsHtml}
            </ul>
          </div>
        </div>

        <!-- Columna Derecha: Información completa, fichas y personalizador -->
        <div class="detail-info-col">
          <div class="detail-heading-block">
            <div class="detail-tagline">${coffee.variety}</div>
            <h2 class="detail-title">${coffee.name}</h2>
            <div class="detail-rating-row">
              <span class="intensity-stars" title="Intensidad ${coffee.intensity} de 5">
                ${renderIntensityIndicator(coffee.intensity)}
              </span>
              <span class="intensity-label">Intensidad: <strong>${coffee.intensity}/5</strong></span>
              <span class="intensity-label">| Tueste: <strong>${coffee.roast}</strong></span>
            </div>
          </div>

          <p class="detail-full-story">${coffee.fullDescription}</p>

          <!-- Ficha Técnica de Especificaciones -->
          <div>
            <h3 class="specs-title">Ficha Técnica & Preparación</h3>
            <div class="specs-grid">
              <div class="spec-card">
                <div class="spec-icon">🌍</div>
                <div class="spec-name">Origen y Región</div>
                <div class="spec-value">${coffee.origin}</div>
              </div>
              <div class="spec-card">
                <div class="spec-icon">🔥</div>
                <div class="spec-name">Nivel de Tueste</div>
                <div class="spec-value">${coffee.roast}</div>
              </div>
              <div class="spec-card">
                <div class="spec-icon">⏱️</div>
                <div class="spec-name">Extracción</div>
                <div class="spec-value">${coffee.extraction}</div>
              </div>
              <div class="spec-card">
                <div class="spec-icon">🌡️</div>
                <div class="spec-name">Temperatura Ideal</div>
                <div class="spec-value">${coffee.temperature}</div>
              </div>
              <div class="spec-card">
                <div class="spec-icon">🥛</div>
                <div class="spec-name">Proporciones</div>
                <div class="spec-value">${coffee.ingredients}</div>
              </div>
              <div class="spec-card">
                <div class="spec-icon">🥐</div>
                <div class="spec-name">Maridaje Recomendado</div>
                <div class="spec-value">${coffee.pairing}</div>
              </div>
            </div>
          </div>

          <!-- Notas de cata -->
          <div class="notes-container">
            <h4 class="notes-title">Notas de Cata & Perfil Sensorial</h4>
            <div class="notes-pills">
              ${notesHtml}
            </div>
          </div>

          <!-- Módulo Interactivo: Personalizar y Confirmar Agregar -->
          <div class="order-customizer-box">
            <h3 class="customizer-title">
              <span>Personaliza tu café antes de agregar</span>
            </h3>

            <!-- Selector de tamaño -->
            <div class="options-group">
              <label>Selecciona el Tamaño:</label>
              <div class="size-selector" id="size-selector">
                <button type="button" class="size-btn active" data-extra="0" data-label="Chico (8 oz)">Chico (8 oz)</button>
                <button type="button" class="size-btn" data-extra="12" data-label="Mediano (12 oz)">Mediano (+ $12)</button>
                <button type="button" class="size-btn" data-extra="20" data-label="Grande (16 oz)">Grande (+ $20)</button>
              </div>
            </div>

            <!-- Tipo de leche -->
            <div class="options-group">
              <label for="milk-option">Tipo de Leche / Base:</label>
              <select class="custom-select" id="milk-option">
                <option value="entera">Leche Entera Cremosa</option>
                <option value="deslactosada">Leche Deslactosada</option>
                <option value="avena">Bebida de Avena (+ $10)</option>
                <option value="almendra">Bebida de Almendra (+ $10)</option>
                <option value="ninguna">Sin leche (Café Negro)</option>
              </select>
            </div>

            <!-- Nivel de endulzante -->
            <div class="options-group">
              <label for="sweetener-option">Endulzante:</label>
              <select class="custom-select" id="sweetener-option">
                <option value="sin-azucar">Sin endulzante (Recomendado)</option>
                <option value="mascabado">Azúcar mascabado orgánico</option>
                <option value="miel-agave">Miel de agave natural</option>
                <option value="stevia">Stevia</option>
              </select>
            </div>

            <!-- Cantidad y Botón de Acción -->
            <div class="action-row">
              <div class="quantity-stepper">
                <button type="button" class="stepper-btn" id="qty-minus" aria-label="Disminuir cantidad">−</button>
                <span class="stepper-value" id="qty-display">1</span>
                <button type="button" class="stepper-btn" id="qty-plus" aria-label="Aumentar cantidad">＋</button>
              </div>

              <button type="button" class="btn-confirm-add" id="btn-confirm-order">
                <span>Confirmar y Agregar</span>
                <strong id="btn-total-price">(${coffee.price})</strong>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // Variables interactivas para el cálculo de precio
  let currentQuantity = 1;
  let currentSizeExtra = 0;
  let currentMilkExtra = 0;

  const updateCalculatedPrice = () => {
    const singleUnitPrice = coffee.basePrice + currentSizeExtra + currentMilkExtra;
    const totalPrice = singleUnitPrice * currentQuantity;
    const displayTotal = `$${totalPrice} MXN`;

    const btnTotal = modal.querySelector("#btn-total-price");
    const displayPriceTag = modal.querySelector("#detail-display-price");
    if (btnTotal) btnTotal.textContent = `(${displayTotal})`;
    if (displayPriceTag) displayPriceTag.textContent = `$${singleUnitPrice} MXN`;
  };

  // Botones de tamaño
  const sizeBtns = modal.querySelectorAll(".size-btn");
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentSizeExtra = parseInt(btn.getAttribute("data-extra"), 10) || 0;
      updateCalculatedPrice();
    });
  });

  // Selector de leche (adicionales de avena / almendra)
  const milkSelect = modal.querySelector("#milk-option");
  if (milkSelect) {
    milkSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "avena" || val === "almendra") {
        currentMilkExtra = 10;
      } else {
        currentMilkExtra = 0;
      }
      updateCalculatedPrice();
    });
  }

  // Stepper de cantidad
  const minusBtn = modal.querySelector("#qty-minus");
  const plusBtn = modal.querySelector("#qty-plus");
  const qtyDisplay = modal.querySelector("#qty-display");

  if (minusBtn && plusBtn && qtyDisplay) {
    minusBtn.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        qtyDisplay.textContent = currentQuantity;
        updateCalculatedPrice();
      }
    });

    plusBtn.addEventListener("click", () => {
      if (currentQuantity < 20) {
        currentQuantity++;
        qtyDisplay.textContent = currentQuantity;
        updateCalculatedPrice();
      }
    });
  }

  // Confirmar y agregar
  const confirmBtn = modal.querySelector("#btn-confirm-order");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      cartTotalItems += currentQuantity;
      if (cartBadge) {
        cartBadge.textContent = cartTotalItems;
        cartBadge.classList.add("bump");
        setTimeout(() => cartBadge.classList.remove("bump"), 300);
      }

      showToast(`¡${currentQuantity}x ${coffee.name} agregado a tu orden! ☕`);

      // Breve efecto de confirmación en el botón
      confirmBtn.innerHTML = `<span>✔ ¡Agregado con Éxito!</span>`;
      confirmBtn.style.backgroundColor = "var(--success-color)";
      setTimeout(() => {
        closeCoffeeDetail();
      }, 700);
    });
  }

  // Eventos para cerrar la pantalla completa
  const backBtn = modal.querySelector("#btn-modal-back");
  const closeBtn = modal.querySelector("#btn-modal-close");
  if (backBtn) backBtn.addEventListener("click", closeCoffeeDetail);
  if (closeBtn) closeBtn.addEventListener("click", closeCoffeeDetail);

  // Mostrar modal a tamaño completo de la pantalla
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.scrollTop = 0;

  // Registrar en el historial de navegación para permitir cerrar con botón "Atrás" del móvil
  window.history.pushState({ modalOpen: true, coffeeId }, "", `#cafe-${coffeeId}`);
};

// Cerrar vista en pantalla completa
const closeCoffeeDetail = () => {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // Si la URL tiene el hash del café, limpiar sin recargar
  if (window.location.hash.startsWith("#cafe-")) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
};

// Notificación emergente Toast
const showToast = (message) => {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-icon">✨</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, 3200);
};

// Cerrar con la tecla Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeCoffeeDetail();
  }
});

// Soporte para botón "Atrás" del navegador / smartphone
window.addEventListener("popstate", (e) => {
  if (modal && modal.classList.contains("active")) {
    closeCoffeeDetail();
  }
});

// Inicializar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  showCoffees();

  // Si se abre con un hash existente (ej. #cafe-espresso), abrir automáticamente
  if (window.location.hash.startsWith("#cafe-")) {
    const coffeeId = window.location.hash.replace("#cafe-", "");
    openCoffeeDetail(coffeeId);
  }
});

// Registro de Service Worker para PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then((reg) => {
        console.log("Service Worker registrado con éxito:", reg.scope);
      })
      .catch((error) => {
        console.error("No se pudo registrar el service worker:", error);
      });
  });
}

