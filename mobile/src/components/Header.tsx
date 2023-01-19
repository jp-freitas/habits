import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import Logo from '../assets/logo.svg'

export function Header() {
  const { navigate } = useNavigation()

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity onPress={() => navigate('new-habit')} activeOpacity={0.7} className="h-11 border border-violet-500 rounded-lg px-4 flex-row items-center">
        <Feather
          name="plus"
          color={colors.violet[500]}
          size={20}
        />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  )
}