import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import dayView from "./dayView";
import ProfileView from "./ProfileView";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/Fontisto';
import manageActivity from "./manageActivity";

const Tab = createBottomTabNavigator();

export default function home({ navigation, route }) {

	return (
		//		<Button title="Press me!" onPress={() => console.log(route)}/>
		<Tab.Navigator>
			<Tab.Screen name="Day View" component={dayView} initialParams={{ "username": route.params.username, "token": route.params.token }} options={{
				headerShown: false,
				tabBarIcon: (tabInfo) => {
					return (
						<Icon name="cloudy" size={24} color={tabInfo.focused ? "red" : "blue"} />
					)
				},
			}} />
			<Tab.Screen name="Exercise" component={manageActivity} initialParams={{ "username": route.params.username, "token": route.params.token }} options={{
				headerShown: false,
				tabBarIcon: (tabInfo) => {
					return (
						<Icon name="person" size={24} color={tabInfo.focused ? "red" : "blue"} />
					)
				},
			}} />
			<Tab.Screen name="Profile" component={ProfileView} initialParams={{ "username": route.params.username, "accessToken": route.params.token }} options={{
				headerShown: false,
				tabBarIcon: (tabInfo) => {
					return (
						<Icon name="person" size={24} color={tabInfo.focused ? "red" : "blue"} />
					)
				},
			}} />
		</Tab.Navigator>
	)
}