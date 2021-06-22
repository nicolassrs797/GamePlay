declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    let content: React.FC<SvgProps>;
    export default content;
}