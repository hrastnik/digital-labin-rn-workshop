import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Axios from "axios";

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  songsContainer: { padding: 8 },
  songWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  songTitleText: { color: "rgba(0,0,0,0.9)", fontSize: 24 },
  songArtistText: { color: "rgba(0,0,0,0.9)", fontSize: 20 },
  deleteButton: {
    width: 32,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonText: { color: "#f00" },

  loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center" },

  addSongButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 4
  },
  addSongText: { color: "rgba(255,255,255,0.9)", fontSize: 18 }
});

export default class SongListScreen extends React.Component {
  state = { isLoading: true, error: undefined, songs: [] };

  constructor(props) {
    super(props);

    props.navigation.addListener("didFocus", this.fetchSongList);
  }

  fetchSongList = async () => {
    try {
      // const { data } = await Axios.get("http://3.120.200.113/api/songs").then(
      //   r => r.data
      // );

      const data = await Promise.resolve([
        { artist: "Rihanna", title: "Umbrella", id: 0 },
        { artist: "Eminem", title: "Lose Yourself", id: 1 },
        { artist: "Backstreet Boys", title: "I Want It That Way", id: 2 },
        { artist: "Childish Gambino", title: "This Is America", id: 3 }
      ]);

      this.setState({ isLoading: false, songs: data });
    } catch (error) {
      this.setState({ error: "Error fetching songs :(" });
    }
  };

  handleDeletePress = async id => {
    try {
      await Axios.delete("http://3.120.200.113/api/songs/" + id).then(
        r => r.data
      );
      await this.fetchSongList();
      Alert.alert("Success", "Successfully deleted song!");
    } catch (error) {
      this.setState({ error: "Error deleting song :(" });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={S.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (this.state.error) {
      return (
        <View style={S.loaderWrap}>
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    return (
      <View style={S.container}>
        <View style={S.songsContainer}>
          {this.state.songs.map(song => (
            <TouchableOpacity
              key={song.id}
              style={S.songWrap}
              onPress={() => {
                this.props.navigation.navigate("SingleSongScreen", {
                  songId: song.id
                });
              }}
            >
              <View>
                <Text style={S.songTitleText}>{song.title}</Text>
                <Text style={S.songArtistText}>{song.artist}</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.handleDeletePress(song.id);
                }}
                style={S.deleteButton}
              >
                <Text style={S.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={S.addSongButton}
          onPress={() => {
            this.props.navigation.navigate("AddSongScreen");
          }}
        >
          <Text style={S.addSongText}>ADD SONG</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
