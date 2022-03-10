
// Formatear fecha
export const fechaFormat = fecha => new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'short', day: '2-digit'
});

// Formatear a moneda americana
export const dineroFormat = cantidad => cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
