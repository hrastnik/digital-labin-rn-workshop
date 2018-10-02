import { createStackNavigator } from "react-navigation";

import SongListScreen from "./screens/SongListScreen";
import SingleSongScreen from "./screens/SingleSongScreen";
import AddSongScreen from "./screens/AddSongScreen";

const Router = createStackNavigator(
  {
    SongListScreen: {
      screen: SongListScreen,
      navigationOptions: { title: "LYRICOOL" }
    },
    SingleSongScreen: {
      screen: SingleSongScreen
    },
    AddSongScreen: {
      screen: AddSongScreen,
      navigationOptions: { title: "ADD SONG" }
    }
  },
  {
    navigationOptions: {
      headerTintColor: "rgba(255,255,255,0.9)",
      headerTitleStyle: { fontSize: 26, fontWeight: "normal" },
      headerStyle: { backgroundColor: "rgba(0,0,0,0.9)" }
    }
  }
);

export default Router;
