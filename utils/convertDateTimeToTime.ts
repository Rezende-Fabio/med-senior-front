export function convertDateTimeToTime(dataOriginal: string): string {
  // Converter para o formato de Date
  const dataDate = new Date(dataOriginal);

  // Extrair horas e minutos
  const horas = String(dataDate.getUTCHours()).padStart(2, '0');
  const minutos = String(dataDate.getUTCMinutes()).padStart(2, '0');

  // Formatar para "hh:mm"
  const horaFormatada = `${horas}:${minutos}`;

  return horaFormatada;
}