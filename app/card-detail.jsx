import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const CardDetailScreen = () => {
    const route = useRoute()
    const { cardId, title, description } = route.params
    return(
        <View style={styles.screen}>
            <Text style={{fontSize: 20}}>This is the card detail screen for { cardId }</Text>
            <Text style={{fontSize: 20}}>{ title }</Text>
            <Text style={{fontSize: 10}}>{ description }</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
    },
})

export default CardDetailScreen;