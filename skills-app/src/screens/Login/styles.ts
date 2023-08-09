import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "rgba(177, 189, 170, 0.9)",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  loginButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 15,
    textAlign: "center",
    color: "#333",
  },
  showPassword: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15
  },
  showPasswordText: {
    fontWeight: 'bold',
    color: '#333',
  }
});
