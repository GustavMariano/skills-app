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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(177, 189, 170, 0.9)",
  },
  signupButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  backLink: {
    marginTop: 15,
    textAlign: "center",
    color: "#333"
  },
  showPasswordsButton: {
    padding: 10,
    alignItems: 'center',
  },
  showPasswordsButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
