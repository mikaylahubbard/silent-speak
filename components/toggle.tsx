import { useSession } from "@/context";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

export const Toggle = ({
  value,
  onValueChange,
  activeColor,
}: {
  value: boolean;
  onValueChange: () => void;
  activeColor: string;
}) => {
  const translateX = useRef(new Animated.Value(value ? 18 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 18 : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [value]);
  const { modePalette } = useSession();
  return (
    <Pressable
      onPress={onValueChange}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        backgroundColor: value ? activeColor : "#404040",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Animated.View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: modePalette.accents,
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
};
