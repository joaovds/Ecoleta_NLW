import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';

import Map, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SvgUri } from 'react-native-svg';

import api from '../../services/api';

interface Iitem {
  cd_item: number;
  image_url: string;
  title: string;
}

interface Ipoints {
  cd_points: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

interface Iparams {
  uf: string;
  city: string;
}

const Points = () => {
  const [items, setItems] = useState<Iitem[]>([]);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [points, setPoints] = useState<Ipoints[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Iparams;

  useEffect(() => {
    api.get('items').then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Localização negada!',
          'Precisamos que você permita obtermos sua localização!'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItem,
        },
      })
      .then((res) => {
        setPoints(res.data);
      });
  }, [selectedItem]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(cd_points: number) {
    navigation.navigate('Detail', { cd_point: cd_points });
  }

  function handleSelectItem(cd_item: number) {
    const verificationSelected = selectedItem.findIndex(
      (item) => item === cd_item
    );

    if (verificationSelected >= 0) {
      const filteredItems = selectedItem.filter((item) => item !== cd_item);
      setSelectedItem(filteredItems);
    } else {
      setSelectedItem([...selectedItem, cd_item]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <Map
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.cd_points)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => handleNavigateToDetail(point.cd_points)}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </Map>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.cd_item)}
              style={[
                styles.item,
                selectedItem.includes(item.cd_item) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.cd_item)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
