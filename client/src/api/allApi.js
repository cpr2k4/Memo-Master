import axios from "axios"

const URL = "http://localhost:8080";

export const saveNoteToDb = async(data)=>{
    try{
        let response = await axios.post(`${URL}/new`,data);
        console.log(response.data);
    }
    catch(err){
        console.log("Error while posting data in saveNoteToDb() allApi.js",err.message);
    }
}

export const getAllNotes = async()=>{
    try{
        let allNotes = await axios.get(`${URL}/allNotes`);
        let notes = allNotes.data;
        // console.log(notes);
        return notes;
    }
    catch(err){
        console.log("Error while getting all notes at allApi.js",err.message);
    }
}

//I will fetch from redux
// export const getNote = async(id)=>{
//     try{
//         let note = await axios.get(`${URL}/getNote`,id);
//         console.log(note.data);
//         return note.data;
//     }
//     catch(err){
//         console.log("Error while calling getNote in allApi.js",err.message);
//     }
// }

export const saveEditedNote = async(id,note)=>{
    try{
       await axios.put(`${URL}/saveEditedNote/${id}`,note);
       console.log("Note updated...");
    }
    catch(err){
        console.log('Error while sending "save after edit" request at allApi.js',err.message);
    }
}

export const deleteNote = async(id)=>{
    try{
        await axios.delete(`${URL}/${id}`);
        console.log("Note deleted...");
    }
    catch(err){
        console.log("Error while posting data in saveNoteToDb() allApi.js",err.message);
    }
}

export const signupAPI = async(userSignUpData)=>{
    try{
        let response = await axios.post(`${URL}/signup`,userSignUpData);
        console.log(response.data);
        if(response.status===201)
            return "success";
        else if(response.status===409)
            return "username or email already exists!";
        else
            return "Server error";
    }
    catch(err){
        console.log("Error in sign up of user API frontend....",err.message);
    }
}

export const loginAPI = async (loginData) => {
    try {
      let response = await axios.post(`${URL}/login`, loginData);
  
      // Handle successful response
      if (response.status === 200) {
        console.log(response.data);
        return { status: 'success', data: response.data };
      } else {
        // Handle unexpected status codes
        return { status: 'error', message: response.data.message || 'Unexpected error occurred' };
      }
    } catch (err) {
      // Handle error responses
      if (err.response) {
        // Server responded with a status other than 200 range
        return { status: 'error', message: err.response.data.message || 'Login failed' };
      } else if (err.request) {
        // Request was made but no response received
        return { status: 'error', message: 'No response from server' };
      } else {
        // Other errors
        return { status: 'error', message: err.message || 'An error occurred' };
      }
    }
  };