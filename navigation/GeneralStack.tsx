import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
// export interface GeneralStack {
    
// }
 
const GeneralStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={GeneralStack}/>
        </Stack.Navigator>
    );
}
 
export default GeneralStack;