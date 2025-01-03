import axios from "axios";
const baseUrl = 'http://localhost:3001/api/';

export const GetData = async (item) => {
    const url = `${baseUrl}${item}`;
    console.log(url);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }

}

export const UpdateData = async (item, data, id) => {

    const url = id ? `http://localhost:3001/${item}/${id}` : `http://localhost:3001/${item}`;
    try{
        const response = id ?
            await axios.put(url,data) :
            await axios.post(url,data);
            return response.data;

    } catch (error) {
        alert("Failed to update phonebook");
        return null;
    }

}

export const DeleteData = async (id,item,updateList) => {

    const url = `http://localhost:3001/${item}/${id}`;
    try {
        await axios.delete(url);
        updateList(id);
    } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete the person. Please try again.");
    }


}

