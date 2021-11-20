
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { ListItem, Button } from 'react-native-elements';
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"

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
						{ text: "OK"},
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
				<View style={styles.titleContainer}>
					<Entypo name="tools" size={50} color="#e30022" />
					<Text style={styles.title}> Manage Activity</Text>
				</View>
				<View style={{maringTop: 10, marginBottom: 20}}>
					<Text style={{fontSize: 12, fontWeight: "bold", alignSelf: "center"}}>To edit or remove, you must first tap on an acitivty</Text>
				</View>
				<View style={styles.list}>
					<FlatList
						data={activeList}
						renderItem={({ item }) => (
							<ListItem button onPress={() => setItem(item)}>
								<ListItem.Content>
									<ListItem.Title>{item.name}</ListItem.Title>
									<Text>Duration: {item.duration} | Calories: {item.calories}</Text>
									<Text>Date: {new Date(item.date).toString()}</Text>
								</ListItem.Content>
							</ListItem>
						)} />
				</View>
				<View style={styles.buttonGroup}>
					<Button title=" Add Activity" buttonStyle={styles.button} type="clear" icon={<FontAwesome name="user-plus" size={24} color="#e30022"/>} onPress={handleNewActivity} />
					<Button title=" Edit Activity" buttonStyle={styles.button} type="clear" icon={<FontAwesome name="gears" size={24} color="#e30022" />} onPress={handleEditActivity} />
					<Button title=" Remove Activity" buttonStyle={styles.button} type="clear" icon={<FontAwesome name="user-times" size={24} color="#e30022"/>} onPress={handleDelete} />
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
		borderColor: "#e30022",
		borderWidth: 2,
	},
	listItem: {
		borderWidth: 2,
		borderColor: "#e30022",
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
	buttonGroup: {
		flex: 1,
		margin: 50,
	},
	button: {
		margin: 10,
		alignSelf: "center",
	}
})