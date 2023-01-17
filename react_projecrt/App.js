import React from "react"
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"
import ListOfNotes from "./src/ListOfNotes"
import CreateNote from "./src/CreateNote"
import Note from "./src/Note"

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
		<BottomNavigationTab title="Create Note" />
		<BottomNavigationTab title="All Notes" />
	</BottomNavigation>
)

const TabNavigator = () => (
	<Navigator tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="CreateNote" component={CreateNote} />
		<Screen name="ListOfNotes" component={ListOfNotes} />
		<Screen name="Note" component={Note} />
	</Navigator>
)

export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<NavigationContainer>
				<TabNavigator />
			</NavigationContainer>
		</ApplicationProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center"
	}
})