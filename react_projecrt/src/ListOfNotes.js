import React, { useState } from "react"
import { View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Divider, List, ListItem, Text } from "@ui-kitten/components"
import AsyncStorage from "@react-native-community/async-storage"

export default function ListOfNotes() {
	const navigator = useNavigation()

	const [ notes, setNotes ] = useState([])

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

	const renderItem = ({ item }) => (
		<ListItem
			title={<Text category="h5">{item}</Text>}
			onPress={() =>
				navigator.navigate("Note", {
					aNote: item
				})}
		/>
	)
	return (
		<View style={{ backgroundColor: "#ffffff", marginTop: 50, flex: 1 }}>
			<List
				data={notes.reverse()}
				style={{fontSize: 36}}
				ItemSeparatorComponent={Divider}
				renderItem={renderItem}
			/>
		</View>
	)
}