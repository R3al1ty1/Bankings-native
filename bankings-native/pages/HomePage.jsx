import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ScrollView
} from "react-native";
import Post from "../components/Post";
import { Loading } from "../components/Loader";
import { axiosInstance } from "../API";

const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchPosts = () => {
        setIsLoading(true);
        let endpoint = "/accounts/";

        if (query.trim() !== "") {
            endpoint += `?query=${encodeURIComponent(query)}`;
        }

        axiosInstance
            .get(endpoint)
            .then(({ data }) => {
                setItems(data);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Устанавливаем новый таймаут для выполнения поиска
        const timeoutId = setTimeout(fetchPosts, 300);
        setSearchTimeout(timeoutId);

        // Очищаем таймаут при каждом изменении query
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(fetchPosts, []); // Вызываем fetchPosts при загрузке компонента

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Введите запрос..."
                value={query}
                onChangeText={(text) => setQuery(text)}
            />
            <ScrollView style={styles.container}>
            <FlatList
                contentContainerStyle={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
                }
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("FullPost", { id: item.id, type: item.type, name: item.name })}
                    >
                        <View style={styles.postContainer}>
                            <Post navigation={navigation} id={item.id} type={item.type} name={item.name} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#111111",
    },
    mainContainer: {
        flex: 1,
    },
    postContainer: {
        backgroundColor: "#1e1e1e",
        borderRadius: 8,
        marginBottom: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    searchInput: {
        height: 40,
        borderColor: "#1e1e1e",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: "#1e1e1e",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: "#aaaaaa"
    },
});

export default HomeScreen;
