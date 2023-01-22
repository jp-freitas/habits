import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabit() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade')
      }
      await api.post('/habits', { title, weekDays })
      setTitle('')
      setWeekDays([])
      Alert.alert('Novo Hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível criar o novo hábito!')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">Criar Hábito</Text>
        <Text className="mt-6 text-white font-extrabold text-base">Qual o seu comprometimento?</Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 text-white focus:border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">Qual a recorrência?</Text>
        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox key={`${weekDay}-${index}`} checked={weekDays.includes(index)} title={weekDay} onPress={() => handleToggleWeekDay(index)} />
            )
          })
        }
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center justify-center w-full h-14 rounded-md mt-6 bg-green-600" onPress={handleCreateNewHabit}>
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}