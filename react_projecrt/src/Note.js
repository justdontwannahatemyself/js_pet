import React, { useState } from "react"
import { StyleSheet, View, TextInput } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button } from "@ui-kitten/components"
import AsyncStorage from "@react-native-community/async-storage"


export default function Note({ route }) {
	
	const navigator = useNavigation()

	const [ notes, setNotes ] = useState([])
	const { aNote } = route.params

	const getNotes = () => {
		AsyncStorage.getItem("NOTES").then((notes) => {
			setNotes(JSON.parse(notes))
		})
	}

	useFocusEffect(
		React.useCallback(() => {
			getNotes()
		}, [])
	)

	const deleteNote = async () => {
		const filteredNotes = await notes.filter((note) => note !== aNote)
		await AsyncStorage.setItem("NOTES", JSON.stringify(filteredNotes))
			.then(() => navigator.navigate("ListOfNotes"))
	}

	const [ newNote, setNewNote ] = useState("")

	const editNote = async() => {
		const filteredNotes = await notes.filter((note) => note !== aNote)
		await AsyncStorage.setItem("NOTES", JSON.stringify(filteredNotes))
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(newNote)
		await AsyncStorage.setItem("NOTES", JSON.stringify(n))
			.then(() => navigator.navigate("ListOfNotes"))
		setNewNote("")
	}

	return (
		<View style={{ backgroundColor: "#ffffff", marginTop: 50, flex: 1 }}>
			<View style={{ flex: 1, marginTop: 50}}>
				<TextInput
					placeholder = "Empty note!"
					defaultValue={aNote}
					onChangeText={setNewNote}
					style={{ color: "#000000", fontSize: 30, margin: 20 }}
					multiline={true}
					autoFocus
				/>
			</View>

			<View style={styles.bottom} > 
				<Button  style={{marginLeft: 25, marginTop: 200, height: 100, width: 150, backgroundColor: "#ff0000"}} 
				onPress={deleteNote}>
					DELETE
				</Button>
				<Button style={{marginRight: 25, marginTop: 200, height: 100,  width: 150, backgroundColor: "#0051ff",}}
				 onPress={editNote} disabled = {newNote == ""} >
					EDIT
				</Button>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36,
		flexDirection: "row",
		justifyContent: 'space-between'
	}
})