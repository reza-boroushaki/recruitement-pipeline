const URL = "http://localhost:3000";

export const getAllUser = async () => {
    const response = await fetch(`${URL}/getAllUser`);
    if (!response.ok) {
        throw Error("Error");
    }
    return response.json();
}

export const getUser = async id => {
    const response = await fetch(`${URL}/getUser/${id}`);
    if (!response.ok) {
        throw Error("Error");
    }
    return response.json();
}

export const createUser = async data => {
    const response = await fetch(`${URL}/newUser`, {
        method: "POST",
        body: data
    });
    if (!response.ok) {
        throw Error("Error");
    }
    return response.json();
}

export const updateUser = async (id, data) => {
    const response = await fetch(`${URL}/updateUser/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw Error("Error");
    }
    return response.json();
}

export const deleteUser = async id => {
    const response = await fetch(`${URL}/deleteUser/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw Error("Error");
    }
    return response.json();
}