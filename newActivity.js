import React, { useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function newActivity({ navigation, route }) {
	const [activityName, setName] = React.useState("")
	const [duration, setDuration] = React.useState("")
	const [calories, setCalories] = React.useState("")
	const [date, setDate] = React.useState("")
	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const setByTimeZone = (time) => {
		const date = new Date()
		const difference = -date.getTimezoneOffset() / 60

		time.setHours(time.getHours() + difference)
	}

	const handleConfirm = (date) => {
		setDate(date)
		let msg = "Your date has been saved as " + date.toString()
		Alert.alert(
					"Success!",
					msg,
					[
						{
							text: "Cancel",
							style: "cancel"
						},
						{ text: "OK"}
					]
				);
		hideDatePicker();
	};

	const handleAdd = async () => {
		var myHeaders = new Headers()
		let token = route.params.token
		myHeaders.append("Content-Type", "application/json")
		myHeaders.append("x-access-token", token)
		let myBody = {
			"name": activityName,
			"duration": duration,
			"calories": calories,
			"date": date
		}
		console.log(date)
		const response = await fetch("http://cs571.cs.wisc.edu:5000/activities", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(myBody),
		})
			.then(response => response.json())
			.then(result => {
				Alert.alert(
					"Success!",
					result.message,
					[
						{
							text: "Cancel",
							style: "cancel"
						},
						{ text: "OK"}
					]
				);
			})
			.catch(error => console.error("Error: ", error))
	}

	const handleCancel = () => {
		navigation.navigate("manActivity")
	}



	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add A New Activity!</Text>
			<View style={styles.inputArea}>
				<Text>Activity Name</Text>
				<TextInput style={styles.input} onChangeText={setName} />
				<Text>Duration</Text>
				<TextInput style={styles.input} onChangeText={setDuration} />
				<Text>Calories</Text>
				<TextInput style={styles.input} onChangeText={setCalories} />
				<Text>Date</Text>
				<Button title="Show Date Picker" onPress={showDatePicker} />
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="datetime"
					date={new Date()}
					display="default"
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
				/>
				<View style={styles.buttons}>
					<Button title="Add Activity" onPress={handleAdd} />
					<Button title="Cancel" onPress={handleCancel}/>
				</View>
			</View>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 50,
		alignSelf: "center",
	},
	inputArea: {
		flex: 1,
	},
	input: {
		height: 20,
		width: 50,
		borderWidth: 1,
	},
	buttons: {
		position: "absolute",
		alignSelf: "center",
		bottom: 25,
	},
})