import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "./HomePage";
import FullPostScreen from "./FullPostPage";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer style={{ flex: 1, backgroundColor: '#111111' }}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1e1e1e',
                    },
                    headerTintColor: '#aaaaaa',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 24,
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Счета" }}
                />
                <Stack.Screen
                    name="FullPost"
                    component={FullPostScreen}
                    options={{ title: "Счет" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
