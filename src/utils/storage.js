/**
 * storage二次封装
 */
import config from '../config'
export default{
    setItem(key,val){
         let storage =this.getStroage()
         storage[key] =val
         localStorage.setItem(config.namespace,JSON.stringify(storage[key]))
    },
    getItem(key){
        return this.getStroage()[key]

    },
    getStroage(){
        return JSON.parse(localStorage.getItem(config.namespace) || "{}")

    },
    clearItem(key){
        let storage =this.getStroage()
        delete storage[key]
        localStorage.setItem(config.namespace,JSON.stringify(storage[key]))

    },
    clearAll(){
        localStorage.clear()

    }
}