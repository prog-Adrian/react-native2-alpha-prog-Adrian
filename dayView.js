import React, { useEffect } from "react";
import { StyleSheet, Alert, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import manageActivity from "./manageActivity";
import { ListItem } from "react-native-elements";


export default function dayView ({ navigation, route}){
	const [user, setUser] = React.useState("")
	const [userProfile, setProfile] = React.useState([])
	const [totalActivity, setActivity] = React.useState("")


	const handleActivity = () => {
		navigation.navigate("manActivity")
	}

	const handleMeal= () => {
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
			if(mounted == true){
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
			if(mounted == true){
				setProfile(result)
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
		if(data.length != 0 && data.activities != undefined){
			for(let i = 0; i < data.activities.length; i++){
				sum = sum + parseFloat(data.activities[i].duration)
			}
		}
		return sum
	}

	return(
	<View style={styles.container}>
		<View>
			<Text style={styles.title}>Today!</Text>
		</View>
		<View style={styles.secTitles}>
			<Text>Activity</Text>
			<Text>Meals</Text>
		</View>
		<View style={styles.manageBTN}>
			<Button title="Manage Activity" onPress={handleActivity}/>
			<Button title="Manage Meals" onPress={() => console.log(userProfile)}/>
		</View>
		<View style={styles.progressData}>
			<Text>Progres</Text>
			<Text>Activity {getTotalActivity()}:TEMP</Text>
			<Text>Calories</Text>
			<Text>Protein</Text>
			<Text>Carbs</Text>
			<Text>Fats</Text>
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
	secTitles: {
		flexDirection: "row",
		marginTop: 50,
		justifyContent: "space-around",
	},
	manageBTN: {
		flexDirection: "row",
		marginTop: 50,
		justifyContent: "space-around"
	},
	progressData: {
		justifyContent: "space-evenly",
		flexGrow: 40,
	},
});


