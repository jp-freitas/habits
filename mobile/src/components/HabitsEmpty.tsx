import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-base text-zinc-400">
      Você ainda não está monitorando nenhum hábito {' '}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new-habit')}
      >
        comece criando um hábito!
      </Text>
    </Text>
  )
}