// Módulo de Filtro de Blog
// Funcionalidad para filtrar posts del blog por búsqueda y categorías
//
// FUNCIONAMIENTO:
// - Los tags redirigen a las páginas de tag de HubSpot (ej: /tag/hubl-basics)
// - Esto permite mostrar todos los posts del tag, incluyendo paginación
// - La búsqueda sigue funcionando en tiempo real para filtrar posts visibles
// - El select redirige a la URL del tag seleccionado

(function() {
  'use strict';
  
  // Inicialización del módulo
  function init() {
    const filterSections = document.querySelectorAll('.blog-filter-section');
    
    filterSections.forEach(section => {
      const filterStyle = section.getAttribute('data-filter-style');
      
      if (filterStyle === 'search_select') {
        initSearchSelectFilter(section);
      } else if (filterStyle === 'carousel') {
        initCarouselFilter(section);
      }
    });
  }
  
  // Inicializar filtro de búsqueda + select
  function initSearchSelectFilter(section) {
    const searchInput = section.querySelector('.blog-filter-search');
    const selectInput = section.querySelector('.blog-filter-select');
    const blogListingUrl = selectInput ? selectInput.getAttribute('data-blog-listing-url') : '';
    
    // Obtener todos los tags únicos de los posts del blog y crear opciones con URLs
    populateSelectOptions(selectInput, blogListingUrl);
    
    // Event listeners
    if (searchInput) {
      // La búsqueda puede seguir funcionando en tiempo real si se desea
      // O se puede redirigir a una página de búsqueda
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
            // Redirigir a página de búsqueda o mantener filtrado en tiempo real
            // Por ahora mantenemos el filtrado en tiempo real para búsqueda
            filterBlogPosts(searchTerm, selectInput ? selectInput.value : '');
          }
        }
      });
      
      searchInput.addEventListener('input', debounce(() => {
        filterBlogPosts(searchInput.value, selectInput ? selectInput.value : '');
      }, 300));
    }
    
    if (selectInput) {
      selectInput.addEventListener('change', () => {
        const selectedValue = selectInput.value;
        
        if (selectedValue === '') {
          // Si selecciona "Todas las categorías", ir a la página principal del blog
          if (blogListingUrl) {
            window.location.href = blogListingUrl;
          }
        } else {
          // Obtener la URL del tag desde la opción seleccionada
          const selectedOption = selectInput.options[selectInput.selectedIndex];
          const tagUrl = selectedOption.getAttribute('data-tag-url');
          
          if (tagUrl) {
            window.location.href = tagUrl;
          }
        }
      });
    }
  }
  
  // Inicializar filtro de carousel
  function initCarouselFilter(section) {
    const carousel = section.querySelector('.blog-filter-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-nav-prev');
    const nextBtn = carousel.querySelector('.carousel-nav-next');
    const indicatorsContainer = section.querySelector('.carousel-indicators');
    
    const itemsDesktop = parseInt(carousel.getAttribute('data-items-desktop')) || 4;
    const itemsTablet = parseInt(carousel.getAttribute('data-items-tablet')) || 3;
    const itemsMobile = parseInt(carousel.getAttribute('data-items-mobile')) || 2;
    const autoPlay = carousel.getAttribute('data-auto-play') === 'true';
    const autoPlayInterval = parseInt(carousel.getAttribute('data-auto-play-interval')) || 3000;
    
    let currentIndex = 0;
    let itemsPerView = getItemsPerView(itemsDesktop, itemsTablet, itemsMobile);
    let autoPlayTimer = null;
    
    // Actualizar items por vista en resize
    function updateItemsPerView() {
      itemsPerView = getItemsPerView(itemsDesktop, itemsTablet, itemsMobile);
      updateCarouselPosition();
      createIndicators();
    }
    
    // Obtener items por vista según el tamaño de pantalla
    function getItemsPerView(desktop, tablet, mobile) {
      if (window.innerWidth <= 480) {
        carousel.style.setProperty("--items-per-view", mobile);
        return mobile;
      } else if (window.innerWidth <= 768) {
        carousel.style.setProperty("--items-per-view", mobile);
        return mobile;
      } else if (window.innerWidth <= 1024) {
        carousel.style.setProperty("--items-per-view", tablet);
        return tablet;
      }
      carousel.style.setProperty("--items-per-view", desktop);
      return desktop;
    }
    
    // Actualizar posición del carousel
    function updateCarouselPosition() {
      const itemWidth = 100 / itemsPerView;
      const gap = 1.5; // rem en CSS
      const gapPercent = (gap * 16) / (track.offsetWidth / itemsPerView) * 100;
      const translateX = -(currentIndex * (itemWidth + gapPercent));
      
      track.style.transform = `translateX(${translateX}%)`;
      updateNavButtons();
      updateIndicators();
    }
    
    // Crear indicadores
    function createIndicators() {
      if (!indicatorsContainer) return;
      
      indicatorsContainer.innerHTML = '';
      const totalPages = Math.ceil(items.length / itemsPerView);
      
      for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('aria-label', `Ir a la página ${i + 1}`);
        indicator.addEventListener('click', () => {
          currentIndex = i;
          updateCarouselPosition();
        });
        indicatorsContainer.appendChild(indicator);
      }
      
      updateIndicators();
    }
    
    // Actualizar indicadores activos
    function updateIndicators() {
      if (!indicatorsContainer) return;
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Actualizar botones de navegación
    function updateNavButtons() {
      const maxIndex = Math.max(0, Math.ceil(items.length / itemsPerView) - 1);
      
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex >= maxIndex;
      }
    }
    
    // Navegación anterior
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentIndex > 0) {
          currentIndex--;
          updateCarouselPosition();
          resetAutoPlay();
        }
      });
    }
    
    // Navegación siguiente
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const maxIndex = Math.max(0, Math.ceil(items.length / itemsPerView) - 1);
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarouselPosition();
          resetAutoPlay();
        }
      });
    }
    
    // Los items del carousel ahora son enlaces <a>, así que no necesitamos event listeners
    // El navegador manejará la navegación automáticamente
    // El estado activo se maneja más abajo en el código
    
    // Auto-play
    function startAutoPlay() {
      if (!autoPlay) return;
      
      autoPlayTimer = setInterval(() => {
        const maxIndex = Math.max(0, Math.ceil(items.length / itemsPerView) - 1);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarouselPosition();
      }, autoPlayInterval);
    }
    
    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }
    
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }
    
    // Pausar auto-play al hacer hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Inicializar
    updateItemsPerView();
    createIndicators();
    updateNavButtons();
    
    // Actualizar en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateItemsPerView();
      }, 250);
    });
    
    // Iniciar auto-play si está habilitado
    if (autoPlay) {
      startAutoPlay();
    }
    
    // Marcar el item activo basado en la URL actual
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;
    let hasActiveItem = false;
    
    // Extraer el slug del tag de la URL actual si estamos en una página de tag
    // Formato esperado: /tag/slug o /blog/tag/slug
    const tagMatch = currentPath.match(/\/tag\/([^\/\?]+)/);
    let currentTagSlug = null;
    
    if (tagMatch) {
      try {
        // Decodificar la URL para manejar acentos y caracteres especiales
        currentTagSlug = decodeURIComponent(tagMatch[1]);
      } catch (e) {
        // Si falla la decodificación, usar el valor original
        currentTagSlug = tagMatch[1];
      }
    }
    
    // Si estamos en una página de tag, buscar el item correspondiente
    if (currentTagSlug) {
      items.forEach(item => {
        // Ignorar items deshabilitados (sin posts)
        if (item.classList.contains('carousel-item-disabled')) {
          return;
        }
        
        const itemTagSlug = item.getAttribute('data-tag-slug');
        if (itemTagSlug) {
          // Normalizar ambos slugs para comparación
          // Decodificar el itemTagSlug por si acaso también está codificado
          let normalizedItemSlug = itemTagSlug;
          try {
            normalizedItemSlug = decodeURIComponent(itemTagSlug);
          } catch (e) {
            // Si falla, usar el valor original
            normalizedItemSlug = itemTagSlug;
          }
          
          // Comparar los slugs normalizados (sin codificación)
          if (normalizedItemSlug === currentTagSlug) {
            item.classList.add('active');
            hasActiveItem = true;
          }
        }
      });
    } else {
      // Si no estamos en una página de tag, verificar si estamos en la página principal del blog
      items.forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
          // Comparar paths sin parámetros de consulta
          const itemPath = new URL(href, window.location.origin).pathname;
          const currentPathClean = new URL(currentUrl).pathname;
          
          // Si el href coincide con la URL actual (página principal del blog)
          if (itemPath === currentPathClean && item.classList.contains('carousel-item-all')) {
            item.classList.add('active');
            hasActiveItem = true;
          }
        }
      });
    }
    
    // Si no hay item activo y estamos en la página principal del blog, activar "Todos"
    if (!hasActiveItem && !currentPath.includes('/tag/')) {
      const allItem = items[0];
      if (allItem && allItem.classList.contains('carousel-item-all')) {
        allItem.classList.add('active');
      }
    }
  }
  
  // Poblar opciones del select con tags únicos
  function populateSelectOptions(selectInput, blogListingUrl) {
    if (!selectInput) return;
    
    // Obtener todos los posts del blog listing
    const blogPosts = document.querySelectorAll('.hs-blog-post-listing__post');
    const tagsSet = new Set();
    
    blogPosts.forEach(post => {
      const tagLinks = post.querySelectorAll('a.hs-blog-post-listing__post-tag');
      tagLinks.forEach(link => {
        const tagText = link.textContent.trim();
        const tagHref = link.getAttribute('href');
        if (tagText && tagHref) {
          // Extraer slug del tag desde la URL
          const slugMatch = tagHref.match(/\/tag\/([^\/]+)/);
          if (slugMatch) {
            tagsSet.add(JSON.stringify({
              name: tagText,
              slug: slugMatch[1],
              url: tagHref
            }));
          }
        }
      });
    });
    
    // Agregar opciones al select con URLs
    const tagsArray = Array.from(tagsSet).map(tag => JSON.parse(tag));
    tagsArray.sort((a, b) => a.name.localeCompare(b.name));
    
    tagsArray.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag.slug;
      option.textContent = tag.name;
      option.setAttribute('data-tag-url', tag.url);
      selectInput.appendChild(option);
    });
  }
  
  // Filtrar posts del blog
  function filterBlogPosts(searchTerm, tagSlug) {
    const blogPosts = document.querySelectorAll('.hs-blog-post-listing__post');
    let visibleCount = 0;
    
    blogPosts.forEach(post => {
      let matchesSearch = true;
      let matchesTag = true;
      
      // Filtrar por búsqueda
      if (searchTerm && searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        const title = post.querySelector('.hs-blog-post-listing__post-title');
        const summary = post.querySelector('.hs-blog-post-listing__post-summary');
        const content = (title ? title.textContent : '') + ' ' + (summary ? summary.textContent : '');
        
        matchesSearch = content.toLowerCase().includes(searchLower);
      }
      
      // Filtrar por tag
      if (tagSlug && tagSlug.trim() !== '') {
        const tagLinks = post.querySelectorAll('a.hs-blog-post-listing__post-tag');
        let hasMatchingTag = false;
        
        tagLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.includes('/tag/' + tagSlug)) {
            hasMatchingTag = true;
          }
        });
        
        matchesTag = hasMatchingTag;
      }
      
      // Mostrar u ocultar post
      if (matchesSearch && matchesTag) {
        post.classList.remove('filtered-out');
        visibleCount++;
      } else {
        post.classList.add('filtered-out');
      }
    });
    
    // Mostrar mensaje si no hay resultados
    showNoResultsMessage(visibleCount === 0 && (searchTerm || tagSlug));
    
    // Actualizar URL
    updateURL(searchTerm, tagSlug);
  }
  
  // Mostrar mensaje cuando no hay resultados
  function showNoResultsMessage(show) {
    let messageEl = document.getElementById('blog-filter-no-results');
    
    if (show) {
      if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'blog-filter-no-results';
        messageEl.className = 'blog-filter-no-results';
        messageEl.innerHTML = '<p>No se encontraron posts que coincidan con los filtros seleccionados.</p>';
        
        const blogListing = document.querySelector('.hs-blog-post-listing');
        if (blogListing) {
          blogListing.parentNode.insertBefore(messageEl, blogListing.nextSibling);
        }
      }
      messageEl.style.display = 'block';
    } else {
      if (messageEl) {
        messageEl.style.display = 'none';
      }
    }
  }
  
  // Actualizar URL con parámetros de búsqueda (solo para búsqueda, no para tags)
  function updateURL(searchTerm, tagSlug) {
    // Solo actualizamos la URL si hay búsqueda, los tags ahora redirigen directamente
    if (searchTerm && searchTerm.trim() !== '') {
      const url = new URL(window.location.href);
      url.searchParams.set('search', searchTerm.trim());
      window.history.replaceState({}, '', url);
    } else {
      // Limpiar parámetro de búsqueda si está vacío
      const url = new URL(window.location.href);
      url.searchParams.delete('search');
      window.history.replaceState({}, '', url);
    }
  }
  
  // Función debounce para optimizar búsqueda
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Re-inicializar si se carga contenido dinámicamente
  if (typeof window.hsOnReady === 'function') {
    window.hsOnReady.push(init);
  }
})();
