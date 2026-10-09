// Tasas de cambio fijas para el ejemplo (Pesos a Dólar / Euro)
const EXCHANGE_RATES = {
  'U$S': 1500, // 1 USD = 1500 Pesos
  'EUR': 1650  // 1 EUR = 1650 Pesos
};

// Referencias del DOM
const noteNameInput = document.getElementById('note-name');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency-type');
const conversionDisplay = document.getElementById('conversion-display');
const btnAddConverted = document.getElementById('btn-add-converted');

const boardGrid = document.getElementById('board-grid');
const customNoteInput = document.getElementById('custom-note-input');
const btnAddCustom = document.getElementById('btn-add-custom');

// Función para calcular y actualizar la previsualización
function updateConversion() {
  const amount = parseFloat(amountInput.value) || 0;
  const currency = currencySelect.value;
  const rate = EXCHANGE_RATES[currency] || 1;
  
  const converted = Math.round(amount / rate);
  conversionDisplay.textContent = `${converted} ${currency}`;
}

// Escuchar cambios en importe o moneda
amountInput.addEventListener('input', updateConversion);
currencySelect.addEventListener('change', updateConversion);

// Función para crear una tarjeta violeta en el pizarrón
function createNoteCard(content) {
  const card = document.createElement('div');
  card.className = 'note-card';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.title = 'Eliminar';
  deleteBtn.onclick = () => card.remove();

  const textSpan = document.createElement('span');
  textSpan.innerHTML = content;

  card.appendChild(deleteBtn);
  card.appendChild(textSpan);
  boardGrid.appendChild(card);
}

// Agregar notita calculada desde la sección 1
btnAddConverted.addEventListener('click', () => {
  const name = noteNameInput.value.trim() || 'Notita';
  const amount = parseFloat(amountInput.value) || 0;
  const currency = currencySelect.value;
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = Math.round(amount / rate);

  // Formato: Nombre $Monto = ResultadoMoneda
  const formattedAmount = amount.toLocaleString('es-AR');
  const textContent = `${name}<br>$${formattedAmount} = ${converted}${currency}`;

  createNoteCard(textContent);

  // Limpiar campos
  noteNameInput.value = '';
  amountInput.value = '';
  updateConversion();
});

// Agregar notita personalizada desde la sección 2
btnAddCustom.addEventListener('click', () => {
  const text = customNoteInput.value.trim();
  if (text !== '') {
    createNoteCard(text);
    customNoteInput.value = '';
  }
});

// Delegar evento para permitir la tecla Enter en la nota personalizada
customNoteInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btnAddCustom.click();
  }
});