import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CardItem = ({id, title, description}) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => {router.push(`/card-detail?cardId=${id}&title=${title}&description=${description}`);}}
            style={styles.card}
        >
            <Text>{title}</Text>
            <Text>{description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5, 
        padding: 30
    }
})
export default CardItem;