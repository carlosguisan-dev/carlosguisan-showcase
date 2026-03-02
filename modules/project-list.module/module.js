// Módulo de Lista de Proyectos
// Funcionalidad adicional si es necesaria

(function() {
  'use strict';
  
  // Inicialización del módulo
  function init() {
    // Lazy loading para imágenes de proyectos (si es necesario)
    const projectImages = document.querySelectorAll('.project-image');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      projectImages.forEach(img => {
        if (img.dataset.src) {
          imageObserver.observe(img);
        }
      });
    }
    
    // Funcionalidad de expandir/colapsar stack tecnológico
    const techStackToggles = document.querySelectorAll('.tech-stack-toggle');
    techStackToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const projectIndex = this.getAttribute('data-project-index');
        const techStack = this.closest('.tech-stack');
        const toggleText = this.querySelector('.toggle-text');
        const hiddenItems = techStack.querySelectorAll('.tech-stack-item.tech-stack-hidden');
        
        if (techStack.classList.contains('expanded')) {
          // Colapsar
          techStack.classList.remove('expanded');
          hiddenItems.forEach(item => {
            item.style.display = 'none';
          });
          const limit = parseInt(techStack.querySelector('.tech-stack-items').getAttribute('data-limit')) || 6;
          const totalItems = techStack.querySelectorAll('.tech-stack-item').length;
          const remaining = totalItems - limit;
          toggleText.textContent = 'Ver más (' + remaining + ')';
        } else {
          // Expandir
          techStack.classList.add('expanded');
          hiddenItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.display = 'flex';
            }, index * 30);
          });
          toggleText.textContent = 'Ver menos';
        }
      });
    });
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
