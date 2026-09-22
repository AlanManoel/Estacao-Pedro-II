import { Images } from "@/shared/Assets";

export const touristAttractions = [
    {
        id: 1,
        name: "Mirante do Gritador",

        images: [
            Images.morroDoGritador,
            Images.morroDoGritador2,
            Images.morroDoGritador3
        ],

        location: {
            latitude: -4.331104320883757,
            longitude: -41.447875520857295,
        },

        description:
            "O Morro do Gritador, em Pedro II (PI), é um mirante famoso por suas vistas panorâmicas das serras e cânions. O local combina natureza, clima agradável e uma das paisagens mais bonitas da região.",

        tips:
            "No fim da tarde para aproveitar o pôr do sol. Aproveite para experimentar a culinária local. Leve câmera ou celular para boas fotos da paisagem.",

        howToGet: "Para aproveitar melhor a visita e garantir que você chegue sem problemas, entre em contato com os guias locais. Eles podem dar todas as informações sobre a localização."
    },
];