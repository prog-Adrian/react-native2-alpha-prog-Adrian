import React from "react";
import { StyleSheet, Alert, View, Text, Button, TextInput } from 'react-native';
import manageActivity from "./manageActivity";


export default function dayView ({ navigation }){


	const handleActivity = () => {
		navigation.navigate("manActivity")
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
			<Button title="Manage Meals"/>
		</View>
		<View style={styles.progressData}>
			<Text>Progres</Text>
			<Text>Activity</Text>
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


