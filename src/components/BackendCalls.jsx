import axios from "axios";
const baseUrl = '/api/';

export const GetData = async (item) => {
    const url = `${baseUrl}${item}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }

}

export const UpdateData = async (item, data, id) => {

    const url = id ? `${baseUrl}${item}/${id}` : `${baseUrl}${item}`;
    try{
        const response = id ?
            await axios.put(url,data) :
            await axios.post(url,data);
            return response.data;

    } catch (error) {
        if (error.response && error.response.data && error.response.data.details) {
            throw new Error(error.response.data.details.join(', ')); // Throw detailed error
        } else {
            throw new Error('Failed to update phonebook');
        }
    }

}

export const DeleteData = async (id,item,updateList) => {

    const url = `${baseUrl}${item}/${id}`;
    try {
        await axios.delete(url);
        updateList(id);
    } catch (error) {
        console.error("Error deleting data:", error);
        alert("Failed to delete the person. Please try again.");
    }


}

