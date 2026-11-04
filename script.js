document.addEventListener('DOMContentLoaded', () => {
  // Базовые данные состояния
  const state = {
    builder: {
      body: { val: 'slim', label: 'Стройный', price: 0 },
      hair: { val: 'short', label: 'Короткая прическа', price: 200 },
      expression: { val: 'smile', label: 'Улыбка', price: 0 },
      clothes: { val: 'casual', label: 'Кэжуал', price: 300 },
      bg: { val: 'simple', label: 'Простой цвет', price: 0 },
      effects: { val: 'none', label: 'Без эффектов', price: 0 }
    },
    addons: [],
    uploadedFiles: [],
    contact: '',
    notes: ''
  };

  // Элементы DOM
  const totalPriceEl = document.getElementById('total-price');
  const summaryTextarea = document.getElementById('summary-textarea');
  const contactInput = document.getElementById('client-contact');
  const notesTextarea = document.getElementById('client-notes');
  const btnCopy = document.getElementById('btn-copy');
  const copyToast = document.getElementById('copy-toast');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const filePreviewGrid = document.getElementById('file-preview-grid');

  // SVG Слои
  const layers = {
    bg: document.getElementById('layer-bg'),
    body: document.getElementById('layer-body'),
    hair: document.getElementById('layer-hair'),
    clothes: document.getElementById('layer-clothes'),
    expression: document.getElementById('layer-expression'),
    effects: document.getElementById('layer-effects')
  };

  // Инициализация
  initBuilderButtons();
  initAddons();
  initFileUploads();
  initInputs();
  renderCanvas();
  recalculateTotal();

  // 1. Конструктор слоев
  function initBuilderButtons() {
    document.querySelectorAll('.options-grid').forEach(grid => {
      const category = grid.dataset.category;
      
      grid.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          grid.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          state.builder[category] = {
            val: btn.dataset.value,
            label: btn.textContent.trim(),
            price: parseInt(btn.dataset.price) || 0
          };

          renderCanvas();
          recalculateTotal();
        });
      });
    });
  }

  // Отрисовка SVG-элементов слоями
  function renderCanvas() {
    // 1. Background
    const bgVal = state.builder.bg.val;
    if (bgVal === 'nature') {
      layers.bg.innerHTML = `<circle cx="250" cy="250" r="180" fill="#15803d" opacity="0.4"/>`;
    } else if (bgVal === 'city') {
      layers.bg.innerHTML = `
        <rect x="100" y="100" width="300" height="300" fill="#7c3aed" opacity="0.2" rx="20"/>
        <circle cx="250" cy="200" r="90" fill="#ec4899" opacity="0.3"/>
      `;
    } else {
      layers.bg.innerHTML = '';
    }

    // 2. Body
    const bodyVal = state.builder.body.val;
    if (bodyVal === 'chibi') {
      layers.body.innerHTML = `
        <circle cx="250" cy="220" r="70" fill="#fde047"/>
        <rect x="220" y="280" width="60" height="90" rx="30" fill="#fde047"/>
      `;
    } else if (bodyVal === 'heroic') {
      layers.body.innerHTML = `
        <circle cx="250" cy="180" r="55" fill="#fde047"/>
        <path d="M 170 230 L 330 230 L 290 380 L 210 380 Z" fill="#fde047"/>
      `;
    } else { // slim
      layers.body.innerHTML = `
        <circle cx="250" cy="190" r="60" fill="#fde047"/>
        <rect x="210" y="240" width="80" height="130" rx="20" fill="#fde047"/>
      `;
    }

    // 3. Hair
    const hairVal = state.builder.hair.val;
    if (hairVal === 'long') {
      layers.hair.innerHTML = `<path d="M 180 180 C 170 300, 160 350, 200 380 C 220 200, 280 200, 300 380 C 340 350, 330 300, 320 180 Z" fill="#3b82f6"/>`;
    } else if (hairVal === 'ponytail') {
      layers.hair.innerHTML = `
        <path d="M 180 170 Q 250 110 320 170 Q 250 150 180 170 Z" fill="#3b82f6"/>
        <path d="M 300 160 Q 380 180 360 270 Q 320 240 300 190 Z" fill="#3b82f6"/>
      `;
    } else { // short
      layers.hair.innerHTML = `<path d="M 180 190 Q 250 100 320 190 Q 250 140 180 190 Z" fill="#3b82f6"/>`;
    }

    // 4. Expression
    const expVal = state.builder.expression.val;
    if (expVal === 'wink') {
      layers.expression.innerHTML = `
        <circle cx="225" cy="185" r="6" fill="#0f172a"/>
        <path d="M 265 185 Q 275 175 285 185" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M 235 210 Q 250 225 265 210" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
      `;
    } else if (expVal === 'serious') {
      layers.expression.innerHTML = `
        <circle cx="225" cy="185" r="6" fill="#0f172a"/>
        <circle cx="275" cy="185" r="6" fill="#0f172a"/>
        <line x1="235" y1="210" x2="265" y2="210" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
      `;
    } else { // smile
      layers.expression.innerHTML = `
        <circle cx="225" cy="185" r="6" fill="#0f172a"/>
        <circle cx="275" cy="185" r="6" fill="#0f172a"/>
        <path d="M 230 205 Q 250 230 270 205" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
      `;
    }

    // 5. Clothes
    const clothesVal = state.builder.clothes.val;
    if (clothesVal === 'fantasy') {
      layers.clothes.innerHTML = `
        <path d="M 200 245 L 250 290 L 300 245 L 310 370 L 190 370 Z" fill="#ef4444"/>
        <circle cx="250" cy="290" r="8" fill="#fbbf24"/>
      `;
    } else if (clothesVal === 'cyber') {
      layers.clothes.innerHTML = `
        <rect x="200" y="240" width="100" height="130" fill="#10b981" rx="10"/>
        <line x1="250" y1="240" x2="250" y2="370" stroke="#064e3b" stroke-width="4"/>
      `;
    } else { // casual
      layers.clothes.innerHTML = `<rect x="205" y="240" width="90" height="130" fill="#8b5cf6" rx="12"/>`;
    }

    // 6. Effects
    const effVal = state.builder.effects.val;
    if (effVal === 'sparkles') {
      layers.effects.innerHTML = `
        <path d="M 140 120 L 150 140 L 170 150 L 150 160 L 140 180 L 130 160 L 110 150 L 130 140 Z" fill="#fbbf24"/>
        <path d="M 350 260 L 358 275 L 375 280 L 358 285 L 350 300 L 342 285 L 325 280 L 342 275 Z" fill="#fbbf24"/>
      `;
    } else if (effVal === 'fire') {
      layers.effects.innerHTML = `
        <circle cx="130" cy="360" r="30" fill="#f97316" opacity="0.6"/>
        <circle cx="370" cy="360" r="30" fill="#f97316" opacity="0.6"/>
      `;
    } else {
      layers.effects.innerHTML = '';
    }
  }

  // 2. Дополнения
  function initAddons() {
    document.querySelectorAll('.addon-checkbox').forEach(chk => {
      chk.addEventListener('change', () => {
        updateAddonsState();
        recalculateTotal();
      });
    });
  }

  function updateAddonsState() {
    state.addons = [];
    document.querySelectorAll('.addon-checkbox:checked').forEach(chk => {
      state.addons.push({
        name: chk.dataset.name,
        price: parseInt(chk.dataset.price) || 0
      });
    });
  }

  // 3. Загрузка референсов
  function initFileUploads() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, () => dropzone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, () => dropzone.classList.remove('dragover'), false);
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  }

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileObj = { name: file.name, src: e.target.result };
        state.uploadedFiles.push(fileObj);
        renderPreviews();
        updateSummaryText();
      };
      reader.readAsDataURL(file);
    });
  }

  function renderPreviews() {
    filePreviewGrid.innerHTML = '';
    state.uploadedFiles.forEach((file, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'preview-thumb';
      thumb.innerHTML = `
        <img src="${file.src}" alt="${file.name}">
        <button class="remove-btn" data-index="${index}">✕</button>
      `;
      filePreviewGrid.appendChild(thumb);
    });

    filePreviewGrid.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        state.uploadedFiles.splice(idx, 1);
        renderPreviews();
        updateSummaryText();
      });
    });
  }

  // 4. Текстовые поля и интеграция
  function initInputs() {
    contactInput.addEventListener('input', (e) => {
      state.contact = e.target.value;
      updateSummaryText();
    });

    notesTextarea.addEventListener('input', (e) => {
      state.notes = e.target.value;
      updateSummaryText();
    });

    btnCopy.addEventListener('click', () => {
      summaryTextarea.select();
      navigator.clipboard.writeText(summaryTextarea.value).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 2000);
      });
    });
  }

  // Расчет итоговой суммы
  function recalculateTotal() {
    let total = 0;
    
    // Элементы конструктора
    Object.values(state.builder).forEach(item => {
      total += item.price;
    });

    // Дополнения
    state.addons.forEach(item => {
      total += item.price;
    });

    totalPriceEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
    updateSummaryText(total);
  }

  // Генерация текста анкеты
  function updateSummaryText(calculatedTotal) {
    let currentTotal = calculatedTotal;
    if (currentTotal === undefined) {
      let t = 0;
      Object.values(state.builder).forEach(i => t += i.price);
      state.addons.forEach(i => t += i.price);
      currentTotal = t;
    }

    const b = state.builder;
    const addonsList = state.addons.length > 0 
      ? state.addons.map(a => `  • ${a.name} (+${a.price} ₽)`).join('\n')
      : '  • Нет выбранных опций';

    const fileCount = state.uploadedFiles.length;
    const filesInfo = fileCount > 0 
      ? `Прикреплено референсов: ${fileCount} шт.` 
      : 'Референсы не загружены (отправлю отдельно)';

    const text = `📋 АНКЕТА ЗАКАЗА АРТА
-----------------------------------
👤 Контакт заказчика: ${state.contact || 'Не указан'}

🎨 КОНСТРУКТОР ПЕРСОНАЖА:
  • Поза/Корпус: ${b.body.label}
  • Прическа: ${b.hair.label}
  • Эмоция: ${b.expression.label}
  • Одежда: ${b.clothes.label}
  • Фон: ${b.bg.label}
  • Эффекты: ${b.effects.label}

➕ ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ:
${addonsList}

🖼 РЕФЕРЕНСЫ:
  • ${filesInfo}

💬 ПРИМЕЧАНИЯ / ПОЖЕЛАНИЯ:
${state.notes ? state.notes : '  • Без дополнительных примечаний'}

-----------------------------------
💰 РАСЧЕТНАЯ СТОИМОСТЬ: ${currentTotal.toLocaleString('ru-RU')} ₽
-----------------------------------`;

    summaryTextarea.value = text;
  }
});
