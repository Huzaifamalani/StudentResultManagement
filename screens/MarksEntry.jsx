import React, { useState } from "react";
import {
  View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,ToastAndroid,StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MarksEntry = ({ navigation, route }) => {
  const { name, roll } = route.params;
  const [math, setMath] = useState("");
  const [science, setScience] = useState("");
  const [english, setEnglish] = useState("");

  const showToast = (msg) => {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const calculateResult = () => {
    const m = parseFloat(math) || 0;
    const s = parseFloat(science) || 0;
    const e = parseFloat(english) || 0;

    if (math === "" || science === "" || english === "") {
      showToast("Please enter marks for all subjects!");
      return;
    }

    if (m < 0 || m > 100 || s < 0 || s > 100 || e < 0 || e > 100) {
      showToast("Marks should be between 0 and 100!");
      return;
    }

    const total = m + s + e;
    const percentage = (total / 300) * 100;

    let grade = "";
    if (m < 50 || s < 50 || e < 50) {
      grade = "Fail";
    } else {
      if (percentage >= 80) grade = "A+";
      else if (percentage >= 70) grade = "A";
      else if (percentage >= 60) grade = "B";
      else grade = "C";
    }

    navigation.navigate("ResultScreen", {
      name,
      roll,
      total: total.toFixed(1),
      percentage: percentage.toFixed(2),
      grade,
      subjects: { math: m, science: s, english: e }
    });
    setMath("");
    setScience("");
    setEnglish("");
  };

  return (
    <SafeAreaView style={styles.container}edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0800FE" />

      <View style={styles.headerContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <Text style={styles.headerSub}>{name} | Roll: {roll}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.card}>
          <View style={styles.dragHandle} />

          <Text style={styles.cardTitle}>Enter Academic Scores</Text>

          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>Min. 50% in each subject required to pass</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mathematics</Text>
            <TextInput
              placeholder="0-100"
              style={styles.input}
              keyboardType="numeric"
              value={math}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setMath(numericText);
              }}
              maxLength={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Science</Text>
            <TextInput
              placeholder="0-100"
              style={styles.input}
              keyboardType="numeric"
              value={science}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setScience(numericText);
              }}
              maxLength={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>English</Text>
            <TextInput
              placeholder="0-100"
              style={styles.input}
              keyboardType="numeric"
              value={english}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setEnglish(numericText);
              }}
              maxLength={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: (math && science && english) ? "#0800FE" : "#706bff" }]}
            onPress={calculateResult}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CALCULATE GRADE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarksEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0800FE",
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: "#0800FE",
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0700cd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 15,
    elevation: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoBadge: {
    backgroundColor: "#fef1f1",
    padding: 12,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ffdbdb",
  },
  infoText: {
    fontSize: 13,
    color: "#d63031",
    textAlign: 'center',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#0805ab",
    borderWidth: 1,
    borderColor: "#ECEEF2",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});