import { View, Image, Platform, Text, TouchableOpacity, useWindowDimensions, Modal, TextInput, Alert } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import SaveUserInfo from "../../config/SaveUserInfo";
const LoginScreen = () => {
  const { height, width } = useWindowDimensions();
  const [mobile, setMobile] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [showOtpInput, setShowOtpInput] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setShowOtpInput(false);
    setOtp("");
  }
  const handleOtpGeneration = () => {
    if (mobile.length !== 10) {
      Alert.alert("Invalid Mobile Number", "Please enter a valid 10-digit mobile number.");
      return;
    }
    else if (mobile.length === 10) {
      setShowOtpInput(true);
    } else {
      alert("Please enter a valid mobile number!");
    }
  }
  const verifyOtp = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }
    else if (otp.length === 6) {
      router.push("home");
      SaveUserInfo.saveUserEmail("checkemail@gmail.com" || mobile);
      toggleModal();
      setMobile("");
      setOtp("");
    } else {
      alert("Please enter a valid OTP!");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "start", paddingTop: 20, backgroundColor: Colors.BACKGROUND }}>
      <Image
        source={require("../../assets/images/loginscreendogImage.png")}
        style={{
          width: "100%",
          height: Platform.OS === "web" ? height * 0.6 : 500,
          resizeMode: "contain",
        }}
      />

      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontFamily: "openSansBold", fontSize: 28 }}>Welcome to PetCare! 💓</Text>
        <Text style={{ fontFamily: "openSansLight", fontSize: 18, textAlign: "center" }}>
          Give someone their next home!
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#ff5733",
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={toggleModal}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: "center",
              height: height * 0.5,
            }}
          >
            {!showOtpInput && (<>
              <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Enter Mobile Number</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 50,
                  borderColor: Colors.BORDER,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  fontSize: 18,
                  marginTop: 10,
                  backgroundColor: Colors.CARD,
                }}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#888"
                value={mobile}
                onChangeText={setMobile}
              />
            </>)}
            {!showOtpInput &&
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.PRIMARY,
                  paddingVertical: 12,
                  paddingHorizontal: 25,
                  borderRadius: 8,
                  marginTop: 30,
                  width: "100%",
                  justifyContent: "end",
                  alignItems: "center",
                }}
                onPress={handleOtpGeneration}
              >
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Send OTP</Text>
              </TouchableOpacity>}

            {showOtpInput && (
              <>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>Enter OTP</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 50,
                    borderColor: Colors.BORDER,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    fontSize: 18,
                    marginTop: 10,
                    backgroundColor: Colors.CARD,
                  }}
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  placeholderTextColor="#888"
                  value={otp}
                  onChangeText={setOtp}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "#28a745",
                    paddingVertical: 12,
                    paddingHorizontal: 25,
                    borderRadius: 8,
                    marginTop: 20,
                    width: "100%",
                    alignItems: "center",
                  }}
                  onPress={verifyOtp}
                >
                  <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={toggleModal} style={{ marginTop: 10, padding: 10 }}>
              <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
