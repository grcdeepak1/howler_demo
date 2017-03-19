MyApp.controller('PlayerCtrl', ['$scope', 'Howl', '$timeout',
  function($scope, Howl, $timeout) {

  var elms = ['track', 'timer', 'duration', 'playPauseBtn', 'stopBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
  elms.forEach(function(elm) {
    window[elm] = document.getElementById(elm);
  });

  $scope.songs = [{title: "Canon", url: "http://www.stephaniequinn.com/Music/Pachelbel%20-%20Canon%20in%20D%20Major.mp3"},
                  {title: "Mozart", url: "http://www.stephaniequinn.com/Music/Mozart%20-%20Presto.mp3"},
                  ]


  var step = function() {
    // Get the Howl we want to manipulate.
    var sound = $scope.sound;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    timer.innerHTML = _formatTime(Math.round(seek));
    progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      $timeout( function () { step(); });
    }
  }

  $scope.sound = new Howl({
    src: ['http://www.stephaniequinn.com/Music/Mozart%20-%20Presto.mp3'],
    onplay: function() {
      playPauseBtn.innerHTML = 'Pause';
      duration.innerHTML = _formatTime(Math.round($scope.sound.duration()));
      $timeout( function () { step(); });
    },
    onpause: function() {
      playPauseBtn.innerHTML = 'Play';
    },
    onstop: function() {
      playPauseBtn.innerHTML = 'Play';
    }
  });

  $scope.play = function(song) {
    $scope.sound.stop();
    $scope.sound = new Howl({
      src: [song.url],
      onplay: function() {
        playPauseBtn.innerHTML = 'Pause';
        duration.innerHTML = _formatTime(Math.round($scope.sound.duration()));
        $timeout( function () { step(); });
      },
      onpause: function() {
        playPauseBtn.innerHTML = 'Play';
      },
      onstop: function() {
        playPauseBtn.innerHTML = 'Play';
      }
    });
    $scope.sound.play();
  }

  $scope.playPause = function() {
    $scope.sound.playing() ? $scope.sound.pause() : $scope.sound.play();
  }

  $scope.stop = function() {
    $scope.sound.stop();
  }

  $scope.customSeek = function(direction, position) {
    if (!$scope.sound.playing()) return;
    var current_pos = $scope.sound.seek() || 0;
    if (direction == '+') {
      if (current_pos + position > $scope.sound.duration()) {
        $scope.sound.stop();
      } else {
        $scope.sound.seek(current_pos+position);
      }
    } else {
      $scope.sound.seek(current_pos-position < 0 ? 0 : current_pos-position);
    }
  }

  bar.addEventListener('click', function(event) {
    _seek(event.clientX / window.innerWidth);
  });

  var _seek = function(per) {
    var sound = $scope.sound;
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  }

  var _formatTime = function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }


}]);
