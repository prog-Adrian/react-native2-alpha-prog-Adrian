import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements';

export default function manageMeals({ navigation, route }) {
	const [activeList, setActivity] = React.useState("")
	const [selectedItem, setItem] = React.useState("")

	const handleNewActivity = () => {
		navigation.navigate("newActivity")
	}

	const handleEditActivity = () => {
		navigation.navigate("editActivity", {"selected": selectedItem})
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

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View>
					<Text style={styles.title}>Manage Meals</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={activeList}
						renderItem={({ item }) => (
							<ListItem button onPress={() => setItem(item)}>
								<ListItem.Content>
									<ListItem.Title>{item.name}</ListItem.Title>
									<Text>Duration: {item.duration} | Calories: {item.calories}</Text>
									<Text>Date: {item.date.toString()}</Text>
								</ListItem.Content>
							</ListItem>
						)} />
				</View>
				<View style={styles.buttons}>
					<Button title="Add Activity"/>
					<Button title="Edit Activity"/>
					<Button title="Remove Activity" onPress={() => console.log(activeList)} />
				</View>
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
	},
	list: {
		flex: 1,
		marginTop: 10,
		width: "100%",
	},
	title: {
		alignSelf: "center",
		fontSize: 20,
	},
	buttons: {
		flex: 1,
		marginTop: 50,
	}
})