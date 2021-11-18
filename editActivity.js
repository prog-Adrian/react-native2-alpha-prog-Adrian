import React, { useEffect } from "react"
import { View, Text, TextInput, Button, Alert, StyleSheet,} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function editActivity({ navigation, route }) {

	const [activityName, setName] = React.useState(route.params.selected.name)
	const [duration, setDuration] = React.useState(route.params.selected.duration.toString())
	const [calories, setCalories] = React.useState(route.params.selected.calories.toString())
	const [date, setDate] = React.useState(route.params.selected.date)
	const [active, setActivity] = React.useState("");
	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		setDate(date)
		hideDatePicker();
	};

	const setByTimeZone = (time) => {
		const date = new Date()
		const difference = -date.getTimezoneOffset() / 60

		time.setHours(time.getHours() + difference)
		return (time)
	}

	useEffect(() => {
		let myHeader = new Headers()
		myHeader.append("x-access-token", route.params.token)
		fetch("http://cs571.cs.wisc.edu:5000/activities", {
			method: "GET",
			headers: myHeader,
		})
			.then(resp => resp.json())
			.then(result => setActivity(result.activities))
			.catch(error => console.error("Error: ", error))
	}, [])

	const handleAdd = async () => {
		let myHeaders = new Headers()
		myHeaders.append("x-access-token", route.params.token)
		myHeaders.append("Content-Type", "application/json")
		let url = "http://cs571.cs.wisc.edu:5000/activities/" + route.params.selected.id
		let myBody = {
			"name": activityName,
			"duration": duration,
			"calories": calories,
			"date": date,
		}
		await fetch(url, {
			method: "PUT",
			headers: myHeaders,
			body: JSON.stringify(myBody),
		})
		.then(resp => resp.json())
		.then(result => Alert.alert(
					"Success!",
					result.message,
					[
						{
							text: "Cancel",
							style: "cancel"
						},
						{ text: "OK"}
					]
				))
		.catch(error => console.error("Error: ", error))
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Edit Activity</Text>
			<View style={styles.inputArea}>
				<Text>Activity Name</Text>
				<TextInput style={styles.input} onChangeText={setName} value={activityName} />
				<Text>Duration</Text>
				<TextInput style={styles.input} onChangeText={setDuration} value={duration.toString()} />
				<Text>Calories</Text>
				<TextInput style={styles.input} onChangeText={setCalories} value={calories.toString()} />
				<Text>Date</Text>
				<Text>{date.toString()}</Text>
				<Button title="Pick a new Date and Time" onPress={showDatePicker} />
				<View style={styles.buttons}>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						date={new Date(route.params.selected.date)}
						display="default"
						is24Hour={true}
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
					<Button title="Add Activity" onPress={handleAdd}/>
					<Button title="Cancel" onPress={() => console.log(route)} />
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
		height: 50,
		width: 200,
		borderWidth: 1,
	},
	buttons: {
		position: "absolute",
		alignSelf: "center",
		bottom: 25,
	},
})