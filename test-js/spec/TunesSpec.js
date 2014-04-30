var albumData = [{
	"title": "Album A",
	"artist": "Artist A",
	"tracks": [
	{
		"title": "Track A",
		"url": "/music/Album A Track A.mp3"
	},
	{
		"title": "Track B",
		"url": "/music/Album A Track B.mp3"
	}]
}, {
	"title": "Album B",
	"artist": "Artist B",
	"tracks": [
		{
			"title": "Track A",
			"url": "/music/Album B Track A.mp3"
		},
		{
			"title": "Track B",
			"url": "/music/Album B Track B.mp3"
		}
	]
}];

describe("Album", function() {
	beforeEach(function() {
		this.album = new Album(albumData[0]);
	});

	it("creates from data", function() {
		expect(this.album.get('tracks').length).toEqual(2);
	});

	describe("first track", function() {
		it("identifies correct first track", function() {
			expect(this.album.isFirstTrack(0)).toBeTruthy();
		})
	});

	describe("last track", function() {
		it("identifies correct last track", function() {
			expect(this.album.isLastTrack(1)).toBeTruthy();
		});

		it("returns the URL for a track", function() {
			expect(this.album.trackUrlAtIndex(0)).toEqual('/music/Album A Track A.mp3');
		});
	});

});

describe("Playlist", function() {

	beforeEach( function() {
		this.playlist = new window.Playlist();
		this.playlist.add( albumData[0] );
	});

	it("identifies first album as first", function() {
		expect( this.playlist.isFirstAlbum(0)).toBeTruthy();
	});

	it("rejects non-first album as first", function() {
		expect(this.playlist.isFirstAlbum(1)).toBeFalsy();
	});

	it("identifies last album as last", function() {
		this.playlist.add(albumData[1]); // Extra album as the last
		expect(this.playlist.isLastAlbum(1)).toBeTruthy();
	});

	it("rejects non-last album as last", function() {
		this.playlist.add(albumData[1]); 
		expect(this.playlist.isLastAlbum(0)).toBeFalsy();
	});
});

describe("Player", function() {

	describe("with no items", function() {
		beforeEach( function() {
			this.player = new Player();
		});

		it("starts with album 0", function() {
			expect(this.player.get("currentAlbumIndex")).toEqual(0);
		});

		it("starts with track 0", function() {
			expect(this.player.get("currentTrackIndex")).toEqual(0);
		});
	});

	describe("with added album", function() {
		beforeEach( function() {
			this.player = new Player();
			this.player.playlist.add( albumData );
		});

		it("is in 'stop' state", function() {
			expect(this.player.get('state')).toEqual('stop');
		});

		it("is stopped", function() {
			expect(this.player.isStopped()).toBeTruthy();
		});

		describe("while playing", function() {
			beforeEach( function() {
				this.player.play();
			});

			it("sets to 'play' state'", function() {
				expect( this.player.get('state')).toEqual('play');
			});

			it("is playing", function() {
				expect(this.player.isPlaying()).toBeTruthy();
			});

			it("has a current album", function() {
				expect(this.player.currentAlbum().get('title')).toEqual('Album A');
			});

			it("has a current track URL", function() {
				expect(this.player.currentTrackUrl()).toEqual('/music/Album A Track A.mp3');
			});


			describe("next track", function() {
				beforeEach( function() {
				});

				it("increments the currentTrackValue", function() {
					this.player.nextTrack();

					// I should expect that the current album is still 0 by default and current track is 1 since it should have incremented 
					expect(this.player.get("currentAlbumIndex")).toEqual(0);
					expect(this.player.get("currentTrackIndex")).toEqual(1);
				});

				it("will go the next album", function() {
					this.player.set({ currentTrackIndex: 1}); // set to one because it is the last index see the given above
					this.player.nextTrack();

					expect(this.player.get("currentAlbumIndex")).toEqual(1);
					expect(this.player.get("currentTrackIndex")).toEqual(0);
				});

				it("will go back to the first album", function() {
					this.player.set({ currentAlbumIndex: 1, currentTrackIndex: 1 });
					this.player.nextTrack();

					expect(this.player.get("currentAlbumIndex")).toEqual(0);
					expect(this.player.get("currentTrackIndex")).toEqual(0);
				});
			});

			describe("previous track", function() {

				it("decrements the currentTrackValue", function() {
					this.player.set("currentTrackIndex", 1);
					this.player.prevTrack();

					expect(this.player.get("currentAlbumIndex")).toEqual(0);
					expect(this.player.get("currentTrackIndex")).toEqual(0);
				});

				it("goes back to the previous album", function() {
					this.player.set({ currentAlbumIndex: 1, currentTrackIndex: 0 });
					this.player.prevTrack();

					expect(this.player.get("currentAlbumIndex")).toEqual(0);
					expect(this.player.get("currentTrackIndex")).toEqual(1);
				});
			});
		});
	})
});