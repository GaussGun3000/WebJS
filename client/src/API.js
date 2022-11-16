class API
{
    constructor()
    {
        this.queryPrefix = "http://localhost:8000"
    }

     testAPI(locale = 'en', rid = 'default')
     {
        console.log(`Request to testAPI with arguments locale=${locale} rid=${rid}`)
        return fetch(`${this.queryPrefix}/testAPI/?rid=${rid}&locale=${locale}`).then(res => res.text())
     }

     stats()
     {
         console.log(`Request to auth/stats`)
         return fetch(`${this.queryPrefix}/auth/stats`, {method: 'POST'}).then(res => res.json())
     }
}

export default API;