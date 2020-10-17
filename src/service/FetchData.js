// получение данных
export default class FetchData {

    startUrl = 'https://api.spacexdata.com/v4/';
    // запрос к API
    getResource = async url => { // пока не придет ответ
        const res = await fetch(url); // не сможем записать результат
        if (!res.ok) {
            throw new Error (`Произошла ошибка ${res.status}` );
        }
        return await res.json();
    };

    // методы
    getRocket = async () => 
        await this.getResource(this.startUrl + 'rockets'); // ассинхронные, т.е. дожидаемся ответа

    getLaunches = async () =>
        await this.getResource(this.startUrl + 'launches/past');

    getCompany = async () => 
        await this.getResource(this.startUrl + 'company');

}