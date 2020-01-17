import React from 'react';
import { Link } from 'react-router-dom';
import TrackContainer from './tracks_container';
import TrackPlayerContainer from '../audio_player/track_player_container';

class AlbumPage extends React.Component {
   constructor(props){
      super(props); 
      // this.state = {
      //    loaded: false,
      // }
   }

   componentDidMount(){
      const albumId = this.props.match.params.albumId;
      this.props.fetchAlbum(albumId).then(() =>
         this.props.fetchTracks(albumId)).then(() =>
            this.props.fetchArtistAlbums(this.props.match.params.bandId));
   }

   // componentDidMount() {
   //    const albumId = this.props.match.params.albumId;
   //    const a = this.props.fetchAlbum(albumId);
   //    const b = this.props.fetchTracks(albumId);
   //    const c = this.props.fetchArtistAlbums(this.props.match.params.bandId);
   //    Promise.all([a, b, c])
   //       .then(() => this.setState({ loaded: true }))
   // }


   componentDidUpdate(prevProps){
      const albumId = this.props.match.params.albumId;
      if (this.props.match.params.albumId !== prevProps.match.params.albumId){
            this.props.fetchTracks(albumId).then(() =>
               this.props.fetchAlbum(albumId)).then(() =>
                  this.props.fetchArtistAlbums(this.props.match.params.bandId));
      }
   }

   componentWillUnmount(){
      this.props.clearTracks();
   }

   // componentDidUpdate(prevProps) {
   //    const albumId = this.props.match.params.albumId;
   //    if (this.props.match.params.albumId !== prevProps.match.params.albumId) {
   //       const a = this.props.fetchAlbum(albumId);
   //       const b = this.props.fetchTracks(albumId);
   //       const c = this.props.fetchArtistAlbums(this.props.match.params.bandId);
   //       Promise.all([a, b, c])
   //          .then(() => this.setState({ loaded: true }))
   //    }
   // }


   render(){
      
      const { album, tracks } = this.props;
      if ( album === undefined ) return null;
      if ( Object.keys(tracks).length === 0 ) return null;
   
      const trackList = album.trackArr.sort((x, y) => {
            return Object.keys(x)[0] < Object.keys(y)[0] ? -1 : 1
         }).map(trackObj => {
            const track = tracks[Object.values(trackObj)[0]]
            return <TrackContainer key={track.id} track={track} />
      })

      // if (this.state.loaded) {
      return (
         <main className="album-page">
            <section className="album-content">
               <div className="album-left">
                  <div className="ablum-player">
                     <div className="album-byline">
                        <p className="album-title">{album.name}</p>
                        <p className="album-artist">by {album.artist}</p>
                        <p className="album-genre">{album.genre}</p>
                     </div>
                     <div className="player">
                        <TrackPlayerContainer tracks={tracks} />
                     </div>
                     <div className="album-tracks">
                        <ul>
                           { trackList }
                        </ul>
                     </div>
                     <p className="album-description">{album.description}</p>
                  </div>
               </div>
               <div className="album-right">
                  <div className="album-shell">
                     <img className="album-cover" src={album.photoUrl} />
                  </div>
               </div>
            </section>
         </main>
      );
      // } else { return <div>loading</div> }
   }
}

export default AlbumPage;
