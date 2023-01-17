import React, { useState } from "react"
import { Dimensions, StyleSheet, TextInput, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button } from "@ui-kitten/components"
import AsyncStorage from "@react-native-community/async-storage"

export default function CreateNote() {
	const navigator = useNavigation()

	const [ note, setNote ] = useState("")

	const changeNote = async () => {
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(note)
		await AsyncStorage.setItem("NOTES", JSON.stringify(n))
			.then(() => navigator.navigate("ListOfNotes"))
		setNote("")
	}

	return (
		<View style={styles.container}>
			<TextInput
				placeholder = "Write a note!"
				value={note}
				onChangeText={setNote}
				style={{ color: "#000000", fontSize: 30 }}
				multiline={true}
				autoFocus
			/>
			<View style={styles.bottom} > 
				<Button style={{marginBottom: 30}} onPress={changeNote}>
					CREATE
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		color: "black",
		padding: 25,
		paddingTop: 90,
		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end"
	}
})
