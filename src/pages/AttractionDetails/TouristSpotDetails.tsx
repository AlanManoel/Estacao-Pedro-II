import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Map, Camera, Marker } from "@maplibre/maplibre-react-native";
import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { imageUrl } from "@/services/attractionsApi";
import { GuideCards } from "@/shared/Components/GuideCards";
import { detailsStyles as styles } from "../details.styles";

type Props = {
  attraction: any;
};

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export const TouristSpotDetails = ({ attraction }: Props) => {
  const navigation = useNavigation<TSScreenDefinitionsProps>();

  const latitude = Number(attraction.latitude);
  const longitude = Number(attraction.longitude);

  const hasCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180;

  return (
    <ScrollView>
      <View style={styles.mapContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()} >
          <Feather name="arrow-left" size={24} color="#F3F0FA" />
        </TouchableOpacity>

        {hasCoordinates ? (
          <Map
            style={styles.map}
            mapStyle={MAP_STYLE}
            androidView="texture"
            dragPan={true}
            touchZoom={true} >
            <Camera initialViewState={{ center: [longitude, latitude], zoom: 15, }} />

            <Marker id="attraction-marker" lngLat={[longitude, latitude]} >
              <View style={styles.maker} >
                <Feather name="map-pin" size={20} color="#FFFFFF" />
              </View>
            </Marker>
          </Map>
        ) : (
          <View
            style={[
              styles.map,
              {
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E5E7EB",
              },
            ]} >
            <Feather name="map-pin" size={32} color="#373840" />
            <Text>Localização indisponível</Text>
          </View>
        )}

        <LinearGradient
          colors={[
            "transparent",
            "rgba(255,255,255,0.3)",
            "rgba(255,255,255,0.7)",
            "#F3F0FA",
          ]}
          style={styles.gradient}
          pointerEvents="none" />

        <Text style={styles.textMaps} >
          © OpenStreetMap contributors
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {attraction.name}
        </Text>

        {attraction.photos?.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.photosContainer,
              attraction.photos.length === 1 && styles.singlePhotoContainer,
            ]}
          >
            {attraction.photos.map((photo: any) => (
              <View
                key={photo.id}
                style={{
                  width: attraction.photos.length === 1 ? "100%" : 280,
                  marginRight: 32,
                }}
              >
                <Image
                  source={{ uri: imageUrl(photo.url) }}
                  style={[
                    styles.photo,
                    attraction.photos.length === 1 && styles.singlePhoto,
                  ]}
                />

                {!!photo.credit?.trim() && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666666",
                      marginTop: 5,
                      marginBottom: 8,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    Imagem: {photo.credit}
                  </Text>
                )}
              </View>
            ))
            }
          </ScrollView>
        )}

        {attraction.description && (
          <View>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.sectionText}>
              {attraction.description}
            </Text>
          </View>
        )}

        {attraction.tips && (
          <View>
            <Text style={styles.sectionTitle}>
              Dicas e cuidados
            </Text>
            <Text style={styles.sectionText}>
              {attraction.tips}
            </Text>
          </View>
        )}

        {attraction.openingHours && (
          <View>
            <Text style={styles.sectionTitle}>Horário</Text>
            <Text style={styles.sectionText}>
              {attraction.openingHours}
            </Text>
          </View>
        )}

        {attraction.price && (
          <View>
            <Text style={styles.sectionTitle}>Preço</Text>
            <Text style={styles.sectionText}>
              {attraction.price}
            </Text>
          </View>
        )}

        {attraction.howToGet && (
          <View>
            <Text style={styles.sectionTitle}>Como chegar</Text>
            <Text style={styles.sectionText}>
              {attraction.howToGet}
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.sectionTitle}>Guias locais</Text>

          {!attraction.guides?.length ? (
            <Text style={styles.sectionText}>
              Nenhum guia cadastrado para esta atração.
            </Text>
          ) : (
            <>
              <Text style={styles.sectionText}>
                Entre em contato com os guias pelo WhatsApp
                ou Instagram.
              </Text>

              {attraction.guides.map((guide: any) => (
                <GuideCards
                  key={guide.id}
                  guide={guide}
                  attractionName={attraction.name}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
