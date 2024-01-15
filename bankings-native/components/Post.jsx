import styled from "styled-components/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Post = ({ navigation, type, name, account, id }) => {
    const accountImage = `http://172.20.10.3:8000/api/icon/${type}/`;

    return (
        <PostView>
            <View style={styles.imageContainer}>
                <PostImage source={{ uri: accountImage }} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.accountName}>{name}</Text>
            </View>
        </PostView>
    );
};

const PostView = styled.View`
  flex-direction: row;
  gap: 15px;
  padding: 15px;
  margin: 15px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 5px;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

const styles = {
    imageContainer: {
        marginRight: 12,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: "column",
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#aaaaaa',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#ffffff",
    },
};

export default Post;
