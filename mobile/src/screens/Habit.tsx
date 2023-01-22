import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import dayjs from 'dayjs'
import clsx from "clsx";

import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";

interface HabitParams {
  date: string;
}

interface DayInfoProps {
  completed: string[]
  possibleHabits: Array<{
    id: string;
    title: string;
  }>
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])
  const route = useRoute()
  const { date } = route.params as HabitParams
  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const isDayInPast = parsedDate.endOf('day').isBefore(new Date())
  const habitProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo!.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true)
      const response = await api.get('/day', { params: { date } })
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(id: string) {
    try {
      await api.patch(`/habits/${id}/toggle`)
      if (completedHabits.includes(id)) {
        setCompletedHabits(completedHabits.filter(habit => habit !== id))
      } else {
        setCompletedHabits([...completedHabits, id])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível alterar o estado do hábito')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) return <Loading />
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="mt-6 text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitProgress} />
        <View className={clsx("mt-6", {["opacity-50"]: isDayInPast})}>
          { dayInfo?.possibleHabits ? 
            dayInfo?.possibleHabits.map(habit => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDayInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
              :
            <HabitsEmpty />
          }
        </View>
        {
          isDayInPast && 
          <Text className="text-white mt-10 text-center"> 
            Você não pode editar hábitos de uma data passada.
          </Text>
        }
      </ScrollView>
    </View>
  )
}