import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import { View, Text, StyleSheet, Image } from 'react-native';
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";
import {COURSES, EDUCATION_TYPES} from "../consts";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
`

const FullPostScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    const { id, name } = route.params;

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        });

        axiosInstance
            .get("/accounts/" + id)
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
                alert("Ошибка");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(fetchGroup, []);

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        );
    }

    // Проверяем, определено ли data и data.account
    if (!data) {
        return (
            <View>
                <Text>Ошибка</Text>
            </View>
        );
    }

    const accountImage = `http://172.20.10.3:8000/api/icon/${data.type}/`;

    const getCurrencySymbol = (currencyCode) => {
        switch (currencyCode) {
            case 840:
                return '$';
            case 978:
                return '€';
            case 643:
                return '₽';
            default:
                return currencyCode;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.accountName}>{data.name}</Text>
            </View>
            <View style={styles.centerContainer}>
                <Image style={styles.postImage} source={{ uri: accountImage }} />
                <PostDetails>
                    <PostText style={styles.dataContainer}>
                        Баланс: {data.amount} {getCurrencySymbol(data.currency)}
                    </PostText>
                    <PostText style={styles.dataContainer}>
                        Номер счета: {data.number}
                    </PostText>
                    <PostText style={styles.dataContainer}>
                        БИК банка: {data.bic}
                    </PostText>
                    <PostText style={styles.dataContainer}>
                        Тип счета: {data.type}
                    </PostText>

                </PostDetails>
            </View>
            <View style={styles.bottomContainer}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#111111',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    topContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    centerContainer: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    postImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    accountName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#bbbbbb',
    },
    dataContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#bbbbbb',
        marginTop: 10,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    // Ваши дополнительные стили
});

export default FullPostScreen;