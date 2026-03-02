/* ============================================
   Copy to Clipboard Function
   ============================================ */
function copyCodeBlock(blockId) {
  const codeElement = document.getElementById(blockId);
  const button = event.currentTarget;
  const copyIcon = button.querySelector('.copy-icon');
  const checkIcon = button.querySelector('.check-icon');
  const copyText = button.querySelector('.copy-text');

  if (!codeElement) return;

  // Copiar al clipboard
  const text = codeElement.textContent;

  navigator.clipboard.writeText(text).then(() => {
    // Cambiar icono y texto
    copyIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    if (copyText) copyText.textContent = '¡Copiado!';
    button.classList.add('copied');

    // Restaurar después de 2 segundos
    setTimeout(() => {
      copyIcon.style.display = 'block';
      checkIcon.style.display = 'none';
      if (copyText) copyText.textContent = 'Copiar';
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
    if (copyText) copyText.textContent = 'Error';
    setTimeout(() => {
      if (copyText) copyText.textContent = 'Copiar';
    }, 2000);
  });
}