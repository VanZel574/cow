/*-------------------------------
* Load data to component from api
*-------------------------------*/
class ComponentData {
    constructor(api, data, url) {
        this.api = api
        this.data = data
        this.url = url
    }

    loadData = async ({ref, endpoint}, {id}) => {
        const params = {
            id,
            endpoint: this.url + '/' + endpoint
        }
        try {
            ref.value = await this.api.getData(params)
        } catch (e) {
            throw new Error('Ошибка: ' + e)
        }
    }

    getData (farm) {
        this.data.forEach(item => {
            this.loadData(item, farm).catch(e => console.log(e))
        })
    }
}

export default ComponentData