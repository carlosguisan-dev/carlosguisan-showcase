# Módulo de Filtro de Blog

Este módulo personalizado permite filtrar las publicaciones del blog por categorías/tags. Incluye dos estilos diferentes: uno con búsqueda y select, y otro con un carousel de tags interactivo.

## 🎯 Características

- **Dos Estilos de Filtro**:
  - **Búsqueda + Select**: Campo de búsqueda de texto y select para filtrar por categoría
  - **Carousel de Tags**: Carousel interactivo con tags personalizables, iconos y descripciones

- **Funcionalidades**:
  - Búsqueda en tiempo real por texto
  - Filtrado por tags/categorías
  - Actualización de URL con parámetros de filtro
  - Navegación del carousel con flechas e indicadores
  - Auto-play opcional para el carousel
  - Diseño responsive
  - Iconos personalizables (emoji, FontAwesome, imagen)
  - Descripciones editables para cada tag

## 📋 Campos de Configuración

### Configuración General

- **Estilo de Filtro**: Selecciona entre "Búsqueda + Select" o "Carousel de Tags"

### Para Estilo "Búsqueda + Select"

- **Placeholder del Campo de Búsqueda**: Texto que aparece en el campo de búsqueda
- **Etiqueta del Select**: Texto de la etiqueta del select
- **Opción por Defecto del Select**: Texto de la opción "mostrar todos"

### Para Estilo "Carousel de Tags"

- **Tags del Carousel**: Lista de tags con las siguientes propiedades:
  - **Tag del Blog**: Selector de tags del blog (usa el selector nativo de HubSpot)
  - **Tipo de Icono**: Emoji, FontAwesome o Imagen
  - **Icono**: El icono correspondiente según el tipo seleccionado
  - **Descripción del Tag**: Descripción breve que aparece en el carousel

- **Configuración del Carousel**:
  - **Items Visibles en Desktop/Tablet/Mobile**: Número de tags visibles
  - **Mostrar Flechas de Navegación**: Activar/desactivar flechas
  - **Reproducción Automática**: Activar/desactivar auto-play
  - **Intervalo de Reproducción**: Tiempo entre slides (en milisegundos)

### Personalización de Estilos

- **Color de Fondo**: Color de fondo del contenedor
- **Color del Texto**: Color del texto principal
- **Color del Borde**: Color de los bordes
- **Color de Acento**: Color para elementos destacados
- **Color de Acento (Hover)**: Color al pasar el mouse

## 🚀 Cómo Usar

### 1. Agregar el Módulo

1. En el editor de HubSpot, arrastra el módulo "Filtro de Blog" a tu página de blog listing
2. Colócalo antes del módulo `@hubspot/blog_listing` para que los filtros aparezcan arriba

### 2. Configurar el Estilo

#### Estilo "Búsqueda + Select"

1. Selecciona "Búsqueda + Select" en el campo "Estilo de Filtro"
2. Personaliza los textos del placeholder, etiqueta y opción por defecto
3. El select se llenará automáticamente con los tags de los posts del blog

#### Estilo "Carousel de Tags"

1. Selecciona "Carousel de Tags" en el campo "Estilo de Filtro"
2. Agrega los tags que deseas mostrar en el carousel
3. Para cada tag:
   - Selecciona el tag del blog usando el selector "Tag del Blog" (selecciona directamente desde los tags disponibles en tu blog)
   - Selecciona el tipo de icono y agrégalo
   - Agrega una descripción opcional
4. Configura el número de items visibles y otras opciones del carousel

### 4. Personalizar Estilos

Ajusta los colores y estilos según tu tema:
- Usa los colores de tu marca para los colores de acento
- Ajusta los colores de fondo y texto para que coincidan con tu diseño
- Personaliza el número de items visibles en el carousel según tu diseño

## 💡 Ejemplo de Uso

### Ejemplo 1: Filtro Simple con Búsqueda

```
Estilo: Búsqueda + Select
Placeholder: "Buscar en el blog..."
Etiqueta Select: "Categorías"
Opción por Defecto: "Todas"
```

### Ejemplo 2: Carousel con Tags Personalizados

```
Estilo: Carousel de Tags

Tag 1:
- Tag del Blog: Seleccionar "Desarrollo Web" desde el selector
- Icono: 🚀 (emoji)
- Descripción: "Artículos sobre desarrollo web"

Tag 2:
- Tag del Blog: Seleccionar "Marketing" desde el selector
- Icono: FontAwesome (megaphone)
- Descripción: "Estrategias de marketing digital"
```

## 🔧 Funcionalidades Técnicas

- **Filtrado en Tiempo Real**: Los posts se filtran mientras escribes
- **Debounce**: La búsqueda tiene un delay de 300ms para optimizar el rendimiento
- **URL Parameters**: Los filtros se reflejan en la URL para compartir y bookmarking
- **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Accesibilidad**: Incluye atributos ARIA y navegación por teclado

## 📱 Responsive

El módulo se adapta automáticamente:
- **Desktop**: Muestra el número configurado de items
- **Tablet**: Reduce el número de items visibles
- **Mobile**: Muestra menos items y oculta las flechas de navegación

## 🎨 Personalización Avanzada

Puedes personalizar aún más los estilos editando el archivo `module.css`:
- Ajusta los tamaños de fuente
- Modifica los espaciados
- Cambia las animaciones
- Personaliza los efectos hover

## ⚠️ Notas Importantes

1. **Selector de Tags**: El campo "Tag del Blog" usa el selector nativo de HubSpot, por lo que solo puedes seleccionar tags que ya existen en tu blog
2. **Orden de Módulos**: Coloca este módulo antes del módulo `@hubspot/blog_listing`
3. **Tags Dinámicos**: El estilo "Búsqueda + Select" detecta automáticamente los tags de los posts
4. **Carousel Manual**: En el estilo carousel, debes agregar manualmente los tags que quieres mostrar usando el selector de tags
