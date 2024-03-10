import React from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';

const NotesDetails = ({ selectedNotes }) => {
  return (
    <View style={{ margin: 'auto', flex: 1 }}>
      <Text style={{ width: '100%', height: 40, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Selected Notes</Text>
      <FlatList
        data={selectedNotes}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemContainer}>
              <Text  style={styles.title}>{item.title}</Text>
              <Text  style={styles.description}>{item.description}</Text>
            </View>
          )
        }}
      />
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
});

export default NotesDetails;
