import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "rgba(177, 189, 170, 0.5)",
    borderRadius: 10,
    padding: 16,
  },
  picker: {
    width: "50%",
    marginBottom: 150,
    height: 60,
  },
  editarNivelText: {
    fontWeight: 'bold',
    marginBottom: 70,
    fontSize: 22
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginBottom: 40
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "rgba(177, 189, 170, 0.9)",
  },
  updateButton: {
    backgroundColor: "rgba(177, 189, 170, 0.9)",
  },
  cancelButton: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "white",
    fontWeight: '600',
  },
  buttonConfirmarText: {
    color: '#333',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#333",
    marginBottom: 15,
    height: 60,
  },
  logoutButton: {
    paddingHorizontal: 15,
    marginTop: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginTop: 16,
    color: "white"
  },
  skillContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 5,
  },
  skillImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontWeight: "bold",
  },
  editButton: {
    paddingHorizontal: 10,
    width: "30%",
    paddingVertical: 40,
    backgroundColor: "rgba(177, 189, 170, 0.9)",
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    backgroundColor: "#333",
    color: "#fafafa",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  addButton: {
    backgroundColor: "#3498db",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "center",
    marginVertical: 10,
  },
  addButtonLabel: {
    color: "white",
  },
  logoutButtonText: {
    color: "black",
  },
  textDeleteButton: {
    fontWeight: "bold",
    color: "white",
  },
  textEditButton: {
    fontWeight: "bold",
  },
});

