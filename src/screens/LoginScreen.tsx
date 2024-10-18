import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { FirebaseAuthTypes } from "@react-native-firebase/auth"; // Import for Firebase types
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // For navigation types

// Define the type for navigation prop
type RootStackParamList = {
  Register: undefined;
};

type LoginScreenProps = {
  setIsAuthenticated: (isAuth: boolean) => void;
};

const colorP = "#4D7EE7";
const colorOs = "#569bcf";
const colorS = "#6bbedd";
const colorCl = "#7edce8";

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsAuthenticated }) => {
  const [focusedInput, setIsFocused] = useState<string | boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        navigation.navigate("Register");
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user?.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user?.email);
        setIsAuthenticated(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.containerPrinc}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

      <ImageBackground
        source={require("../../assets/BlueWallpaper.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require("../../assets/parklogo.jpeg")}
            resizeMode="contain"
          />

          <Text style={styles.title}>Inicio de sesion</Text>

          <Text style={styles.textMargen}>
            Nombre de usuario / Correo electronico
          </Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            style={[
              styles.input,
              focusedInput === "example01@gmail.com" && styles.focusedInput,
            ]}
            selectionColor="#09f"
            maxLength={35}
            placeholderTextColor="#BBBBBB"
            onFocus={() => setIsFocused("example01@gmail.com")}
            onBlur={() => setIsFocused(false)}
          />

          <Text style={styles.textMargen}>Contraseña</Text>

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            style={[
              styles.input,
              focusedInput === "password_Example" && styles.focusedInput,
            ]}
            placeholderTextColor="#BBBBBB"
            secureTextEntry
            onFocus={() => setIsFocused("password_Example")}
            onBlur={() => setIsFocused(false)}
          />

          <TouchableOpacity
            style={styles.botonLog}
            onPress={handleLogin}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
              Iniciar sesion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonLog}
            onPress={handleSignUp}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
              Registrarse
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContent}>
            <Text style={{ color: "#E6E6E6" }}>¿No tienes una cuenta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Registrate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerPrinc: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 2,
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    color: "#FF664B",
    width: "100%",
    height: 42,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  focusedInput: {
    height: 50,
    borderRadius: 25,
    borderColor: "#FF664B",
    shadowColor: "#070707",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },
  botonLog: {
    height: 42,
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
    width: "90%",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#7edce8",
  },
  textMargen: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
    marginBottom: 2,
  },
  registerContent: {
    margin: 10,
    marginTop: 10,
    gap: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
