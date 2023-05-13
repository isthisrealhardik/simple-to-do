import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);


  const fetchData = () => {
    fetch('http://192.168.0.100:3000/todos')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }
  

  const handleAdd = () => {
    if (text.length != 0) {
      const data = {
        text: text,
      }
      const url = 'http://192.168.0.100:3000/todos';
      console.log(url)
    } else {
      console.log('the input field is empty.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: '700', textTransform: 'uppercase', marginBottom: 20 }} >To-Do List</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
        <TextInput
          placeholder='Add a todo...?' 
          value={text}
          onChangeText={setText}
          style={{ borderRadius: 5, borderWidth: 1, borderColor: 'black', marginRight: 10, width: 250, height: 40, paddingHorizontal: 15 }}
        />
        <TouchableOpacity onPress={handleAdd} style={{ backgroundColor: 'black', borderRadius: 5, height: 40, width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }} >Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 35 }}>
        <Text style={{ fontSize: 20, fontWeight: '400', }}>Todos:</Text>
        <TouchableOpacity onPress={fetchData} style={{ backgroundColor: 'black', borderRadius: 5, height: 40, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Fetch All Data</Text>
        </TouchableOpacity>
        {todos.length != 0 && todos.map(item => (
          <Text>{item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50
  },
});
