import React from "react";
import { View, Text, Button, TextInput, StyleSheet, Platform } from "react-native";
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function newActivity({ navigation, route }) {
	const [activityName, setName] = React.useState("")
	const [duration, setDuration] = React.useState("")
	const [calories, setCalories] = React.useState("")
	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};
	
	const setByTimezone = (time) => {
		const date = new Date()
		const difference = -date.getTimezoneOffset() / 60

		time.setHours(time.getHours() + difference)
		return (time)
	}

	const handleConfirm = (date) => {
		console.warn("A date has been picked: ", setByTimezone(date));
		hideDatePicker();
	};

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
					display="default"
					locale="es-ES"
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
				/>
				<View style={styles.buttons}>
					<Button title="Add Activity" />
					<Button title="Cancel" />
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