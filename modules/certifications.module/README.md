# Módulo de Certificaciones HubSpot Academy

Este módulo personalizado permite mostrar las certificaciones de HubSpot Academy de manera profesional y atractiva en el portfolio de Carlos Guisan.

## 🎯 Características

- **Badges Oficiales**: Soporte para embeds oficiales de HubSpot Academy
- **Fallback Visual**: Íconos emoji cuando no hay embed disponible
- **Responsive Design**: Adaptable a todos los dispositivos
- **Personalizable**: Colores y estilos configurables
- **Certificación Adicional**: Soporte para mostrar contribuciones adicionales

## 📋 Campos de Configuración

### Configuración General
- **Título de la Sección**: Título principal de la sección
- **Texto Introductorio**: Descripción que aparece debajo del título

### Certificaciones (Repeater)
- **Título de la Certificación**: Nombre de la certificación
- **Emisor**: Quién emitió la certificación
- **Ícono (emoji)**: Emoji que representa la certificación
- **Código Embed**: Código embed oficial de HubSpot Academy
- **URL de la Certificación**: Enlace directo (opcional)

### Certificación Adicional
- **Mostrar Certificación Adicional**: Activar/desactivar
- **Texto de Certificación Adicional**: Texto personalizado

### Estilos
- **Color de Fondo**: Color de fondo de la sección
- **Color del Texto**: Color principal del texto
- **Color de Acento**: Color para bordes y elementos destacados

## 🚀 Cómo Usar

### 1. Agregar el Módulo
1. En el editor de HubSpot, arrastra el módulo "Certificaciones HubSpot Academy" a tu página
2. Configura los campos según tus necesidades

### 2. Obtener Embeds de HubSpot Academy
1. Ve a tu perfil en HubSpot Academy
2. Busca la sección "Certificaciones"
3. Copia el código embed de cada certificación
4. Pégalo en el campo "Código Embed de HubSpot Academy"

### 3. Configuración Recomendada
- **Título**: "Certificaciones HubSpot Academy"
- **Intro**: "Formación oficial que valida mi expertise técnico en la plataforma HubSpot"
- **Certificaciones**: Agregar las 5 certificaciones principales
- **Certificación Adicional**: Activar para mostrar contribución a WordPress

## 🎨 Estilos CSS

El módulo incluye estilos CSS completos que se integran con el sistema de diseño del portfolio:

- Variables CSS para colores de marca
- Responsive design con breakpoints
- Animaciones suaves
- Estados de hover
- Estados de carga

## 📱 Responsive Breakpoints

- **Desktop**: 5 columnas
- **Tablet (≤1024px)**: 3 columnas
- **Mobile (≤768px)**: 2 columnas
- **Mobile pequeño (≤480px)**: 1 columna

## 🔧 Personalización Avanzada

Para personalizaciones adicionales, edita el archivo `module.css`:

```css
/* Cambiar el tamaño de los badges */
.cert-badge {
  width: 100px;
  height: 100px;
}

/* Cambiar el espaciado */
.certifications-section {
  padding: 100px 0;
}

/* Personalizar animaciones */
.cert-card {
  animation: fadeInUp 0.8s ease-out;
}
```

## 📝 Notas Importantes

1. **Embeds de HubSpot**: Los embeds oficiales tienen prioridad sobre los íconos emoji
2. **Fallback**: Si no hay embed, se muestra el ícono emoji configurado
3. **Enlaces**: Los enlaces a certificaciones se abren en nueva pestaña
4. **SEO**: Los títulos y textos son indexables por motores de búsqueda

## 🐛 Solución de Problemas

### El embed no se muestra
- Verifica que el código embed sea completo
- Asegúrate de que no haya caracteres extra
- Prueba con un embed de otra certificación

### Los estilos no se aplican
- Verifica que el archivo `module.css` esté cargado
- Revisa que no haya conflictos con otros CSS
- Usa las herramientas de desarrollador para debuggear

### Responsive no funciona
- Verifica que los breakpoints estén correctos
- Asegúrate de que el viewport meta tag esté presente
- Prueba en diferentes dispositivos

## 📞 Soporte

Para soporte técnico o personalizaciones adicionales, contacta a Carlos Guisan:
- Email: carlosguisan@gmail.com
- LinkedIn: /in/carlosguisan
