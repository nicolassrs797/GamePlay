import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export let styles = StyleSheet.create({
   container: {
       width: 48,
       height: 48,
       borderRadius: 8,
       alignItems: 'center',
       justifyContent: 'center',
       marginRight: 22
   },
   avatar: {
       width: 44,
       height: 44,
       borderRadius: 8
   }
});