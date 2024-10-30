import axios from "axios";

export async function userLoader(){
    const response = await axios.get("http://localhost:5000/api/users");
        if(response.data.length === 0){
            //Create a new table as a DEFAULT USER
            const response = await axios.post("http://localhost:5000/api/users/createUser", {name: "DEFAULT"});
            console.log(response);
            return;
        } 
    return response;
}