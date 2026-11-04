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

    furBodyCheck: document.getElementById('fur-body-check'),
    furPawCheck: document.getElementById('fur-paw-check'),
    furEarCheck: document.getElementById('fur-ear-check'),
    furCustomCheck: document.getElementById('fur-custom-check'),
    furCustom: document.getElementById('fur-custom-text'),
    optBodyfurWrap: document.getElementById('opt-bodyfur-wrap'),
    optPawfurWrap: document.getElementById('opt-pawfur-wrap'),

    tailSelect: document.getElementById('tail-select'),
    tailCustom: document.getElementById('tail-custom-text'),

    whiskersSelect: document.getElementById('whiskers-select'),
    whiskersColorWrap: document.getElementById('whiskers-color-wrap'),
    whiskersColor: document.getElementById('whiskers-color'),
    whiskersCustom: document.getElementById('whiskers-custom-text'),

    clothesSelect: document.getElementById('clothes-select'),
    paciCheck: document.getElementById('paci-check'),
    clothesCustom: document.getElementById('clothes-custom-text'),
    clothesLinksContainer: document.getElementById('clothes-links-container'),
    btnAddClothesLink: document.getElementById('btn-add-clothes-link'),

    toySelect: document.getElementById('toy-select'),
    toyCustom: document.getElementById('toy-custom-text'),
    toyLinksContainer: document.getElementById('toy-links-container'),
    btnAddToyLink: document.getElementById('btn-add-toy-link'),

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
    btnReset: document.getElementById('btn-reset'),
    toast: document.getElementById('toast'),
    totalPriceEl: document.getElementById('total-price'),

    previewContainer: document.getElementById('preview-container'),
    layerBg: document.getElementById('layer-bg'),
    layerBase: document.getElementById('layer-base'),
    layerLashes: document.getElementById('layer-lashes'),
    layerToy: document.getElementById('layer-toy'),
    layerMane: document.getElementById('layer-mane'),
    layerEars: document.getElementById('layer-ears'),
    layerEarfur: document.getElementById('layer-earfur'),
    layerEartufts: document.getElementById('layer-eartufts'),
    layerTuft: document.getElementById('layer-tuft'),
    layerFringe: document.getElementById('layer-fringe'),
    layerFurBody: document.getElementById('layer-fur-body'),
    layerFurPaw: document.getElementById('layer-fur-paw'),
    layerFurEar: document.getElementById('layer-fur-ear'),
    layerTail: document.getElementById('layer-tail'),
    layerWhiskers: document.getElementById('layer-whiskers'),
    layerBlush: document.getElementById('layer-blush'),
    layerClothes: document.getElementById('layer-clothes'),
    layerPaci: document.getElementById('layer-paci'),
    layerCheeks: document.getElementById('layer-cheeks'),
    layerLight: document.getElementById('layer-light')
  };

  const STORAGE_KEY = 'sleepy_clone_constructor_data';

  function addLinkRow(container, urlVal = '', labelVal = '') {
    const row = document.createElement('div');
    row.className = 'link-row';
    row.innerHTML = `
      <input type="url" class="link-url-input" placeholder="Ссылка" value="${urlVal}">
      <input type="text" class="link-label-input" placeholder="Текст" value="${labelVal}">
      <button type="button" class="btn-remove-link">−</button>
    `;

    row.querySelector('.btn-remove-link').addEventListener('click', () => {
      row.remove();
      updatePreviewLayers();
      generateBBCode();
      saveState();
    });

    row.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        generateBBCode();
        saveState();
      });
    });

    container.appendChild(row);
  }

  elements.btnAddClothesLink.addEventListener('click', () => {
    addLinkRow(elements.clothesLinksContainer, '', '');
    generateBBCode();
    saveState();
  });

  elements.btnAddToyLink.addEventListener('click', () => {
    addLinkRow(elements.toyLinksContainer, '', '');
    generateBBCode();
    saveState();
  });

  document.querySelectorAll('.pricing-item.scalable').forEach(item => {
    const checkbox = item.querySelector('.price-check');
    const counter = item.querySelector('.price-counter');
    const qtyInput = item.querySelector('.price-qty');
    const btnMinus = item.querySelector('.stepper-btn.minus');
    const btnPlus = item.querySelector('.stepper-btn.plus');

    checkbox.addEventListener('change', () => {
      counter.classList.toggle('hidden', !checkbox.checked);
      calculateTotal();
      saveState();
    });

    btnPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
      calculateTotal();
      saveState();
    });

    btnMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        calculateTotal();
        saveState();
      }
    });
  });

  document.querySelectorAll('.pricing-item:not(.scalable) .price-check').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      calculateTotal();
      saveState();
    });
  });

  function calculateTotal() {
    let totalKrol = 1200;
    let totalRub = 400;

    document.querySelectorAll('.pricing-item').forEach(item => {
      const checkbox = item.querySelector('.price-check');
      if (checkbox && checkbox.checked) {
        const krol = parseInt(checkbox.getAttribute('data-krol')) || 0;
        const rub = parseInt(checkbox.getAttribute('data-rub')) || 0;
        
        const counter = item.querySelector('.price-counter');
        let qty = 1;
        if (counter && !counter.classList.contains('hidden')) {
          const qtyInput = counter.querySelector('.price-qty');
          qty = parseInt(qtyInput.value) || 1;
        }

        totalKrol += krol * qty;
        totalRub += rub * qty;
      }
    });

    elements.totalPriceEl.textContent = `${totalKrol} кролей / ${totalRub} рублей`;
  }

  function getLinksString(container) {
    const rows = container.querySelectorAll('.link-row');
    const links = [];
    rows.forEach(row => {
      const url = row.querySelector('.link-url-input').value.trim();
      const label = row.querySelector('.link-label-input').value.trim() || 'Текст';
      if (url) {
        links.push(`[url=${url}]${label}[/url]`);
      }
    });
    return links.join(', ');
  }

  function saveState() {
    const pricingData = [];
    document.querySelectorAll('.pricing-item').forEach(item => {
      const checkbox = item.querySelector('.price-check');
      const qtyInput = item.querySelector('.price-qty');
      pricingData.push({
        checked: checkbox ? checkbox.checked : false,
        qty: qtyInput ? qtyInput.value : 1
      });
    });

    const serializeLinks = (container) => {
      const rows = container.querySelectorAll('.link-row');
      const data = [];
      rows.forEach(r => {
        data.push({
          url: r.querySelector('.link-url-input').value,
          label: r.querySelector('.link-label-input').value
        });
      });
      return data;
    };

    const data = {
      eyelashes: document.querySelector('input[name="eyelashes"]:checked')?.value || '–',
      blushSelect: elements.blushSelect.value,
      blushColor: elements.blushColor.value,
      blushCustom: elements.blushCustom.value,
      earsNum: elements.earsNum.value,
      earFurCheck: elements.earFurCheck.checked,
      earTuftsCheck: elements.earTuftsCheck.checked,
      earsCustom: elements.earsCustom.value,
      cheeksSelect: elements.cheeksSelect.value,
      cheeksCustom: elements.cheeksCustom.value,
      tuftSelect: elements.tuftSelect.value,
      tuftCustom: elements.tuftCustom.value,
      bangsSelect: elements.bangsSelect.value,
      maneSelect: elements.maneSelect.value,
      maneCustom: elements.maneCustom.value,
      furBody: elements.furBodyCheck.checked,
      furPaw: elements.furPawCheck.checked,
      furEar: elements.furEarCheck.checked,
      furCustomChk: elements.furCustomCheck.checked,
      furCustom: elements.furCustom.value,
      tailSelect: elements.tailSelect.value,
      tailCustom: elements.tailCustom.value,
      whiskersSelect: elements.whiskersSelect.value,
      whiskersColor: elements.whiskersColor.value,
      whiskersCustom: elements.whiskersCustom.value,
      clothesSelect: elements.clothesSelect.value,
      paciCheck: elements.paciCheck.checked,
      clothesCustom: elements.clothesCustom.value,
      clothesLinks: serializeLinks(elements.clothesLinksContainer),
      toySelect: elements.toySelect.value,
      toyCustom: elements.toyCustom.value,
      toyLinks: serializeLinks(elements.toyLinksContainer),
      linkColor: elements.linkColor.value,
      linkRef: elements.linkRef.value,
      linkArt: elements.linkArt.value,
      charNotes: elements.charNotes.value,
      addonsText: elements.addonsText.value,
      outlineSemi: elements.outlineSemi.checked,
      outlineColored: elements.outlineColored.checked,
      outlineColorPicker: elements.outlineColorPicker.value,
      bgSelect: elements.bgSelect.value,
      bgColorPicker: elements.bgColorPicker.value,
      bgCustomText: elements.bgCustomText.value,
      timeSelect: elements.timeSelect.value,
      paySelect: elements.paySelect.value,
      payProofLink: elements.payProofLink.value,
      socialSelect: elements.socialSelect.value,
      socialLink: elements.socialLink.value,
      pricingData: pricingData
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      if (data.eyelashes) {
        elements.eyelashes.forEach(r => {
          if (r.value === data.eyelashes) r.checked = true;
        });
      }
      if (data.blushSelect) elements.blushSelect.value = data.blushSelect;
      if (data.blushColor) elements.blushColor.value = data.blushColor;
      if (data.blushCustom) elements.blushCustom.value = data.blushCustom;
      if (data.earsNum) elements.earsNum.value = data.earsNum;
      if (data.earFurCheck !== undefined) elements.earFurCheck.checked = data.earFurCheck;
      if (data.earTuftsCheck !== undefined) elements.earTuftsCheck.checked = data.earTuftsCheck;
      if (data.earsCustom) elements.earsCustom.value = data.earsCustom;
      if (data.cheeksSelect) elements.cheeksSelect.value = data.cheeksSelect;
      if (data.cheeksCustom) elements.cheeksCustom.value = data.cheeksCustom;
      if (data.tuftSelect) elements.tuftSelect.value = data.tuftSelect;
      if (data.tuftCustom) elements.tuftCustom.value = data.tuftCustom;
      if (data.bangsSelect) elements.bangsSelect.value = data.bangsSelect;
      if (data.maneSelect) elements.maneSelect.value = data.maneSelect;
      if (data.maneCustom) elements.maneCustom.value = data.maneCustom;
      
      if (data.furBody !== undefined) elements.furBodyCheck.checked = data.furBody;
      if (data.furPaw !== undefined) elements.furPawCheck.checked = data.furPaw;
      if (data.furEar !== undefined) elements.furEarCheck.checked = data.furEar;
      if (data.furCustomChk !== undefined) elements.furCustomCheck.checked = data.furCustomChk;
      if (data.furCustom) elements.furCustom.value = data.furCustom;

      if (data.tailSelect) elements.tailSelect.value = data.tailSelect;
      if (data.tailCustom) elements.tailCustom.value = data.tailCustom;
      if (data.whiskersSelect) elements.whiskersSelect.value = data.whiskersSelect;
      if (data.whiskersColor) elements.whiskersColor.value = data.whiskersColor;
      if (data.whiskersCustom) elements.whiskersCustom.value = data.whiskersCustom;
      if (data.clothesSelect) elements.clothesSelect.value = data.clothesSelect;
      if (data.paciCheck !== undefined) elements.paciCheck.checked = data.paciCheck;
      if (data.clothesCustom) elements.clothesCustom.value = data.clothesCustom;
      
      if (data.clothesLinks && data.clothesLinks.length > 0) {
        elements.clothesLinksContainer.innerHTML = '';
        data.clothesLinks.forEach(l => addLinkRow(elements.clothesLinksContainer, l.url, l.label));
      }

      if (data.toySelect) elements.toySelect.value = data.toySelect;
      if (data.toyCustom) elements.toyCustom.value = data.toyCustom;

      if (data.toyLinks && data.toyLinks.length > 0) {
        elements.toyLinksContainer.innerHTML = '';
        data.toyLinks.forEach(l => addLinkRow(elements.toyLinksContainer, l.url, l.label));
      }

      if (data.linkColor) elements.linkColor.value = data.linkColor;
      if (data.linkRef) elements.linkRef.value = data.linkRef;
      if (data.linkArt) elements.linkArt.value = data.linkArt;
      if (data.charNotes) elements.charNotes.value = data.charNotes;
      if (data.addonsText) elements.addonsText.value = data.addonsText;
      if (data.outlineSemi !== undefined) elements.outlineSemi.checked = data.outlineSemi;
      if (data.outlineColored !== undefined) elements.outlineColored.checked = data.outlineColored;
      if (data.outlineColorPicker) elements.outlineColorPicker.value = data.outlineColorPicker;
      if (data.bgSelect) elements.bgSelect.value = data.bgSelect;
      if (data.bgColorPicker) elements.bgColorPicker.value = data.bgColorPicker;
      if (data.bgCustomText) elements.bgCustomText.value = data.bgCustomText;
      if (data.timeSelect) elements.timeSelect.value = data.timeSelect;
      if (data.paySelect) elements.paySelect.value = data.paySelect;
      if (data.payProofLink) elements.payProofLink.value = data.payProofLink;
      if (data.socialSelect) elements.socialSelect.value = data.socialSelect;
      if (data.socialLink) elements.socialLink.value = data.socialLink;

      if (data.pricingData && Array.isArray(data.pricingData)) {
        const pricingItems = document.querySelectorAll('.pricing-item');
        data.pricingData.forEach((pData, index) => {
          if (pricingItems[index]) {
            const cb = pricingItems[index].querySelector('.price-check');
            const qty = pricingItems[index].querySelector('.price-qty');
            const counter = pricingItems[index].querySelector('.price-counter');
            if (cb) {
              cb.checked = pData.checked;
              if (counter) counter.classList.toggle('hidden', !pData.checked);
            }
            if (qty) qty.value = pData.qty;
          }
        });
      }
    } catch (e) {
      console.error('Ошибка загрузки сохраненных данных', e);
    }
  }

  elements.btnReset.addEventListener('click', () => {
    if (confirm('Сбросить все настройки конструктора?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });

  function updateVisibility() {
    const isBlushCustom = elements.blushSelect.value === 'custom';
    const isBlushActive = elements.blushSelect.value !== '–' && !isBlushCustom;
    elements.blushCustom.classList.toggle('hidden', !isBlushCustom);
    elements.blushColorWrap.classList.toggle('hidden', !isBlushActive);

    elements.earsCustom.classList.toggle('hidden', elements.earsNum.value !== 'custom');

    elements.cheeksCustom.classList.toggle('hidden', elements.cheeksSelect.value !== 'custom');
    elements.tuftCustom.classList.toggle('hidden', elements.tuftSelect.value !== 'custom');
    elements.maneCustom.classList.toggle('hidden', elements.maneSelect.value !== 'custom');
    elements.tailCustom.classList.toggle('hidden', elements.tailSelect.value !== 'custom');

    elements.furCustom.classList.toggle('hidden', !elements.furCustomCheck.checked);

    const isWhiskersCustom = elements.whiskersSelect.value === 'custom';
    const isWhiskersActive = elements.whiskersSelect.value !== '–' && !isWhiskersCustom;
    elements.whiskersCustom.classList.toggle('hidden', !isWhiskersCustom);
    elements.whiskersColorWrap.classList.toggle('hidden', !isWhiskersActive);

    const clothesVal = elements.clothesSelect.value;
    const isClosedOrLongSleeves = (clothesVal === 'slip1.png' || clothesVal === 'slip2.png');
    const isShortSleeves = (clothesVal === 'slip3.png');

    elements.optBodyfurWrap.style.display = (isClosedOrLongSleeves || isShortSleeves) ? 'none' : 'flex';
    elements.optPawfurWrap.style.display = isClosedOrLongSleeves ? 'none' : 'flex';

    if (isClosedOrLongSleeves) {
      elements.furBodyCheck.checked = false;
      elements.furPawCheck.checked = false;
    } else if (isShortSleeves) {
      elements.furBodyCheck.checked = false;
    }

    const isClothesSelected = clothesVal !== '–' || elements.paciCheck.checked;
    elements.clothesCustom.classList.toggle('hidden', !isClothesSelected);
    elements.clothesLinksContainer.classList.toggle('hidden', !isClothesSelected);

    const isToySelected = elements.toySelect.value !== '–';
    elements.toyCustom.classList.toggle('hidden', !isToySelected);
    elements.toyLinksContainer.classList.toggle('hidden', !isToySelected);

    elements.outlineColorWrap.classList.toggle('hidden', !elements.outlineColored.checked);

    const bgVal = elements.bgSelect.value;
    elements.bgColorPickerWrap.classList.toggle('hidden', bgVal !== 'Однотонный');
    elements.bgCustomText.classList.toggle('hidden', bgVal !== 'Другие цвета' && bgVal !== 'Другие элементы на фоне');

    const isLSPos = elements.socialSelect.value === 'ЛС Вара';
    elements.socialLink.classList.toggle('hidden', isLSPos);
  }

  function updatePreviewLayers() {
    const bgVal = elements.bgSelect.value;
    if (bgVal === 'Прозрачный') {
      elements.layerBg.style.display = 'none';
      elements.previewContainer.style.background = 'transparent';
      elements.previewContainer.style.borderStyle = 'dashed';
    } else if (bgVal === 'Однотонный') {
      elements.layerBg.style.display = 'none';
      elements.previewContainer.style.background = elements.bgColorPicker.value;
    } else {
      elements.layerBg.src = "images/background.png";
      elements.layerBg.style.display = 'block';
      elements.previewContainer.style.background = '';
    }

    const toyVal = elements.toySelect.value;
    if (toyVal !== '–' && toyVal !== 'custom') {
      elements.layerToy.src = `images/${toyVal}`;
      elements.layerToy.style.display = 'block';
    } else {
      elements.layerToy.style.display = 'none';
    }

    elements.layerBase.src = "images/base.png";
    elements.layerBase.style.display = 'block';

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

    const maneVal = elements.maneSelect.value;
    if (maneVal !== '–' && maneVal !== 'custom') {
      elements.layerMane.src = `images/${maneVal}`;
      elements.layerMane.style.display = 'block';
    } else {
      elements.layerMane.style.display = 'none';
    }

    const tuftVal = elements.tuftSelect.value;
    const earVal = elements.earsNum.value;

    if (tuftVal !== '–' && tuftVal !== 'custom') {
      let currentTuftFile = tuftVal;
      const earNumMatch = earVal.match(/\d+/);
      const earIndex = earNumMatch ? earNumMatch[0] : null;

      if (earIndex === '1') {
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-1.png';
      } else if (earIndex === '2') {
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-2.png';
      } else if (earIndex === '3') {
        if (tuftVal === 'tuft2.png') currentTuftFile = 'tuft2-3.png';
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-3.png';
      } else if (earIndex === '4') {
        if (tuftVal === 'tuft1.png') currentTuftFile = 'tuft1-4.png';
        if (tuftVal === 'tuft2.png') currentTuftFile = 'tuft2-4.png';
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-4.png';
        if (tuftVal === 'tuft4.png') currentTuftFile = 'tuft4-4.png';
        if (tuftVal === 'tuft5.png') currentTuftFile = 'tuft5-4.png';
      } else if (earIndex === '6') {
        if (tuftVal === 'tuft1.png') currentTuftFile = 'tuft1-6.png';
        if (tuftVal === 'tuft2.png') currentTuftFile = 'tuft2-6.png';
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-6.png';
        if (tuftVal === 'tuft4.png') currentTuftFile = 'tuft4-6.png';
        if (tuftVal === 'tuft5.png') currentTuftFile = 'tuft5-6.png';
      } else if (earIndex === '7') {
        if (tuftVal === 'tuft1.png') currentTuftFile = 'tuft1-7.png';
        if (tuftVal === 'tuft2.png') currentTuftFile = 'tuft2-7.png';
        if (tuftVal === 'tuft3.png') currentTuftFile = 'tuft3-7.png';
        if (tuftVal === 'tuft4.png') currentTuftFile = 'tuft4-7.png';
        if (tuftVal === 'tuft5.png') currentTuftFile = 'tuft5-7.png';
      }

      elements.layerTuft.src = `images/${currentTuftFile}`;
      elements.layerTuft.style.display = 'block';
    } else {
      elements.layerTuft.style.display = 'none';
    }

    const bangsVal = elements.bangsSelect.value;
    if (bangsVal !== '–') {
      elements.layerFringe.src = `images/${bangsVal}`;
      elements.layerFringe.style.display = 'block';
    } else {
      elements.layerFringe.style.display = 'none';
    }

    let earIndex = '1';
    if (earVal !== '–' && earVal !== 'custom') {
      elements.layerEars.src = `images/${earVal}`;
      elements.layerEars.style.display = 'block';

      const earNumMatch = earVal.match(/\d+/);
      earIndex = earNumMatch ? earNumMatch[0] : '1';

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

    if (elements.furBodyCheck.checked && elements.optBodyfurWrap.style.display !== 'none') {
      elements.layerFurBody.src = "images/bodyfur.png";
      elements.layerFurBody.style.display = 'block';
    } else {
      elements.layerFurBody.style.display = 'none';
    }

    if (elements.furPawCheck.checked && elements.optPawfurWrap.style.display !== 'none') {
      elements.layerFurPaw.src = "images/pawfur.png";
      elements.layerFurPaw.style.display = 'block';
    } else {
      elements.layerFurPaw.style.display = 'none';
    }

    if (elements.furEarCheck.checked && earVal !== '–' && earVal !== 'custom') {
      elements.layerFurEar.src = `images/furear${earIndex}.png`;
      elements.layerFurEar.style.display = 'block';
    } else {
      elements.layerFurEar.style.display = 'none';
    }

    const tailVal = elements.tailSelect.value;
    if (tailVal !== '–' && tailVal !== 'custom') {
      elements.layerTail.src = `images/${tailVal}`;
      elements.layerTail.style.display = 'block';
    } else {
      elements.layerTail.style.display = 'none';
    }

    const whiskersVal = elements.whiskersSelect.value;
    if (whiskersVal !== '–' && whiskersVal !== 'custom') {
      elements.layerWhiskers.src = `images/${whiskersVal}`;
      elements.layerWhiskers.style.display = 'block';
    } else {
      elements.layerWhiskers.style.display = 'none';
    }

    const blushVal = elements.blushSelect.value;
    if (blushVal !== '–' && blushVal !== 'custom') {
      elements.layerBlush.src = `images/${blushVal}`;
      elements.layerBlush.style.display = 'block';
    } else {
      elements.layerBlush.style.display = 'none';
    }

    const clothesVal = elements.clothesSelect.value;
    if (clothesVal !== '–' && clothesVal !== 'custom') {
      elements.layerClothes.src = `images/${clothesVal}`;
      elements.layerClothes.style.display = 'block';
    } else {
      elements.layerClothes.style.display = 'none';
    }

    if (elements.paciCheck.checked) {
      elements.layerPaci.src = "images/paci.png";
      elements.layerPaci.style.display = 'block';
    } else {
      elements.layerPaci.style.display = 'none';
    }

    const cheeksVal = elements.cheeksSelect.value;
    if (cheeksVal !== '–' && cheeksVal !== 'custom') {
      elements.layerCheeks.src = `images/${cheeksVal}`;
      elements.layerCheeks.style.display = 'block';
    } else {
      elements.layerCheeks.style.display = 'none';
    }

    const timeVal = elements.timeSelect.value;
    if (timeVal !== '–' && bgVal !== 'Прозрачный') {
      elements.layerLight.src = `images/${timeVal}`;
      elements.layerLight.style.display = 'block';
    } else {
      elements.layerLight.style.display = 'none';
    }
  }

  document.querySelectorAll('input, select, textarea').forEach(item => {
    if (!item.classList.contains('link-url-input') && !item.classList.contains('link-label-input') && !item.classList.contains('price-qty')) {
      item.addEventListener('input', () => {
        updateVisibility();
        updatePreviewLayers();
        generateBBCode();
        saveState();
      });
      item.addEventListener('change', () => {
        updateVisibility();
        updatePreviewLayers();
        generateBBCode();
        saveState();
      });
    }
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

    const getDigitOnly = (selectEl, customEl) => {
      if (selectEl.value === 'custom') return customEl.value.trim() || 'Свой вариант';
      if (selectEl.value !== '–' && selectEl.selectedIndex >= 0) {
        const fullText = selectEl.options[selectEl.selectedIndex].text;
        const match = fullText.match(/^\d+/);
        return match ? match[0] : fullText;
      }
      return '–';
    };

    let blushVal = '–';
    if (elements.blushSelect.value === 'custom') {
      blushVal = elements.blushCustom.value.trim() || 'Свой вариант';
    } else if (elements.blushSelect.value !== '–') {
      const blushDigit = getDigitOnly(elements.blushSelect, elements.blushCustom);
      blushVal = `${blushDigit} [${elements.blushColor.value}]`;
    }

    let earsVal = '–';
    if (elements.earsNum.value === 'custom') {
      earsVal = elements.earsCustom.value.trim() || 'Свой вариант';
    } else if (elements.earsNum.value !== '–') {
      const earDigit = getDigitOnly(elements.earsNum, elements.earsCustom);
      let earAddons = [];
      if (elements.earFurCheck.checked) earAddons.push('шерсть в ушах');
      if (elements.earTuftsCheck.checked) earAddons.push('кисточки');
      
      earsVal = earAddons.length > 0 ? `${earDigit} [${earAddons.join(', ')}]` : earDigit;
    }

    const cheeksVal = getDigitOnly(elements.cheeksSelect, elements.cheeksCustom);
    const tuftVal = getDigitOnly(elements.tuftSelect, elements.tuftCustom);
    const bangsVal = elements.bangsSelect.value !== '–' ? getDigitOnly(elements.bangsSelect) : '–';
    const maneVal = getDigitOnly(elements.maneSelect, elements.maneCustom);
    
    let furParts = [];
    if (elements.furBodyCheck.checked && elements.optBodyfurWrap.style.display !== 'none') furParts.push('На теле');
    if (elements.furPawCheck.checked && elements.optPawfurWrap.style.display !== 'none') furParts.push('На лапах');
    if (elements.furEarCheck.checked) furParts.push('На ушах');
    if (elements.furCustomCheck.checked) furParts.push(elements.furCustom.value.trim() || 'Свой вариант');

    let furVal = furParts.length > 0 ? furParts.join(', ') : '–';

    const tailVal = getDigitOnly(elements.tailSelect, elements.tailCustom);

    let whiskersVal = '–';
    if (elements.whiskersSelect.value === 'custom') {
      whiskersVal = elements.whiskersCustom.value.trim() || 'Свой вариант';
    } else if (elements.whiskersSelect.value !== '–') {
      const whiskDigit = getDigitOnly(elements.whiskersSelect, elements.whiskersCustom);
      whiskersVal = `${whiskDigit} [${elements.whiskersColor.value}]`;
    }

    let clothesParts = [];
    if (elements.clothesSelect.value === 'nappy.png') {
      clothesParts.push('Подгузник');
    } else if (elements.clothesSelect.value === 'slip1.png') {
      clothesParts.push('Закрытый слип');
    } else if (elements.clothesSelect.value === 'slip2.png') {
      clothesParts.push('Слип с рукавами');
    } else if (elements.clothesSelect.value === 'slip3.png') {
      clothesParts.push('Слип без рукавов');
    } else if (elements.clothesSelect.value === 'custom') {
      clothesParts.push(elements.clothesCustom.value.trim() || 'Свой вариант');
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
      const clothesLinksStr = getLinksString(elements.clothesLinksContainer);
      if (clothesLinksStr) {
        extraDetails.push(clothesLinksStr);
      }

      clothesVal = clothesParts.join(', ');
      if (extraDetails.length > 0) {
        clothesVal += ` [${extraDetails.join(', ')}]`;
      }
    }

    let toyVal = '–';
    if (elements.toySelect.value === 'custom') {
      toyVal = elements.toyCustom.value.trim() || 'Свой вариант / Свой цвет';
    } else if (elements.toySelect.value !== '–') {
      toyVal = getDigitOnly(elements.toySelect, elements.toyCustom);
    }

    let toyExtra = [];
    if (elements.toySelect.value !== 'custom' && elements.toyCustom.value.trim()) {
      toyExtra.push(elements.toyCustom.value.trim());
    }
    const toyLinksStr = getLinksString(elements.toyLinksContainer);
    if (toyLinksStr) {
      toyExtra.push(toyLinksStr);
    }
    if (toyVal !== '–' && toyExtra.length > 0) {
      toyVal += ` [${toyExtra.join(', ')}]`;
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

    const timeVal = elements.timeSelect.value !== '–' ? getDigitOnly(elements.timeSelect) : '–';

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
    const requiredSelects = [
      { el: elements.earsNum, name: 'Уши' }
    ];

    for (let item of requiredSelects) {
      if (item.el.value === '–') {
        alert(`Пожалуйста, выберите значение в обязательном поле: "${item.name}"`);
        item.el.focus();
        return;
      }
    }

    elements.output.select();
    navigator.clipboard.writeText(elements.output.value).then(() => {
      elements.toast.classList.add('show');
      setTimeout(() => elements.toast.classList.remove('show'), 2000);
    });
  });

  loadState();
  updateVisibility();
  updatePreviewLayers();
  calculateTotal();
  generateBBCode();
});
