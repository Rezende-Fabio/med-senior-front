export function convertStringToTime(hora: string): Date {
  const [horas, minutos] = hora.split(':').map(Number);
  const data = new Date();
  data.setUTCHours(horas);
  data.setUTCMinutes(minutos);
  data.setUTCSeconds(0);
  data.setUTCMilliseconds(0);

  return data;
}