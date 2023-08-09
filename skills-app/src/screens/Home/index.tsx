import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Api } from "../../services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface Skill {
  id: number;
  url: string;
  nome: string;
  descricao: string;
}

interface UserSkill {
  id: number;
  skill: Skill;
  level: number;
}

const Home = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [newLevel, setNewLevel] = useState("");
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchSkills = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      const response = await Api.get(`/usuarioSkill/usuario/${userId}/skills`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSkills(response.data);
    } catch (error) {
      console.error("Erro ao buscar skills:", error);
    }
  };

  const fetchAvailableSkills = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      const response = await Api.get("/skills", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const userSkillIds = skills.map((userSkill) => userSkill.skill.id);
      const filteredSkills = response.data.filter(
        (skill: Skill) => !userSkillIds.includes(skill.id)
      );

      setAvailableSkills(filteredSkills);
    } catch (error) {
      console.error("Erro ao buscar habilidades:", error);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      await Api.delete(`/usuarioSkill/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const updatedSkills = skills.filter((userSkill) => userSkill.id !== id);
      setSkills(updatedSkills);
    } catch (error) {
      console.error("Erro ao excluir a skill:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");

      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleAddSkill = () => {
    setShowModal(true);
    fetchAvailableSkills();
  };

  const handleSaveSkill = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (selectedSkillId !== null && newLevel !== "") {
        await Api.post(
          "/usuarioSkill/associar",
          {
            usuarioId: userId,
            skillId: selectedSkillId,
            level: parseInt(newLevel),
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        setShowModal(false);
        fetchSkills();
      }
    } catch (error) {
      console.error("Erro ao associar skill ao usuário:", error);
    }
  };

  const handleOpenLevelModal = (skillId: number) => {
    setSelectedSkillId(skillId);
    setShowLevelModal(true);
  };

  const handleUpdateLevel = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const userSkill = skills.find((skill) => skill.skill.id === selectedSkillId);
  
      if (userSkill) {
        const novoNivel = newLevel !== "" ? parseInt(newLevel) : 0;
  
        await Api.put(
          `/usuarioSkill/${userSkill.id}`,
          { novoNivel },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        const updatedSkills = skills.map((skill) => {
          if (skill.id === userSkill.id) {
            return { ...skill, level: novoNivel };
          }
          return skill;
        });
        setSkills(updatedSkills);
  
        setShowLevelModal(false);
        console.log("Nível da skill atualizado com sucesso!");
        alert("Nível da skill atualizado com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao atualizar o nível da habilidade:", error);
      console.log("Erro ao atualizar o Nível da skill!");
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setIsAuthenticated(true);
        fetchAvailableSkills();
        fetchSkills();
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSkills();
    }
  }, [isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
          <Text style={styles.editarNivelText}>Adicionar nova skill</Text>
            <Picker
              selectedValue={selectedSkillId}
              onValueChange={(itemValue) => setSelectedSkillId(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma skill" value={null} />
              {availableSkills.map((skill) => (
                <Picker.Item
                  key={skill.id}
                  label={skill.nome}
                  value={skill.id}
                />
              ))}
            </Picker>

            <TextInput
              placeholder="Informe o level"
              value={newLevel}
              onChangeText={(text) => setNewLevel(text)}
              style={styles.input}
              keyboardType="numbers-and-punctuation"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSaveSkill}
                style={[styles.button, styles.saveButton]}
              >
                <Text style={styles.buttonConfirmarText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={showLevelModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.editarNivelText}>Editar Level</Text>
            <Image
              source={{
                uri: selectedSkillId
                  ? skills.find((skill) => skill.skill.id === selectedSkillId)
                      ?.skill.url
                  : "",
              }}
              style={styles.skillImage}
            />
            <Text style={styles.skillName}>
              {selectedSkillId
                ? skills.find((skill) => skill.skill.id === selectedSkillId)
                    ?.skill.nome
                : ""}
            </Text>
            <Text>
              {selectedSkillId
                ? skills.find((skill) => skill.skill.id === selectedSkillId)
                    ?.skill.descricao
                : ""}
            </Text>

            <TextInput
              placeholder="Novo level"
              value={newLevel}
              onChangeText={(text) => setNewLevel(text)}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleUpdateLevel}
                style={[styles.button, styles.updateButton]}
              >
                <Text style={styles.buttonConfirmarText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowLevelModal(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <Text style={styles.title}>Skills</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="sign-out" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleAddSkill} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Adicionar Skill</Text>
        </TouchableOpacity>

        {skills.map((userSkill) => (
          <View key={userSkill.id} style={styles.skillContainer}>
            <Image
              source={{ uri: userSkill.skill.url }}
              style={styles.skillImage}
            />
            <View style={styles.skillInfo}>
              <Text style={styles.skillName}>{userSkill.skill.nome}</Text>
              <Text>Level: {userSkill.level}</Text>
              <Text>{userSkill.skill.descricao}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleOpenLevelModal(userSkill.skill.id)}
              style={styles.editButton}
            >
              <Text style={styles.textEditButton}>Editar level</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteSkill(userSkill.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.textDeleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
