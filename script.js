document.addEventListener('DOMContentLoaded', () => {
  // Находим все необходимые элементы DOM
  const elements = {
    eyelashes: document.querySelectorAll('input[name="eyelashes"]'),
    
    blushSelect: document.getElementById('blush-select'),
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
    whiskersColor: document.getElementById('whiskers-color'),
    whiskersCustom: document.getElementById('whiskers-custom-text'),

    clothesSelect: document.getElementById('clothes-select'),
    clothesCustom: document.getElementById('clothes-custom-text'),
    clothesFileWrap: document.getElementById('clothes-file-wrap'),
    clothesFile: document.getElementById('clothes-file'),
    clothesPreview: document.getElementById('clothes-preview'),

    toySelect: document.getElementById('toy-select'),
    toyCustom: document.getElementById('toy-custom-text'),
    toyFileWrap: document.getElementById('toy-file-wrap'),
    toyFile: document.getElementById('toy-file'),
    toyPreview: document.getElementById('toy-preview'),

    linkColor: document.getElementById('link-color'),
    linkRef: document.getElementById('link-ref'),
    linkArt: document.getElementById('link-art'),
    charNotes: document.getElementById('char-notes'),
    addonsText: document.getElementById('addons-text'),

    outlineSelect: document.getElementById('outline-select'),
    outlineColor: document.getElementById('outline-color'),

    bgSelect: document.getElementById('bg-select'),
    bgCustomColor: document.getElementById('bg-custom-color'),

    timeSelect: document.getElementById('time-select'),
    paySelect: document.getElementById('pay-select'),
    payProofLink: document.getElementById('pay-proof-link'),

    socialSelect: document.getElementById('social-select'),
    socialLink: document.getElementById('social-link'),

    output: document.getElementById('bbcode-output'),
    btnCopy: document.getElementById('btn-copy'),
    toast: document.getElementById('toast'),

    charFile: document.getElementById('char-file'),
    charPreviewGrid: document.getElementById('char-preview-grid')
  };

  // Показ/Скрытие "Свой вариант" и доп. полей
  function toggleCustom(selectEl, customEl, wrapEl = null) {
    const isCustom = selectEl.value === 'custom';
    if (customEl) customEl.classList.toggle('hidden', !isCustom);
    if (wrapEl) wrapEl.classList.toggle('hidden', !isCustom);
  }

  // Привязываем события скрытия/показа
  elements.blushSelect.addEventListener('change', () => toggleCustom(elements.blushSelect, elements.blushCustom));
  elements.earsNum.addEventListener('change', () => toggleCustom(elements.earsNum, elements.earsCustom));
  elements.cheeksSelect.addEventListener('change', () => toggleCustom(elements.cheeksSelect, elements.cheeksCustom));
  elements.tuftSelect.addEventListener('change', () => toggleCustom(elements.tuftSelect, elements.tuftCustom));
  elements.maneSelect.addEventListener('change', () => toggleCustom(elements.maneSelect, elements.maneCustom));
  elements.furSelect.addEventListener('change', () => toggleCustom(elements.furSelect, elements.furCustom));
  elements.tailSelect.addEventListener('change', () => toggleCustom(elements.tailSelect, elements.tailCustom));
  elements.whiskersSelect.addEventListener('change', () => toggleCustom(elements.whiskersSelect, elements.whiskersCustom));
  
  elements.clothesSelect.addEventListener('change', () => toggleCustom(elements.clothesSelect, elements.clothesCustom, elements.clothesFileWrap));
  elements.toySelect.addEventListener('change', () => toggleCustom(elements.toySelect, elements.toyCustom, elements.toyFileWrap));
  
  elements.outlineSelect.addEventListener('change', () => toggleCustom(elements.outlineSelect, elements.outlineColor));
  elements.bgSelect.addEventListener('change', () => {
    const isOneColor = elements.bgSelect.value === 'Однотонный';
    elements.bgCustomColor.classList.toggle('hidden', !isOneColor);
  });

  // Загрузка предпросмотров файлов
  function setupFilePreview(inputEl, containerEl) {
    inputEl.addEventListener('change', (e) => {
      containerEl.innerHTML = '';
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = document.createElement('img');
          img.src = ev.target.result;
          containerEl.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
      generateBBCode();
    });
  }

  setupFilePreview(elements.clothesFile, elements.clothesPreview);
  setupFilePreview(elements.toyFile, elements.toyPreview);
  setupFilePreview(elements.charFile, elements.charPreviewGrid);

  // Слушатели событий для мгновенного обновления кода
  document.querySelectorAll('input, select, textarea').forEach(item => {
    item.addEventListener('input', generateBBCode);
    item.addEventListener('change', generateBBCode);
  });

  // Главная функция сборки BB-Кода
  function generateBBCode() {
    // 1. Ссылки
    const linkColorVal = elements.linkColor.value.trim() ? `[url=${elements.linkColor.value.trim()}]Окрас[/url]` : 'Окрас';
    const linkRefVal = elements.linkRef.value.trim() ? `[url=${elements.linkRef.value.trim()}]Референс[/url]` : 'Референс';
    const linkArtVal = elements.linkArt.value.trim() ? `[url=${elements.linkArt.value.trim()}]Арт[/url]` : 'Арт';

    // Ресницы
    let lashVal = '–';
    elements.eyelashes.forEach(r => { if(r.checked) lashVal = r.value; });

    // Румянец
    let blushVal = '–';
    if (elements.blushSelect.value === 'custom') {
      blushVal = elements.blushCustom.value || 'Свой вариант';
    } else if (elements.blushSelect.value !== '–') {
      blushVal = `${elements.blushSelect.value} [${elements.blushColor.value}]`;
    }

    // Уши
    let earsVal = '–';
    if (elements.earsNum.value === 'custom') {
      earsVal = elements.earsCustom.value || 'Свой вариант';
    } else if (elements.earsNum.value !== '–') {
      earsVal = `${elements.earsNum.value} [${elements.earsType.value}]`;
    }

    // Щёки, Хохолок, Чёлка, Грива, Шерсть, Хвост
    const getSimpleVal = (selectEl, customEl) => {
      if (selectEl.value === 'custom') return customEl.value || 'Свой вариант';
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
      whiskersVal = elements.whiskersCustom.value || 'Свой вариант';
    } else if (elements.whiskersSelect.value !== '–') {
      whiskersVal = `${elements.whiskersSelect.value} [${elements.whiskersColor.value}]`;
    }

    // Одежда
    let clothesVal = '–';
    if (elements.clothesSelect.value === 'custom') {
      clothesVal = elements.clothesCustom.value || 'Свой вариант';
    } else if (elements.clothesSelect.value !== '–') {
      clothesVal = elements.clothesCustom.value 
        ? `${elements.clothesSelect.value} [${elements.clothesCustom.value}]` 
        : elements.clothesSelect.value;
    }

    // Игрушка
    let toyVal = '–';
    if (elements.toySelect.value === 'custom') {
      toyVal = elements.toyCustom.value || 'Свой вариант';
    } else if (elements.toySelect.value !== '–') {
      toyVal = elements.toyCustom.value 
        ? `${elements.toySelect.value} [${elements.toyCustom.value}]` 
        : elements.toySelect.value;
    }

    // Обводка
    let outlineVal = '–';
    if (elements.outlineSelect.value === 'custom') {
      outlineVal = elements.outlineColor.value || 'Цветная';
    } else {
      outlineVal = elements.outlineSelect.value;
    }

    // Фон
    let bgVal = elements.bgSelect.value;
    if (bgVal === 'Однотонный' && elements.bgCustomColor.value) {
      bgVal = `Однотонный [${elements.bgCustomColor.value}]`;
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
[b]2.[/b] ${elements.charNotes.value.trim() || 'Уточнения отсутствуют'}
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
  generateBBCode();
});
