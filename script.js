// ---------- CARRO DE COMPRAS ----------

// Arreglo global donde se almacenan los productos seleccionados
const cart = [];

// Agrega un producto al carro o incrementa su cantidad si ya existe
function addToCart(nombre, precio) {
  const idx = cart.findIndex(i => i.nombre === nombre);
  if (idx >= 0) {
    cart[idx].cantidad += 1;
  } else {
    cart.push({ nombre, precio, cantidad: 1 });
  }
  renderCart(); // actualiza el carrito visualmente
  document.getElementById('cart-count').textContent = cart.length;
}

// Genera dinámicamente el contenido del carrito en pantalla
function renderCart() {
  const cont = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');
  cont.innerHTML = ''; // limpiamos contenido previo
  let total = 0;
  cart.forEach(({ nombre, precio, cantidad }) => {
    const p = document.createElement('p');
    p.textContent = `${nombre} x${cantidad} – $${precio * cantidad}`;
    cont.appendChild(p);
    total += precio * cantidad;
  });
  totalSpan.textContent = total;
}

// Valida los datos de compra e informa éxito o errores
function checkout() {
  const nombre = document.getElementById('compra-nombre').value.trim();
  const rut = document.getElementById('compra-rut').value.trim();
  const fono = document.getElementById('compra-fono').value.trim();
  const email = document.getElementById('compra-email').value.trim();

  const errorNombre = document.getElementById('error-compra-nombre');
  const errorRut = document.getElementById('error-compra-rut');
  const errorFono = document.getElementById('error-compra-fono');
  const errorEmail = document.getElementById('error-compra-email');

  // Borra errores anteriores
  errorNombre.textContent = '';
  errorRut.textContent = '';
  errorFono.textContent = '';
  errorEmail.textContent = '';

  let valido = true;

  if (!cart.length) {
    alert('El carro está vacío');
    return;
  }

  // Validación de nombre
  if (nombre.length < 3) {
    errorNombre.textContent = 'Ingresa tu nombre completo.';
    valido = false;
  }

  // Validación de formato RUT chileno
  const rutRegex = /^\d{7,8}-[kK\d]$/;
  if (!rutRegex.test(rut)) {
    errorRut.textContent = 'RUT inválido.';
    valido = false;
  }

  // Teléfono debe comenzar con 9 y tener 9 dígitos
  const fonoRegex = /^9\d{8}$/;
  if (!fonoRegex.test(fono)) {
    errorFono.textContent = 'Número de teléfono inválido.';
    valido = false;
  }

  // Validación simple de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorEmail.textContent = 'Correo electrónico inválido.';
    valido = false;
  }

  if (!valido) return;

  // Si todo es válido, simula el pago
  alert(`¡Gracias por tu compra, ${nombre}! Pronto recibirás un correo a ${email}.`);
  cart.length = 0;
  renderCart();
  document.getElementById('cart-count').textContent = 0;

  // Reseteo de campos
  document.getElementById('compra-nombre').value = '';
  document.getElementById('compra-rut').value = '';
  document.getElementById('compra-fono').value = '';
  document.getElementById('compra-email').value = '';
}

// ---------- FORMULARIO DE CONTACTO ----------

// Valida el formulario de contacto y redirige a WhatsApp con mensaje personalizado
function enviarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const errorNombre = document.getElementById('error-nombre');
  const errorMensaje = document.getElementById('error-mensaje');

  errorNombre.textContent = '';
  errorMensaje.textContent = '';

  let valido = true;

  if (nombre.length < 3) {
    errorNombre.textContent = 'Por favor, ingresa tu nombre completo.';
    valido = false;
  }

  if (mensaje.length < 5) {
    errorMensaje.textContent = 'El mensaje es muy corto.';
    valido = false;
  }

  if (!valido) return;

  // Enlace directo a WhatsApp con mensaje personalizado
  const url = `https://wa.me/56912345678?text=Hola, soy ${nombre}. ${mensaje}`;
  window.open(url, '_blank');
}

// ---------- MAPA ENLACES ----------
// Detecta click en cualquier enlace con clase 'link-map' y abre su ubicación en una pestaña nueva
document.addEventListener('click', e => {
  if (e.target.classList.contains('link-map')) {
    e.preventDefault();
    window.open(e.target.dataset.map, '_blank');
  }
});

// ---------- MODAL ¿QUIÉNES SOMOS? ----------
// Activa el modal informativo al hacer clic en el banner de "¿Quiénes somos?"
document.getElementById('btnQuienes')
        .addEventListener('click', () => {
          const m = new bootstrap.Modal(document.getElementById('modalQuienes'));
          m.show();
        });
