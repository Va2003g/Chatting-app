import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { MenuOption } from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const MenuItem = ({
  text,
  action,
  value,
  icon,
}: {
  text: string;
  action: any;
  value: string | null;
  icon: string | ReactNode;
}) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text style={{fontSize:hp(1.7)}} className="font-semibold text-neutral-600">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
};

export default MenuItem;
