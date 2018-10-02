import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Linking } from "expo";
import Axios from "axios";

const S = StyleSheet.create({
  loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#fff" },
  songsContainer: { padding: 8 },
  songTitleText: { color: "rgba(0,0,0,0.9)", fontSize: 24 },
  songArtistText: { color: "rgba(0,0,0,0.9)", fontSize: 20 },
  songAlbumText: { color: "rgba(0,0,0,0.9)", fontSize: 20 },
  songLyrics: { color: "rgba(0,0,0,0.9)", fontSize: 16, marginTop: 16 },
  watchOnYTButton: {
    alignSelf: "stretch",
    padding: 8,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderRadius: 4
  },
  watchOnYTButtonText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16
  },

  lyricsWrap: { flex: 1, marginVertical: 8, paddingHorizontal: 8 }
});

export default class SingleSongScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", "")
  });

  state = { isLoading: true, error: undefined, song: undefined };

  async componentDidMount() {
    // const songId = this.props.navigation.getParam("songId");

    try {
      // const { data } = await Axios.get(
      //   `http://3.120.200.113/api/songs/${songId}`
      // ).then(r => r.data);

      const data = {
        yt_video_id: "CvBfHwUxHIk",
        title: "Umbrella",
        artist: "Rihanna",
        album: "Good Girl Gone Bad",
        year: 2007,
        lyrics: `Uh huh, uh huh
Yeah, Rihanna
Uh huh, uh huh 
Good girl gone bad
Uh huh, uh huh 
Take three, action
Uh huh, uh huh, ho
No clouds in my stones
Let it rain, I hydroplane into fame
Comin' down at the Dow Jones
When the clouds come, we gone
We Rocafella
We fly higher than weather
In G5's or better
You know me
In anticipation for precipitation stack chips for the rainy day
Rain man is back with little Ms. Sunshine
Rihanna, where you at?
You have my heart, and we'll never be worlds apart
Maybe in magazines, but you'll still be my star
Baby, 'cause in the dark
You can't see shiny cars
And that's when you need me there
With you I'll always share
Because
When the sun shines, we shine together
Told you I'll be here forever
Said I'll always be your friend
Took an oath that I'm a stick it out 'til the end
Now that it's raining more than ever
Know that we still have each other
You can stand under my umbrella
You can stand under my umbrella, ella, ella, eh, eh, eh
Under my umbrella, ella, ella, eh, eh, eh
Under my umbrella, ella, ella, eh, eh, eh
Under my umbrella, ella, ella, eh, eh, eh, eh, eh, eh
These fancy things will never come in between
You're part of my entity, here for infinity
When the world has took its part
When the world has dealt its cards
If the hand is hard, together we'll mend your heart
Because
You can run into my arms
It's okay, don't be alarmed
(Come into me)
(There's no distance in between our love)
So I'm gonna let the rain pour
I'll be all you need and more
Because
It's raining, raining
Ooh, baby, it's raining, raining
Baby, come into me
Come into me
It's raining, raining
Ooh, baby, it's raining, raining
You can always come into me
Come into me
It's pouring rain
It's pouring rain
Come into me
Come into me
It's pouring rain
It's pouring rain`
      };

      this.props.navigation.setParams({ title: data.title });

      this.setState({ isLoading: false, song: data });
    } catch (error) {
      Alert.alert("Error", "Error fetching song data...");
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={S.loaderWrap}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (this.state.isLoading) {
      return (
        <View style={S.loaderWrap}>
          <Text>{error}</Text>
        </View>
      );
    }

    const { song } = this.state;

    return (
      <View style={S.container}>
        <View style={S.songsContainer}>
          <Text style={S.songTitleText}>{song.title}</Text>
          <Text style={S.songArtistText}>{song.artist}</Text>

          <Text style={S.songAlbumText}>
            {song.album} - {song.year}
          </Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://youtu.be/${song.yt_video_id}`);
            }}
            style={S.watchOnYTButton}
          >
            <Text style={S.watchOnYTButtonText}>Watch on YouTube</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={S.lyricsWrap}>
          <Text style={S.songLyrics}>{song.lyrics}</Text>
        </ScrollView>
      </View>
    );
  }
}
