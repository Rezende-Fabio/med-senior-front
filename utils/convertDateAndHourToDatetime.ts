export function converterParaDataHora(dataString: string, horaString: string) {
    // Dividir a string da data em dia, mês e ano
    const [dia, mes, ano] = dataString.split('/').map(Number);

    // Dividir a string da hora em horas e minutos
    const [hora, minuto] = horaString.split(':').map(Number);

    // Criar um novo objeto Date
    return new Date(Date.UTC(ano, mes - 1, dia, hora, minuto));
}