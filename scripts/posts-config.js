// Configuración de posts del blog
// Cada vez que agregues un nuevo post, añádelo aquí

window.postsConfig = [
    {
        slug: 'identificar-oportunidades',
        title: 'Cómo Identificar Oportunidades Que Otros No Ven',
        date: '2025-11-17T00:00:00',
        description: 'Guía rápida para identificar oportunidades, emprender con velocidad, y convertir ideas en negocios reales.',
        icon: '⚡'
    },
    {
        slug: 'roi-ia-pymes',
        title: 'ROI de IA: Lo Que Las PYMEs Necesitan Saber',
        date: '2025-10-15T00:00:00',
        description: 'Comprende el retorno de inversión real al implementar soluciones de inteligencia artificial en pequeñas y medianas empresas. Casos prácticos y métricas clave.',
        icon: '📈'
    },
    {
        slug: 'mitos-data-science',
        title: 'Mitos de Data Science Desmentidos',
        date: '2025-10-10T00:00:00',
        description: 'Separando realidad de ficción en el mundo de la ciencia de datos y analítica para líderes empresariales que buscan tomar decisiones informadas.',
        icon: '🧠'
    }
];

// IMPORTANTE: Los posts se muestran en el orden en que aparecen aquí
// Para agregar un nuevo post:
// 1. Agrega un nuevo objeto al array con toda la información
// 2. Crea el archivo .md correspondiente en la carpeta posts/
// 3. El slug debe coincidir con el nombre del archivo (sin la extensión)

// Nota: la variable global se llama `postsConfig` para compatibilidad
// con las páginas que la consumen directamente desde el navegador.