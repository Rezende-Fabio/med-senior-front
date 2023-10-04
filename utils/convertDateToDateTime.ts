export function convertDateToDatetime(dateString: string) {
    try {
        const dateSplited = dateString.split("/");

        const year = parseInt(dateSplited[2]);
        const month = parseInt(dateSplited[1]);
        const day = parseInt(dateSplited[0])

        const date = new Date(`${year}-${month}-${day}`);

        return date.toISOString();
    } catch (error) {
        return new Error();
    }
}