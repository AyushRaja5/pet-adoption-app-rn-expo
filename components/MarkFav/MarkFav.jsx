import { View, Image, Platform, Pressable, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import Shared from '../../Shared/Shared';
import SaveUserInfo from '../../config/SaveUserInfo';

const MarkFav = ({ pet }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const email = await SaveUserInfo.getUserEmail();
            if (email) {
                setUserEmail(email);
                getFav(email);
            }
        } catch (error) {
            console.error("Error fetching user email:", error);
        }
    };

    const getFav = async (email) => {
        try {
            // console.log("Fetching favorites for user:", email);
            const myfavList = await Shared.getFavList(email);
            // console.log("User's Fav List:", myfavList); 
            setFavList(myfavList);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const handleFavorite = async () => {
        if (!userEmail) {
            Platform.OS !== 'web'
                ? ToastAndroid.show("Please login to mark favorites!", ToastAndroid.SHORT)
                : Alert.alert("Login Required", "Please login to mark favorites!");
            console.warn("User not logged in!");
            return;
        }

        try {
            await Shared.toggleFav(userEmail, pet?.id);
            getFav(userEmail);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const isFav = favList.includes(pet?.id?.toString());

    return (
        <View>
            <Pressable onPress={handleFavorite} style={{ alignItems: 'center' }}>
                <Image
                    source={isFav
                        ? require("../../assets/images/heartBlackFilled.png")
                        : require("../../assets/images/heartOutline.png")}
                    style={{ width: 30, height: 30, tintColor: Colors.PRIMARY }}
                />
            </Pressable>
        </View>
    );
};

export default MarkFav;
