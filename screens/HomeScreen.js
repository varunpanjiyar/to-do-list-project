import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import RenderCard from '../components/RenderCard';
import { DataContext } from '../context';

function HomeScreen({ navigation }) {
  const { data, setData } = useContext(DataContext);

  const onDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const onEdit = (id) => {
    navigation.navigate("edit", { edit: true, id: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Todo List</Text>
      <TouchableOpacity style={styles.addTaskBtn} onPress={() => navigation.navigate("edit")}>
        <Text style={styles.addTaskText}>Add Task</Text>
      </TouchableOpacity>

   
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <RenderCard 
            item={item} 
            index={index} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No data available</Text>
          </View>
        }
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20, 
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addTaskBtn: {
    backgroundColor: 'blue',
    marginVertical: 10,
    padding: 12,
    borderRadius: 6,
  },
  addTaskText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
