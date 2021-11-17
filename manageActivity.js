
import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native'

export default function manageActivity({ navigation, route}){

	const handleNewActivity = () => {
		navigation.navigate("newActivity")
	}


	return(
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Manage Meals</Text>
			</View>
			<View style={styles.buttons}>
				<Button title="Add Activity" onPress={handleNewActivity}/>
				<Button title="Edit Activity"/>
				<Button title="Remove Activity"/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	title: {
		top: 50,
		fontSize: 50,
	},
	buttons: {
		position: "absolute",
		alignSelf: "center",
		bottom: 35,
		flexGrow: 25,
	}
})