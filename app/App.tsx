import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.105:4000',
  }),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              title: 'Giriş Ekranı',
              headerTitleAlign: 'center',
              headerLargeTitle: true,
              headerShadowVisible: false,
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{
              title: 'Kayıt Ekranı',
              headerTitleAlign: 'center',
              headerLargeTitle: true,
              headerShadowVisible: false,
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
