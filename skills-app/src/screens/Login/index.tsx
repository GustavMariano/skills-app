import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Api } from '../../services/Api';

const Login = () => {
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await Api.post('/login', {
        login,
        senha: password,
      });

      const { token, userId } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', String(userId));

      navigation.navigate('Home');

    } catch (error) {
      alert("Login ou senha inválidos!")
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1600',
      }}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Entrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Login"
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleShowPassword} style={styles.showPassword}>
          <Text style={styles.showPasswordText}>{showPassword ? 'Esconder Senha' : 'Mostrar Senha'}</Text>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setRememberPassword(!rememberPassword)}
            style={styles.checkbox}
          >
            {rememberPassword ? (
              <Text>✓</Text>
            ) : (
              <Text> </Text>
            )}
          </TouchableOpacity>
          <Text>Lembrar senha</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.signupLink}>Ainda não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
