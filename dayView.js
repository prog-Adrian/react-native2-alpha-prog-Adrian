import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import manageActivity from "./manageActivity";
import { ListItem } from "react-native-elements";


export default function dayView({ navigation, route }) {
	const [user, setUser] = React.useState("")
	const [userProfile, setProfile] = React.useState([])
	const [activeList, setActivityList] = React.useState([])

	const handleActivity = () => {
		navigation.navigate("manActivity")
	}

	const handleMeal = () => {
		navigation.navigate("manMeal")
	}

	useEffect(() => {
		let mounted = true
		let myHeaders = new Headers()
		myHeaders.append("x-access-token", route.params.token)

		let url = "http://cs571.cs.wisc.edu:5000/users/" + route.params.username
		let userGoals = fetch(url, {
			method: "GET",
			headers: myHeaders,
		})
			.then(resp => resp.json())
			.then(result => {
				if (mounted == true) {
					setUser(result)
				}
			})
			.catch(error => console.error("Error: ", error))
		let secondHeaders = new Headers()

		secondHeaders.append("x-access-token", route.params.token)
		let profile = fetch("http://cs571.cs.wisc.edu:5000/activities", {
			method: "GET",
			headers: secondHeaders,
		})
			.then(resp => resp.json())
			.then(result => {
				if (mounted == true) {
					setProfile(result)
					setActivityList(result.activities)
				}
			})
			.catch(error => console.error("Error: ", error))
		return () => {
			mounted = false
		}
	}, [userProfile])

	const getTotalActivity = () => {
		let data = userProfile
		let sum = 0
		if (data.length != 0 && data.activities != undefined) {
			for (let i = 0; i < data.activities.length; i++) {
				sum = sum + parseFloat(data.activities[i].duration)
			}
		}
		return sum
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Today!</Text>
			<View style={styles.activitySection}>
				<View>
					<Text style={{alignSelf: "center"}}>Activity</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={activeList}
						renderItem={({ item }) => (
							<ListItem>
								<ListItem.Content>
									<ListItem.Title>{item.name}</ListItem.Title>
									<Text>Duration: {item.duration} | Calories: {item.calories}</Text>
									<Text>Date: {new Date(item.date).toUTCString()}</Text>
								</ListItem.Content>
							</ListItem>
						)} />
				</View>
			</View>
			<View style={styles.progressData}>
				<Text>Progres</Text>
				<Text>Activity: {getTotalActivity()} / {user.goalDailyActivity}</Text>
			</View>
			<View style={styles.buttons}>
				<Button title="Manage Activity" onPress={handleActivity} />
				<Button title="Manage Meals" onPress={() => console.log(activeList)} />
			</View>
		</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		textAlign: "center",
		fontSize: 50,
	},
	sections: {
		flex: 1,
		flexDirection: "row",
		marginTop: 50,
	},
	buttons: {
		flex: 1,
		marginTop: 100,
		backgroundColor: "green",
	},
	progressData: {
		flex: 1,
		marginTop: 100,
		alignItems: "center",
		backgroundColor: "purple",
	},
	activitySection: {
		flex: 1,
		backgroundColor: "red",
	},
	list: {
		flex: 1,
		marginTop: 10,
		width: "100%",
		backgroundColor: "blue",
	},
});


