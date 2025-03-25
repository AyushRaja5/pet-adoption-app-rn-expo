import { View, Text, Image, Platform, useWindowDimensions } from 'react-native'
import React from 'react'

const Header = () => {
  const { height, width } = useWindowDimensions();
  const user = {
    name: 'John Doe',
    email: 'checkemail@gmail.com',
    phone: '1234567890',
    age: 20,
  }
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-end" }}>
          <Text style={{ fontSize: 18, fontFamily: "openSansBold" }}>Welcome! </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", fontFamily: "openSansBold" }}>
            {user.name}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: "#777" }}>{user.email}</Text>
      </View>
      <Image source={require('../../assets/images/profilepic.png')} style={{
        width: 50,
        height: Platform.OS === "web" ? height * 0.1 : 50,
        resizeMode: "contain",
      }} />
    </View>
  )
}

export default Header