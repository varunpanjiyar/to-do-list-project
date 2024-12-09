import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import EditScreen from './screens/EditScreen'
import {DataProvider} from './context'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;