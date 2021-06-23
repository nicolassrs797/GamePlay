import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export let styles = StyleSheet.create({
    container: {
     flex: 1   
    },
    banner: {
        width: '100%',
        height: 234,
        justifyContent: "flex-end",
        marginBottom: 24
    },
    title: {
        fontFamily: theme.fonts.title700,
        fontSize: 28,
        color: theme.colors.heading,
        paddingHorizontal: 24,
        marginBottom: 12
    },
    subtitle: {
        fontFamily: theme.fonts.text400,
        fontSize: 13,
        color: theme.colors.heading,
        paddingHorizontal: 24,
        marginBottom: 24
    },
    members: {
        marginTop: 21,
        marginLeft: 24
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        marginBottom: getBottomSpace(),
    }
});
