import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResultScreen = ({ route, navigation }) => {
  const { name = "Student", roll = "N/A", total = 0, percentage = 0, grade = "N/A", subjects = {} } = route.params || {};

  const getThemeColor = () => {
    if (grade === "Fail") return "#e74c3c";
    if (percentage >= 80) return "#2ecc71";
    if (percentage >= 60) return "#f39c12";
    return "#3498db";
  };

  const themeColor = getThemeColor();

  const SubjectItem = ({ label, marks }) => {
    const isFail = marks < 50;

    return (
      <View style={styles.subjectRow}>
        <Text style={styles.subjectLabel}>{label}</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              styles.subjectMarks,
              { color: isFail ? "#e74c3c" : "#2ecc71" },
            ]}
          >
            {marks}
          </Text>

          <View
            style={[
              styles.resultBadge,
              { backgroundColor: isFail ? "#e74c3c" : "#2ecc71" },
            ]}
          >
            <Text style={styles.resultText}>
              {isFail ? "FAIL" : "PASS"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={themeColor} />

      <View style={[styles.headerBg, { backgroundColor: themeColor }]} />

      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', paddingBottom: 40 }}>
        <View style={styles.card}>
          <View style={[styles.badge, { borderColor: themeColor }]}>
            <Text style={[styles.gradeText, { color: themeColor }]}>{grade}</Text>
            <Text style={styles.subText}>GRADE</Text>
          </View>

          <Text style={styles.congratsText}>
            {grade !== "Fail" ? "🎉 Congratulations!" : "Keep Working Hard!"}
          </Text>
          <Text style={styles.studentName}>{name.toUpperCase()}</Text>
          <Text style={styles.rollNo}>Roll No: {roll}</Text>

          <View style={styles.breakdownBox}>
            <Text style={styles.sectionTitle}>Subject Details</Text>
            <SubjectItem label="Mathematics" marks={subjects.math || 0} />
            <SubjectItem label="Science" marks={subjects.science || 0} />
            <SubjectItem label="English" marks={subjects.english || 0} />
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Marks</Text>
              <Text style={styles.statValue}>{total}</Text>
            </View>
            <View style={[styles.statBox, styles.borderLeft]}>
              <Text style={styles.statLabel}>Percentage</Text>
              <Text style={[styles.statValue, { color: themeColor }]}>{percentage}%</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeColor }]}
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: "StudentInfo" }],
            })}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CHECK ANOTHER RESULT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  headerBg: {
    position: 'absolute', top: 0, height: '35%', width: '100%',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
  },
  card: {
    marginTop: 100, width: "88%", backgroundColor: "#fff",
    padding: 25, borderRadius: 24, elevation: 10, alignItems: "center",
  },
  badge: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 5,
    justifyContent: 'center', alignItems: 'center', marginTop: -75,
    backgroundColor: '#fff', marginBottom: 15,
  },
  gradeText: { fontSize: 32, fontWeight: "bold" },
  subText: { fontSize: 10, color: '#999', fontWeight: 'bold' },
  studentName: { fontSize: 24, fontWeight: "bold", color: "#2D3436" },
  rollNo: { fontSize: 14, color: "#636E72", marginBottom: 15 },

  breakdownBox: { width: '100%', marginTop: 10 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#BBB', marginBottom: 10, textTransform: 'uppercase' },
  subjectRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingVertical: 5 },
  subjectLabel: { fontSize: 16, color: '#555' },
  subjectMarks: { fontSize: 16, fontWeight: 'bold' },
  resultBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  resultText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  failBadge: { backgroundColor: '#e74c3c', marginLeft: 8, paddingHorizontal: 5, borderRadius: 4 },
  failText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  divider: { width: '100%', height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  statsRow: { flexDirection: 'row', width: '100%', marginBottom: 30 },
  statBox: { flex: 1, alignItems: 'center' },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#EEE' },
  statLabel: { fontSize: 12, color: '#999', textTransform: 'uppercase', marginBottom: 5 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#2D3436' },
  button: { width: "100%", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 14, letterSpacing: 1 },
});