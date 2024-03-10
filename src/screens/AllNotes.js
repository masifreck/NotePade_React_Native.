import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Share,Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
let x=[]
const AllNotes = () => {
  const navigation = useNavigation();
  const isFocused=useIsFocused()
  const [notes, setNotes] = useState([]);
  useEffect(()=>{
    getAllNotes()

  },[isFocused])

  // Function to retrieve notes from encrypted storage
const getAllNotes = async () => {
  try {
    let y = await EncryptedStorage.getItem('notes');
    let data = JSON.parse(y);
    if (data && data.data) {
      setNotes(data.data);
    } else {
      setNotes([]);
    }
  } catch (error) {
    console.error('Error retrieving notes:', error);
  }
};

// Function to delete a note
const deleteNote = async (title, description) => {
  try {
    // Display confirmation dialog
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Filter out the note with matching title and description
              const updatedNotes = notes.filter(note => note.title !== title || note.description !== description);
              setNotes(updatedNotes);
              // Update storage with the updated notes
              await EncryptedStorage.setItem('notes', JSON.stringify({ data: updatedNotes }));
              console.log("Note deleted successfully.");
            } catch (error) {
              console.error("Error deleting note:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  } catch (error) {
    console.error("Error handling delete operation:", error);
  }
};

 

const editNote = (note) => {
  navigation.navigate('editnote', {
    note,
    onSave: handleEditNote,
  });
};

const handleEditNote = async (editedNote) => {
  try {
    const updatedNotes = notes.map(note =>
      note.id === editedNote.id ? editedNote : note
    );
    setNotes(updatedNotes);
    await EncryptedStorage.setItem('notes', JSON.stringify({ data: updatedNotes }));
    console.log("Note edited successfully.");
  } catch (error) {
    console.error("Error editing note:", error);
  }
};

  // Function to share a note
  const shareNote = (id, title, description) => {
    // Implement share logic here
    const shareOptions = {
      message: `Title: ${title}\nDescription: ${description}`,
    };
    Share.share(shareOptions);
    console.log("Sharing note with ID:", id);
  };
  const handleNotePress = (note) => {
    // Navigate to details page passing the selected note as a parameter
    navigation.navigate('notedetails', { selectedNotes: [note] });
    
  };


  return (
    <View style={{ margin: 'auto',flex:1 }}>
      <Text style={{ width: '100%', height: 40, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Saved Notes</Text>
      <FlatList
        data={notes}
        renderItem={({item,index})=>{
          return(
            <View style={styles.itemContainer}>
     <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
      <Text  style={styles.description}>{item.description}</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteNote(item.title, item.description)}>
  <Text style={styles.buttonText}>Delete</Text>
</TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => editNote(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={() => shareNote(item.id, item.title, item.description)}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
          )
        }}
      />
      <TouchableOpacity onPress={() => {
        navigation.navigate('addnote');
      }}
        style={{
            
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: 'limegreen',
          borderRadius: 50,
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 34 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  shareButton: {
    backgroundColor: 'green',
  },
});

export default AllNotes;
