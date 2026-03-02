# Carlosguisan Showcase - HubSpot Theme

Este es el repositorio oficial del tema secundario **Carlosguisan Showcase**, derivado con propósitos de personalización del tema **Showcase** de [Stephanie O'Gay García](https://www.stephanieogaygarcia.com/), disponible en el [marketplace de HubSpot](https://ecosystem.hubspot.com/marketplace/website/showcase-theme-by-stephanie-o-gay-garcia).
Este proyecto utiliza un flujo de trabajo automatizado para el despliegue de cambios en Hubspot Content Hub.

## 🚀 Flujo de Trabajo (CI/CD)

Este repositorio está integrado con **GitHub Actions**. Cada vez que realices un `push` a la rama `master`, se activará un proceso automático que subirá todos los archivos al portal de HubSpot.

### Comandos de Git usuales:

1. **Guardar cambios y subir:**

   ```bash
   git add .
   git commit -m "Descripción de tus cambios"
   git push origin master
   ```

2. **Ver estado del despliegue:**
   Puedes monitorear la subida en la pestaña **"Actions"** de este repositorio en GitHub.

## 📁 Estructura del Proyecto

- `.github/workflows/deploy.yml`: Configuración del despliegue automático.
- `modules/`: Módulos personalizados de HubSpot.
- `templates/`: Plantillas de página y de sistema.
- `css/` & `js/`: Archivos de estilo y lógica global.
- `theme.json`: Configuración oficial del tema.

## ⚠️ Notas Importantes

- **Archivos Ignorados**: Los archivos `.md` (incluyendo este README), archivos de configuración local como `.hsaccount`, y dependencias de Node están configurados en el archivo `.hsignore` para que **NO** se suban a HubSpot, manteniendo tu portal limpio.
- **Carpetas .module**: HubSpot no permite archivos adicionales (como README o archivos de ejemplo) dentro de las carpetas `.module`. Asegúrate de no añadirlos ahí.

---

_Desarrollado con ❤️ para [Carlosguisan.dev](https://www.carlosguisan.dev/)_
