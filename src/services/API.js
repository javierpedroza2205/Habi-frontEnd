const Axios = require("axios");


const API_URL = "http://127.0.0.1:8000/api/v1";


function genericPost(path, params, method) {  
    const URL = `${API_URL}/${path}/`;
  
    const bodyFormData = new FormData();
  
    for (const paramKey of Object.keys(params)) {
      bodyFormData.set(paramKey, String(params[paramKey]));
    }
  
    let out = Axios.post(URL, bodyFormData, {
      
    });
    console.log("response:", out);
  
    
    return out;
}

const API = {

    getBuildings(order, descending){
        return Axios.get(API_URL + "/get_buildings/",{
            params: {
                order:order,
                descending:descending
            }
        })  
    },

    deleteBuilding(params){
        return genericPost("delete_building/", params)
    },

    addBuilding(params){
        return genericPost("add_building", params)
    },

    getOwners(){
        return Axios.get(API_URL + "/get_owners/")
    },
    
    addFlat(params){
        return genericPost("add_flat",params)
    }
}

export default API;
  
  