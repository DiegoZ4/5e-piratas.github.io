// SISTEMA DE EQUIPOS BALANCEADO PARA NIVEL 20
// Oro inicial: 3000 po para decisiones estratégicas

// Variables globales del sistema
let currentGold = 3000; // Oro inicial balanceado
let purchasedItems = [];
let currentFilter = 'all';
let currentRarity = 'all';
let currentSubfilter = 'all';
let currentSearchTerm = '';
let currentSortOrder = 'default';

// SISTEMA DE PRECIOS ESTRATÉGICO:
// COMÚN: 25-90 po (16 objetos máximo = ~1000 po)
// POCO COMÚN: 120-200 po (8 objetos máximo = ~1400 po)  
// RARO: 250-500 po (4 objetos máximo = ~1400 po)
// ÉPICO: 600-900 po (2 objetos máximo = ~1600 po)
// LEGENDARIO: 1000-1500 po (1 objeto máximo)

// BASE DE DATOS UNIFICADA - 120 ITEMS TOTAL
const equipmentDatabase = [
    // ======================================
    // === LEGENDARIOS (40 items) ===
    // ======================================
    
    // === 5 ARMAS LEGENDARIAS ===
    {
        id: 'kraken_slayer',
        name: '<i class="fas fa-trident"></i> Tridente de las Profundidades',
        price: 1200,
        rarity: 'legendary',
        description: 'Tridente místico forjado en las fosas abisales del océano con metales antiguos.',
        effect: '+3 al ataque y daño. Inflige 2d8 de daño psíquico adicional. Control Mental vs bestias marinas (TS Sabiduría CD 18, 1/día)',
        category: 'weapons',
        objectType: 'Arma Marcial',
        weaponCategory: 'Armas marciales',
        range: 'Cuerpo a cuerpo',
        alcance: '20/60',
        damageType: 'perforante',
        damage: '1d6',
        weight: '4 lb',
        properties: ['Versátil', 'Arrojadiza']
    },
        {
            id: 'soul_reaper',
            name: '<i class="fas fa-skull"></i> Segadora de Almas',
            price: 1500,
            rarity: 'legendary',
            description: 'Sable que devora las almas de los enemigos caídos, volviéndose más poderoso.',
            effect: '+3 al ataque y daño. Inflige 2d6 de daño necrótico adicional. Al matar: acumula +1d6 necrótico permanente (máx 3d6)',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '3 lb',
            properties: ['Sutil', 'Ligera']
        },

        // === ARMAS ÉPICAS (4 opciones) ===
        {
            id: 'storm_caller',
            name: '<i class="fas fa-bolt"></i> Invocatormenta',
            price: 800,
            rarity: 'epic',
            description: 'Espada que canaliza el poder de las tormentas.',
            effect: '+2 al ataque y daño. Inflige 1d8 de daño eléctrico adicional. Invocar Rayo 1/día (TS Destreza CD 15, 6d6 eléctrico)',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '3 lb',
            properties: ['Sutil', 'Ligera']
        },
        {
            id: 'leviathan_fang',
            name: '<i class="fas fa-dagger"></i> Daga de Marfil Marino',
            price: 700,
            rarity: 'epic',
            description: 'Daga tallada en marfil de ballena ancestral.',
            effect: '+2 al ataque y daño. Inflige 2d6 de daño de veneno adicional. Ventaja en ataques contra criaturas marinas',
            category: 'weapons',
            objectType: 'Arma Simple',
            weaponCategory: 'Armas sencillas',
            range: 'Cuerpo a cuerpo',
            alcance: '20/60',
            damageType: 'perforante',
            damage: '1d4',
            weight: '1 lb',
            properties: ['Sutil', 'Ligera', 'Arrojadiza']
        },
        {
            id: 'phoenix_cutlass',
            name: '<i class="fas fa-fire"></i> Alfanje Llameante',
            price: 900,
            rarity: 'epic',
            description: 'Espada encantada que arde con fuego eterno.',
            effect: '+2 al ataque y daño. Inflige 1d6 de daño de fuego adicional. Renacimiento: el portador revive con 1 PV (1/día)',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '3 lb',
            properties: ['Sutil', 'Ligera']
        },
        {
            id: 'void_harpoon',
            name: '<i class="fas fa-dot-circle"></i> Arpón del Vacío',
            price: 850,
            rarity: 'epic',
            description: 'Lanza que puede atravesar dimensiones.',
            effect: '+2 al ataque y daño. Inflige 1d8 de daño de fuerza adicional. Ataque certero 1/día (acierto automático, ignora cobertura)',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            alcance: '30/120',
            damageType: 'perforante',
            damage: '1d6',
            weight: '3 lb',
            properties: ['Arrojadiza', 'Versátil']
        },

        // === ARMAS RARAS (6 opciones) ===
        {
            id: 'tsunami_breaker',
            name: '<i class="fas fa-waves"></i> Rompetsunami',
            price: 400,
            rarity: 'rare',
            description: 'Martillo que controla las fuerzas del océano.',
            effect: '+1 al ataque y daño. Inflige 1d6 de daño de fuerza adicional. Onda de choque 1/día (cono de 15 pies, TS Fuerza CD 13, 3d6 fuerza)',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'contundente',
            damage: '1d10',
            weight: '10 lb',
            properties: ['Pesada', 'A dos manos']
        },
        {
            id: 'cursed_cutlass',
            name: '<i class="fas fa-skull"></i> Alfanje Maldito',
            price: 350,
            rarity: 'rare',
            description: 'Alfanje que se alimenta de sangre enemiga.',
            effect: '+1 al ataque y daño. Al hacer daño, el portador recupera 1d4 puntos de golpe',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '3 lb',
            properties: ['Sutil', 'Ligera']
        },
        {
            id: 'sea_serpent_whip',
            name: '<i class="fas fa-rope"></i> Látigo de Algas Encantadas',
            price: 320,
            rarity: 'rare',
            description: 'Látigo trenzado con algas mágicas del fondo marino.',
            effect: '+1 al ataque y daño. Ventaja en intentos de agarrar con este látigo',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d4',
            weight: '3 lb',
            properties: ['Sutil', 'Alcance']
        },
        {
            id: 'bone_crossbow',
            name: '<i class="fas fa-crosshairs"></i> Ballesta de Ébano',
            price: 450,
            rarity: 'rare',
            description: 'Ballesta tallada en madera de ébano reforzado con acero.',
            effect: '+1 al ataque y daño. Los ataques ignoran media cobertura',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'A distancia',
            alcance: '100/400',
            damageType: 'perforante',
            damage: '1d10',
            weight: '18 lb',
            properties: ['Munición', 'Pesada', 'A dos manos', 'Recarga']
        },
        {
            id: 'tidal_spear',
            name: '<i class="fas fa-waves"></i> Lanza de Marea',
            price: 380,
            rarity: 'rare',
            description: 'Lanza imbuida con poder de mareas.',
            effect: '+1 al ataque y daño. 3/día: al impactar, empuja al enemigo 10 pies',
            category: 'weapons',
            objectType: 'Arma Simple',
            weaponCategory: 'Armas sencillas',
            range: 'Cuerpo a cuerpo',
            alcance: '20/60',
            damageType: 'perforante',
            damage: '1d6',
            weight: '3 lb',
            properties: ['Arrojadiza', 'Versátil']
        },
        {
            id: 'coral_mace',
            name: '<i class="fas fa-anchor"></i> Maza de Coral',
            price: 290,
            rarity: 'rare',
            description: 'Maza de coral que sigue creciendo.',
            effect: '+1 al ataque y daño. 1/día: obtiene +2 CA por 1 minuto',
            category: 'weapons',
            objectType: 'Arma Simple',
            weaponCategory: 'Armas sencillas',
            range: 'Cuerpo a cuerpo',
            damageType: 'contundente',
            damage: '1d4',
            weight: '4 lb',
            properties: ['Ligera']
        },

        // === ARMAS POCO COMUNES (8 opciones) ===
        {
            id: 'sailors_sabre',
            name: '<i class="fas fa-sword"></i> Sable de Marinero',
            price: 150,
            rarity: 'uncommon',
            description: 'Sable de un marinero experimentado.',
            effect: '+1 al ataque y daño. Ventaja en ataques contra piratas y marines',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '3 lb',
            properties: ['Sutil', 'Ligera']
        },
        {
            id: 'shark_tooth_dagger',
            name: '<i class="fas fa-fish"></i> Daga Diente de Tiburón',
            price: 120,
            rarity: 'uncommon',
            description: 'Daga tallada con diente de tiburón gigante.',
            effect: '+1 al ataque y daño. Al impactar: 1d4 de sangrado al inicio de cada turno del objetivo durante 2 turnos',
            category: 'weapons',
            objectType: 'Arma Simple',
            weaponCategory: 'Armas sencillas',
            range: 'Cuerpo a cuerpo',
            alcance: '20/60',
            damageType: 'perforante',
            damage: '1d4',
            weight: '1 lb',
            properties: ['Sutil', 'Ligera', 'Arrojadiza']
        },
        {
            id: 'storm_pistol',
            name: '<i class="fas fa-bolt"></i> Pistola de Tormenta',
            price: 200,
            rarity: 'uncommon',
            description: 'Pistola que dispara balas eléctricas.',
            effect: '+1 al ataque y daño. Inflige 1d4 de daño eléctrico adicional',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '30/90',
            damageType: 'perforante',
            damage: '1d10',
            weight: '3 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'flintlock_pistol',
            name: '<i class="fas fa-gun"></i> Pistola de Pedernal',
            price: 80,
            rarity: 'common',
            description: 'Pistola clásica de pirata con mecanismo de chispa.',
            effect: 'Arma de fuego básica. Confiable y letal a corta distancia',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '30/90',
            damageType: 'perforante',
            damage: '1d10',
            weight: '3 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'blunderbuss',
            name: '<i class="fas fa-shotgun"></i> Escopeta de Boca Ancha',
            price: 120,
            rarity: 'uncommon',
            description: 'Arma de cañón ancho que dispara perdigones devastadores.',
            effect: 'Ataque contra todas las criaturas en cono de 15 pies. Cada criatura debe hacer TS Destreza CD 13 o recibe el daño',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '15/30',
            damageType: 'perforante',
            damage: '2d8',
            weight: '10 lb',
            properties: ['Munición', 'Recarga', 'A dos manos']
        },
        {
            id: 'musket',
            name: '<i class="fas fa-rifle"></i> Mosquete',
            price: 90,
            rarity: 'common',
            description: 'Rifle largo usado por marines y soldados.',
            effect: 'Arma de fuego de largo alcance con gran potencia',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '40/120',
            damageType: 'perforante',
            damage: '1d12',
            weight: '10 lb',
            properties: ['Munición', 'Recarga', 'A dos manos']
        },
        {
            id: 'dual_pistols',
            name: '<i class="fas fa-guns"></i> Par de Pistolas Gemelas',
            price: 180,
            rarity: 'uncommon',
            description: 'Dos pistolas idénticas para combate con dos armas.',
            effect: 'Permite atacar con ambas pistolas usando acción adicional. +1 al ataque',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '30/90',
            damageType: 'perforante',
            damage: '1d10',
            weight: '6 lb',
            properties: ['Munición', 'Recarga', 'Ligera']
        },
        {
            id: 'hand_cannon',
            name: '<i class="fas fa-bomb"></i> Cañón de Mano',
            price: 450,
            rarity: 'rare',
            description: 'Pistola masiva con poder destructivo excepcional.',
            effect: '+1 al ataque y daño. En crítico, el objetivo debe superar TS Fuerza CD 15 o cae derribado',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '30/90',
            damageType: 'perforante',
            damage: '2d10',
            weight: '8 lb',
            properties: ['Munición', 'Recarga', 'Pesada']
        },
        {
            id: 'rifle_precision',
            name: '<i class="fas fa-crosshairs"></i> Rifle de Precisión',
            price: 400,
            rarity: 'rare',
            description: 'Rifle con mira telescópica para francotiradores.',
            effect: '+1 al ataque y daño. Ventaja en ataques contra objetivos a más de 60 pies',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '80/320',
            damageType: 'perforante',
            damage: '2d10',
            weight: '12 lb',
            properties: ['Munición', 'Recarga', 'A dos manos', 'Pesada']
        },
        {
            id: 'pepperbox',
            name: '<i class="fas fa-revolver"></i> Pepperbox Rotativo',
            price: 350,
            rarity: 'rare',
            description: 'Pistola con múltiples cañones rotativos.',
            effect: '+1 al ataque y daño. Puede disparar hasta 4 veces antes de recargar (usa 4 municiones)',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '30/90',
            damageType: 'perforante',
            damage: '1d10',
            weight: '5 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'dragon_pistol',
            name: '<i class="fas fa-dragon"></i> Pistola Dragón',
            price: 800,
            rarity: 'epic',
            description: 'Pistola de cañón acampanado que dispara perdigones incendiarios.',
            effect: '+2 al ataque y daño. Inflige 1d6 de daño de fuego adicional. Puede usarse como escopeta en cono de 10 pies',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '20/60',
            damageType: 'perforante',
            damage: '1d10',
            weight: '4 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'arquebus_thunder',
            name: '<i class="fas fa-cannon"></i> Arcabuz del Trueno',
            price: 900,
            rarity: 'epic',
            description: 'Arcabuz pesado que produce una onda de choque devastadora.',
            effect: '+2 al ataque y daño. Al disparar: criaturas en 20 pies del objetivo deben superar TS Fuerza CD 15 o son empujadas 10 pies hacia atrás',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '50/150',
            damageType: 'perforante',
            damage: '2d12',
            weight: '15 lb',
            properties: ['Munición', 'Recarga', 'A dos manos', 'Pesada']
        },
        {
            id: 'buccaneer_rifle',
            name: '<i class="fas fa-rifle"></i> Rifle Bucanero',
            price: 250,
            rarity: 'uncommon',
            description: 'Rifle ligero preferido por cazadores y exploradores.',
            effect: '+1 al ataque y daño. Ignora media cobertura',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '60/240',
            damageType: 'perforante',
            damage: '1d10',
            weight: '8 lb',
            properties: ['Munición', 'Recarga', 'A dos manos']
        },
        {
            id: 'sea_rifle',
            name: '<i class="fas fa-water"></i> Rifle Marino',
            price: 380,
            rarity: 'rare',
            description: 'Rifle tratado especialmente para resistir la humedad marina.',
            effect: '+1 al ataque y daño. No sufre penalizaciones por lluvia o humedad. Puede disparar bajo el agua a la mitad del alcance',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '50/200',
            damageType: 'perforante',
            damage: '1d12',
            weight: '9 lb',
            properties: ['Munición', 'Recarga', 'A dos manos']
        },
        {
            id: 'captains_pistol',
            name: '<i class="fas fa-crown"></i> Pistola del Capitán Legendario',
            price: 1400,
            rarity: 'legendary',
            description: 'Pistola ornamentada que perteneció al más grande capitán pirata de los mares.',
            effect: '+3 al ataque y daño. Crítico en 19-20. En crítico: 3d10 adicionales de daño. 1/día: disparo certero (acierto automático, ignora cobertura)',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '40/120',
            damageType: 'perforante',
            damage: '1d10',
            weight: '3 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'long_rifle',
            name: '<i class="fas fa-crosshairs"></i> Rifle Largo de Kentucky',
            price: 320,
            rarity: 'rare',
            description: 'Rifle de cañón largo conocido por su precisión excepcional.',
            effect: '+1 al ataque y daño. Alcance extendido. Ventaja en ataques contra enemigos que no se mueven',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '100/400',
            damageType: 'perforante',
            damage: '1d12',
            weight: '11 lb',
            properties: ['Munición', 'Recarga', 'A dos manos', 'Pesada']
        },
        {
            id: 'deck_sweeper',
            name: '<i class="fas fa-broom"></i> Barrecubiertas',
            price: 280,
            rarity: 'uncommon',
            description: 'Escopeta corta diseñada para limpiar enemigos en abordajes.',
            effect: 'Ataque en cono de 20 pies. Cada criatura debe hacer TS Destreza CD 14 o recibe el daño. Ventaja en combate naval',
            category: 'weapons',
            objectType: 'Arma de Fuego',
            weaponCategory: 'Armas de fuego',
            range: 'A distancia',
            alcance: '20/40',
            damageType: 'perforante',
            damage: '2d6',
            weight: '7 lb',
            properties: ['Munición', 'Recarga']
        },
        {
            id: 'anchor_chain',
            name: '<i class="fas fa-anchor"></i> Cadena de Ancla',
            price: 170,
            rarity: 'uncommon',
            description: 'Cadena de ancla convertida en arma.',
            effect: '+1 al ataque y daño. Al impactar, puede forzar TS de FUE CD 13 o el objetivo cae derribado',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'contundente',
            damage: '2d4',
            weight: '10 lb',
            properties: ['Pesada', 'Alcance', 'A dos manos']
        },
        {
            id: 'boarding_axe',
            name: '<i class="fas fa-anchor"></i> Hacha de Abordaje',
            price: 180,
            rarity: 'uncommon',
            description: 'Hacha diseñada para abordajes.',
            effect: '+1 al ataque y daño. +2 de daño adicional contra objetos de madera',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d6',
            weight: '2 lb',
            properties: ['Ligera', 'Arrojadiza']
        },
        {
            id: 'sea_glass_rapier',
            name: '<i class="fas fa-sword"></i> Estoque de Cristal',
            price: 190,
            rarity: 'uncommon',
            description: 'Estoque forjado con cristales marinos.',
            effect: '+1 al ataque y daño. En crítico, el objetivo debe superar TS CON CD 13 o queda cegado hasta el final de su próximo turno',
            category: 'weapons',
            objectType: 'Arma Marcial',
            weaponCategory: 'Armas marciales',
            range: 'Cuerpo a cuerpo',
            damageType: 'perforante',
            damage: '1d8',
            weight: '2 lb',
            properties: ['Sutil']
        },
        {
            id: 'cursed_hook',
            name: '<i class="fas fa-anchor"></i> Gancho Maldito',
            price: 160,
            rarity: 'uncommon',
            description: 'Gancho de un capitán pirata legendario.',
            effect: '+1 al ataque y daño. Ventaja en intentos de desarmar con esta arma',
            category: 'weapons',
            objectType: 'Arma Simple',
            weaponCategory: 'Armas sencillas',
            range: 'Cuerpo a cuerpo',
            damageType: 'perforante',
            damage: '1d4',
            weight: '2 lb',
            properties: ['Ligera']
        },
        {
            id: 'fishermans_net',
            name: '<i class="fas fa-fish"></i> Red de Pescador',
            price: 130,
            rarity: 'uncommon',
            description: 'Red encantada que se mueve sola.',
            effect: 'Ataque especial: el objetivo queda Restringido (CD 15 para escapar con TS de FUE)',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            alcance: '5/15',
            damageType: 'especial',
            damage: '-',
            weight: '3 lb',
            properties: ['Especial', 'Arrojadiza']
        },
        {
            id: 'whaling_harpoon',
            name: '<i class="fas fa-anchor"></i> Arpón Ballenero',
            price: 90,
            rarity: 'common',
            description: 'Arpón pesado con cuerda resistente.',
            effect: 'Al impactar, el arpón queda clavado. Como acción adicional puedes tirar de la cuerda (TS de FUE CD 13) para acercar al objetivo 10 pies',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            alcance: '20/60',
            damageType: 'perforante',
            damage: '1d8',
            weight: '6 lb',
            properties: ['Especial', 'Arrojadiza', 'Alcance']
        },
        {
            id: 'bolas',
            name: '<i class="fas fa-circle-notch"></i> Bolas Arrojadizas',
            price: 70,
            rarity: 'common',
            description: 'Bolas con pesas conectadas por cuerdas.',
            effect: 'Ataque especial: el objetivo debe superar TS Destreza CD 12 o cae derribado y su velocidad se reduce a 0',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'A distancia',
            alcance: '20/60',
            damageType: 'contundente',
            damage: '1d4',
            weight: '2 lb',
            properties: ['Especial', 'Arrojadiza']
        },
        {
            id: 'lasso',
            name: '<i class="fas fa-lasso"></i> Lazo',
            price: 60,
            rarity: 'common',
            description: 'Cuerda con nudo corredizo para capturar.',
            effect: 'Ataque especial: el objetivo debe superar TS Destreza CD 11 o queda agarrado (puede escapar con TS de FUE o DES CD 11)',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            alcance: '10/30',
            damageType: 'especial',
            damage: '-',
            weight: '5 lb',
            properties: ['Especial', 'Arrojadiza', 'Alcance']
        },
        {
            id: 'grappling_hook',
            name: '<i class="fas fa-grappling-hook"></i> Gancho de Agarre',
            price: 150,
            rarity: 'uncommon',
            description: 'Gancho con cadena para escalar y atrapar.',
            effect: '+1 al ataque. Al impactar: +1d6 de daño. Puede usarse para escalar (ventaja en Atletismo) o agarrar enemigos (TS de DES CD 13)',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            alcance: '20/40',
            damageType: 'perforante',
            damage: '1d6',
            weight: '4 lb',
            properties: ['Especial', 'Arrojadiza', 'Alcance']
        },
        {
            id: 'boarding_pike',
            name: '<i class="fas fa-spear"></i> Pica de Abordaje',
            price: 180,
            rarity: 'uncommon',
            description: 'Lanza larga con gancho para abordajes navales.',
            effect: '+1 al ataque y daño. Alcance de 15 pies. Ventaja en ataques contra criaturas montadas o en barcos',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            damageType: 'perforante',
            damage: '1d10',
            weight: '8 lb',
            properties: ['Especial', 'Alcance', 'A dos manos']
        },
        {
            id: 'chain_whip',
            name: '<i class="fas fa-chain"></i> Látigo de Cadenas',
            price: 380,
            rarity: 'rare',
            description: 'Látigo de cadenas con púas de acero.',
            effect: '+1 al ataque y daño. Alcance de 15 pies. Puede desarmar (TS de FUE CD 14) o derribar (TS de DES CD 14)',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d8',
            weight: '4 lb',
            properties: ['Especial', 'Alcance', 'Sutil']
        },
        {
            id: 'trident_net',
            name: '<i class="fas fa-fish"></i> Tridente y Red',
            price: 420,
            rarity: 'rare',
            description: 'Combinación clásica de gladiadores adaptada para combate naval.',
            effect: '+1 al ataque y daño. Puedes usar acción adicional para lanzar la red (TS de DES CD 14 o Restringido). Ventaja en combate acuático',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            damageType: 'perforante',
            damage: '1d6',
            weight: '7 lb',
            properties: ['Especial', 'Versátil', 'Arrojadiza']
        },
        {
            id: 'barbed_whip',
            name: '<i class="fas fa-whip"></i> Látigo con Púas',
            price: 850,
            rarity: 'epic',
            description: 'Látigo cubierto de púas endurecidas con magia.',
            effect: '+2 al ataque y daño. Alcance de 20 pies. Al impactar: 1d6 de sangrado por turno. Puede agarrar (TS de FUE CD 16)',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            damageType: 'cortante',
            damage: '1d6',
            weight: '3 lb',
            properties: ['Especial', 'Alcance', 'Sutil']
        },
        {
            id: 'net_launcher',
            name: '<i class="fas fa-net-wire"></i> Lanzarredes',
            price: 900,
            rarity: 'epic',
            description: 'Dispositivo mecánico que dispara redes a alta velocidad.',
            effect: '+2 al ataque. Alcance 40/120. El objetivo debe superar TS de DES CD 16 o queda Restringido y derribado. Puede afectar criaturas Grandes',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'A distancia',
            alcance: '40/120',
            damageType: 'especial',
            damage: '-',
            weight: '12 lb',
            properties: ['Especial', 'Munición', 'Recarga', 'A dos manos']
        },
        {
            id: 'kraken_tentacle',
            name: '<i class="fas fa-octopus"></i> Tentáculo Místico',
            price: 1350,
            rarity: 'legendary',
            description: 'Látigo místico que imita los tentáculos de las profundidades.',
            effect: '+3 al ataque y daño. Alcance de 30 pies. Puede agarrar hasta 3 criaturas simultáneamente (TS de FUE CD 18). Al agarrar: inflige 2d6 de daño constrictivo por turno',
            category: 'weapons',
            objectType: 'Arma Especial',
            weaponCategory: 'Armas especiales',
            range: 'Cuerpo a cuerpo',
            damageType: 'contundente',
            damage: '2d6',
            weight: '5 lb',
            properties: ['Especial', 'Alcance', 'Sutil']
        },
        {
            id: 'monkey_companion',
            name: '<i class="fas fa-paw"></i> Mono Compañero',
            price: 180,
            rarity: 'uncommon',
            description: 'Mono entrenado que ayuda en combate.',
            effect: 'Familiar. Acción de Ayuda como acción adicional 1/día. +2 a tiradas de Acrobacias',
            category: 'magical_items',
            objectType: 'Objeto maravilloso',
            properties: ['Familiar', 'Ayuda Extra', '+2 Acrobacias']
        },
    
        // === ARMADURAS LEGENDARIAS (6 items) ===
        // === ARMADURAS LEGENDARIAS (2 opciones) ===
        {
            id: 'kraken_skin_armor',
            name: '<i class="fas fa-shield-alt"></i> Armadura de Escamas Abisales',
            price: 1300,
            rarity: 'legendary',
            description: 'Armadura forjada con escamas de criaturas de las profundidades.',
            effect: '+3 a CA. Resistencia al daño ácido y frío. Puedes respirar bajo el agua',
            category: 'armor',
            objectType: 'Armadura Pesada',
            armorCategory: 'Armadura pesada',
            protectionType: 'Cota de mallas',
            armorClass: '16',
            armorFormula: '16 (CA base)',
            dexBonus: 0,
            strRequirement: 13,
            stealthDisadvantage: true,
            weight: '55 lb',
            properties: ['Resistencia ácido', 'Resistencia frío', 'Respiración acuática']
        },
        {
            id: 'storm_lords_coat',
            name: '<i class="fas fa-bolt"></i> Casaca del Señor de Tormentas',
            price: 1100,
            rarity: 'legendary',
            description: 'Casaca que canaliza tormentas eléctricas.',
            effect: '+3 a CA. Inmunidad al daño eléctrico. Vuelo 60 pies durante tormentas',
            category: 'armor',
            objectType: 'Armadura Ligera',
            armorCategory: 'Armadura ligera',
            protectionType: 'Armadura de cuero',
            armorClass: '11 + mod DES',
            armorFormula: '11 + DES',
            dexBonus: 'ilimitado',
            strRequirement: 0,
            stealthDisadvantage: false,
            weight: '10 lb',
            properties: ['Inmunidad eléctrica', 'Vuelo en tormenta']
        },

        // === ARMADURAS ÉPICAS (4 opciones) ===
        {
            id: 'leviathan_scales',
            name: '<i class="fas fa-shield"></i> Armadura de Placas Marinas',
            price: 850,
            rarity: 'epic',
            description: 'Armadura de placas reforzadas con coral petrificado.',
            effect: '+2 a CA. Resistencia al daño contundente, cortante y perforante. Regeneras 5 PG al inicio de tu turno si estás en agua',
            category: 'armor',
            objectType: 'Armadura Pesada',
            armorCategory: 'Armadura pesada',
            protectionType: 'Armadura de placas',
            armorClass: '18',
            armorFormula: '18 (CA base)',
            dexBonus: 0,
            strRequirement: 15,
            stealthDisadvantage: true,
            weight: '65 lb',
            properties: ['Resistencia física', 'Regeneración acuática']
        },
        {
            id: 'void_admirals_helm',
            name: '<i class="fas fa-crown"></i> Yelmo del Almirante',
            price: 1450,
            rarity: 'legendary',
            description: 'Yelmo legendario que permite ver a través del espacio y el tiempo.',
            effect: 'Visión Verdadera hasta 120 pies. Inmunidad a encantamientos. +2 Carisma',
            category: 'equipment',
            objectType: 'Yelmo Legendario',
            armorCategory: 'Objeto maravilloso',
            protectionType: 'Yelmo',
            weight: '3 lb',
            properties: ['Visión verdadera', 'Inmunidad encantamiento', '+2 Carisma']
        },
        {
            id: 'phoenix_cloak',
            name: '<i class="fas fa-fire"></i> Capa Ignífuga',
            price: 700,
            rarity: 'epic',
            description: 'Capa tejida con fibras encantadas resistentes al fuego.',
            effect: 'Inmunidad al daño de fuego. Vuelo 60 pies',
            category: 'equipment',
            objectType: 'Capa Mágica',
            armorCategory: 'Objeto maravilloso',
            protectionType: 'Capa',
            weight: '1 lb',
            properties: ['Inmunidad Fuego', 'Vuelo']
        },
        {
            id: 'tsunami_shield',
            name: '<i class="fas fa-waves"></i> Escudo Tsunami',
            price: 550,
            rarity: 'epic',
            description: 'Escudo que controla tsunamis.',
            effect: '+2 a CA (escudo). 1/día: crea un tsunami en línea de 60 pies (TS Fuerza CD 16, 8d6 de daño contundente)',
            category: 'armor',
            objectType: 'Escudo',
            armorCategory: 'Escudo',
            protectionType: 'Escudo',
            armorClass: '+2',
            weight: '6 lb',
            properties: ['Crear tsunami']
        },
    
        // === OBJETOS MÁGICOS LEGENDARIOS ===
        // === OBJETOS MÁGICOS LEGENDARIOS (2 opciones) ===
        {
            id: 'parrot_omniscient',
            name: '<i class="fas fa-crow"></i> Loro Omnisciente',
            price: 450,
            rarity: 'rare',
            description: 'Loro espectral que conoce todos los secretos marinos.',
            effect: 'Familiar. +5 Investigación y Percepción',
            category: 'magical_items',
            objectType: 'Objeto maravilloso',
            properties: ['Familiar', '+5 Investigación', '+5 Percepción']
        },
        {
            id: 'compass_destiny',
            name: '<i class="fas fa-compass"></i> Brújula del Destino',
            price: 1200,
            rarity: 'legendary',
            description: 'Brújula que apunta hacia el destino más importante.',
            effect: 'Evitar muerte 3/día. +20 a tiradas de destino/azar',
            category: 'magical_items',
            objectType: 'Objeto maravilloso',
            properties: ['Evitar Muerte', '+20 Azar', 'Navegación Perfecta']
        },

        // === OBJETOS ÉPICOS (4 opciones) ===
        {
            id: 'bottle_prison',
            name: '<i class="fas fa-flask"></i> Botella Prisión',
            price: 700,
            rarity: 'epic',
            description: 'Botella que puede apresar criaturas.',
            effect: 'Apresar criatura (TS Sabiduría CD 18). Control agua limitado',
            category: 'magical_items',
            objectType: 'Objeto maravilloso',
            properties: ['Prisión', 'Control Agua']
        },
        {
            id: 'dice_probability',
            name: '<i class="fas fa-dice"></i> Dados del Destino',
            price: 650,
            rarity: 'epic',
            description: 'Dados que alteran probabilidades.',
            effect: 'Relanzar tirada 3/día. Forzar 20 natural 1/día',
            category: 'magical_items',
            objectType: 'Objeto maravilloso',
            properties: ['Relanzar Tiradas', 'Forzar 20']
        },

    // === CONTINUACIÓN DE ÉPICOS (16 items más) ===
    
    // === 4 ARMADURAS ÉPICAS ===
    {
        id: 'siren_scale_mail',
        name: '<i class="fas fa-fish"></i> Cota de Escamas de Sirena',
        price: 750,
        rarity: 'epic',
        description: 'Armadura hecha con escamas iridiscentes de sirenas.',
        effect: 'CA 17 + DES (máx 1). Conjuro Encanto 3/día. Respirar bajo agua',
        category: 'armor',
        objectType: 'Armadura Épica',
        armorCategory: 'Armadura media',
        protectionType: 'Cota de escamas',
        armorClass: '17 + Dex (máx 1)',
        dexBonus: 1,
        penalty: 'Ninguna',
        speedPenalty: '0 pies',
        weight: '20 lb',
        properties: ['Conjuro Encanto 3/día', 'Respiración Acuática']
    },
    {
        id: 'storm_weaver_robe',
        name: '<i class="fas fa-bolt"></i> Túnica Tejetormentas',
        price: 1450,
        rarity: 'legendary',
        description: 'Túnica élfica que canaliza tormentas eléctricas.',
        effect: 'CA 15 + DES. +3 hechizos eléctrico. Resistencia eléctrico',
        category: 'armor',
        objectType: 'Armadura Legendaria',
        armorCategory: 'Túnica mágica',
        protectionType: 'Túnica',
        armorClass: '15 + Dex',
        dexBonus: 'Ilimitado',
        penalty: 'Ninguna',
        speedPenalty: '0 pies',
        weight: '4 lb',
        properties: ['Resistencia Eléctrico', '+3 Magia Eléctrica']
    },
    {
        id: 'bone_corsair_armor',
        name: '<i class="fas fa-skull"></i> Armadura del Corsario Maldito',
        price: 850,
        rarity: 'epic',
        description: 'Armadura de acero oscuro con grabados de calaveras y runas malditas.',
        effect: '+2 a CA. Resistencia al daño necrótico. Emite aura de miedo en 10 pies (TS Sabiduría CD 14)',
        category: 'armor',
        objectType: 'Armadura Épica',
        armorCategory: 'Armadura pesada',
        protectionType: 'Placa de hueso',
        armorClass: '18',
        dexBonus: 0,
        penalty: 'Desventaja Sigilo',
        speedPenalty: '10 pies',
        weight: '40 lb',
        properties: ['Resistencia Necrótico', 'Aura de Miedo']
    },
    {
        id: 'tide_walker_leather',
        name: '<i class="fas fa-waves"></i> Cuero del Caminante de Mareas',
        price: 700,
        rarity: 'epic',
        description: 'Armadura de cuero tratado con esencias marinas.',
        effect: 'CA 13 + DES. Velocidad nado igual a terrestre. +5 Atletismo si está en el agua',
        category: 'armor',
        objectType: 'Armadura Épica',
        armorCategory: 'Armadura ligera',
        protectionType: 'Cuero marino',
        armorClass: '13 + Dex',
        dexBonus: 'Ilimitado',
        penalty: 'Ninguna',
        speedPenalty: '0 pies',
        weight: '10 lb',
        properties: ['Nado Mejorado', '+5 Atletismo en Agua']
    },

    // === 2 CASCOS ÉPICOS ===
    {
        id: 'tricorn_sea_captain',
        name: '<i class="fas fa-hat-wizard"></i> Tricornio del Capitán de Mar',
        price: 650,
        rarity: 'epic',
        description: 'Tricornio que otorga respeto y autoridad marina.',
        effect: 'CA +5. +10 Intimidación/Persuasión con marineros. Comando a tripulación',
        category: 'equipment',
        objectType: 'Casco Épico',
        armorCategory: 'Sombrero mágico',
        protectionType: 'Tricornio',
        armorClass: '+5 (adicional)',
        dexBonus: 'N/A',
        penalty: 'Ninguna',
        speedPenalty: '0 pies',
        weight: '1 lb',
        properties: ['+10 Habilidades Sociales Marinas', 'Comando Tripulación']
    },
    {
        id: 'coral_circlet',
        name: '<i class="fas fa-crown"></i> Diadema de Coral Viviente',
        price: 750,
        rarity: 'epic',
        description: 'Diadema de coral que sigue creciendo y cambiando.',
        effect: 'CA +1. Comunicar con vida marina. Control plantas acuáticas',
        category: 'equipment',
        objectType: 'Casco Épico',
        armorCategory: 'Diadema natural',
        protectionType: 'Diadema',
        armorClass: '+1 (adicional)',
        dexBonus: 'N/A',
        penalty: 'Ninguna',
        speedPenalty: '0 pies',
        weight: '1 lb',
        properties: ['Comunicación Marina', 'Control Plantas Acuáticas']
    },

    // === 5 EQUIPOS ÉPICOS ===
    {
        id: 'boots_water_walking',
        name: '<i class="fas fa-shoe-prints"></i> Botas del Andar Acuático',
        price: 600,
        rarity: 'epic',
        description: 'Botas que permiten caminar sobre cualquier superficie líquida.',
        effect: 'Caminar sobre agua/aceite/ácido. No dejar huellas acuáticas',
        category: 'equipment',
        objectType: 'Equipo Épico',
        properties: ['Caminar Líquidos', 'Sin Huellas Acuáticas']
    },
    {
        id: 'gloves_perfect_grip',
        name: '<i class="fas fa-hand-rock"></i> Guantes del Agarre Perfecto',
        price: 550,
        rarity: 'epic',
        description: 'Guantes que nunca pierden el agarre de nada.',
        effect: 'Imposible desarmar. Escalar cualquier superficie. +5 Atlética escalada',
        category: 'equipment',
        objectType: 'Equipo Épico',
        properties: ['Agarre Imposible', 'Escalada Universal', '+5 Atlética']
    },
    {
        id: 'belt_endless_stamina',
        name: '<i class="fas fa-circle"></i> Cinturón de la Resistencia Sin Fin',
        price: 700,
        rarity: 'epic',
        description: 'Cinturón que otorga resistencia sobrehumana.',
        effect: 'No fatiga por correr/nadar. +3 Constitución. Resistencia veneno',
        category: 'equipment',
        objectType: 'Equipo Épico',
        properties: ['Sin Fatiga', '+3 Constitución', 'Resistencia Veneno']
    },
    {
        id: 'medallion_luck',
        name: '<i class="fas fa-medal"></i> Medallón de la Buena Fortuna',
        price: 650,
        rarity: 'epic',
        description: 'Medallón que atrae la buena suerte.',
        effect: 'Relanzar 1 tirada de ataque, habilidad o salvación fallida por día. +2 a todas las tiradas de salvación',
        category: 'equipment',
        objectType: 'Equipo Épico',
        properties: ['Relanzar Fallo Diario', '+2 Todas las Salvaciones']
    },
    {
        id: 'rope_binding',
        name: '<i class="fas fa-link"></i> Soga de Ataduras Mágicas',
        price: 500,
        rarity: 'epic',
        description: 'Cuerda que puede atar mágicamente a cualquier criatura.',
        effect: '100 pies alcance. Atar criaturas (TS Fuerza CD 16). Comando mental',
        category: 'equipment',
        objectType: 'Equipo Épico',
        properties: ['100 pies alcance', 'Atar Mágico', 'Comando Mental']
    },

    // === 5 RELIQUIAS ÉPICAS ===
    {
        id: 'conch_storm_calling',
        name: '<i class="fas fa-shell"></i> Caracola Convocatormentas',
        price: 800,
        rarity: 'epic',
        description: 'Caracola que puede convocar tormentas menores.',
        effect: 'Convocar tormenta local 1/día. Control vientos menores',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['Convocar Tormenta', 'Control Vientos']
    },

    {
        id: 'pearl_ocean_speech',
        name: '<i class="fas fa-gem"></i> Perla del Habla Oceánica',
        price: 750,
        rarity: 'epic',
        description: 'Perla que permite comunicación con toda vida marina.',
        effect: 'Hablar con todas las criaturas marinas. Comando menor',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['Habla Marina Universal', 'Comando Menor Marino']
    },
    {
        id: 'telescope_far_sight',
        name: '<i class="fas fa-search"></i> Telescopio de la Vista Lejana',
        price: 650,
        rarity: 'epic',
        description: 'Telescopio élfico que ve más allá del horizonte.',
        effect: 'Ver 100 millas. Atravesar niebla/clima. Detectar magia a distancia',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['Vista 100 millas', 'Atravesar Clima', 'Detectar Magia']
    },
    {
        id: 'flag_rallying_crew',
        name: '<i class="fas fa-flag"></i> Bandera de Moral Pirata',
        price: 700,
        rarity: 'epic',
        description: 'Bandera que eleva la moral de toda la tripulación.',
        effect: '+3 al atributo de moral de tripulación. Inmunidad miedo masivo',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['+3 Moral Tripulación', 'Inmunidad Miedo Masivo']
    },

    // ======================================
    // === ARMADURAS RARAS (4 items) ===
    // ======================================
    {
        id: 'reinforced_leather_armor',
        name: '<i class="fas fa-vest"></i> Armadura de Cuero Reforzado',
        price: 450,
        rarity: 'rare',
        description: 'Armadura de cuero tratado con aceites especiales y reforzada con placas metálicas en puntos clave.',
        effect: 'CA 13 + DES. +1 CA adicional. Resistencia al daño de ácido',
        category: 'armor',
        objectType: 'Armadura Rara',
        armorCategory: 'Armadura ligera',
        protectionType: 'Cuero reforzado',
        armorClass: '13 + Dex',
        dexBonus: 'Ilimitado',
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '12 lb',
        properties: ['+1 CA', 'Resistencia Ácido']
    },
    {
        id: 'chainmail_blessed',
        name: '<i class="fas fa-shield-alt"></i> Cota de Malla Bendita',
        price: 420,
        rarity: 'rare',
        description: 'Cota de malla bendecida por un clérigo de la diosa del mar.',
        effect: 'CA 16. +1 CA adicional. Ventaja en salvaciones contra ser poseído o maldito',
        category: 'armor',
        objectType: 'Armadura Rara',
        armorCategory: 'Armadura media',
        protectionType: 'Cota de mallas',
        armorClass: '16',
        armorFormula: '16 (CA base)',
        dexBonus: 0,
        strRequirement: 13,
        stealthDisadvantage: true,
        weight: '55 lb',
        properties: ['+1 CA', 'Ventaja vs Posesión/Maldiciones']
    },
    {
        id: 'breastplate_captains',
        name: '<i class="fas fa-user-shield"></i> Peto del Capitán',
        price: 380,
        rarity: 'rare',
        description: 'Peto ornamentado con el símbolo de un kraken grabado en el pecho.',
        effect: 'CA 14 + DES (máx 2). +1 CA adicional. +1 Carisma',
        category: 'armor',
        objectType: 'Armadura Rara',
        armorCategory: 'Armadura media',
        protectionType: 'Peto',
        armorClass: '14 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '20 lb',
        properties: ['+1 CA', '+1 Carisma']
    },
    {
        id: 'splint_armor_navy',
        name: '<i class="fas fa-shield"></i> Armadura de Bandas Naval',
        price: 500,
        rarity: 'rare',
        description: 'Armadura de bandas de acero tratado para resistir la corrosión marina.',
        effect: 'CA 17. +1 CA adicional. No se oxida ni corroe',
        category: 'armor',
        objectType: 'Armadura Rara',
        armorCategory: 'Armadura pesada',
        protectionType: 'Bandas',
        armorClass: '17',
        armorFormula: '17 (CA base)',
        dexBonus: 0,
        strRequirement: 15,
        stealthDisadvantage: true,
        weight: '60 lb',
        properties: ['+1 CA', 'Inmune a Corrosión']
    },

    // ======================================
    // === ARMADURAS POCO COMUNES (5 items) ===
    // ======================================
    {
        id: 'studded_leather_pirate',
        name: '<i class="fas fa-user-ninja"></i> Cuero Tachonado de Pirata',
        price: 180,
        rarity: 'uncommon',
        description: 'Armadura de cuero con tachuelas de bronce decoradas con motivos marinos.',
        effect: 'CA 12 + DES. +5 pies de velocidad',
        category: 'armor',
        objectType: 'Armadura Poco Común',
        armorCategory: 'Armadura ligera',
        protectionType: 'Cuero tachonado',
        armorClass: '12 + Dex',
        dexBonus: 'Ilimitado',
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '13 lb',
        properties: ['+5 pies Velocidad']
    },
    {
        id: 'hide_armor_sea',
        name: '<i class="fas fa-dragon"></i> Armadura de Pieles Marinas',
        price: 150,
        rarity: 'uncommon',
        description: 'Armadura hecha con pieles de focas y tiburones.',
        effect: 'CA 12 + DES (máx 2). Velocidad de nado 30 pies',
        category: 'armor',
        objectType: 'Armadura Poco Común',
        armorCategory: 'Armadura media',
        protectionType: 'Pieles',
        armorClass: '12 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '12 lb',
        properties: ['Velocidad Nado 30 pies']
    },
    {
        id: 'scale_mail_bronze',
        name: '<i class="fas fa-fish"></i> Cota de Escamas de Bronce',
        price: 200,
        rarity: 'uncommon',
        description: 'Armadura de escamas de bronce pulido que brilla bajo el sol.',
        effect: 'CA 14 + DES (máx 2). Ventaja en salvaciones contra ser cegado',
        category: 'armor',
        objectType: 'Armadura Poco Común',
        armorCategory: 'Armadura media',
        protectionType: 'Escamas',
        armorClass: '14 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: true,
        weight: '45 lb',
        properties: ['Ventaja vs Ceguera']
    },
    {
        id: 'ring_mail_sailor',
        name: '<i class="fas fa-ring"></i> Cota de Anillas de Marinero',
        price: 120,
        rarity: 'uncommon',
        description: 'Armadura de anillas ligera diseñada para combate naval.',
        effect: 'CA 14. No impone desventaja en Atletismo (nadar)',
        category: 'armor',
        objectType: 'Armadura Poco Común',
        armorCategory: 'Armadura pesada',
        protectionType: 'Anillas',
        armorClass: '14',
        armorFormula: '14 (CA base)',
        dexBonus: 0,
        strRequirement: 0,
        stealthDisadvantage: true,
        weight: '40 lb',
        properties: ['Sin penalización nadar']
    },
    {
        id: 'half_plate_officer',
        name: '<i class="fas fa-vest-patches"></i> Semiplacas de Oficial',
        price: 190,
        rarity: 'uncommon',
        description: 'Armadura de semiplacas decorada con el rango de oficial naval.',
        effect: 'CA 15 + DES (máx 2). +1 a tiradas de Intimidación',
        category: 'armor',
        objectType: 'Armadura Poco Común',
        armorCategory: 'Armadura media',
        protectionType: 'Semiplacas',
        armorClass: '15 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: true,
        weight: '40 lb',
        properties: ['+1 Intimidación']
    },

    // ======================================
    // === ARMADURAS COMUNES (6 items) ===
    // ======================================
    {
        id: 'leather_armor_basic',
        name: '<i class="fas fa-vest"></i> Armadura de Cuero',
        price: 45,
        rarity: 'common',
        description: 'Armadura básica de cuero curtido, protección estándar para piratas.',
        effect: 'CA 11 + DES',
        category: 'armor',
        objectType: 'Armadura Común',
        armorCategory: 'Armadura ligera',
        protectionType: 'Cuero',
        armorClass: '11 + Dex',
        dexBonus: 'Ilimitado',
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '10 lb',
        properties: ['Armadura básica']
    },
    {
        id: 'padded_armor_sailor',
        name: '<i class="fas fa-tshirt"></i> Armadura Acolchada de Marinero',
        price: 25,
        rarity: 'common',
        description: 'Ropa acolchada que proporciona protección mínima.',
        effect: 'CA 11 + DES. No impone desventaja en Sigilo',
        category: 'armor',
        objectType: 'Armadura Común',
        armorCategory: 'Armadura ligera',
        protectionType: 'Acolchada',
        armorClass: '11 + Dex',
        dexBonus: 'Ilimitado',
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '8 lb',
        properties: ['Sin desventaja Sigilo']
    },
    {
        id: 'chain_shirt_basic',
        name: '<i class="fas fa-vest"></i> Camisa de Malla',
        price: 75,
        rarity: 'common',
        description: 'Camisa de cota de malla que se puede usar bajo la ropa.',
        effect: 'CA 13 + DES (máx 2)',
        category: 'armor',
        objectType: 'Armadura Común',
        armorCategory: 'Armadura media',
        protectionType: 'Camisa de malla',
        armorClass: '13 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '20 lb',
        properties: ['Discreta']
    },
    {
        id: 'breastplate_basic',
        name: '<i class="fas fa-shield-alt"></i> Peto Básico',
        price: 90,
        rarity: 'common',
        description: 'Peto de acero simple pero efectivo.',
        effect: 'CA 14 + DES (máx 2)',
        category: 'armor',
        objectType: 'Armadura Común',
        armorCategory: 'Armadura media',
        protectionType: 'Peto',
        armorClass: '14 + Dex (máx 2)',
        dexBonus: 2,
        strRequirement: 0,
        stealthDisadvantage: false,
        weight: '20 lb',
        properties: ['Protección media']
    },
    {
        id: 'chainmail_basic',
        name: '<i class="fas fa-shield"></i> Cota de Mallas Básica',
        price: 85,
        rarity: 'common',
        description: 'Cota de mallas estándar usada por soldados.',
        effect: 'CA 16',
        category: 'armor',
        objectType: 'Armadura Común',
        armorCategory: 'Armadura pesada',
        protectionType: 'Cota de mallas',
        armorClass: '16',
        armorFormula: '16 (CA base)',
        dexBonus: 0,
        strRequirement: 13,
        stealthDisadvantage: true,
        weight: '55 lb',
        properties: ['Requiere FUE 13']
    },
    {
        id: 'shield_basic',
        name: '<i class="fas fa-shield-alt"></i> Escudo',
        price: 50,
        rarity: 'common',
        description: 'Escudo de madera reforzado con metal.',
        effect: '+2 CA',
        category: 'armor',
        objectType: 'Escudo',
        armorCategory: 'Escudo',
        protectionType: 'Escudo',
        armorClass: '+2',
        weight: '6 lb',
        properties: ['Escudo básico']
    },

    // ======================================
    // === SOMBREROS (30 items) ===
    // ======================================

    // === 10 SOMBREROS LEGENDARIOS ===
    {
        id: 'hat_pirate_king',
        name: '<i class="fas fa-crown"></i> Sombrero del Rey Pirata',
        price: 1500,
        rarity: 'legendary',
        description: 'Tricornio legendario usado por el más grande capitán pirata de todos los tiempos.',
        effect: '+3 Carisma, ventaja en tiradas de intimidación y persuasión, +3 lealtad de tripulación',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+3 Carisma', 'Ventaja Intimidación/Persuasión', '+3 Lealtad Tripulación']
    },
    {
        id: 'hat_storm_master',
        name: '<i class="fas fa-wind"></i> Sombrero del Señor de las Tormentas',
        price: 1400,
        rarity: 'legendary',
        description: 'Sombrero negro con plumas blancas que controla el clima.',
        effect: '+2 Sabiduría, controlar vientos y clima menor 3/día, inmunidad al daño de rayos',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Sabiduría', 'Control Clima', 'Inmunidad Rayos']
    },
    {
        id: 'hat_death_dealer',
        name: '<i class="fas fa-skull-crossbones"></i> Sombrero del Traficante de la Muerte',
        price: 1450,
        rarity: 'legendary',
        description: 'Sombrero de ala ancha con calaveras de plata incrustadas.',
        effect: '+2 Destreza, +3 daño con armas de fuego, crítico en 19-20 con pistolas',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Destreza', '+3 Daño Armas Fuego', 'Crítico Mejorado']
    },
    {
        id: 'hat_ghost_captain',
        name: '<i class="fas fa-ghost"></i> Sombrero del Capitán Fantasma',
        price: 1350,
        rarity: 'legendary',
        description: 'Tricornio etéreo que permite caminar entre mundos.',
        effect: '+2 Carisma, hacerse etéreo 1 minuto/día, ver y hablar con muertos',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Carisma', 'Forma Etérea', 'Hablar con Muertos']
    },
    {
        id: 'hat_sea_emperor',
        name: '<i class="fas fa-water"></i> Sombrero del Emperador del Mar',
        price: 1500,
        rarity: 'legendary',
        description: 'Corona marina con coral viviente y perlas luminosas.',
        effect: '+3 Carisma, respirar bajo el agua, hablar con criaturas marinas, controlar mareas',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+3 Carisma', 'Respirar Agua', 'Controlar Mareas']
    },
    {
        id: 'hat_treasure_seeker',
        name: '<i class="fas fa-gem"></i> Sombrero del Buscador de Fortunas',
        price: 1300,
        rarity: 'legendary',
        description: 'Sombrero con brújula mágica que señala riquezas.',
        effect: '+2 Sabiduría, detectar oro y gemas a 500 pies, ventaja en Investigación',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Sabiduría', 'Detectar Tesoros', 'Ventaja Investigación']
    },
    {
        id: 'hat_cannon_master',
        name: '<i class="fas fa-bullseye"></i> Sombrero del Maestro Artillero',
        price: 1250,
        rarity: 'legendary',
        description: 'Gorra con insignia de artillería dorada.',
        effect: '+2 Inteligencia, doblar daño de cañones del barco, ignorar resistencias con artillería',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Inteligencia', 'Doble Daño Cañones', 'Ignorar Resistencias']
    },
    {
        id: 'hat_immortal_corsair',
        name: '<i class="fas fa-heart"></i> Sombrero del Corsario Inmortal',
        price: 1400,
        rarity: 'legendary',
        description: 'Sombrero rojo sangre que otorga vitalidad sobrenatural.',
        effect: '+3 Constitución, regenerar 10 HP por turno si tiene menos de 10 HP, ventaja en salvaciones contra muerte',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+3 Constitución', 'Regeneración 10 HP (si <10 HP)', 'Ventaja vs Muerte']
    },
    {
        id: 'hat_shadow_smuggler',
        name: '<i class="fas fa-user-secret"></i> Sombrero del Contrabandista Sombrío',
        price: 1350,
        rarity: 'legendary',
        description: 'Sombrero negro que envuelve al usuario en sombras.',
        effect: '+3 Destreza, invisibilidad en sombras, teletransporte a 60 pies entre sombras 3/día',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+3 Destreza', 'Invisibilidad Sombras', 'Teletransporte']
    },
    {
        id: 'hat_dread_admiral',
        name: '<i class="fas fa-fire"></i> Sombrero del Almirante del Terror',
        price: 1450,
        rarity: 'legendary',
        description: 'Bicornio negro con llamas espectrales.',
        effect: '+2 Carisma, +2 Fuerza, aura de miedo 30 pies (TS Sabiduría CD 18), inmunidad miedo',
        category: 'equipment',
        objectType: 'Sombrero Legendario',
        equipmentType: 'Sombrero',
        properties: ['+2 Carisma/Fuerza', 'Aura Miedo', 'Inmunidad Miedo']
    },

    // === 5 SOMBREROS ÉPICOS ===
    {
        id: 'hat_navigator',
        name: '<i class="fas fa-compass"></i> Sombrero del Gran Navegante',
        price: 850,
        rarity: 'epic',
        description: 'Tricornio con mapas celestiales bordados.',
        effect: '+2 Sabiduría, nunca perderse en el mar, ventaja en Supervivencia y Naturaleza',
        category: 'equipment',
        objectType: 'Sombrero Épico',
        equipmentType: 'Sombrero',
        properties: ['+2 Sabiduría', 'Navegación Perfecta', 'Ventaja Supervivencia']
    },
    {
        id: 'hat_duelist',
        name: '<i class="fas fa-hat-cowboy"></i> Sombrero del Duelista',
        price: 900,
        rarity: 'epic',
        description: 'Sombrero de ala ancha usado por el mejor espadachín.',
        effect: '+2 Destreza, +2 CA contra ataques cuerpo a cuerpo, ventaja en iniciativa',
        category: 'equipment',
        objectType: 'Sombrero Épico',
        equipmentType: 'Sombrero',
        properties: ['+2 Destreza', '+2 CA vs Cuerpo', 'Ventaja Iniciativa']
    },
    {
        id: 'hat_merchant_prince',
        name: '<i class="fas fa-coins"></i> Sombrero del Príncipe Mercader',
        price: 800,
        rarity: 'epic',
        description: 'Elegante sombrero con hilo de oro.',
        effect: '+2 Carisma, ventaja en Persuasión y Trato, descuentos del 25% en todas las compras',
        category: 'equipment',
        objectType: 'Sombrero Épico',
        equipmentType: 'Sombrero',
        properties: ['+2 Carisma', 'Ventaja Persuasión', '25% Descuento']
    },
    {
        id: 'hat_quartermaster',
        name: '<i class="fas fa-box"></i> Sombrero del Intendente Maestro',
        price: 750,
        rarity: 'epic',
        description: 'Gorra con insignias de provisiones y logística pirata.',
        effect: '+1 Inteligencia, +1 Sabiduría, reducir consumo de provisiones de tripulación en 50%, duplicar recursos encontrados en saqueos',
        category: 'equipment',
        objectType: 'Sombrero Épico',
        equipmentType: 'Sombrero',
        properties: ['+1 INT/SAB', 'Consumo Provisiones -50%', 'Duplicar Recursos Saqueo']
    },
    {
        id: 'hat_lookout',
        name: '<i class="fas fa-eye"></i> Sombrero del Vigía Experto',
        price: 700,
        rarity: 'epic',
        description: 'Gorra con lentes telescópicos integrados.',
        effect: '+2 Sabiduría, visión a 1 milla, visión en oscuridad, ventaja en Percepción',
        category: 'equipment',
        objectType: 'Sombrero Épico',
        equipmentType: 'Sombrero',
        properties: ['+2 Sabiduría', 'Visión Lejana', 'Ventaja Percepción']
    },

    // === 8 SOMBREROS RAROS ===
    {
        id: 'hat_captain',
        name: '<i class="fas fa-anchor"></i> Tricornio del Capitán',
        price: 450,
        rarity: 'rare',
        description: 'Tricornio clásico con pluma de loro.',
        effect: '+1 Carisma, +1 a tiradas de mando de tripulación',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Carisma', '+1 Mando']
    },
    {
        id: 'hat_storm_proof',
        name: '<i class="fas fa-umbrella"></i> Sombrero Prueba de Tormentas',
        price: 380,
        rarity: 'rare',
        description: 'Sombrero encerado que protege contra el clima.',
        effect: '+1 Constitución, inmunidad a efectos climáticos, ventaja vs relámpagos',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Constitución', 'Inmunidad Clima', 'Ventaja vs Rayos']
    },
    {
        id: 'hat_lucky',
        name: '<i class="fas fa-clover"></i> Sombrero de la Suerte',
        price: 420,
        rarity: 'rare',
        description: 'Sombrero verde con trébol de cuatro hojas.',
        effect: '+1 a todas las tiradas de salvación, relanzar un 1 natural por día',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Salvaciones', 'Relanzar 1 Natural']
    },
    {
        id: 'hat_swashbuckler',
        name: '<i class="fas fa-feather"></i> Sombrero del Espadachín',
        price: 350,
        rarity: 'rare',
        description: 'Sombrero elegante con pluma exótica.',
        effect: '+1 Destreza, +5 pies velocidad, ventaja en Acrobacias',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Destreza', '+5 pies', 'Ventaja Acrobacias']
    },
    {
        id: 'hat_gunner',
        name: '<i class="fas fa-crosshairs"></i> Gorra del Artillero',
        price: 400,
        rarity: 'rare',
        description: 'Gorra de cuero con insignia de cañón.',
        effect: '+1 Destreza, +1 al ataque con armas de fuego',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Destreza', '+1 Ataque Armas Fuego']
    },
    {
        id: 'hat_diplomat',
        name: '<i class="fas fa-dove"></i> Sombrero del Diplomático',
        price: 320,
        rarity: 'rare',
        description: 'Sombrero fino usado en negociaciones.',
        effect: '+1 Carisma, ventaja en Persuasión, enemigos deben superar TS Sabiduría CD 13 para atacarte',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Carisma', 'Ventaja Persuasión', 'Protección Diplomática']
    },
    {
        id: 'hat_boarding',
        name: '<i class="fas fa-helmet-battle"></i> Casco de Abordaje',
        price: 300,
        rarity: 'rare',
        description: 'Casco reforzado para combates navales.',
        effect: '+1 CA, +1 Fuerza, resistencia a aturdimiento',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 CA', '+1 Fuerza', 'Resistencia Aturdimiento']
    },
    {
        id: 'hat_cook',
        name: '<i class="fas fa-utensils"></i> Gorra del Cocinero Experto',
        price: 280,
        rarity: 'rare',
        description: 'Gorra blanca de chef con aroma a especias.',
        effect: '+1 Constitución, la tripulación recupera el doble de HP al descansar, inmunidad a venenos',
        category: 'equipment',
        objectType: 'Sombrero Raro',
        equipmentType: 'Sombrero',
        properties: ['+1 Constitución', 'Curación x2', 'Inmunidad Veneno']
    },

    // === 7 SOMBREROS POCO COMUNES ===
    {
        id: 'hat_sailor',
        name: '<i class="fas fa-ship"></i> Gorra de Marinero Veterano',
        price: 180,
        rarity: 'uncommon',
        description: 'Gorra naval estándar con insignia de barco y experiencia en alta mar.',
        effect: '+1 Sabiduría, ventaja en tiradas de Supervivencia (Navegación), +5 en tiradas de Vehículos (agua)',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['+1 Sabiduría', 'Ventaja Navegación', '+5 Vehículos Agua']
    },
    {
        id: 'hat_bandana',
        name: '<i class="fas fa-mask"></i> Pañuelo del Pirata',
        price: 150,
        rarity: 'uncommon',
        description: 'Pañuelo rojo clásico de pirata.',
        effect: '+1 Constitución, ventaja en salvaciones contra veneno',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['+1 Constitución', 'Ventaja vs Veneno']
    },
    {
        id: 'hat_tricorn_simple',
        name: '<i class="fas fa-hat-wizard"></i> Tricornio Simple',
        price: 120,
        rarity: 'uncommon',
        description: 'Tricornio básico pero elegante.',
        effect: '+1 Carisma, impresionar a la gente común',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['+1 Carisma', 'Impresionar']
    },
    {
        id: 'hat_straw',
        name: '<i class="fas fa-sun"></i> Sombrero de Paja',
        price: 90,
        rarity: 'uncommon',
        description: 'Sombrero de paja de ala ancha. Es un chiste, por eso estos efectos.',
        effect: 'Protección contra sol, ventaja vs golpe de calor',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['Protección Solar', 'Ventaja vs Calor', 'Item de Chiste']
    },
    {
        id: 'hat_wool_cap',
        name: '<i class="fas fa-snowflake"></i> Gorra de Lana',
        price: 85,
        rarity: 'uncommon',
        description: 'Gorra gruesa para climas fríos.',
        effect: 'Protección contra frío, ventaja vs hipotermia',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['Protección Frío', 'Ventaja vs Frío']
    },
    {
        id: 'hat_leather_cap',
        name: '<i class="fas fa-user-shield"></i> Gorra de Cuero',
        price: 100,
        rarity: 'uncommon',
        description: 'Gorra reforzada con cuero.',
        effect: '+1 CA contra golpes en la cabeza',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['+1 CA Cabeza']
    },
    {
        id: 'hat_feathered',
        name: '<i class="fas fa-feather-alt"></i> Sombrero con Pluma',
        price: 110,
        rarity: 'uncommon',
        description: 'Sombrero decorado con pluma llamativa.',
        effect: '+1 Carisma, ventaja en tiradas de Interpretación',
        category: 'equipment',
        objectType: 'Sombrero Poco Común',
        equipmentType: 'Sombrero',
        properties: ['+1 Carisma', 'Ventaja Interpretación']
    },

    // ======================================
    // === RELIQUIAS Y OTROS EQUIPOS ===
    // ======================================

    // === RELIQUIAS LEGENDARIAS ===
    {
        id: 'relic_compass_destiny',
        name: '<i class="fas fa-compass"></i> Brújula del Destino',
        price: 1500,
        rarity: 'legendary',
        description: 'Brújula antigua que señala hacia tu mayor deseo.',
        effect: 'Señala ubicación de cualquier cosa que desees 1/día, ventaja en todas las tiradas de navegación, nunca perderse',
        category: 'relic',
        objectType: 'Reliquia Legendaria',
        properties: ['Localizar Deseo', 'Ventaja Navegación', 'No Perderse']
    },
    {
        id: 'relic_kraken_eye',
        name: '<i class="fas fa-eye"></i> Ojo de las Profundidades',
        price: 1400,
        rarity: 'legendary',
        description: 'Orbe cristalino que muestra las profundidades marinas.',
        effect: 'Ver a través del agua hasta 1000 pies, hablar con criaturas marinas, convocar criatura marina gigante 1/semana (CR máximo 10)',
        category: 'relic',
        objectType: 'Reliquia Legendaria',
        properties: ['Visión Acuática', 'Hablar Marinos', 'Convocar Criatura CR 10']
    },
    {
        id: 'relic_sea_heart',
        name: '<i class="fas fa-heart"></i> Corazón del Mar',
        price: 1450,
        rarity: 'legendary',
        description: 'Gema azul brillante que late como un corazón.',
        effect: 'Respirar bajo el agua, inmunidad a presión acuática, velocidad de nado 60 pies, controlar corrientes marinas',
        category: 'relic',
        objectType: 'Reliquia Legendaria',
        properties: ['Respirar Agua', 'Nado 60 pies', 'Controlar Corrientes']
    },
    {
        id: 'relic_pirate_codex',
        name: '<i class="fas fa-book-skull"></i> Códice Pirata Antiguo',
        price: 1350,
        rarity: 'legendary',
        description: 'Libro que contiene todos los secretos piratas.',
        effect: '+3 Inteligencia, +3 Carisma, dominio en todas las herramientas, conocimiento de todos los puertos piratas',
        category: 'relic',
        objectType: 'Reliquia Legendaria',
        properties: ['+3 INT/CAR', 'Dominio Herramientas', 'Conocimiento Puertos']
    },
    {
        id: 'relic_eternal_rum',
        name: '<i class="fas fa-wine-bottle"></i> Barril de Ron Eterno',
        price: 1300,
        rarity: 'legendary',
        description: 'Barril que nunca se vacía y cura heridas.',
        effect: 'Ron infinito, beber cura 4d8+4 HP y elimina veneno/enfermedad, la tripulación nunca sufre desmoralización',
        category: 'relic',
        objectType: 'Reliquia Legendaria',
        properties: ['Ron Infinito', 'Curar 4d8+4', 'Moral Perfecta']
    },

    // === 3 RELIQUIAS ÉPICAS ===
    {
        id: 'relic_storm_bottle',
        name: '<i class="fas fa-bolt"></i> Botella de Tormenta Embotellada',
        price: 800,
        rarity: 'epic',
        description: 'Botella que contiene una tormenta viva.',
        effect: 'Liberar tormenta en área de 300 pies 1/día (duración 10 minutos), controlar dirección del viento',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['Liberar Tormenta', 'Control Viento']
    },
    {
        id: 'relic_siren_pearl',
        name: '<i class="fas fa-gem"></i> Perla de Sirena',
        price: 850,
        rarity: 'epic',
        description: 'Perla luminosa con canción hipnótica.',
        effect: '+2 Carisma, cantar para encantar enemigos (TS Sabiduría CD 16), hablar telepáticamente bajo el agua',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['+2 Carisma', 'Canción Encantadora', 'Telepatía Acuática']
    },
    {
        id: 'relic_dead_mans_chest',
        name: '<i class="fas fa-treasure-chest"></i> Cofre del Hombre Muerto',
        price: 900,
        rarity: 'epic',
        description: 'Cofre maldito que protege su contenido.',
        effect: 'Almacenamiento extradimensional (500 lb), solo el dueño puede abrir, maldice a ladrones (necrótico 6d6)',
        category: 'relic',
        objectType: 'Reliquia Épica',
        properties: ['Almacenamiento 500 lb', 'Protección Robo', 'Maldición']
    },

    // === 4 RELIQUIAS RARAS ===
    {
        id: 'relic_spyglass_truth',
        name: '<i class="fas fa-binoculars"></i> Catalejo de la Verdad',
        price: 450,
        rarity: 'rare',
        description: 'Telescopio que revela secretos ocultos.',
        effect: 'Ver hasta 2 millas, detectar invisibilidad, ver a través de ilusiones',
        category: 'relic',
        objectType: 'Reliquia Rara',
        properties: ['Visión 2 Millas', 'Detectar Invisible', 'Ver Ilusiones']
    },
    {
        id: 'relic_sea_chart',
        name: '<i class="fas fa-map"></i> Carta Marina Viviente',
        price: 400,
        rarity: 'rare',
        description: 'Mapa que se actualiza en tiempo real.',
        effect: 'Muestra todas las islas y barcos cercanos (100 millas), actualización en tiempo real, marcar ubicaciones',
        category: 'relic',
        objectType: 'Reliquia Rara',
        properties: ['Mapa 100 Millas', 'Actualización Tiempo Real', 'Marcar Ubicaciones']
    },
    {
        id: 'relic_lucky_coin',
        name: '<i class="fas fa-coins"></i> Moneda de la Fortuna',
        price: 380,
        rarity: 'rare',
        description: 'Moneda dorada que siempre vuelve.',
        effect: 'Relanzar cualquier tirada 1/día, ventaja en juegos de azar, la moneda siempre regresa al bolsillo',
        category: 'relic',
        objectType: 'Reliquia Rara',
        properties: ['Relanzar Tirada', 'Ventaja Apuestas', 'Regresa Siempre']
    },
    {
        id: 'relic_shark_tooth',
        name: '<i class="fas fa-tooth"></i> Diente de Tiburón Gigante',
        price: 350,
        rarity: 'rare',
        description: 'Enorme diente que otorga ferocidad.',
        effect: '+1 Fuerza, +1d6 daño en ataques cuerpo a cuerpo, intimidar enemigos (TS Sabiduría CD 14)',
        category: 'relic',
        objectType: 'Reliquia Rara',
        properties: ['+1 Fuerza', '+1d6 Daño', 'Intimidar']
    },

    // === 3 RELIQUIAS POCO COMUNES ===
    {
        id: 'relic_sailors_dice',
        name: '<i class="fas fa-dice"></i> Dados del Marinero',
        price: 180,
        rarity: 'uncommon',
        description: 'Dados tallados en hueso de ballena.',
        effect: 'Ventaja en juegos de azar, +1 a iniciativa',
        category: 'relic',
        objectType: 'Reliquia Poco Común',
        properties: ['Ventaja Apuestas', '+1 Iniciativa']
    },
    {
        id: 'relic_message_bottle',
        name: '<i class="fas fa-envelope"></i> Botella de Mensajes',
        price: 150,
        rarity: 'uncommon',
        description: 'Botella que entrega mensajes a través del mar.',
        effect: 'Enviar mensaje escrito a cualquier puerto conocido (llega en 1d4 días)',
        category: 'relic',
        objectType: 'Reliquia Poco Común',
        properties: ['Enviar Mensaje', 'Cualquier Puerto']
    },
    {
        id: 'relic_lucky_rabbit_foot',
        name: '<i class="fas fa-paw"></i> Pata de Conejo de la Suerte',
        price: 120,
        rarity: 'uncommon',
        description: 'Amuleto que trae buena fortuna.',
        effect: '+1 a todas las tiradas de salvación',
        category: 'relic',
        objectType: 'Reliquia Poco Común',
        properties: ['+1 Salvaciones']
    },

    // ======================================
    // === EQUIPAMIENTO ADICIONAL (15 items) ===
    // ======================================

    // === 5 EQUIPAMIENTO LEGENDARIO ===
    {
        id: 'equip_grappling_hook_legendary',
        name: '<i class="fas fa-anchor"></i> Garfio de Abordaje Legendario',
        price: 1400,
        rarity: 'legendary',
        description: 'Garfio mágico que nunca falla.',
        effect: 'Alcance 100 pies, agarre automático, escalar a velocidad completa, puede agarrar barcos enteros',
        category: 'equipment',
        objectType: 'Equipamiento Legendario',
        properties: ['Alcance 100 pies', 'Agarre Automático', 'Velocidad Completa']
    },
    {
        id: 'equip_spyglass_legendary',
        name: '<i class="fas fa-eye"></i> Telescopio del Almirante',
        price: 1350,
        rarity: 'legendary',
        description: 'Telescopio que ve más allá del horizonte.',
        effect: 'Ver hasta 10 millas, detectar emboscadas, ver a través de niebla y oscuridad',
        category: 'equipment',
        objectType: 'Equipamiento Legendario',
        properties: ['Visión 10 Millas', 'Detectar Emboscadas', 'Ver en Oscuridad']
    },
    {
        id: 'equip_repair_kit_legendary',
        name: '<i class="fas fa-tools"></i> Kit de Reparación Maestro',
        price: 1300,
        rarity: 'legendary',
        description: 'Herramientas que reparan cualquier cosa.',
        effect: 'Reparar daño de barco instantáneamente (50 HP), usar 3/día, reparar objetos mágicos',
        category: 'ship_parts',
        objectType: 'Pieza de Barco Legendaria',
        properties: ['Reparar 50 HP', '3 usos/día', 'Reparar Mágico']
    },
    {
        id: 'equip_eternal_lantern',
        name: '<i class="fas fa-lantern"></i> Farol Eterno',
        price: 1250,
        rarity: 'legendary',
        description: 'Lámpara que nunca se apaga y guía en la oscuridad.',
        effect: 'Luz de 120 pies, nunca se apaga, disipar oscuridad mágica, guiar a través de niebla',
        category: 'ship_parts',
        objectType: 'Pieza de Barco Legendaria',
        properties: ['Luz 120 pies', 'Nunca Apagar', 'Disipar Oscuridad']
    },

    // === 3 EQUIPAMIENTO ÉPICO ===
    {
        id: 'equip_diving_bell',
        name: '<i class="fas fa-bell"></i> Campana de Buceo Mágica',
        price: 850,
        rarity: 'epic',
        description: 'Campana que crea burbuja de aire bajo el agua.',
        effect: 'Respirar bajo el agua (hasta 8 personas), duración ilimitada, protección vs presión',
        category: 'ship_parts',
        objectType: 'Pieza de Barco Épica',
        properties: ['Burbuja Aire 8', 'Ilimitado', 'Protección Presión']
    },
    {
        id: 'equip_reinforced_sails',
        name: '<i class="fas fa-wind"></i> Velas Reforzadas Mágicas',
        price: 900,
        rarity: 'epic',
        description: 'Velas que resisten cualquier tormenta.',
        effect: '+50% velocidad del barco, resistencia a daño de vela, capturar vientos favorables siempre',
        category: 'ship_parts',
        objectType: 'Pieza de Barco Épica',
        properties: ['+50% Velocidad', 'Resistencia Daño', 'Vientos Favorables']
    },

    // === 4 EQUIPAMIENTO RARO ===
    {
        id: 'equip_emergency_raft',
        name: '<i class="fas fa-life-ring"></i> Balsa de Emergencia',
        price: 400,
        rarity: 'rare',
        description: 'Balsa que se despliega instantáneamente.',
        effect: 'Desplegar instantáneamente (capacidad 6 personas), insumergible, velocidad 10 pies',
        category: 'ship_parts',
        objectType: 'Pieza de Barco Rara',
        properties: ['Despliegue Instantáneo', 'Capacidad 6', 'Insumergible']
    },
    {
        id: 'equip_medical_kit',
        name: '<i class="fas fa-medkit"></i> Kit Médico Avanzado',
        price: 380,
        rarity: 'rare',
        description: 'Botiquín completo para cirugía en el mar.',
        effect: '10 usos, curar 2d8+2 HP por uso, estabilizar moribundos automáticamente',
        category: 'equipment',
        objectType: 'Equipamiento Raro',
        properties: ['10 Usos', 'Curar 2d8+2', 'Estabilizar Auto']
    },

    // === 1 EQUIPAMIENTO POCO COMÚN ===
    {
        id: 'equip_hammock',
        name: '<i class="fas fa-bed"></i> Hamaca Cómoda',
        price: 150,
        rarity: 'uncommon',
        description: 'Hamaca que garantiza descanso perfecto incluso en descansos cortos.',
        effect: 'Descansar en cualquier lugar, recuperar HP máximos en descansos cortos (1 hora)',
        category: 'equipment',
        objectType: 'Equipamiento Poco Común',
        equipmentType: 'Herramientas',
        properties: ['Descanso Corto', 'HP Máximos en 1 hora']
    },

    // ======================================
    // === BRAZALETES (20 items) ===
    // ======================================

    // === 5 BRAZALETES LEGENDARIOS ===
    {
        id: 'bracelet_storm_control',
        name: '<i class="fas fa-bolt"></i> Brazalete del Señor de las Tormentas',
        price: 1450,
        rarity: 'legendary',
        description: 'Brazalete de platino con gemas que canalizan el poder de las tormentas.',
        effect: '+3 Sabiduría, invocar tormenta eléctrica 1/día (8d6 daño en 60 pies), controlar vientos',
        category: 'equipment',
        objectType: 'Brazalete Legendario',
        equipmentType: 'Brazalete',
        properties: ['+3 Sabiduría', 'Tormenta 8d6', 'Control Vientos']
    },
    {
        id: 'bracelet_time_stop',
        name: '<i class="fas fa-clock"></i> Brazalete de Detención Temporal',
        price: 1500,
        rarity: 'legendary',
        description: 'Brazalete con reloj dimensional que manipula el tiempo.',
        effect: '+2 Destreza, +2 Inteligencia, detener tiempo 1 turno 1/día, ralentizar enemigos',
        category: 'equipment',
        objectType: 'Brazalete Legendario',
        equipmentType: 'Brazalete',
        properties: ['+2 DES/INT', 'Detener Tiempo', 'Ralentizar']
    },
    {
        id: 'bracelet_sea_king',
        name: '<i class="fas fa-water"></i> Brazalete del Rey del Mar',
        price: 1400,
        rarity: 'legendary',
        description: 'Brazalete de coral vivo que otorga dominio sobre el océano.',
        effect: '+3 Carisma, controlar agua en 120 pies, respirar bajo el agua, hablar con criaturas marinas',
        category: 'equipment',
        objectType: 'Brazalete Legendario',
        equipmentType: 'Brazalete',
        properties: ['+3 Carisma', 'Controlar Agua', 'Respirar Agua']
    },
    {
        id: 'bracelet_strength',
        name: '<i class="fas fa-fist-raised"></i> Brazalete de la Fuerza Titánica',
        price: 1350,
        rarity: 'legendary',
        description: 'Brazalete de hierro ancestral que otorga fuerza sobrehumana.',
        effect: '+5 Fuerza, ventaja en tiradas de Atletismo, cargar peso x3',
        category: 'equipment',
        objectType: 'Brazalete Legendario',
        equipmentType: 'Brazalete',
        properties: ['+5 Fuerza', 'Ventaja Atletismo', 'Carga x3']
    },
    {
        id: 'bracelet_protection',
        name: '<i class="fas fa-shield"></i> Brazalete de Protección Absoluta',
        price: 1450,
        rarity: 'legendary',
        description: 'Brazalete con escudo mágico invisible.',
        effect: '+3 CA, resistencia a todo daño, escudo contra proyectiles mágicos 3/día',
        category: 'equipment',
        objectType: 'Brazalete Legendario',
        equipmentType: 'Brazalete',
        properties: ['+3 CA', 'Resistencia Todo', 'Escudo Mágico']
    },

    // === 5 BRAZALETES ÉPICOS ===
    {
        id: 'bracelet_fire',
        name: '<i class="fas fa-fire"></i> Brazalete de Llamas Eternas',
        price: 850,
        rarity: 'epic',
        description: 'Brazalete ardiente que nunca quema a su portador.',
        effect: '+2 Constitución, inmunidad fuego, invocar bola de fuego (8d6) 3/día',
        category: 'equipment',
        objectType: 'Brazalete Épico',
        equipmentType: 'Brazalete',
        properties: ['+2 Constitución', 'Inmunidad Fuego', 'Bola Fuego 8d6']
    },
    {
        id: 'bracelet_speed',
        name: '<i class="fas fa-running"></i> Brazalete de Velocidad Suprema',
        price: 800,
        rarity: 'epic',
        description: 'Brazalete plateado que acelera al portador.',
        effect: '+3 Destreza, +30 pies velocidad, acción adicional 1/día',
        category: 'equipment',
        objectType: 'Brazalete Épico',
        equipmentType: 'Brazalete',
        properties: ['+3 Destreza', '+30 Velocidad', 'Acción Extra']
    },
    {
        id: 'bracelet_regeneration',
        name: '<i class="fas fa-heart"></i> Brazalete de Regeneración',
        price: 900,
        rarity: 'epic',
        description: 'Brazalete con gema de vida que cura constantemente.',
        effect: '+2 Constitución, regenerar 5 HP por turno, curar veneno/enfermedad',
        category: 'equipment',
        objectType: 'Brazalete Épico',
        equipmentType: 'Brazalete',
        properties: ['+2 Constitución', 'Regenerar 5 HP', 'Curar Mal']
    },
    {
        id: 'bracelet_telekinesis',
        name: '<i class="fas fa-hand-paper"></i> Brazalete de Telequinesis',
        price: 750,
        rarity: 'epic',
        description: 'Brazalete que permite mover objetos con la mente.',
        effect: '+2 Inteligencia, mover objetos hasta 500 lb, desarm ar enemigos (TS Fuerza CD 16)',
        category: 'equipment',
        objectType: 'Brazalete Épico',
        equipmentType: 'Brazalete',
        properties: ['+2 Inteligencia', 'Mover 500 lb', 'Desarmar']
    },
    {
        id: 'bracelet_luck',
        name: '<i class="fas fa-dice"></i> Brazalete de la Fortuna',
        price: 800,
        rarity: 'epic',
        description: 'Brazalete dorado con símbolos de suerte.',
        effect: '+1 a todas las tiradas, relanzar cualquier tirada 3/día, ventaja en salvaciones',
        category: 'equipment',
        objectType: 'Brazalete Épico',
        equipmentType: 'Brazalete',
        properties: ['+1 Todas Tiradas', 'Relanzar 3/día', 'Ventaja Salvaciones']
    },

    // === 5 BRAZALETES RAROS ===
    {
        id: 'bracelet_accuracy',
        name: '<i class="fas fa-crosshairs"></i> Brazalete de Precisión',
        price: 420,
        rarity: 'rare',
        description: 'Brazalete que mejora la puntería.',
        effect: '+2 Destreza, +2 al ataque a distancia, ignorar cobertura media',
        category: 'equipment',
        objectType: 'Brazalete Raro',
        equipmentType: 'Brazalete',
        properties: ['+2 Destreza', '+2 Ataque Distancia', 'Ignorar Cobertura']
    },
    {
        id: 'bracelet_strength_boost',
        name: '<i class="fas fa-dumbbell"></i> Brazalete de Fuerza',
        price: 380,
        rarity: 'rare',
        description: 'Brazalete que aumenta la fuerza física.',
        effect: '+3 Fuerza, ventaja en tiradas de Atletismo',
        category: 'equipment',
        objectType: 'Brazalete Raro',
        equipmentType: 'Brazalete',
        properties: ['+3 Fuerza', 'Ventaja Atletismo']
    },
    {
        id: 'bracelet_swimming',
        name: '<i class="fas fa-swimmer"></i> Brazalete del Nadador',
        price: 350,
        rarity: 'rare',
        description: 'Brazalete que otorga habilidades acuáticas.',
        effect: '+1 Constitución, velocidad nado 40 pies, respirar bajo el agua',
        category: 'equipment',
        objectType: 'Brazalete Raro',
        equipmentType: 'Brazalete',
        properties: ['+1 Constitución', 'Nado 40 pies', 'Respirar Agua']
    },
    {
        id: 'bracelet_healing',
        name: '<i class="fas fa-hand-holding-heart"></i> Brazalete de Curación',
        price: 400,
        rarity: 'rare',
        description: 'Brazalete con poderes curativos.',
        effect: '+1 Sabiduría, curar 3d8+3 HP a distancia 3/día',
        category: 'equipment',
        objectType: 'Brazalete Raro',
        equipmentType: 'Brazalete',
        properties: ['+1 Sabiduría', 'Curar 3d8+3']
    },
    {
        id: 'bracelet_charisma',
        name: '<i class="fas fa-star"></i> Brazalete del Encanto',
        price: 380,
        rarity: 'rare',
        description: 'Brazalete que hace al portador irresistible.',
        effect: '+3 Carisma, ventaja en Persuasión e Intimidación',
        category: 'equipment',
        objectType: 'Brazalete Raro',
        equipmentType: 'Brazalete',
        properties: ['+3 Carisma', 'Ventaja Social']
    },

    // === 5 BRAZALETES POCO COMUNES ===
    {
        id: 'bracelet_dexterity',
        name: '<i class="fas fa-hand-peace"></i> Brazalete de Agilidad',
        price: 180,
        rarity: 'uncommon',
        description: 'Brazalete que mejora los reflejos.',
        effect: '+2 Destreza, +5 pies velocidad',
        category: 'equipment',
        objectType: 'Brazalete Poco Común',
        equipmentType: 'Brazalete',
        properties: ['+2 Destreza', '+5 Velocidad']
    },
    {
        id: 'bracelet_constitution',
        name: '<i class="fas fa-heartbeat"></i> Brazalete de Vitalidad',
        price: 150,
        rarity: 'uncommon',
        description: 'Brazalete que fortalece la salud.',
        effect: '+2 Constitución, +10 HP máximos',
        category: 'equipment',
        objectType: 'Brazalete Poco Común',
        equipmentType: 'Brazalete',
        properties: ['+2 Constitución', '+10 HP']
    },
    {
        id: 'bracelet_wisdom',
        name: '<i class="fas fa-brain"></i> Brazalete de Sabiduría',
        price: 160,
        rarity: 'uncommon',
        description: 'Brazalete que agudiza la percepción.',
        effect: '+2 Sabiduría, ventaja en Percepción',
        category: 'equipment',
        objectType: 'Brazalete Poco Común',
        equipmentType: 'Brazalete',
        properties: ['+2 Sabiduría', 'Ventaja Percepción']
    },
    {
        id: 'bracelet_intelligence',
        name: '<i class="fas fa-graduation-cap"></i> Brazalete de Intelecto',
        price: 170,
        rarity: 'uncommon',
        description: 'Brazalete que aumenta la inteligencia.',
        effect: '+2 Inteligencia, ventaja en Investigación',
        category: 'equipment',
        objectType: 'Brazalete Poco Común',
        equipmentType: 'Brazalete',
        properties: ['+2 Inteligencia', 'Ventaja Investigación']
    },
    {
        id: 'bracelet_protection_minor',
        name: '<i class="fas fa-shield-virus"></i> Brazalete de Protección Menor',
        price: 140,
        rarity: 'uncommon',
        description: 'Brazalete con escudo protector básico.',
        effect: '+1 CA, resistencia a daño no mágico',
        category: 'equipment',
        objectType: 'Brazalete Poco Común',
        equipmentType: 'Brazalete',
        properties: ['+1 CA', 'Resistencia No Mágico']
    },

    // ======================================
    // === BOTAS (20 items) ===
    // ======================================

    // === 5 BOTAS LEGENDARIAS ===
    {
        id: 'boots_seven_leagues',
        name: '<i class="fas fa-boot"></i> Botas de las Siete Leguas',
        price: 1500,
        rarity: 'legendary',
        description: 'Botas mágicas que permiten viajar enormes distancias.',
        effect: '+50 pies velocidad, teletransporte 1 milla 3/día, caminar sobre agua',
        category: 'equipment',
        objectType: 'Botas Legendarias',
        equipmentType: 'Botas',
        properties: ['+50 Velocidad', 'Teletransporte 1 milla', 'Caminar Agua']
    },
    {
        id: 'boots_levitation',
        name: '<i class="fas fa-cloud"></i> Botas de Levitación',
        price: 1450,
        rarity: 'legendary',
        description: 'Botas que permiten volar libremente.',
        effect: '+3 Destreza, velocidad de vuelo 60 pies, levitar ilimitado',
        category: 'equipment',
        objectType: 'Botas Legendarias',
        equipmentType: 'Botas',
        properties: ['+3 Destreza', 'Vuelo 60 pies', 'Levitar']
    },
    {
        id: 'boots_storm_walker',
        name: '<i class="fas fa-wind"></i> Botas del Caminante de Tormentas',
        price: 1400,
        rarity: 'legendary',
        description: 'Botas que permiten caminar sobre relámpagos.',
        effect: '+2 Destreza, +2 Constitución, inmunidad eléctrica, teletransporte rayo 100 pies',
        category: 'equipment',
        objectType: 'Botas Legendarias',
        equipmentType: 'Botas',
        properties: ['+2 DES/CON', 'Inmunidad Eléctrica', 'Teletransporte Rayo']
    },
    {
        id: 'boots_mountain_king',
        name: '<i class="fas fa-mountain"></i> Botas del Rey de la Montaña',
        price: 1350,
        rarity: 'legendary',
        description: 'Botas que otorgan dominio sobre terreno difícil.',
        effect: '+3 Fuerza, ignorar terreno difícil, escalar a velocidad completa, caminar en vertical',
        category: 'equipment',
        objectType: 'Botas Legendarias',
        equipmentType: 'Botas',
        properties: ['+3 Fuerza', 'Ignorar Terreno', 'Escalar Completo']
    },
    {
        id: 'boots_shadow_step',
        name: '<i class="fas fa-user-ninja"></i> Botas del Paso Sombrío',
        price: 1450,
        rarity: 'legendary',
        description: 'Botas que permiten viajar entre sombras.',
        effect: '+4 Destreza, teletransporte entre sombras 120 pies, invisibilidad en oscuridad',
        category: 'equipment',
        objectType: 'Botas Legendarias',
        equipmentType: 'Botas',
        properties: ['+4 Destreza', 'Teletransporte Sombras', 'Invisible Oscuridad']
    },

    // === 5 BOTAS ÉPICAS ===
    {
        id: 'boots_speed',
        name: '<i class="fas fa-tachometer-alt"></i> Botas de Velocidad',
        price: 850,
        rarity: 'epic',
        description: 'Botas que otorgan velocidad sobrenatural.',
        effect: '+2 Destreza, +40 pies velocidad, acción de Carrera como acción bonus',
        category: 'equipment',
        objectType: 'Botas Épicas',
        equipmentType: 'Botas',
        properties: ['+2 Destreza', '+40 Velocidad', 'Carrera Bonus']
    },
    {
        id: 'boots_jumping',
        name: '<i class="fas fa-frog"></i> Botas del Saltador',
        price: 800,
        rarity: 'epic',
        description: 'Botas que permiten saltos increíbles.',
        effect: '+2 Fuerza, salto x3 distancia, no recibir daño por caída',
        category: 'equipment',
        objectType: 'Botas Épicas',
        equipmentType: 'Botas',
        properties: ['+2 Fuerza', 'Salto x3', 'Sin Daño Caída']
    },
    {
        id: 'boots_water_walking',
        name: '<i class="fas fa-water"></i> Botas del Caminante Acuático',
        price: 750,
        rarity: 'epic',
        description: 'Botas que permiten caminar sobre cualquier líquido.',
        effect: '+1 Destreza, caminar sobre agua y lava, velocidad nado 40 pies',
        category: 'equipment',
        objectType: 'Botas Épicas',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Caminar Líquidos', 'Nado 40 pies']
    },
    {
        id: 'boots_silence',
        name: '<i class="fas fa-volume-mute"></i> Botas del Silencio',
        price: 900,
        rarity: 'epic',
        description: 'Botas que eliminan cualquier sonido.',
        effect: '+3 Destreza, ventaja en Sigilo, movimiento silencioso completo',
        category: 'equipment',
        objectType: 'Botas Épicas',
        equipmentType: 'Botas',
        properties: ['+3 Destreza', 'Ventaja Sigilo', 'Silencio Total']
    },
    {
        id: 'boots_spider_climb',
        name: '<i class="fas fa-spider"></i> Botas de Araña',
        price: 850,
        rarity: 'epic',
        description: 'Botas que permiten trepar por cualquier superficie.',
        effect: '+2 Destreza, escalar en cualquier superficie (incluso techos), velocidad escalada igual a base',
        category: 'equipment',
        objectType: 'Botas Épicas',
        equipmentType: 'Botas',
        properties: ['+2 Destreza', 'Escalar Cualquier', 'Velocidad Completa']
    },

    // === 5 BOTAS RARAS ===
    {
        id: 'boots_athletics',
        name: '<i class="fas fa-running"></i> Botas del Atleta',
        price: 420,
        rarity: 'rare',
        description: 'Botas que mejoran el rendimiento físico.',
        effect: '+2 Destreza, +1 Fuerza, +20 pies velocidad, ventaja en Atletismo',
        category: 'equipment',
        objectType: 'Botas Raras',
        equipmentType: 'Botas',
        properties: ['+2 DES/+1 FUE', '+20 Velocidad', 'Ventaja Atletismo']
    },
    {
        id: 'boots_feather_fall',
        name: '<i class="fas fa-feather"></i> Botas de Caída de Pluma',
        price: 380,
        rarity: 'rare',
        description: 'Botas que previenen daño por caída.',
        effect: '+1 Destreza, caer lentamente, no recibir daño por caída',
        category: 'equipment',
        objectType: 'Botas Raras',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Caída Lenta', 'Sin Daño']
    },
    {
        id: 'boots_stability',
        name: '<i class="fas fa-balance-scale"></i> Botas de Estabilidad',
        price: 350,
        rarity: 'rare',
        description: 'Botas que proporcionan equilibrio perfecto.',
        effect: '+1 Destreza, ventaja vs derribo, inmunidad a terreno difícil',
        category: 'equipment',
        objectType: 'Botas Raras',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Ventaja vs Derribo', 'Ignorar Terreno']
    },
    {
        id: 'boots_ice_walking',
        name: '<i class="fas fa-icicles"></i> Botas de Hielo',
        price: 400,
        rarity: 'rare',
        description: 'Botas que permiten caminar sobre hielo sin resbalar.',
        effect: '+1 Destreza, caminar sobre hielo a velocidad completa, resistencia frío',
        category: 'equipment',
        objectType: 'Botas Raras',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Caminar Hielo', 'Resistencia Frío']
    },
    {
        id: 'boots_endurance',
        name: '<i class="fas fa-shoe-prints"></i> Botas de Resistencia',
        price: 380,
        rarity: 'rare',
        description: 'Botas que nunca cansan al portador.',
        effect: '+2 Constitución, no sufrir cansancio por caminar, +10 pies velocidad',
        category: 'equipment',
        objectType: 'Botas Raras',
        equipmentType: 'Botas',
        properties: ['+2 Constitución', 'Sin Cansancio', '+10 Velocidad']
    },

    // === 5 BOTAS POCO COMUNES ===
    {
        id: 'boots_basic_speed',
        name: '<i class="fas fa-forward"></i> Botas de Rapidez',
        price: 180,
        rarity: 'uncommon',
        description: 'Botas que aumentan la velocidad básica.',
        effect: '+1 Destreza, +15 pies velocidad',
        category: 'equipment',
        objectType: 'Botas Poco Comunes',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', '+15 Velocidad']
    },
    {
        id: 'boots_grip',
        name: '<i class="fas fa-hands"></i> Botas de Agarre',
        price: 150,
        rarity: 'uncommon',
        description: 'Botas con suela adherente.',
        effect: 'Ventaja en tiradas vs resbalones, +5 pies velocidad escalada',
        category: 'equipment',
        objectType: 'Botas Poco Comunes',
        equipmentType: 'Botas',
        properties: ['Ventaja vs Resbalón', '+5 Escalada']
    },
    {
        id: 'boots_comfort',
        name: '<i class="fas fa-smile"></i> Botas Cómodas',
        price: 120,
        rarity: 'uncommon',
        description: 'Botas extremadamente cómodas.',
        effect: 'No sufrir ampollas, +5 pies velocidad, resistencia cansancio pies',
        category: 'equipment',
        objectType: 'Botas Poco Comunes',
        equipmentType: 'Botas',
        properties: ['Sin Ampollas', '+5 Velocidad', 'Resistencia Cansancio']
    },
    {
        id: 'boots_sailor',
        name: '<i class="fas fa-anchor"></i> Botas del Marinero',
        price: 160,
        rarity: 'uncommon',
        description: 'Botas diseñadas para vida en el mar.',
        effect: '+1 Destreza, ventaja en equilibrio en barcos, resistencia mareo',
        category: 'equipment',
        objectType: 'Botas Poco Comunes',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Ventaja Equilibrio', 'Sin Mareo']
    },
    {
        id: 'boots_acrobat',
        name: '<i class="fas fa-theater-masks"></i> Botas del Acróbata',
        price: 170,
        rarity: 'uncommon',
        description: 'Botas ligeras perfectas para acrobacias.',
        effect: '+1 Destreza, ventaja en Acrobacias, +10 pies velocidad salto',
        category: 'equipment',
        objectType: 'Botas Poco Comunes',
        equipmentType: 'Botas',
        properties: ['+1 Destreza', 'Ventaja Acrobacias', '+10 Salto']
    },

    // ======================================
    // === EQUIPO DE BARDO (5 items) ===
    // ======================================

    // === 2 ITEMS LEGENDARIOS DE BARDO ===
    {
        id: 'bard_cape_legend',
        name: '<i class="fas fa-music"></i> Capa del Maestro Trovador',
        price: 1400,
        rarity: 'legendary',
        description: 'Capa que amplifica tu música hasta niveles legendarios.',
        effect: '+3 Carisma, +3 a hechizos de bardo, ventaja en Interpretación, inspiración de bardo aumentada (+1d10)',
        category: 'equipment',
        objectType: 'Equipo Legendario de Bardo',
        equipmentType: 'Herramientas',
        properties: ['+3 Carisma', '+3 Hechizos Bardo', 'Inspiración d10']
    },
    {
        id: 'bard_instrument_legend',
        name: '<i class="fas fa-guitar"></i> Instrumento del Virtuoso Épico',
        price: 1500,
        rarity: 'legendary',
        description: 'Instrumento perfecto que canaliza magia pura.',
        effect: '+2 Carisma o +2 Sabiduría, conjuros de bardo sin componentes materiales, duplicar duración de hechizos',
        category: 'equipment',
        objectType: 'Instrumento Legendario',
        equipmentType: 'Herramientas',
        properties: ['+2 CAR/SAB', 'Sin Materiales', 'Duración x2']
    },

    // === 2 ITEMS ÉPICOS DE BARDO ===
    {
        id: 'bard_collar_epic',
        name: '<i class="fas fa-microphone"></i> Collar del Encantador',
        price: 850,
        rarity: 'epic',
        description: 'Collar que amplifica tu voz y presencia.',
        effect: '+2 Carisma, ventaja en Persuasión/Interpretación/Engaño, hechizar persona 3/día',
        category: 'equipment',
        objectType: 'Equipo Épico de Bardo',
        equipmentType: 'Herramientas',
        properties: ['+2 Carisma', 'Ventaja Social', 'Hechizar 3/día']
    },
    {
        id: 'bard_gloves_epic',
        name: '<i class="fas fa-hand-sparkles"></i> Guantes del Músico Maestro',
        price: 800,
        rarity: 'epic',
        description: 'Guantes que otorgan destreza musical perfecta.',
        effect: '+2 Destreza, ventaja en Interpretación con instrumentos, +2 daño hechizos de bardo',
        category: 'equipment',
        objectType: 'Equipo Épico de Bardo',
        equipmentType: 'Herramientas',
        properties: ['+2 Destreza', 'Ventaja Instrumentos', '+2 Daño Hechizos']
    },

    // === 1 ITEM RARO DE BARDO ===
    {
        id: 'bard_ring_rare',
        name: '<i class="fas fa-ring"></i> Anillo del Contador de Historias',
        price: 420,
        rarity: 'rare',
        description: 'Anillo que hace tus historias irresistibles.',
        effect: '+1 Carisma, ventaja en Persuasión e Interpretación, audiencia cautivada (TS Sabiduría CD 15)',
        category: 'equipment',
        objectType: 'Equipo Raro de Bardo',
        equipmentType: 'Herramientas',
        properties: ['+1 Carisma', 'Ventaja Social', 'Cautivar Audiencia']
    },

    // ======================================
    // === INSTRUMENTOS MUSICALES (8 items: 2 legendary, 1 epic, 2 rare, 2 uncommon, 1 common) ===
    // ======================================

    // === 2 INSTRUMENTOS LEGENDARIOS ===
    {
        id: 'instrument_harp_legendary',
        name: '<i class="fas fa-music"></i> Arpa de las Profundidades',
        price: 1600,
        rarity: 'legendary',
        description: 'Arpa celestial hecha de coral antiguo y cuerdas de sirena. Su música puede calmar tormentas y controlar las mareas.',
        effect: '+3 Carisma o +3 Sabiduría, calmar tormentas marinas, controlar mareas 1/día, hechizo "Calmar Emociones" ilimitado (con concentración y coldown de 10 minutos), controlar criaturas marinas (TS Sabiduría CD 18)',
        category: 'equipment',
        objectType: 'Instrumento Legendario',
        equipmentType: 'Herramientas',
        properties: ['+3 CAR/SAB', 'Control Mareas', 'Calmar Tormentas', 'Dominar Marinos CD 18']
    },
    {
        id: 'instrument_accordion_legendary',
        name: '<i class="fas fa-music"></i> Acordeón del Capitán Eterno',
        price: 1550,
        rarity: 'legendary',
        description: 'Acordeón forjado en las profundidades que amplifica la moral de toda una tripulación. Cada nota inspira valentía sobrenatural.',
        effect: '+3 Carisma, toda la tripulación gana +3 a salvaciones, ventaja en todos los ataques durante 10 minutos al tocar, inmunidad a miedo en 60 pies, resucitar aliado caído 1/semana',
        category: 'equipment',
        objectType: 'Instrumento Legendario',
        equipmentType: 'Herramientas',
        properties: ['+3 Carisma','Aura Heroica', 'Ventaja Grupo', 'Resucitar']
    },

    // === 1 INSTRUMENTO ÉPICO ===
    {
        id: 'instrument_lute_epic',
        name: '<i class="fas fa-music"></i> Laúd Encantado',
        price: 750,
        rarity: 'epic',
        description: 'Laúd mágico que nunca se desafina.',
        effect: '+2 Carisma, +2 a tiradas de Interpretación (instrumentos de cuerda), hechizar con música',
        category: 'equipment',
        objectType: 'Instrumento Épico',
        equipmentType: 'Herramientas',
        properties: ['+2 Carisma', '+2 Interpretación', 'Hechizar Musical']
    },
    {
        id: 'instrument_flute_rare',
        name: '<i class="fas fa-recorder-vertical"></i> Flauta de los Vientos',
        price: 400,
        rarity: 'rare',
        description: 'Flauta que controla los vientos.',
        effect: '+1 Sabiduría, controlar viento menor, ventaja en Interpretación (instrumentos de viento)',
        category: 'equipment',
        objectType: 'Instrumento Raro',
        equipmentType: 'Herramientas',
        properties: ['+1 Sabiduría', 'Control Viento', 'Ventaja Interpretación']
    },
    {
        id: 'instrument_drum_rare',
        name: '<i class="fas fa-drum"></i> Tambores de Guerra',
        price: 380,
        rarity: 'rare',
        description: 'Tambores que inspiran valentía en batalla.',
        effect: '+1 Constitución, aliados a 60 pies ganan +1 ataque/daño, ventaja en Interpretación (percusión)',
        category: 'equipment',
        objectType: 'Instrumento Raro',
        equipmentType: 'Herramientas',
        properties: ['+1 Constitución', '+1 Ataque Aliados', 'Ventaja Interpretación']
    },
    {
        id: 'instrument_violin_uncommon',
        name: '<i class="fas fa-violin"></i> Violín del Marinero',
        price: 180,
        rarity: 'uncommon',
        description: 'Violín clásico con resonancia perfecta.',
        effect: '+1 Destreza, ventaja en Interpretación (instrumentos de cuerda), calmar emociones',
        category: 'equipment',
        objectType: 'Instrumento Poco Común',
        equipmentType: 'Herramientas',
        properties: ['+1 Destreza', 'Ventaja Interpretación', 'Calmar']
    },
    {
        id: 'instrument_horn_uncommon',
        name: '<i class="fas fa-horn"></i> Cuerno del Vigía',
        price: 150,
        rarity: 'uncommon',
        description: 'Cuerno que se escucha a grandes distancias.',
        effect: 'Sonido a 2 millas, señales sonoras, ventaja en Interpretación (instrumentos de viento)',
        category: 'equipment',
        objectType: 'Instrumento Poco Común',
        equipmentType: 'Herramientas',
        properties: ['Sonido 2 Millas', 'Señales', 'Ventaja Interpretación']
    },
    {
        id: 'instrument_lyre_common',
        name: '<i class="fas fa-music"></i> Lira Simple',
        price: 80,
        rarity: 'common',
        description: 'Lira básica pero funcional.',
        effect: 'Interpretación con instrumentos de cuerda, acompañar canciones',
        category: 'equipment',
        objectType: 'Instrumento Común',
        equipmentType: 'Herramientas',
        properties: ['Interpretación Básica', 'Acompañamiento']
    }
];

// Función para inicializar el sistema
document.addEventListener('DOMContentLoaded', function() {
    initializeEquipmentSystem();
    setupEventListeners();
    updateGoldDisplay();
    renderEquipmentGrid();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categorías
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            setActiveFilter(filter);
            updateSubfilters(filter);
            renderEquipmentGrid();
        });
    });

    // Filtros de rareza
    const rarityButtons = document.querySelectorAll('.rarity-button');
    rarityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rarity = this.dataset.rarity;
            setActiveRarity(rarity);
            renderEquipmentGrid();
        });
    });

    // Configurar búsqueda y ordenamiento
    setupSearchAndSortListeners();

    // Toggle del carrito con flecha
    const cartToggle = document.getElementById('cartToggle');
    const goldCounterNew = document.getElementById('goldCounterNew');
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleShoppingCart();
            this.classList.toggle('cart-toggle-expanded');
        });
    }
    if (goldCounterNew) {
        goldCounterNew.addEventListener('click', function() {
            const cartToggleIcon = document.getElementById('cartToggle');
            toggleShoppingCart();
            if (cartToggleIcon) {
                cartToggleIcon.classList.toggle('cart-toggle-expanded');
            }
        });
    }
}

// Actualizar subfiltros según categoría
function updateSubfilters(filter) {
    const subfilterSection = document.getElementById('subfilterSection');
    const subfilterButtons = document.getElementById('subfilterButtons');
    
    currentSubfilter = 'all';
    
    if (filter === 'weapons') {
        subfilterSection.style.display = 'block';
        subfilterButtons.innerHTML = `
            <button class="filter-button active" data-subfilter="all"><i class="fas fa-star"></i> TODAS</button>
            <button class="filter-button" data-subfilter="Armas sencillas"><i class="fas fa-dagger"></i> SIMPLES</button>
            <button class="filter-button" data-subfilter="Armas marciales"><i class="fas fa-sword"></i> MARCIALES</button>
            <button class="filter-button" data-subfilter="Armas de fuego"><i class="fas fa-gun"></i> FUEGO</button>
            <button class="filter-button" data-subfilter="Armas especiales"><i class="fas fa-wand-magic"></i> ESPECIALES</button>
        `;
        setupSubfilterListeners();
    } else if (filter === 'armor') {
        subfilterSection.style.display = 'block';
        subfilterButtons.innerHTML = `
            <button class="filter-button active" data-subfilter="all"><i class="fas fa-star"></i> TODAS</button>
            <button class="filter-button" data-subfilter="Armadura ligera"><i class="fas fa-vest"></i> LIGERA</button>
            <button class="filter-button" data-subfilter="Armadura media"><i class="fas fa-user-shield"></i> MEDIA</button>
            <button class="filter-button" data-subfilter="Armadura pesada"><i class="fas fa-shield"></i> PESADA</button>
            <button class="filter-button" data-subfilter="Escudo"><i class="fas fa-shield-alt"></i> ESCUDO</button>
        `;
        setupSubfilterListeners();
    } else if (filter === 'equipment') {
        subfilterSection.style.display = 'block';
        subfilterButtons.innerHTML = `
            <button class="filter-button active" data-subfilter="all"><i class="fas fa-star"></i> TODOS</button>
            <button class="filter-button" data-subfilter="Sombrero"><i class="fas fa-hat-cowboy"></i> SOMBREROS</button>
            <button class="filter-button" data-subfilter="Brazalete"><i class="fas fa-hand-sparkles"></i> BRAZALETES</button>
            <button class="filter-button" data-subfilter="Botas"><i class="fas fa-boot"></i> BOTAS</button>
            <button class="filter-button" data-subfilter="Herramientas"><i class="fas fa-tools"></i> HERRAMIENTAS</button>
        `;
        setupSubfilterListeners();
    } else {
        subfilterSection.style.display = 'none';
    }
}

// Configurar listeners de subfiltros
function setupSubfilterListeners() {
    const subfilterButtons = document.querySelectorAll('#subfilterButtons .filter-button');
    subfilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentSubfilter = this.dataset.subfilter;
            subfilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderEquipmentGrid();
        });
    });
}

// Configurar filtros activos
function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Actualizar botones de filtro
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.filter === filter);
    });
}

// Configurar filtros de rareza activos
function setActiveRarity(rarity) {
    currentRarity = rarity;
    
    // Actualizar botones de rareza
    const rarityButtons = document.querySelectorAll('.rarity-button');
    rarityButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.rarity === rarity);
    });
}

// Renderizar la grilla UNIFICADA de equipos
function renderEquipmentGrid() {
    // Usar solo la grilla unificada
    const mainGrid = document.getElementById('unifiedEquipmentGrid');
    if (!mainGrid) return;

    // Limpiar grilla
    mainGrid.innerHTML = '';

    // Filtrar items
    let filteredItems = equipmentDatabase.filter(item => {
        // Filtrar por categoría
        const passesCategory = currentFilter === 'all' || currentFilter === item.category;
        
        // Filtrar por rareza
        const passesRarity = currentRarity === 'all' || currentRarity === item.rarity;
        
        // Filtrar por subfiltro (weaponCategory, armorCategory o equipmentType)
        let passesSubfilter = true;
        if (currentSubfilter !== 'all' && currentSubfilter !== null) {
            if (item.weaponCategory) {
                passesSubfilter = item.weaponCategory === currentSubfilter;
            } else if (item.armorCategory) {
                passesSubfilter = item.armorCategory === currentSubfilter;
            } else if (item.equipmentType) {
                passesSubfilter = item.equipmentType === currentSubfilter;
            } else {
                // Si no tiene categoría específica, pasa el subfiltro
                passesSubfilter = true;
            }
        }
        
        // Filtrar por búsqueda de nombre
        const passesSearch = currentSearchTerm === '' || 
                           item.name.toLowerCase().includes(currentSearchTerm) ||
                           item.description.toLowerCase().includes(currentSearchTerm);
        
        // Solo mostrar si pasa todos los filtros
        return passesCategory && passesRarity && passesSubfilter && passesSearch;
    });
    
    // Aplicar ordenamiento
    filteredItems = applySorting(filteredItems);
    
    // Renderizar items
    filteredItems.forEach(item => {
        const itemCard = createItemCard(item);
        mainGrid.appendChild(itemCard);
    });
    
    // Mostrar mensaje si no hay resultados
    if (filteredItems.length === 0) {
        mainGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--gold); font-size: 1.2rem;"><i class="fas fa-search"></i><br><br>No se encontraron objetos con estos criterios</div>';
    }
}

// Crear card de objeto con datos D&D 5E
function createItemCard(item) {
    const isOwned = purchasedItems.includes(item.id);
    const canAfford = currentGold >= item.price;

    const card = document.createElement('div');
    card.className = `item-card ${isOwned ? 'purchased' : ''}`;
    card.dataset.itemId = item.id;

    // Datos adicionales D&D 5E para mostrar
    let additionalData = '';
    if (item.objectType) {
        additionalData = `
            <div class="item-stats">
                <div><strong>Tipo:</strong> ${item.objectType}</div>
                ${item.weaponCategory ? `<div><strong>Categoría:</strong> ${item.weaponCategory}</div>` : ''}
                ${item.armorCategory ? `<div><strong>Categoría:</strong> ${item.armorCategory}</div>` : ''}
                ${item.range ? `<div><strong>Alcance:</strong> ${item.range}</div>` : ''}
                ${item.damageType ? `<div><strong>Tipo de daño:</strong> ${item.damageType}</div>` : ''}
                ${item.hitsWith ? `<div><strong>Para golpear:</strong> ${item.hitsWith}</div>` : ''}
                ${item.damage ? `<div><strong>Daño:</strong> ${item.damage}</div>` : ''}
                ${item.critical ? `<div><strong>Crítico:</strong> ${item.critical}</div>` : ''}
                ${item.armorClass ? `<div><strong>Clase de armadura:</strong> ${item.armorClass}</div>` : ''}
                ${item.weight ? `<div><strong>Peso:</strong> ${item.weight}</div>` : ''}
                ${item.properties ? `<div><strong>Propiedades:</strong> ${item.properties.join(', ')}</div>` : ''}
            </div>
        `;
    }

    card.innerHTML = `
        <div class="item-rarity rarity-${item.rarity}">${item.rarity.toUpperCase()}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-price"><i class="fas fa-coins"></i> ${item.price.toLocaleString()} Monedas de Oro</div>
        <div class="item-description">${item.description}</div>
        ${additionalData}
        <div class="item-effect"><strong>Efecto:</strong> ${item.effect}</div>
        <button class="buy-button ${isOwned ? 'purchased' : ''}" 
                onclick="buyItem('${item.id}')" 
                ${!canAfford && !isOwned ? 'disabled' : ''}>
            ${isOwned ? 'COMPRADO ✓' : (canAfford ? 'COMPRAR' : 'SIN FONDOS')}
        </button>
    `;

    return card;
}

// Sistema de compras
function buyItem(itemId) {
    const item = findItemById(itemId);
    if (!item) return;

    // Verificar si ya se compró
    if (purchasedItems.includes(itemId)) {
        showNotification('¡Ya posees este objeto!', 'warning');
        return;
    }

    // Verificar fondos
    if (currentGold < item.price) {
        showNotification(`No tienes suficientes monedas de oro.\\nPrecio: ${item.price.toLocaleString()}\\nTus monedas: ${currentGold.toLocaleString()}`, 'error');
        return;
    }

    // Realizar compra
    currentGold -= item.price;
    purchasedItems.push(itemId);
    
    // Actualizar interfaz
    updateGoldDisplay();
    updateItemCard(itemId);
    updateShoppingCart();
    
    // Mostrar confirmación
    showNotification(`¡${item.name} comprado por ${item.price.toLocaleString()} monedas de oro!`, 'success');
    
    // Efecto visual de compra
    playPurchaseEffect();
}

// Buscar objeto por ID
function findItemById(itemId) {
    return equipmentDatabase.find(item => item.id === itemId) || null;
}

// Actualizar display de oro
function updateGoldDisplay() {
    const goldAmount = document.getElementById('goldAmount');
    if (goldAmount) {
        goldAmount.textContent = currentGold.toLocaleString();
        
        // Efecto de actualización
        goldAmount.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            goldAmount.parentElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Actualizar card de objeto después de compra
function updateItemCard(itemId) {
    const card = document.querySelector(`[data-item-id="${itemId}"]`);
    if (!card) return;

    const button = card.querySelector('.buy-button');
    
    card.classList.add('purchased');
    button.textContent = 'COMPRADO ✓';
    button.classList.add('purchased');
    button.disabled = false;
    
    // Actualizar otros botones si no se pueden permitir
    document.querySelectorAll('.buy-button:not(.purchased)').forEach(btn => {
        const card = btn.closest('.item-card');
        const itemId = card.dataset.itemId;
        const item = findItemById(itemId);
        
        if (currentGold < item.price) {
            btn.disabled = true;
            btn.textContent = 'SIN FONDOS';
        } else {
            btn.disabled = false;
            btn.textContent = 'COMPRAR';
        }
    });
}

// Toggle del carrito de compras
function toggleShoppingCart() {
    const cart = document.getElementById('shoppingCart');
    if (!cart) return;

    const isVisible = cart.style.display !== 'none';
    cart.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        updateShoppingCart();
    }
}

// Actualizar contenido del carrito
function updateShoppingCart() {
    const cart = document.getElementById('shoppingCart');
    if (!cart) return;

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    // Limpiar items
    cartItems.innerHTML = '';
    
    let totalValue = 0;
    
    purchasedItems.forEach(itemId => {
        const item = findItemById(itemId);
        if (!item) return;
        
        totalValue += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item-new';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} <i class="fas fa-coins"></i></div>
            </div>
            <button class="cart-item-remove" data-item-id="${itemId}" title="Eliminar del carrito">✖</button>
        `;
        
        // Agregar event listener al botón
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', () => removeFromCart(itemId));
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.innerHTML = `Total invertido: ${totalValue.toLocaleString()} <i class="fas fa-coins" style="color: #ffd700;"></i>`;
}

// Función para eliminar item del carrito
function removeFromCart(itemId) {
    const item = findItemById(itemId);
    if (!item) return;
    
    // Devolver el oro
    playerGold += item.price;
    
    // Eliminar del array de comprados
    const index = purchasedItems.indexOf(itemId);
    if (index > -1) {
        purchasedItems.splice(index, 1);
    }
    
    // Actualizar UI
    updateGoldCounter();
    updateShoppingCart();
    renderEquipment();
    
    showNotification(`Has devuelto ${item.name} y recuperado ${item.price} po`, 'info');
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideDown 0.3s ease;
        max-width: 400px;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove después de 4 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Obtener color de notificación
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

// Efecto visual de compra
function playPurchaseEffect() {
    const goldCounter = document.getElementById('goldCounter');
    if (!goldCounter) return;
    
    // Crear partículas de oro
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '<i class="fas fa-coins"></i>';
        particle.style.cssText = `
            position: fixed;
            top: ${goldCounter.offsetTop}px;
            left: ${goldCounter.offsetLeft + Math.random() * 100}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9998;
            animation: particleFall 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Inicializar el sistema
function initializeEquipmentSystem() {
    console.log('Sistema de Equipos BALANCEADO inicializado');
    console.log(`Oro inicial: ${currentGold.toLocaleString()}`);
    console.log(`Objetos disponibles: ${getTotalItemsCount()}`);
}

// Obtener conteo total de objetos
function getTotalItemsCount() {
    return Object.values(equipmentDatabase).reduce((total, category) => total + category.length, 0);
}

// === FUNCIONES DE BÚSQUEDA Y ORDENAMIENTO ===

// Filtrar por búsqueda de nombre
function filterBySearch(searchTerm) {
    currentSearchTerm = searchTerm.toLowerCase().trim();
    renderEquipmentGrid();
}

// Ordenar items
function sortItems(sortOrder) {
    currentSortOrder = sortOrder;
    renderEquipmentGrid();
}

// Aplicar orden a los items
function applySorting(items) {
    const sorted = [...items];
    
    switch (currentSortOrder) {
        case 'nameAZ':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'nameZA':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case 'priceLowHigh':
            return sorted.sort((a, b) => a.price - b.price);
        case 'priceHighLow':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rarity':
            const rarityOrder = { legendary: 0, epic: 1, rare: 2, uncommon: 3, common: 4 };
            return sorted.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
        default:
            return sorted;
    }
}

// Toggle del menú de ordenamiento
function toggleSortMenu() {
    const sortMenu = document.getElementById('sortMenu');
    const isVisible = sortMenu.style.display === 'block';
    sortMenu.style.display = isVisible ? 'none' : 'block';
}

// Configurar listeners para búsqueda y ordenamiento
function setupSearchAndSortListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterBySearch(e.target.value);
        });
        
        // Focus effect
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#ffcc00';
            this.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.5)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'var(--gold)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Sort button
    const sortButton = document.getElementById('sortButton');
    if (sortButton) {
        sortButton.addEventListener('click', toggleSortMenu);
        
        // Hover effects
        sortButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(15deg)';
            this.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.8)';
        });
        
        sortButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.6)';
        });
    }
    
    // Sort options
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', () => {
            const sortType = option.getAttribute('data-sort');
            sortItems(sortType);
            toggleSortMenu();
            
            // Visual feedback
            option.style.background = 'rgba(212, 175, 55, 0.5)';
            setTimeout(() => {
                option.style.background = 'rgba(212, 175, 55, 0.2)';
            }, 200);
        });
        
        // Hover effects
        option.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(212, 175, 55, 0.4)';
            this.style.transform = 'translateX(5px)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(212, 175, 55, 0.2)';
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        const sortButtonContainer = document.getElementById('sortButtonContainer');
        if (sortButtonContainer && !sortButtonContainer.contains(e.target)) {
            document.getElementById('sortMenu').style.display = 'none';
        }
    });
}

// Función para generar PDF con las compras
function generatePDF(blackAndWhite = false) {
    if (purchasedItems.length === 0) {
        showNotification('No hay items en tu carrito para guardar', 'warning');
        return;
    }

    // Verificar que jsPDF esté cargado
    if (typeof window.jspdf === 'undefined') {
        showNotification('Error: Librería PDF no cargada. Recarga la página.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración del documento
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;
    
    // Configuración de colores según modo
    if (blackAndWhite) {
        // Modo Blanco y Negro - Fondo blanco
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Borde negro simple
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(2);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
    } else {
        // Modo Color - Fondo azul oceánico (celeste/turquesa)
        doc.setFillColor(30, 60, 114); // Azul océano oscuro
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Degradado simulado con rectángulos transparentes
        doc.setFillColor(41, 128, 185); // Azul más claro
        doc.setGState(new doc.GState({ opacity: 0.3 }));
        doc.rect(0, 0, pageWidth, pageHeight / 2, 'F');
        doc.setGState(new doc.GState({ opacity: 1 }));
        
        // Borde dorado grueso
        doc.setDrawColor(255, 215, 0);
        doc.setLineWidth(3);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
        
        // Borde interior plateado
        doc.setDrawColor(192, 192, 192);
        doc.setLineWidth(1);
        doc.rect(11, 11, pageWidth - 22, pageHeight - 22);
    }
    
    // Título principal
    doc.setFontSize(26);
    doc.setTextColor(blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 215, blackAndWhite ? 0 : 0);
    doc.setFont('helvetica', 'bold');
    doc.text('EQUIPO PIRATA', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Lista de Compras - D&D 5E', pageWidth / 2, yPos, { align: 'center' });
    
    // Línea separadora dorada
    yPos += 8;
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(1);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    yPos += 10;
    
    // Calcular totales
    let totalGastado = 0;
    purchasedItems.forEach(itemId => {
        const item = findItemById(itemId);
        if (item) totalGastado += item.price;
    });
    
    const oroInicial = 2300;
    const oroRestante = currentGold;
    
    // Información del oro - diseño limpio sin caja
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`Oro inicial:`, margin, yPos);
    doc.setTextColor(blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220);
    doc.setFont('helvetica', 'normal');
    doc.text(`${oroInicial} po`, margin + 30, yPos);
    
    yPos += 6;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`- Gastado:`, margin, yPos);
    doc.setTextColor(blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220);
    doc.setFont('helvetica', 'normal');
    doc.text(`${totalGastado} po`, margin + 30, yPos);
    
    yPos += 2;
    // Línea de separación simple
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + 50, yPos);
    
    yPos += 5;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`= Restante:`, margin, yPos);
    doc.setTextColor(blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220, blackAndWhite ? 0 : 220);
    doc.setFont('helvetica', 'normal');
    doc.text(`${oroRestante} po`, margin + 30, yPos);
    
    yPos += 10;
    
    // Título de items
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 215, blackAndWhite ? 0 : 0);
    doc.text('ITEMS ADQUIRIDOS', margin, yPos);
    yPos += 12;
    
    // Función auxiliar para obtener color según RAREZA
    const getRarityColor = (rarity) => {
        if (blackAndWhite) {
            // En B&N todos los items tienen borde negro
            return [0, 0, 0];
        }
        
        // Colores según rareza
        switch(rarity.toLowerCase()) {
            case 'legendary': return [255, 215, 0]; // Dorado
            case 'epic': return [157, 78, 221]; // Púrpura
            case 'rare': return [59, 130, 246]; // Azul
            case 'uncommon': return [34, 197, 94]; // Verde
            case 'common': return [156, 163, 175]; // Gris
            default: return [255, 255, 255]; // Blanco
        }
    };
    
    // Función para limpiar texto de caracteres especiales y HTML
    const cleanText = (text) => {
        if (!text) return '';
        return text
            .replace(/<[^>]*>/g, '') // Remover HTML
            .replace(/[^\x00-\x7F]/g, '') // Remover caracteres no ASCII
            .trim();
    };
    
    // Función para crear nueva página con fondo
    const createNewPage = () => {
        doc.addPage();
        
        if (blackAndWhite) {
            // Modo B&N
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(2);
            doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
        } else {
            // Modo Color
            doc.setFillColor(30, 60, 114);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            doc.setFillColor(41, 128, 185);
            doc.setGState(new doc.GState({ opacity: 0.3 }));
            doc.rect(0, 0, pageWidth, pageHeight / 2, 'F');
            doc.setGState(new doc.GState({ opacity: 1 }));
            doc.setDrawColor(255, 215, 0);
            doc.setLineWidth(3);
            doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
            doc.setDrawColor(192, 192, 192);
            doc.setLineWidth(1);
            doc.rect(11, 11, pageWidth - 22, pageHeight - 22);
        }
        
        yPos = margin;
    };
    
    // Listar items con formato mejorado
    doc.setFontSize(10);
    
    purchasedItems.forEach((itemId, index) => {
        const item = findItemById(itemId);
        if (!item) return;
        
        // Verificar si necesitamos nueva página
        if (yPos > pageHeight - 50) {
            createNewPage();
        }
        
        const cardHeight = 35;
        const cardY = yPos;
        
        // Obtener color según RAREZA
        const rarityColor = getRarityColor(item.rarity);
        
        // Fondo de la tarjeta
        if (blackAndWhite) {
            doc.setFillColor(255, 255, 255); // Blanco puro
        } else {
            doc.setFillColor(15, 30, 60); // Azul oscuro
        }
        doc.roundedRect(margin, cardY, pageWidth - 2 * margin, cardHeight, 2, 2, 'F');
        
        // Borde según RAREZA
        doc.setDrawColor(rarityColor[0], rarityColor[1], rarityColor[2]);
        doc.setLineWidth(blackAndWhite ? 1 : 1.5);
        doc.roundedRect(margin, cardY, pageWidth - 2 * margin, cardHeight, 2, 2);
        
        // Barra superior con color de rareza (solo en modo color)
        if (!blackAndWhite) {
            doc.setFillColor(rarityColor[0], rarityColor[1], rarityColor[2]);
            doc.setGState(new doc.GState({ opacity: 0.3 }));
            doc.roundedRect(margin, cardY, pageWidth - 2 * margin, 8, 2, 2, 'F');
            doc.setGState(new doc.GState({ opacity: 1 }));
        }
        
        let itemYPos = cardY + 6;
        
        // Número del item
        doc.setFontSize(10);
        doc.setTextColor(blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 215, blackAndWhite ? 0 : 0);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}.`, margin + 3, itemYPos);
        
        // Nombre del item (limpio, sin HTML ni caracteres especiales)
        const cleanName = cleanText(item.name);
        doc.setTextColor(blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 255);
        doc.setFontSize(11);
        doc.text(cleanName, margin + 10, itemYPos);
        
        itemYPos += 6;
        
        // Tipo con icono distintivo
        doc.setFontSize(9);
        doc.setTextColor(blackAndWhite ? 0 : rarityColor[0], blackAndWhite ? 0 : rarityColor[1], blackAndWhite ? 0 : rarityColor[2]);
        doc.setFont('helvetica', 'bold');
        
        let typeText = '';
        if (item.objectType) {
            typeText = cleanText(item.objectType);
        } else if (item.equipmentType) {
            typeText = cleanText(item.equipmentType);
        } else if (item.category) {
            const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
            typeText = cleanText(cat);
        }
        
        if (typeText) {
            doc.text(`> ${typeText}`, margin + 3, itemYPos);
        }
        
        // Rareza y precio en la misma línea
        doc.setTextColor(blackAndWhite ? 0 : rarityColor[0], blackAndWhite ? 0 : rarityColor[1], blackAndWhite ? 0 : rarityColor[2]);
        doc.setFont('helvetica', 'bold');
        const rarityText = item.rarity.toUpperCase();
        doc.text(rarityText, pageWidth - margin - 35, itemYPos);
        
        doc.setTextColor(blackAndWhite ? 0 : 255, blackAndWhite ? 0 : 215, blackAndWhite ? 0 : 0);
        doc.text(`${item.price} po`, pageWidth - margin - 3, itemYPos, { align: 'right' });
        
        itemYPos += 5;
        
        // Línea separadora
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.3);
        doc.line(margin + 3, itemYPos, pageWidth - margin - 3, itemYPos);
        
        itemYPos += 4;
        
        // Descripción/Efecto
        doc.setFontSize(8);
        doc.setTextColor(blackAndWhite ? 0 : 200, blackAndWhite ? 0 : 200, blackAndWhite ? 0 : 220);
        doc.setFont('helvetica', 'normal');
        const effectText = item.effect || item.description || '';
        const effectLines = doc.splitTextToSize(effectText, pageWidth - 2 * margin - 10);
        
        // Limitar a 2 líneas para mantener el diseño compacto
        const maxLines = 2;
        for (let i = 0; i < Math.min(effectLines.length, maxLines); i++) {
            doc.text(effectLines[i], margin + 3, itemYPos);
            itemYPos += 3.5;
        }
        
        if (effectLines.length > maxLines) {
            doc.text('...', margin + 3, itemYPos);
        }
        
        yPos = cardY + cardHeight + 5;
    });
    
    // Footer
    const date = new Date().toLocaleDateString('es-ES');
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generado el ${date} - Sistema de Equipos Piratas D&D 5E`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Descargar PDF
    const fileName = blackAndWhite ? `Equipo_Pirata_BN_${date.replace(/\//g, '-')}.pdf` : `Equipo_Pirata_${date.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    showNotification(`PDF ${blackAndWhite ? 'Blanco y Negro' : 'Color'} generado con éxito!`, 'success');
}

// Exponer funciones globales
window.buyItem = buyItem;
