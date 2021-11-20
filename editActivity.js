import React, { useEffect } from "react"
import { View, Text, TextInput, Alert, StyleSheet, } from "react-native"
import { Button } from "react-native-elements"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Fontisto from "react-native-vector-icons/Fontisto"

export default function editActivity({ navigation, route }) {

	const [activityName, setName] = React.useState(route.params.selected.name)
	const [duration, setDuration] = React.useState(route.params.selected.duration.toString())
	const [calories, setCalories] = React.useState(route.params.selected.calories.toString())
	const [date, setDate] = React.useState(new Date(route.params.selected.date))
	const [active, setActivity] = React.useState("");
	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

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

	const setByTimeZone = (time) => {
		const date = new Date()
		const difference = -date.getTimezoneOffset() / 60

		time.setHours(time.getHours() + difference)
	}

	const handleCancel = () => {
		navigation.navigate("manActivity")
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

	const handleSaveEdit = async () => {
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
					{ text: "OK" }
				]
			))
			.catch(error => console.error("Error: ", error))
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<FontAwesome name="gears" size={50} color="#e30022" />
					<Text style={styles.title}> Edit Activity</Text>
				</View>
				<View style={{maringTop: 10, marginBottom: 20}}>
					<Text style={{fontSize: 12, fontWeight: "bold", alignSelf: "center"}}>Change any of your previous entries! Tap home in on the top left corner to cancel.</Text>
				</View>
				<View style={styles.inputArea}>
					<Text style={styles.subTitle}>Activity Name</Text>
					<TextInput style={styles.input} onChangeText={setName} value={activityName} />
					<Text style={styles.subTitle}>Duration (Minutes)</Text>
					<TextInput style={styles.input} onChangeText={setDuration} value={duration.toString()} />
					<Text style={styles.subTitle}>Calories (Kcal)</Text>
					<TextInput style={styles.input} onChangeText={setCalories} value={calories.toString()} />
					<Text style={styles.subTitle}>Date</Text>
					<Text style={{ marginTop: 10 }}>{date.toUTCString()}</Text>
					<Button title=" Pick a new Date and Time" type="clear" icon={<Fontisto name="calendar" size={24} color="#e30022"/>} onPress={showDatePicker} />
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						date={new Date(route.params.selected.date)}
						display="default"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
					<Button title=" Save Activity" type="clear" style={{marginTop: 50}} icon={<Fontisto name="save-1" size={24} color="#e30022"/>} onPress={handleSaveEdit} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	content: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		alignSelf: "center",
		fontWeight: "bold",
	},
	subTitle: {
		alignSelf: "center",
		fontSize: 20,
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
	buttonGroup: {
		flex: 1,
		margin: 50,
	},
	button: {
		margin: 10,
		alignSelf: "center",
	},
})