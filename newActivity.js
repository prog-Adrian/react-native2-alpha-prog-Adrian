import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"


export default function newActivity({ navigation, route }) {
	const [activityName, setName] = React.useState("")
	const [duration, setDuration] = React.useState("")
	const [calories, setCalories] = React.useState("")
	const [date, setDate] = React.useState(new Date())
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
		setByTimeZone(date)
		setDate(date)
		let msg = "Your date has been saved as " + date.toUTCString()
		Alert.alert(
			"Success!",
			msg,
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{ text: "OK" }
			]
		);
		hideDatePicker();
	};

	useEffect(() => {
		setByTimeZone(date)
		setDate(date)
	}, [])

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
		if (activityName != "" && calories != "" && duration != "") {
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
							{ text: "OK" }
						]
					);
				})
				.catch(error => console.error("Error: ", error))
		} else{
			Alert.alert(
			"Insufficient information provided",
			"Please fill out all the information such as Activity Name, Duration and Calories",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{ text: "OK" }
			]
		);
		}
	}

	const handleClear = () => {
		setName("")
		setCalories("")
		setDuration("")
		setDate(new Date())
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Entypo name="man" size={50} color="#e30022" />
					<Text style={styles.title}>Add A New Activity!</Text>
				</View>
				<View style={{maringTop: 10, marginBottom: 20}}>
					<Text style={{fontSize: 12, fontWeight: "bold", alignSelf: "center"}}>Please fill in the information below. Tap the home button on the top left corner to cancel</Text>
				</View>
				<View style={styles.inputArea}>
					<Text style={styles.subTitle}>Activity Name</Text>
					<TextInput style={styles.input} onChangeText={setName} value={activityName} />
					<Text style={styles.subTitle}>Duration (Minutes)</Text>
					<TextInput style={styles.input} onChangeText={setDuration} value={duration} />
					<Text style={styles.subTitle}>Calories (Kcal)</Text>
					<TextInput style={styles.input} onChangeText={setCalories} value={calories} />
					<Text style={styles.subTitle}>Date</Text>
					<Text style={{ marginTop: 10 }}>{date.toUTCString()}</Text>
					<Button title=" Show Date and Time Picker" buttonStyle={styles.button} icon={<Fontisto name="calendar" size={24} color="#e30022" />} type="clear" onPress={showDatePicker} />
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						date={new Date()}
						display="default"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>
				<Button title=" Add Activity" buttonStyle={styles.button} type="clear" icon={<Fontisto name="check" size={24} color="#e30022" />} onPress={handleAdd} />
				<Button title=" Clear" buttonStyle={styles.button} icon={<Fontisto name="close-a" size={24} color="#e30022" />} type="clear" onPress={handleClear} />
			</View>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	title: {
		fontSize: 20,
		alignSelf: "center",
		fontWeight: "bold",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	inputArea: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	input: {
		height: 30,
		width: 200,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: "#e30022",
	},
	button: {
		margin: 10,
		alignSelf: "center",
	},
	subTitle: {
		alignSelf: "center",
		fontSize: 20,
	},
})