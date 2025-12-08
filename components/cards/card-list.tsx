
import { FlatList, RefreshControl, View } from "react-native";
import DUMMY_DATA from "../../data/dummy-data";
import CardItem from "./card-item";

interface Card {
  id: string | number;
  title: string;
  description: string;
}

const CardList = () => {
  const renderItem = ({ item }: { item: Card }) => {
    return (
      <CardItem
        id={item.id}
        title={item.title}
        description={item.description}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id.toString()}
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
};

export default CardList;

