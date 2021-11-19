
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native'
import { ListItem } from 'react-native-elements';

export default function manageActivity({ navigation, route }) {
	const [activeList, setActivity] = React.useState("")
	const [selectedItem, setItem] = React.useState("")

	const handleNewActivity = () => {
		navigation.navigate("newActivity")
	}

	const handleEditActivity = () => {
		if (selectedItem != "") {
			navigation.navigate("editActivity", { "selected": selectedItem })
		}else{
			Alert.alert(
					"No selection made",
					"Please Selected an acitivty from the list and then press Edit",
					[
						{
							text: "Cancel",
							style: "cancel"
						},
						{ text: "OK"}
					]
				);
		}
	}

	useEffect(() => {
		let mounted = true
		let myHeader = new Headers()
		myHeader.append("x-access-token", route.params.token)
		fetch("http://cs571.cs.wisc.edu:5000/activities", {
			method: "GET",
			headers: myHeader,
		})
			.then(resp => resp.json())
			.then(result => {
				if (mounted == true) {
					setActivity(result.activities)
				}
			})
			.catch(error => console.error("Error: ", error))

		return () => {
			mounted = false
		}

	}, [activeList])

	const handleDelete = async () => {
		let url = "http://cs571.cs.wisc.edu:5000/activities/" + selectedItem.id
		let myHeaders = new Headers()
		if (selectedItem != "") {
			myHeaders.append("x-access-token", route.params.token)
			await fetch(url, {
				method: "DELETE",
				headers: myHeaders,
			})
				.then(response => response.json())
				.then(res => console.log(res))
				.catch(error => console.error("Error: ", error))

		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View>
					<Text style={styles.title}>Manage Activity</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={activeList}
						renderItem={({ item }) => (
							<ListItem button onPress={() => setItem(item)}>
								<ListItem.Content>
									<ListItem.Title>{item.name}</ListItem.Title>
									<Text>Duration: {item.duration} | Calories: {item.calories}</Text>
									<Text>Date: {new Date(item.date).toUTCString()}</Text>
								</ListItem.Content>
							</ListItem>
						)} />
				</View>
				<View style={styles.buttons}>
					<Button title="Add Activity" onPress={handleNewActivity} />
					<Button title="Edit Activity" onPress={handleEditActivity} />
					<Button title="Remove Activity" onPress={handleDelete} />
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