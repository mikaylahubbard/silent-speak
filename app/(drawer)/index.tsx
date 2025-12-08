import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import CardList from "../../components/cards/card-list";

const HomeScreen = () => {
    const router = useRouter()
    return(
        <View style={styles.screen}>
            <Text>This is the home screen</Text>

            <CardList />
        </View>
        
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
    },
})

export default HomeScreen;