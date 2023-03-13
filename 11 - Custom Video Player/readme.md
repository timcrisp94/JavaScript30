Solution for Wes Bos's JavaScript 30 Day 11 - Custom HTML5 Video Player

JavaScript is divided into three sections
1. Get Elements
2. Build Functions
3. Add Event Listeners

```togglePlay``` uses a ternary to call ```play()``` or ```pause()```
```
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}
```

We add event listeners to the video and toggle button. 

The ```updateButton``` function updates the Play/Pause Button

```
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';    
    toggle.textContent = icon;
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('play', updateButton)
```

The function ```skip``` listens for a click on anything with a ```data-skip``` atrribute
```
function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}
```
```this.dataset.skip``` uses ```parseFloat``` to convert it from a string to a number, then updates the ```video.currentTime```

The ```handleRange``` function listens for a change event or mousemove event on each the ranges
```
function handleRangeUpdate() {
    video[this.name] = this.value
    console.log(this.name)
    console.log(this.value)
}

skipButtons.forEach(button => button.addEventListener
    ('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
```

```handleRangeUpdate``` sets the video progress to the value given from the sliders

```handleProgress``` sets the variable percent equal to ```(video.currentTime / video.duration) * 100

The flex-basis of the progress bar corresponds to its completion percentage
```
progressBar.style.flexBasis = `${percent}%`;
```

The ```scrub``` function listens for a click on the progress bar, when that happens the function runs. 
```
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

// allows us to click and drag to update video progress
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', () => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
```

The solution for adding fullscreen capability comes from [Vince Aggrippino] (https://codepen.io/VAggrippino/pen/vgZdaw)

We add a button with the class ```fullscreen``` and create two functions ```toggleFullScreen``` and ```toggleFullScreenClass``` and a flag variable ```isFullScreen``` which is set to ```false```

Inside the ```toggleFullscreen``` function, if ```isFullscreen``` is true check if the ```document.exitFullscreen method``` is available and run it. Otherwise run the browser-specific equivalent. If ```isFullscreen``` is false, run ```player.requestFullscreen``` (or the browser-specific equivalent).

In ```toggleFullscreenClasses```, toggle the fullscreen class on the player and set ```isFullscreen = !isFullscreen```.

Listen for a fullscreenchange (and each browswer's implementation of it) and run ```toggleFullscreenClasses```.
