import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import Axios from "axios";

const S = StyleSheet.create({
  errorWrap: { flex: 1, alignItems: "center", justifyContent: "center" },

  container: { flex: 1, backgroundColor: "#fff", padding: 8 },

  labelText: { color: "rgba(0,0,0,0.9)", fontSize: 16 },
  input: { color: "rgba(0,0,0,0.9)", fontSize: 18, paddingVertical: 8 },

  submitButton: {
    marginTop: 16,
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#000"
  },
  submitButtonText: { color: "rgba(255,255,255,0.9)", fontSize: 18 }
});

export default class SongListScreen extends React.Component {
  state = {
    isLoading: false,
    error: undefined,
    title: "",
    artist: "",
    album: "",
    year: "",
    yt_video_id: "",
    lyrics: ""
  };

  handleSubmitPress = async () => {
    const { title, artist, album, year, yt_video_id, lyrics } = this.state;
    try {
      this.setState({ isLoading: true });
      await Axios.post("http://3.120.200.113/api/songs", {
        title,
        artist,
        album,
        year,
        yt_video_id,
        lyrics
      }).then(res => res.data);
      this.setState({ isLoading: false });

      Alert.alert("Success", "You have added a song!");
      this.props.navigation.goBack();
    } catch (err) {
      this.setState({ isLoading: false, error: "Something went wrong :(" });
    }
  };

  render() {
    const {
      title,
      artist,
      album,
      year,
      yt_video_id,
      lyrics,
      isLoading,
      error
    } = this.state;

    if (error) {
      return (
        <View style={S.errorWrap}>
          <Text>{error}</Text>
        </View>
      );
    }

    const buttonText = isLoading ? "UPLOADING..." : "SUBMIT";

    return (
      <View style={S.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={S.labelText}>Title</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ title: text });
            }}
            style={S.input}
            value={title}
          />

          <Text style={S.labelText}>Artist</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ artist: text });
            }}
            style={S.input}
            value={artist}
          />

          <Text style={S.labelText}>Album</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ album: text });
            }}
            style={S.input}
            value={album}
          />

          <Text style={S.labelText}>Year</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ year: text });
            }}
            style={S.input}
            value={year}
          />

          <Text style={S.labelText}>YouTube ID</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ yt_video_id: text });
            }}
            style={S.input}
            value={yt_video_id}
          />

          <Text style={S.labelText}>Lyrics</Text>
          <TextInput
            onChangeText={text => {
              this.setState({ lyrics: text });
            }}
            style={S.input}
            value={lyrics}
            multiline
          />

          <TouchableOpacity
            style={S.submitButton}
            onPress={this.handleSubmitPress}
          >
            <Text style={S.submitButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
