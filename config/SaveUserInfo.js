import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserEmail = async (email) => {
    try {
        await AsyncStorage.setItem('userEmail', email);
        console.log("Email saved successfully!");
    } catch (error) {
        console.error("Error saving email:", error);
    }
};

const getUserEmail = async () => {
    try {
        const email = await AsyncStorage.getItem('userEmail');
        // console.log("User Email from local storage:", email);
        return email;
    } catch (error) {
        console.error("Error retrieving email:", error);
    }
};

const removeUserEmail = async () => {
    try {
        await AsyncStorage.removeItem('userEmail');
        console.log("User email removed from AsyncStorage");
    } catch (error) {
        console.error("Error removing user email:", error);
    }
};

export default { saveUserEmail, getUserEmail, removeUserEmail };