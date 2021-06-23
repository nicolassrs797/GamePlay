import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export let styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    categoryTitle: {
        marginTop: 32,
        marginBottom: 12
    },
    form: {
        paddingHorizontal: 24,
        marginTop: 32
    },
    label: {
        fontFamily: theme.fonts.title700,
        fontSize: 18,
        color: theme.colors.heading
    },
    select: {
        width: '100%',
        height: 68,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: theme.colors.secondary50,
        borderRadius: 8,
        alignItems: "center",
        paddingRight: 25,
        overflow: "hidden",
    },
    selectBody: {
        flex: 1,
        alignItems: "center"
    },
    image: {
        width: 68,
        height: 68,
        backgroundColor: theme.colors.secondary50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.secondary50
    },
    field: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
    },
    divider: {
        marginRight: 4,
        fontSize: 15,
        fontFamily: theme.fonts.text500,
        color: theme.colors.highlight
    },
    textAreaTitle: {
        marginTop: 28,
    },
    textArea: {
        marginTop: 12,
        paddingHorizontal: 24,
        marginBottom: 56
    },
    button: {
        paddingHorizontal: 24,
        marginBottom: 56
    }
});
