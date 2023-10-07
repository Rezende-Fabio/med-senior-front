export function convertDateTimeToDate(dataOriginal: string): string {
  // Converter para o formato de Date
  const dataDate = new Date(dataOriginal);

  // Extrair dia, mês e ano
  const dia = String(dataDate.getUTCDate()).padStart(2, '0');
  const mes = String(dataDate.getUTCMonth() + 1).padStart(2, '0'); // Os meses começam do zero, então adicionamos 1
  const ano = dataDate.getUTCFullYear();

  // Formatar para "dd/mm/yyyy"
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}