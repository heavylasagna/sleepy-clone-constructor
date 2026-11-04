document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    eyelashes: document.querySelectorAll('input[name="eyelashes"]'),
    
    blushSelect: document.getElementById('blush-select'),
    blushColorWrap: document.getElementById('blush-color-wrap'),
    blushColor: document.getElementById('blush-color'),
    blushCustom: document.getElementById('blush-custom-text'),
    
    earsNum: document.getElementById('ears-num'),
    earsType: document.getElementById('ears-type'),
    earsCustom: document.getElementById('ears-custom-text'),

    cheeksSelect: document.getElementById('cheeks-select'),
    cheeksCustom: document.getElementById('cheeks-custom-text'),

    tuftSelect: document.getElementById('tuft-select'),
    tuftCustom: document.getElementById('tuft-custom-text'),

    bangsSelect: document.getElementById('bangs-select'),

    maneSelect: document.getElementById('mane-select'),
    maneCustom: document.getElementById('mane-custom-text'),

    furSelect: document.getElementById('fur-select'),
    furCustom: document.getElementById('fur-custom-text'),

    tailSelect: document.getElementById('tail-select'),
    tailCustom: document.getElementById('tail-custom-text'),

    whiskersSelect: document.getElementById('whiskers-select'),
    whiskersColorWrap: document.getElementById('whiskers-color-wrap'),
    whiskersColor: document.getElementById('whiskers-color'),
    whiskersCustom: document.getElementById('whiskers-custom-text'),

    clothesSelect: document.getElementById('clothes-select'),
    clothesCustom: document.getElementById('clothes-custom-text'),
    clothesLinkInput: document.getElementById('clothes-link-input'),

    toySelect: document.getElementById('toy-select'),
    toyCustom: document.getElementById('toy-custom-text'),
    toyLinkInput: document.getElementById('toy-link-input'),

    linkColor: document.getElementById('link-color'),
    linkRef: document.getElementById('link-ref'),
    linkArt: document.getElementById('link-art'),
    charNotes: document.getElementById('char-notes'),
    addonsText: document.getElementById('addons-text'),

    outlineSelect: document.getElementById('outline-select'),
    outlineColorWrap: document.getElementById('outline-color-wrap'),
    outlineColorPicker: document.getElementById('outline-color-picker'),

    bgSelect: document.getElementById('bg-select'),
    bgColorPickerWrap: document.getElementById('bg-color-picker-wrap'),
    bgColorPicker: document.getElementById('bg-color-picker'),
    bgCustomText: document.getElementById('bg-custom-text'),

    timeSelect: document.getElementById('time-select'),
    paySelect: document.getElementById('pay-select'),
    payProofLink: document.getElementById('pay-proof-link'),

    socialSelect: document.getElementById('social-select'),
    socialLink: document.getElementById('social-link'),

    output: document.getElementById('bbcode-output'),
    btnCopy: document.getElementById('btn-copy'),
    toast: document.getElementById('toast')
  };

  // Переключение видимости полей "Свой вариант" и параметров цвета
  function updateVisibility() {
    // Румянец
    const isBlushCustom = elements.blushSelect.value === 'custom';
    const isBlushActive = elements.blushSelect.value !== '–' && !isBlushCustom;
    elements.blushCustom.classList.toggle('hidden', !isBlushCustom);
    elements.blushColorWrap.classList.toggle('hidden', !isBlushActive);

    // Уши
    elements.earsCustom.classList.toggle('hidden', elements.earsNum.value !== 'custom');

    // Простые текстовые с инпутом "Свой вариант"
    elements.cheeksCustom.classList.toggle('hidden', elements.cheeksSelect.value !== 'custom');
    elements.tuftCustom.classList.toggle('hidden', elements.tuftSelect.value !== 'custom');
    elements.maneCustom.classList.toggle('hidden', elements.maneSelect.value !== 'custom');
    elements.furCustom.classList.toggle('hidden', elements.furSelect.value !== 'custom');
    elements.tailCustom.classList.toggle('hidden', elements.tailSelect.value !== 'custom');

    // Усы
    const isWhiskersCustom = elements.whiskersSelect.value === 'custom';
    const isWhiskersActive = elements.whiskersSelect.value !== '–' && !isWhiskersCustom;
    elements.whiskersCustom.classList.toggle('hidden', !isWhiskersCustom);
    elements.whiskersColorWrap.classList.toggle('hidden', !isWhiskersActive);

    // Одежда и Игрушка
    const isClothesSelected = elements.clothesSelect.value !== '–';
    elements.clothesCustom.classList.toggle('hidden', !isClothesSelected);
    elements.clothesLinkInput.classList.toggle('hidden', !isClothesSelected);

    const isToySelected = elements.toySelect.value !== '–';
    elements.toyCustom.classList.toggle('hidden', !isToySelected);
    elements.toyLinkInput.classList.toggle('hidden', !isToySelected);

    // Обводка
    elements.outlineColorWrap.classList.toggle('hidden', elements.outlineSelect.value !== 'custom');

    // Фон
    const bgVal = elements.bgSelect.value;
    elements.bgColorPickerWrap.classList.toggle('hidden', bgVal !== 'Однотонный');
    elements.bgCustomText.classList.toggle('hidden', bgVal !== 'Другие цвета' && bgVal !== 'Другие элементы на фоне');
  }

  // Привязка слушателей для обновления видимости и рендеринга кода
  document.querySelectorAll('input, select, textarea').forEach(item => {
    item.addEventListener('input', () => {
      updateVisibility();
      generateBBCode();
    });
    item.addEventListener('change', () => {
      updateVisibility();
      generateBBCode();
    });
  });

  // Главная функция сборки BB-Кода
  function generateBBCode() {
    // 1. Ссылки персонажа
    const linkColorVal = elements.linkColor.value.trim() ? `[url=${elements.linkColor.value.trim()}]Окрас[/url]` : 'Окрас';
    const linkRefVal = elements.linkRef.value.trim() ? `[url=${elements.linkRef.value.trim()}]Референс[/url]` : 'Референс';
    const linkArtVal = elements.linkArt.value.trim() ? `[url=${elements.linkArt.value.trim()}]Арт[/url]` : 'Арт';

    // Ресницы
    let lashVal = '–';
    elements.eyelashes.forEach(r => { if (r.checked) lashVal = r.value; });

    // Румянец
    let blushVal = '–';
    if (elements.blushSelect.value === 'custom') {
      blushVal = elements.blushCustom.value.trim() || 'Свой вариант';
    } else if (elements.blushSelect.value !== '–') {
      blushVal = `${elements.blushSelect.value} [${elements.blushColor.value}]`;
    }

    // Уши
    let earsVal = '–';
    if (elements.earsNum.value === 'custom') {
      earsVal = elements.earsCustom.value.trim() || 'Свой вариант';
    } else if (elements.earsNum.value !== '–') {
      earsVal = `${elements.earsNum.value} [${elements.earsType.value}]`;
    }

    // Вспомогательная функция для численных полей
    const getSimpleVal = (selectEl, customEl) => {
      if (selectEl.value === 'custom') return customEl.value.trim() || 'Свой вариант';
      return selectEl.value;
    };

    const cheeksVal = getSimpleVal(elements.cheeksSelect, elements.cheeksCustom);
    const tuftVal = getSimpleVal(elements.tuftSelect, elements.tuftCustom);
    const bangsVal = elements.bangsSelect.value;
    const maneVal = getSimpleVal(elements.maneSelect, elements.maneCustom);
    const furVal = getSimpleVal(elements.furSelect, elements.furCustom);
    const tailVal = getSimpleVal(elements.tailSelect, elements.tailCustom);

    // Усы
    let whiskersVal = '–';
    if (elements.whiskersSelect.value === 'custom') {
      whiskersVal = elements.whiskersCustom.value.trim() || 'Свой вариант';
    } else if (elements.whiskersSelect.value !== '–') {
      whiskersVal = `${elements.whiskersSelect.value} [${elements.whiskersColor.value}]`;
    }

    // Одежда
    let clothesVal = '–';
    if (elements.clothesSelect.value !== '–') {
      const baseName = elements.clothesSelect.value === 'custom' 
        ? (elements.clothesCustom.value.trim() || 'Свой вариант')
        : elements.clothesSelect.value;

      let extraDetails = [];
      if (elements.clothesSelect.value !== 'custom' && elements.clothesCustom.value.trim()) {
        extraDetails.push(elements.clothesCustom.value.trim());
      }
      if (elements.clothesLinkInput.value.trim()) {
        extraDetails.push(`[url=${elements.clothesLinkInput.value.trim()}]фото[/url]`);
      }

      clothesVal = extraDetails.length > 0 ? `${baseName} [${extraDetails.join(', ')}]` : baseName;
    }

    // Игрушка
    let toyVal = '–';
    if (elements.toySelect.value !== '–') {
      const baseName = elements.toySelect.value === 'custom'
        ? (elements.toyCustom.value.trim() || 'Свой вариант')
        : elements.toySelect.value;

      let extraDetails = [];
      if (elements.toySelect.value !== 'custom' && elements.toyCustom.value.trim()) {
        extraDetails.push(elements.toyCustom.value.trim());
      }
      if (elements.toyLinkInput.value.trim()) {
        extraDetails.push(`[url=${elements.toyLinkInput.value.trim()}]фото[/url]`);
      }

      toyVal = extraDetails.length > 0 ? `${baseName} [${extraDetails.join(', ')}]` : baseName;
    }

    // Обводка
    let outlineVal = '–';
    if (elements.outlineSelect.value === 'custom') {
      outlineVal = elements.outlineColorPicker.value;
    } else {
      outlineVal = elements.outlineSelect.value;
    }

    // Фон
    let bgVal = elements.bgSelect.value;
    if (bgVal === 'Однотонный') {
      bgVal = `Однотонный [${elements.bgColorPicker.value}]`;
    } else if ((bgVal === 'Другие цвета' || bgVal === 'Другие элементы на фоне') && elements.bgCustomText.value.trim()) {
      bgVal = `${bgVal} [${elements.bgCustomText.value.trim()}]`;
    }

    // Оплата
    let payVal = elements.paySelect.value;
    if (elements.payProofLink.value.trim()) {
      payVal += ` [[url=${elements.payProofLink.value.trim()}]скриншот оплаты[/url]]`;
    }

    // Соцсеть
    const socialVal = elements.socialLink.value.trim() 
      ? `${elements.socialSelect.value} (${elements.socialLink.value.trim()})`
      : elements.socialSelect.value;

    // Сборка Шаблона
    const bbcode = `[code][b]1.[/b] ${linkColorVal}, ${linkRefVal}, ${linkArtVal}
[b]2.[/b] ${elements.charNotes.value.trim() || '–'}
[b]3.[/b] [header=детали]Детали[/header]
[block=детали][b]Ресницы:[/b] ${lashVal}
[b]Румянец:[/b] ${blushVal}
[b]Уши:[/b] ${earsVal}
[b]Щёки:[/b] ${cheeksVal}
[b]Хохолок:[/b] ${tuftVal}
[b]Чёлка:[/b] ${bangsVal}
[b]Грива:[/b] ${maneVal}
[b]Шерсть:[/b] ${furVal}
[b]Хвост:[/b] ${tailVal}
[b]Усы:[/b] ${whiskersVal}

[b]Одежда:[/b] ${clothesVal}
[b]Игрушка:[/b] ${toyVal}[/block]
[b]4.[/b] ${elements.addonsText.value.trim() || '–'}
[b]5.[/b] Обводка: ${outlineVal}
[b]6.[/b] Фон: ${bgVal}
[b]7.[/b] Время суток: ${elements.timeSelect.value}
[b]8.[/b] Способ оплаты: ${payVal}
[b]9.[/b] Готовую работу прислать в: ${socialVal}[/code]`;

    elements.output.value = bbcode;
  }

  // Копирование в буфер
  elements.btnCopy.addEventListener('click', () => {
    elements.output.select();
    navigator.clipboard.writeText(elements.output.value).then(() => {
      elements.toast.classList.add('show');
      setTimeout(() => elements.toast.classList.remove('show'), 2000);
    });
  });

  // Первоначальный вызов
  updateVisibility();
  generateBBCode();
});
