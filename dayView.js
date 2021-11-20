import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import manageActivity from "./manageActivity";
import { ListItem, Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function dayView({ navigation, route }) {
	const [user, setUser] = React.useState("")
	const [userProfile, setProfile] = React.useState([])
	const [activeList, setActivityList] = React.useState([])

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
					setActivityList(filterActiveList(result.activities))
				}
			})
			.catch(error => console.error("Error: ", error))
		return () => {
			mounted = false
		}
	}, [userProfile, user])

	const getTotalActivity = () => {
		let data = activeList 
		let sum = 0
		if (data.length != 0 && data != undefined) {
			for (let i = 0; i < data.length; i++) {
				sum = sum + parseFloat(data[i].duration)
			}
		}
		return sum
	}

	const filterActiveList = (data) => {
		let tempList = []
		let today = new Date()
		for(let i = 0; i < data.length; i++){
			let temp = new Date(data[i].date)
			if(today.getFullYear() == temp.getFullYear() && today.getMonth() == temp.getMonth() && today.getDay() == temp.getDay()){
				tempList.push(data[i])
			}
		}
		return tempList
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<FontAwesome5 name="sun" size={50} color="#f03547"/>
				<Text style={styles.title}>Today!</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.activitySection}>
					<View style={{ alignItems: "center", marginBottom: 10}}>
						<FontAwesome5 name="walking" size={50} color="#e30022"/>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>Your saved activities!</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold"}}>Scroll through to see your saved activities!</Text>
					</View>
					<View style={styles.list}>
						<FlatList
							data={activeList}
							renderItem={({ item }) => (
								<ListItem>
									<ListItem.Content>
										<ListItem.Title>{item.name}</ListItem.Title>
										<Text>Duration: {item.duration} | Calories: {item.calories}</Text>
										<Text>Date: {new Date(item.date).toString()}</Text>
									</ListItem.Content>
								</ListItem>
							)} />
					</View>
				</View>
				<View style={styles.progressData}>
					<Card>
						<Card.Title tyle={styles.progTitle}>
							<Icon name="bar-chart" size={30} color="#e30022" />
							<Text>Progres</Text>
						</Card.Title>
						<Text style={{ alignSelf: "center", fontSize: 15 }}>Activity:</Text>
						<Text style={{ alignSelf: "center", fontSize: 15 }}>{getTotalActivity()} min / {user.goalDailyActivity} min </Text>
					</Card>
				</View>
			</View>
		</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		textAlign: "center",
		fontSize: 50,
		marginLeft: 10,
	},
	buttons: {
		marginTop: 100,
	},
	progressData: {
		flex: 1,
		justifyContent: "center",
		margin: 25,
		padding: 20,
	},
	activitySection: {
		flex: 1,
	},
	list: {
		flex: 1,
		marginTop: 10,
		marginBottom: 0,
		width: "100%",
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


