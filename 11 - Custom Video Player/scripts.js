/*
get our elements
*/

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullscreen')

let isFullScreen = false

/*
build out functions
*/

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';    
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
    console.log(this.name)
    console.log(this.value)
}

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function toggleFullScreen(e) {
    if (isFullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            console.error('Unable to find a fullscreen exit method.');
        }
        console.log('removing fullscreen class');
        } else {
        if (player.requestFullscreen) {
            player.requestFullscreen(); // standard
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        } else {
            console.error('Unable to find a fullscreen request method');
        }
    }
}

function toggleFullScreenClasses() {
    player.classList.toggle('fullscreen')
    isFullScreen = !isFullScreen
}
/* 
hook up the event listeners 
*/

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('play', updateButton)
video.addEventListener('timeupdate', handleProgress)
video.addEventListener('click', fullScreen)
toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener
    ('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

// allows us to click and drag to update video progress
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', () => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

// full screen
fullscreen.addEventListener('click', toggleFullScreen);

document.addEventListener('fullscreenchange', toggleFullScreenClasses);
document.addEventListener('mozfullscreenchange', toggleFullScreenClasses);
document.addEventListener('webkitfullscreenchange', toggleFullScreenClasses);
document.addEventListener('msfullscreenchange', toggleFullScreenClasses);