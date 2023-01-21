import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
}

export const getValue = async (key: string ) => {
    const result = await AsyncStorage.getItem(key);

    if (result) {
        return result;
    } else {
        console.log("Invalid key: " + key)
    }
}

export const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
}