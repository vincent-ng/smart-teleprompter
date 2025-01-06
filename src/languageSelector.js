export function setupLanguageSelector() {
  const languages = {
    'zh-CN': '中文',
    'en-US': 'English'
  };

  const selector = document.createElement('select');
  selector.id = 'language-selector';
  selector.className = 'language-selector';

  Object.entries(languages).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    selector.appendChild(option);
  });

  // Insert before the start button
  const buttons = document.querySelector('.buttons');
  buttons.insertBefore(selector, buttons.firstChild);

  return selector;
}