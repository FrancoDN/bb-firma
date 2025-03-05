// Capturamos los inputs
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const puestoInput = document.getElementById('puesto');
const areaInput = document.getElementById('area');
const direccionInput = document.getElementById('direccion');

const btnGenerar = document.getElementById('btn-generar');
const btnCopiar = document.getElementById('btn-copiar');
const firmaPreview = document.getElementById('firma-preview');

// Función para generar el HTML de la firma
function generarFirmaHTML() {
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const puesto = puestoInput.value.trim();
  const area = areaInput.value.trim();
  const direccion = direccionInput.value.trim();

  // URL del banner con enlace directo
  const bannerURL = "https://www.dropbox.com/scl/fi/617pdpiegv45f6zgr0x8i/banner-billboard.png?rlkey=tgd3gyvpkgcgb18ad8z9qyn7g&dl=1";

  return `
    <table cellpadding="0" cellspacing="0" style="font-family: Roboto, sans-serif; color:#000; line-height:1.5;">
      <tr>
        <td style="padding: 4px 0;">
          <strong style="font-size: 16px;">${nombre} ${apellido}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 0;">
          <span style="font-size: 14px;">
            <em>${puesto}</em> – <em>${area}</em>
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 0;">
          <span style="font-size: 12px;">${direccion}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <img 
            src="${bannerURL}" 
            alt="Banner Billboard" 
            style="max-width: 600px; width: 100%; height: auto;" 
          />
        </td>
      </tr>
    </table>
  `;
}

// Función para crear la simulación de un correo de Gmail
function crearSimulacionGmail(firmaHTML) {
  return `
    <div class="gmail-simulation">
      <div class="gmail-header">
        <p><strong>De:</strong> Nombre Apellido &lt;nombre.apellido@billboard.com&gt;</p>
        <p><strong>Para:</strong> ejemplo@correo.com</p>
        <p><strong>Asunto:</strong> Ejemplo de correo con firma</p>
      </div>
      <div class="gmail-body">
        <p>Hola,</p>
        <p>Este es un correo de prueba para que veas cómo se visualizará tu firma.</p>
        <p>¡Saludos!</p>
        <div class="gmail-signature">
          ${firmaHTML}
        </div>
      </div>
    </div>
  `;
}

// Evento para generar la vista previa tipo Gmail en la misma página
btnGenerar.addEventListener('click', () => {
  const firmaHTML = generarFirmaHTML();
  const simulacionHTML = crearSimulacionGmail(firmaHTML);
  firmaPreview.innerHTML = simulacionHTML;
});

// Evento para copiar la firma (abre nueva pestaña con solo la firma y el botón para copiar)
btnCopiar.addEventListener('click', () => {
  const firmaHTML = generarFirmaHTML();

  const nuevaVentana = window.open('', '_blank', 'width=600,height=500,scrollbars=yes');
  nuevaVentana.document.write(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Copiar Firma</title>
        <!-- Import Materialize CSS -->
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        >
        <!-- Import Material Icons (opcional) -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
          body {
            padding: 20px;
            font-family: Roboto, sans-serif;
          }
          #firma-container {
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 10px;
          }
          .btn-copiar {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h5>Firma lista para copiar</h5>
        <p>Haz clic en el botón para seleccionar y copiar toda la firma. Luego, presiona <strong>Ctrl+V</strong> para pegarla en la configuración de firmas de Gmail.</p>
        <div id="firma-container">
          ${firmaHTML}
        </div>
        <button id="btn-copiar-ventana" class="waves-effect waves-light btn purple accent-4 btn-copiar">
          Copiar Firma (Ctrl+A y Ctrl+C)
        </button>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script>
          document.getElementById('btn-copiar-ventana').addEventListener('click', function() {
            var container = document.getElementById('firma-container');
            var range = document.createRange();
            range.selectNodeContents(container);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
              var successful = document.execCommand('copy');
              if(successful) {
                alert('¡Firma copiada! Ahora presiona Ctrl+V en Gmail para pegarla.');
              } else {
                alert('No se pudo copiar automáticamente. Selecciona todo (Ctrl+A) y copia (Ctrl+C).');
              }
            } catch (err) {
              console.error('Error al copiar la firma:', err);
              alert('Error al copiar la firma. Selecciona todo (Ctrl+A) y copia (Ctrl+C).');
            }
          });
        </script>
      </body>
    </html>
  `);
  nuevaVentana.document.close();
});
