export function convertDateToDatetime(dateString: string) {
    try {
        const dateSplited = dateString.split("/");
        const day = parseInt(dateSplited[0]);
        const month = parseInt(dateSplited[1]);
        const year = parseInt(dateSplited[2]);

        const times = dateString.split(",")
        const timeSplited = times[1].split(":");
        const hours = timeSplited[0];
        const minutes = timeSplited[1];
        const seconds = timeSplited[2];

        const date = new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        console.log(date);
        
        return date.toISOString();
    } catch (error) {
        return new Error();
    }
}