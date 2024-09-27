// src/screens/SettingsScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa para manejar la navegación

const useSettings = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = React.useState(true);
  const [language, setLanguage] = React.useState('en');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleNotifications = () => setAreNotificationsEnabled(!areNotificationsEnabled);
  const changeLanguage = (lang: string) => setLanguage(lang);

  return {
    isDarkMode,
    toggleDarkMode,
    areNotificationsEnabled,
    toggleNotifications,
    language,
    changeLanguage,
  };
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        darkMode: "Dark Mode",
        notifications: "Notifications",
        language: "Language",
      }
    },
    es: {
      translation: {
        darkMode: "Modo Oscuro",
        notifications: "Notificaciones",
        language: "Idioma",
      }
    },
    pt: {
      translation: {
        darkMode: "Modo Escuro",
        notifications: "Notificações",
        language: "Idioma",
      }
    }
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default function SettingsScreen() {
  const navigation = useNavigation(); // Hook para la navegación
  const {
    isDarkMode,
    toggleDarkMode,
    areNotificationsEnabled,
    toggleNotifications,
    language,
    changeLanguage,
  } = useSettings();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Modo Oscuro */}
        <View style={styles.option}>
          <Text style={styles.optionText}>{i18n.t('darkMode')}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Notificaciones */}
        <View style={styles.option}>
          <Text style={styles.optionText}>{i18n.t('notifications')}</Text>
          <Switch
            value={areNotificationsEnabled}
            onValueChange={toggleNotifications}
            thumbColor={areNotificationsEnabled ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Idioma */}
        <View style={styles.option}>
          <Text style={styles.optionText}>{i18n.t('language')}</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[styles.languageButton, language === 'en' && styles.selectedLanguageButton]}
              onPress={() => changeLanguage('en')}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageButton, language === 'es' && styles.selectedLanguageButton]}
              onPress={() => changeLanguage('es')}
            >
              <Text style={styles.languageText}>Español</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageButton, language === 'pt' && styles.selectedLanguageButton]}
              onPress={() => changeLanguage('pt')}
            >
              <Text style={styles.languageText}>Português</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botón de Ayuda */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('ContactoScreen' as never)}
      >
        <Image
          source={require('../../assets/ayuda.png')} // Asegúrate de que la ruta de la imagen sea correcta
          style={styles.helpIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#1E90FF',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  content: {
    alignItems: 'flex-start',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  languageButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedLanguageButton: {
    backgroundColor: '#0056b3',
  },
  languageText: {
    color: '#fff',
  },
  helpButton: {
    position: 'absolute',
    bottom: 40,
    right: 0.2,
    padding: 10,
    borderRadius: 50,
  },
  helpIcon: {
    width: 80,
    height: 80,
    opacity: 0.7, // Añade un poco de transparencia para el efecto de marca de agua
  },
});
// src/screens/ContactoScreen.tsx