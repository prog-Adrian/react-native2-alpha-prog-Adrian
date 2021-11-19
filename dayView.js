import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import manageActivity from "./manageActivity";
import { ListItem, Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/Fontisto';


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
			<View style={styles.content}>
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
				<Card>
					<Card.Title style={styles.progTitle}>
						<Icon name="bar-chart" size={30} color="#4F8EF7" />
						<Text>Progres</Text>
					</Card.Title>
					<Text style={{alignSelf: "center", fontSize: 15}}>Activity:</Text>
					<Text style={{alignSelf: "center", fontSize: 15}}>{getTotalActivity()} min / {user.goalDailyActivity} min </Text>
				</Card>
			</View>
			<View style={styles.buttons}>
				<Button title="Manage Activity" onPress={handleActivity} />
				<Button title="Manage Meals" onPress={() => console.log(activeList)} />
			</View>
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
	buttons: {
		marginTop: 100,
		backgroundColor: "green",
	},
	progressData: {
		justifyContent: "center",
		margin: 25,
		padding: 20,
		backgroundColor: "purple",
	},
	activitySection: {
		flex: 1,
		backgroundColor: "red",
	},
	list: {
		flex: 1,
		marginTop: 10,
		marginBottom: 0,
		width: "100%",
		backgroundColor: "blue",
	},
	content: {
		padding: 20,
		flex: 1,
	},
	progTitle: {
		fontSize: 25,
		alignContent: "space-around"
	}
});


