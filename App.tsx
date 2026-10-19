import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LearningProvider } from './src/context/LearningContext';
import { LearningGate } from './src/components/LearningGate';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <LearningProvider>
        <LearningGate>
          <RootNavigator />
        </LearningGate>
      </LearningProvider>
    </SafeAreaProvider>
  );
}

export default App;
