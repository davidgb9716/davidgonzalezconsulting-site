// Configuración de posts del blog
// Cada vez que agregues un nuevo post, añádelo aquí

window.postsConfig = [
    {
        slug: 'errores-costosos-emprendimiento',
        title: 'Errores Costosos Que Cometí en Mi Primer Año (Y Cómo Evitarlos)',
        date: '2025-12-31T00:00:00',
        description: 'Una reflexión sobre los errores, aprendizajes, y sacrificios de mi primer año emprendiendo: desde fallas en marketing y ventas hasta el síndrome del impostor, y cómo cada tropiezo me llevó a crecer personal y profesionalmente.',
        icon: '📈'
    },
    {
        slug: 'habito-diario',
        title: 'El Hábito Diario Que Transformó Mi Negocio',
        date: '2025-12-02T00:00:00',
        description: 'Un artículo que explora el poder transformador de la consistencia, cómo influye en el crecimiento personal y profesional, y por qué pequeñas mejoras diarias pueden multiplicar tus resultados a largo plazo.',
        icon: '🧠'
    },
    {
        slug: 'identificar-oportunidades',
        title: 'Cómo Identificar Oportunidades Que Otros No Ven',
        date: '2025-11-17T00:00:00',
        description: 'Guía rápida para identificar oportunidades, emprender con velocidad, y convertir ideas en negocios reales.',
        icon: '⚡'
    },
];

// IMPORTANTE: Los posts se muestran en el orden en que aparecen aquí
// Para agregar un nuevo post:
// 1. Agrega un nuevo objeto al array con toda la información
// 2. Crea el archivo .md correspondiente en la carpeta posts/
// 3. El slug debe coincidir con el nombre del archivo (sin la extensión)

// Nota: la variable global se llama `postsConfig` para compatibilidad
// con las páginas que la consumen directamente desde el navegador.