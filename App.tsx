
import React, { useEffect, useState }  from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { AppProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

enableScreens();
//
import {LogLevel, OneSignal} from 'react-native-onesignal';
// Значення міняємо в src/config/projectConfig.jsx, не тут.
import { ONESIGNAL_APP_ID } from './src/config/projectConfig';

function App(): React.JSX.Element {
  const [oneSignKkkk] = useState(ONESIGNAL_APP_ID);

  useEffect(() => {

    const initOnsignall = async () => {
      try {
        // Verbose-логи лишаємо тільки в дебазі
        if (__DEV__) {
          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        }

        // OneSignal ініціалізація
        if (oneSignKkkk) {
          OneSignal.initialize(oneSignKkkk);
        }
      } catch (e) {
        console.log('OneSignal init error:', e);
      }
    };
    
    initOnsignall();
    
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
