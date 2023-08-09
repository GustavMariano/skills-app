import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";



import { Api } from "../../services/Api";

const Cadastro = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (
      login.length < 6 ||
      password.length < 8 ||
      password !== confirmPassword
    ) {
      alert("O login deve ter pelo menos 6 digitos e a senha 8!")
      return;
    }

    try {
      const response = await Api.post("/usuarios/registrar", {
        login,
        senha: password,
      });

      alert("Cadastro efetuado com sucesso!")
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (error) {
        alert("Erro ao fazer o cadastro tente novamente mais tarde!")
    }
  };

  const toggleShowPasswords = () => {
    setShowPasswords((prevShowPasswords) => !prevShowPasswords);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1600",
      }}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Login"
          onChangeText={setLogin}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            secureTextEntry={!showPasswords}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Senha"
            secureTextEntry={!showPasswords}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={toggleShowPasswords}
          style={styles.showPasswordsButton}
        >
          <Text style={styles.showPasswordsButtonText}>
            {showPasswords ? "Esconder Senha" : "Mostrar Senha"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>
            Já tem uma conta? faça login agora.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Cadastro;
