import { FlatList, RefreshControl, View } from "react-native";
import DUMMY_DATA from "../../data/dummy-data.jsx";
import CardItem from "../events/card-item.jsx";

const EventList = () => {
    const renderItem = ({item}) => {
        return <CardItem id={item.id} title={item.title} description={item.description}></CardItem>
    }
    return (
        <View>
            <FlatList
                data={DUMMY_DATA}
                keyExtractor={item=> item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl 
                        refreshing={false}
                        onRefresh={() => console.log("refreshing...")}
                    />
                }
            />
        </View>
    );
}

export default EventList;

