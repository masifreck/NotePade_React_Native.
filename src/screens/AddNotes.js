import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
let Notes =[]
const AddNotes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
const navigation=useNavigation()
const save = async () => {
  try {
    let existingNotes = await EncryptedStorage.getItem('notes');
    let existingNotesArray = existingNotes ? JSON.parse(existingNotes).data : [];

    let newNote = { title: title, description: description };
    let updatedNotes = [...existingNotesArray, newNote];

    await EncryptedStorage.setItem('notes', JSON.stringify({ data: updatedNotes }));
    
    Alert.alert('Success', 'Data saved successfully');
    setTitle('');
    setDescription('');
    navigation.navigate('allnote');
  } catch (error) {
    console.error('Error saving data:', error);
    Alert.alert('Error', 'Failed to save data');
  }
};


  return (

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter Note Title'
          style={styles.input}
          value={title}
          onChangeText={(txt) => setTitle(txt)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(txt) => setDescription(txt)}
          placeholder='Enter Note Description'
          value={description}
          style={[styles.input, styles.descriptionInput]}
        />
      </View>
      <TouchableOpacity style={styles.addBTN} onPress={() => save()}>
        <Text style={styles.btntext}>ADD NOTES</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0', // Background color
    marginTop: 10,
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Text color
    textDecorationLine: 'underline', // Underline
  },
  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff', // Input background color
  },
  descriptionInput: {
    height: 100, // Add margin top to create space between the input fields
  },
  addBTN: {
    width: '90%',
    height: 50,
    backgroundColor: '#00cc99', // Button background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
  },
  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase text
  },
});
