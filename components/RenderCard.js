import React,{useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DataContext } from '../context'

function RenderCard({ item, index, onEdit, onDelete }) {
const { data, setData } = useContext(DataContext);

  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.desc}</Text>
        {/* Status */}
        <Text style={[styles.status, { color: item.isCompleted ? "green" : "orange" }]}>
          {item.isCompleted ? 'Completed' : 'In Progress'}
        </Text>
      </View>

      <View style={styles.iconsContainer}>
       
        <TouchableOpacity onPress={() => onEdit(item.id)}>
          <MaterialIcons name="edit" size={24} color="green" style={styles.icon} />
        </TouchableOpacity>

      
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default RenderCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3, // for shadow effect on Android
    shadowColor: '#000', // for shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});
