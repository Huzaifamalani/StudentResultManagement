import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const showToast = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

const StudentInfo = ({ navigation }) => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const handleNext = () => {
    if (name.trim() === "" && roll.trim() === "") {
      Alert.alert(
        "Missing Info",
        "Please enter both Name and Roll Number to proceed."
      );
      return;
    }
    else if (name.trim() === "") {
      showToast("Please enter name to proceed!");
      return;
    }
    else if (roll.trim() === "") {
      showToast("Please enter roll number to proceed!");
      return;
    }
    navigation.navigate("MarksEntry", { name, roll });
    setName("");
    setRoll("");
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior="height"
        style={styles.content}
      >
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.mainTitle}>Student Information</Text>
          <Text style={styles.subTitle}>Enter details to proceed to marks entry</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.inputLabel}>Student Full Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              if (/^\d/.test(text)) {
                Alert.alert("Invalid Name", "Name cannot start with a number");
                return;
              }
              setName(text);
            }}
            selectionColor="#0800FE"
          />
          <Text style={styles.inputLabel}>Roll Number</Text>
          <TextInput
            placeholder="Enter your Roll No"
            placeholderTextColor="#999"
            style={styles.input}
            value={roll}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, "");
              setRoll(numericText);
            }}
            keyboardType="numeric"
            selectionColor="#0800FE"
          />

          <TouchableOpacity
            style={[
              styles.button,
              { opacity: name && roll ? 1 : 0.6 },
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0800FE",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ebebf2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#edebeb",
    marginBottom: 15,
  },

  iconImage: {
    width: 45,
    height: 45,
  },

  mainTitle: {
    fontSize: 32,       
    fontWeight: "900",    
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  subTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)", 
    marginTop: 8,       
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#F1F3FF",
    width: "100%",
    padding: 30,
    borderRadius: 25,
    elevation: 10,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E1B4B",
    marginBottom: 8,
    textTransform: "capitalize",
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#0805ab",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },

  button: {
    backgroundColor: "#0800FE",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
  },
});