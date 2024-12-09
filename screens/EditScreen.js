import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { DataContext } from '../context';

function EditScreen({ navigation,route }) {
  const { data, setData } = useContext(DataContext);
  
  const { id, edit } = route.params ?? {}; 

  
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  
  const editDatausingId = data.find((item) => item.id === id);


  useEffect(() => {
    if (editDatausingId) {
      setTitle(editDatausingId.title);
      setDesc(editDatausingId.desc);
      setIsCompleted(editDatausingId.isCompleted);
    }
  }, [editDatausingId]);


  const handleSave = () => {
    if (title.trim() === "" || desc.trim() === "") {
      Alert.alert("Both fields are mandatory!");
      return;
    }

    if (id) {

      const updatedData = data.map((item) =>
        item.id === id
          ? { ...item, title, desc, isCompleted } 
          : item
      );
      setData(updatedData);
    } else {

      const newData = {
        id: Date.now().toString(), 
        title,
        desc,
        isCompleted,
      };
      setData([...data, newData]);
    }

    navigation.goBack(); 
  };

  
  const handleCancel = () => {
    setTitle("");
    setDesc("");
    navigation.goBack();
  };

 
  const toggleStatus = () => {
    setIsCompleted((prevStatus) => !prevStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{id ? 'Edit your task' : 'Add a new task'}</Text>

      <Text style={styles.label}>Enter title</Text>
      <TextInput
        placeholder="Enter your title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Enter description</Text>
      <TextInput
        placeholder="Enter description"
        value={desc}
        onChangeText={setDesc}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{id ? 'Save' : 'Add'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {edit && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Task Status</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.statusLabel}>Completed:</Text>
            <Switch
              value={isCompleted}
              onValueChange={toggleStatus}
              thumbColor={isCompleted ? "#4CAF50" : "#f44336"} 
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditScreen;
