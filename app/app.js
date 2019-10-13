const startButton = document.querySelector('.start')
const resetButton = document.querySelector('.reset')
const list = document.querySelector('.list')
const times = getSavedTimes()

startButton.addEventListener('click', (e) => {
    start()
    list.style.display = 'block'
})

resetButton.addEventListener('click', (e) => {

    times.push({
        hours: Number(displayHours),
        minutes: Number(displayMinutes),
        seconds: Number(displaySeconds),
    })
    saveTimes(times)
    reset()
    lapTime()
    summary()
})