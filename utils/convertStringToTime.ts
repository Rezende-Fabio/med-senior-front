export function convertStringToTime(hora: string): Date {
  const [horas, minutos] = hora.split(':').map(Number);
  const data = new Date();
  data.setHours(horas);
  data.setMinutes(minutos);
  data.setSeconds(0);
  data.setMilliseconds(0);

  return data;
}