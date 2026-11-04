document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    eyelashes: document.querySelectorAll('input[name="eyelashes"]'),
    
    blushSelect: document.getElementById('blush-select'),
    blushColorWrap: document.getElementById('blush-color-wrap'),
    blushColor: document.getElementById('blush-color'),
    blushCustom: document.getElementById('blush-custom-text'),
    
    earsNum: document.getElementById('ears-num'),
    earFurCheck: document.getElementById('ear-fur-check'),
    earTuftsCheck: document.getElementById('ear-tufts-check'),
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
    optBodyfur: document.getElementById('opt-bodyfur'),
    optPawfur: document.getElementById('opt-pawfur'),

    tailSelect: document.getElementById('tail-select'),
    tailCustom: document.getElementById('tail-custom-text'),

    whiskersSelect: document.getElementById('whiskers-select'),
    whiskersColorWrap: document.getElementById('whiskers-color-wrap'),
    whiskersColor: document.getElementById('whiskers-color'),
    whiskersCustom: document.getElementById('whiskers-custom-text'),

    clothesSelect: document.getElementById('clothes-select'),
    paciCheck: document.getElementById('paci-check'),
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

    outlineSemi: document.getElementById('outline-semi'),
    outlineColored: document.getElementById('outline-colored'),
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
    toast: document.getElementById('toast'),

    // Слои превью
    layerBg: document.getElementById('layer-bg'),
    layerBase: document.getElementById('layer-base'),
    layerLashes: document.getElementById('layer-lashes'),
    layerEars: document.getElementById('layer-ears'),
    layerEarfur: document.getElementById('layer-earfur'),
    layerEartufts: document.getElementById('layer-eartufts'),
    layerCheeks: document.getElementById('layer-cheeks'),
    layerTuft: document.getElementById('layer-tuft'),
    layerFringe: document.getElementById('layer-fringe'),
    layerMane: document.getElementById('layer-mane'),
    layerFur: document.getElementById('layer-fur'),
    layerTail: document.getElementById('layer-tail'),
    layerWhiskers: document.getElementById('layer-whiskers'),
    layerBlush: document.getElementById('layer-blush'),
    layerClothes: document.getElementById('layer-clothes'),
    layerPaci: document.getElementById('layer-paci'),
    layerToy: document.getElementById('layer-toy'),
    layerLight: document.getElementById('layer-light')
  };

  function updateVisibility() {
    const isBlushCustom = elements.blushSelect.value === 'custom';
    const isBlushActive = elements.blushSelect.value !== '–' && !isBlushCustom;
    elements.blushCustom.classList.toggle('hidden', !isBlushCustom);
    elements.blushColorWrap.classList.toggle('hidden', !isBlushActive);

    elements.earsCustom.classList.toggle('hidden', elements.earsNum.value !== 'custom');

    elements.cheeksCustom.classList.toggle('hidden', elements.cheeksSelect.value !== 'custom');
    elements.tuftCustom.classList.toggle('hidden', elements.tuftSelect.value !== 'custom');
    elements.maneCustom.classList.toggle('hidden', elements.maneSelect.value !== 'custom');
    elements.furCustom.classList.toggle('hidden', elements.furSelect.value !== 'custom');
    elements.tailCustom.classList.toggle('hidden', elements.tailSelect.value !== 'custom');

    const isWhiskersCustom = elements.whiskersSelect.value === 'custom';
    const isWhiskersActive = elements.whiskersSelect.value !== '–' && !isWhiskersCustom;
    elements.whiskersCustom.classList.toggle('hidden', !isWhiskersCustom);
    elements.whiskersColorWrap.classList.toggle('hidden', !isWhiskersActive);

    const clothesVal = elements.clothesSelect.value;
    const isClosedOrLongSleeves = (clothesVal === 'slip1.png' || clothesVal === 'slip2.png');
    const isShortSleeves = (clothesVal === 'slip3.png');

    elements.optBodyfur.style.display = (isClosedOrLongSleeves || isShortSleeves) ? 'none' : 'block';
    elements.optPawfur.style.display = isClosedOrLongSleeves ? 'none' : 'block';

    const currentFur = elements.furSelect.value;
    if ((isClosedOrLongSleeves && (currentFur === 'bodyfur.png' || currentFur === 'pawfur.png')) ||
        (isShortSleeves && currentFur === 'bodyfur.png')) {
      elements.furSelect.value = '–';
    }

    const isльникClothesSelected = clothesVal !== '–' || elements.paciCheck.checked;
    elements.clothesCustom.classList.toggle('hidden', !isльникClothesSelected);
    elements.clothesLinkInput.classList.toggle('hidden', !isльникClothesSelected);

    const isToySelected = elements.toySelect.value !== '–';
    elements.toyCustom.classList.toggle('hidden', !isToySelected);
    elements.toyLinkInput.classList.toggle('hidden', !isToySelected);

    elements.outlineColorWrap.classList.toggle('hidden', !elements.outlineColored.checked);

    const bgVal = elements.bgSelect.value;
    elements.bgColorPickerWrap.classList.toggle('hidden', bgVal !== 'Однотонный');
    elements.bgCustomText.classList.toggle('hidden', bgVal !== 'Другие цвета' && bgVal !== 'Другие элементы на фоне');

    const isLSPos = elements.socialSelect.value === 'ЛС Вара';
    elements.socialLink.classList.toggle('hidden', isLSPos);
  }

  function updatePreviewLayers() {
    elements.layerBg.src = "images/background.png";
    elements.layerBg.style.display = 'block';

    elements.layerBase.src = "images/base.png";
    elements.layerBase.style.display = 'block';

    // Ресницы
    let showLashes = false;
    elements.eyelashes.forEach(r => {
      if (r.checked && r.value === 'Да') showLashes = true;
    });
    if (showLashes) {
      elements.layerLashes.src = "images/lashes.png";
      elements.layerLashes.style.display = 'block';
    } else {
      elements.layerLashes.style.display = 'none';
    }

    // Уши
    const earVal = elements.earsNum.value;
    if (earVal !== '–' && earVal !== 'custom') {
      elements.layerEars.src = `images/${earVal}`;
      elements.layerEars.style.display = 'block';

      const earNumMatch = earVal.match(/\d+/);
      const earIndex = earNumMatch ? earNumMatch[0] : '1';

      if (elements.earFurCheck.checked) {
        elements.layerEarfur.src = `images/earfur${earIndex}.png`;
        elements.layerEarfur.style.display = 'block';
      } else {
        elements.layerEarfur.style.display = 'none';
      }

      if (elements.earTuftsCheck.checked) {
        elements.layerEartufts.src = `images/eartufts${earIndex}.png`;
        elements.layerEartufts.style.display = 'block';
      } else {
        elements.layerEartufts.style.display = 'none';
      }
    } else {
      elements.layerEars.style.display = 'none';
      elements.layerEarfur.style.display = 'none';
      elements.layerEartufts.style.display = 'none';
    }

    // Щёки
    const cheeksVal = elements.cheeksSelect.value;
    if (cheeksVal !== '–' && cheeksVal !== 'custom') {
      elements.layerCheeks.src = `images/${cheeksVal}`;
      elements.layerCheeks.style.display = 'block';
    } else {
      elements.layerCheeks.style.display = 'none';
    }

    // Хохолок
    const tuftVal = elements.tuftSelect.value;
    if (tuftVal !== '–' && tuftVal !== 'custom') {
      elements.layerTuft.src = `images/${tuftVal}`;
      elements.layerTuft.style.display = 'block';
    } else {
      elements.layerTuft.style.display = 'none';
    }

    // Чёлка
    const bangsVal = elements.bangsSelect.value;
    if (bangsVal !== '–') {
      elements.layerFringe.src = `images/${bangsVal}`;
      elements.layerFringe.style.display = 'block';
    } else {
      elements.layerFringe.style.display = 'none';
    }

    // Грива
    const maneVal = elements.maneSelect.value;
    if (maneVal !== '–' && maneVal !== 'custom') {
      elements.layerMane.src = `images/${maneVal}`;
      elements.layerMane.style.display = 'block';
    } else {
      elements.layerMane.style.display = 'none';
    }

    // Шерсть
    const furVal = elements.furSelect.value;
    if (furVal === 'earfur') {
      const earVal = elements.earsNum.value;
      const earNumMatch = earVal.match(/\d+/);
      const earIndex = earNumMatch ? earNumMatch[0] : '1';
      elements.layerFur.src = `images/furear${earIndex}.png`;
      elements.layerFur.style.display = 'block';
    } else if (furVal !== '–' && furVal !== 'custom') {
      elements.layerFur.src = `images/${furVal}`;
      elements.layerFur.style.display = 'block';
    } else {
      elements.layerFur.style.display = 'none';
    }

    // Хвост
    const tailVal = elements.tailSelect.value;
    if (tailVal !== '–' && tailVal !== 'custom') {
      elements.layerTail.src = `images/${tailVal}`;
      elements.layerTail.style.display = 'block';
    } else {
      elements.layerTail.style.display = 'none';
    }

    // Усы
    const whiskersVal = elements.whiskersSelect.value;
    if (whiskersVal !== '–' && whiskersVal !== 'custom') {
      elements.layerWhiskers.src = `images/${whiskersVal}`;
      elements.layerWhiskers.style.display = 'block';
    } else {
      elements.layerWhiskers.style.display = 'none';
    }

    // Румянец
    const blushVal = elements.blushSelect.value;
    if (blushVal !== '–' && blushVal !== 'custom') {
      elements.layerBlush.src = `images/${blushVal}`;
      elements.layerBlush.style.display = 'block';
    } else {
      elements.layerBlush.style.display = 'none';
    }

    // Одежда
    const clothesVal = elements.clothesSelect.value;
    if (clothesVal !== '–' && clothesVal !== 'custom') {
      elements.layerClothes.src = `images/${clothesVal}`;
      elements.layerClothes.style.display = 'block';
    } else {
      elements.layerClothes.style.display = 'none';
    }

    // Соска
    if (elements.paciCheck.checked) {
      elements.layerPaci.src = "images/paci.png";
      elements.layerPaci.style.display = 'block';
    } else {
      elements.layerPaci.style.display = 'none';
    }

    // Игрушка
    const toyVal = elements.toySelect.value;
    if (toyVal !== '–' && toyVal !== 'custom') {
      elements.layerToy.src = `images/${toyVal}`;
      elements.layerToy.style.display = 'block';
    } else {
      elements.layerToy.style.display = 'none';
    }

    // Освещение
    const timeVal = elements.timeSelect.value;
    if (timeVal !== '–') {
      elements.layerLight.src = `images/${timeVal}`;
      elements.layerLight.style.display = 'block';
    } else {
      elements.layerLight.style.display = 'none';
    }
  }

  document.querySelectorAll('input, select, textarea').forEach(item => {
    item.addEventListener('input', () => {
      updateVisibility();
      updatePreviewLayers();
      generateBBCode();
    });
    item.addEventListener('change', () => {
      updateVisibility();
      updatePreviewLayers();
      generateBBCode();
    });
  });

  function generateBBCode() {
    const linksArr = [];
    const colorVal = elements.linkColor.value.trim();
    const refVal = elements.linkRef.value.trim();
    const artVal = elements.linkArt.value.trim();

    if (colorVal) linksArr.push(`[url=${colorVal}]окрас[/url]`);
    if (refVal) linksArr.push(`[url=${refVal}]референс[/url]`);
    if (artVal) linksArr.push(`[url=${artVal}]арт[/url]`);

    const finalLinksStr = linksArr.length > 0 ? linksArr.join(', ') : '–';

    let lashVal = '–';
    elements.eyelashes.forEach(r => { if (r.checked) lashVal = r.value; });

    let blushVal = '–';
    if (elements.blushSelect.value === 'custom') {
      blushVal = elements.blushCustom.value.trim() || 'Свой вариант';
    } else if (elements.blushSelect.value !== '–') {
      const blushName = elements.blushSelect.options[elements.blushSelect.selectedIndex].text;
      blushVal = `${blushName} [${elements.blushColor.value}]`;
    }

    let earsVal = '–';
    if (elements.earsNum.value === 'custom') {
      earsVal = elements.earsCustom.value.trim() || 'Свой вариант';
    } else if (elements.earsNum.value !== '–') {
      const earName = elements.earsNum.options[elements.earsNum.selectedIndex].text;
      let earAddons = [];
      if (elements.earFurCheck.checked) earAddons.push('шерсть в ушах');
      if (elements.earTuftsCheck.checked) earAddons.push('кисточки');
      
      earsVal = earAddons.length > 0 ? `${earName} [${earAddons.join(', ')}]` : earName;
    }

    const getSimpleVal = (selectEl, customEl) => {
      if (selectEl.value === 'custom') return customEl.value.trim() || 'Свой вариант';
      if (selectEl.value !== '–' && selectEl.selectedIndex >= 0) {
        return selectEl.options[selectEl.selectedIndex].text;
      }
      return selectEl.value;
    };

    const cheeksVal = getSimpleVal(elements.cheeksSelect, elements.cheeksCustom);
    const tuftVal = getSimpleVal(elements.tuftSelect, elements.tuftCustom);
    const bangsVal = elements.bangsSelect.value !== '–' ? elements.bangsSelect.options[elements.bangsSelect.selectedIndex].text : '–';
    const maneVal = getSimpleVal(elements.maneSelect, elements.maneCustom);
    
    let furVal = '–';
    if (elements.furSelect.value === 'custom') {
      furVal = elements.furCustom.value.trim() || 'Свой вариант';
    } else if (elements.furSelect.value === 'earfur') {
      furVal = 'На ушах';
    } else if (elements.furSelect.value !== '–') {
      furVal = elements.furSelect.options[elements.furSelect.selectedIndex].text;
    }

    const tailVal = getSimpleVal(elements.tailSelect, elements.tailCustom);

    let whiskersVal = '–';
    if (elements.whiskersSelect.value === 'custom') {
      whiskersVal = elements.whiskersCustom.value.trim() || 'Свой вариант';
    } else if (elements.whiskersSelect.value !== '–') {
      const whiskName = elements.whiskersSelect.options[elements.whiskersSelect.selectedIndex].text;
      whiskersVal = `${whiskName} [${elements.whiskersColor.value}]`;
    }

    let clothesParts = [];
    if (elements.clothesSelect.value !== '–') {
      const baseName = elements.clothesSelect.value === 'custom' 
        ? (elements.clothesCustom.value.trim() || 'Свой вариант')
        : elements.clothesSelect.options[elements.clothesSelect.selectedIndex].text;
      clothesParts.push(baseName);
    }
    if (elements.paciCheck.checked) {
      clothesParts.push('Соска');
    }

    let clothesVal = '–';
    if (clothesParts.length > 0) {
      let extraDetails = [];
      if (elements.clothesSelect.value !== 'custom' && elements.clothesCustom.value.trim()) {
        extraDetails.push(elements.clothesCustom.value.trim());
      }
      if (elements.clothesLinkInput.value.trim()) {
        extraDetails.push(`[url=${elements.clothesLinkInput.value.trim()}]фото[/url]`);
      }

      clothesVal = clothesParts.join(', ');
      if (extraDetails.length > 0) {
        clothesVal += ` [${extraDetails.join(', ')}]`;
      }
    }

    let toyVal = '–';
    if (elements.toySelect.value !== '–') {
      const baseName = elements.toySelect.value === 'custom'
        ? (elements.toyCustom.value.trim() || 'Свой вариант')
        : elements.toySelect.options[elements.toySelect.selectedIndex].text;

      let extraDetails = [];
      if (elements.toySelect.value !== 'custom' && elements.toyCustom.value.trim()) {
        extraDetails.push(elements.toyCustom.value.trim());
      }
      if (elements.toyLinkInput.value.trim()) {
        extraDetails.push(`[url=${elements.toyLinkInput.value.trim()}]фото[/url]`);
      }

      toyVal = extraDetails.length > 0 ? `${baseName} [${extraDetails.join(', ')}]` : baseName;
    }

    let outlineParts = [];
    if (elements.outlineSemi.checked) {
      outlineParts.push('Полупрозрачная');
    }
    if (elements.outlineColored.checked) {
      outlineParts.push(elements.outlineColorPicker.value);
    }
    let outlineVal = outlineParts.length > 0 ? outlineParts.join(', ') : '–';

    let bgVal = elements.bgSelect.value;
    if (bgVal === 'Однотонный') {
      bgVal = `Однотонный [${elements.bgColorPicker.value}]`;
    } else if ((bgVal === 'Другие цвета' || bgVal === 'Другие элементы на фоне') && elements.bgCustomText.value.trim()) {
      bgVal = `${bgVal} [${elements.bgCustomText.value.trim()}]`;
    }

    const timeVal = elements.timeSelect.value !== '–' ? elements.timeSelect.options[elements.timeSelect.selectedIndex].text : '–';

    let payVal = elements.paySelect.value;
    if (elements.payProofLink.value.trim()) {
      payVal += ` [[url=${elements.payProofLink.value.trim()}]скриншот оплаты[/url]]`;
    }

    let socialVal = elements.socialSelect.value;
    if (socialVal !== 'ЛС Вара' && elements.socialLink.value.trim()) {
      socialVal += ` (${elements.socialLink.value.trim()})`;
    }

    const bbcode = `[b]1.[/b] ${finalLinksStr}
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
[b]7.[/b] Время суток: ${timeVal}
[b]8.[/b] Способ оплаты: ${payVal}
[b]9.[/b] Готовую работу прислать в: ${socialVal}`;

    elements.output.value = bbcode;
  }

  elements.btnCopy.addEventListener('click', () => {
    elements.output.select();
    navigator.clipboard.writeText(elements.output.value).then(() => {
      elements.toast.classList.add('show');
      setTimeout(() => elements.toast.classList.remove('show'), 2000);
    });
  });

  updateVisibility();
  updatePreviewLayers();
  generateBBCode();
});
