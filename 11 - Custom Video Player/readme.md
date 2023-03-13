Solution for Wes Bos's JavaScript 30 Day 11

JavaScript is divided into three sections
1. Get Elements
2. Build Functions
3. Add Event Listeners

```togglePlay```
```
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}
```