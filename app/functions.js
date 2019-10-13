// time value
let seconds = 0
let minutes = 0
let hours = 0

// display time value
let displaySeconds = 0
let displayMinutes = 0
let displayHours = 0

// hold setInterval() function
let interval = null

// hold stopwatch status
let status = false

// create time stamp list 
let stampList = null

// Feth existing times from localStorage
const getSavedTimes = () => {
    const timesJSON = localStorage.getItem('times')

    try{
        return timesJSON ? JSON.parse(timesJSON) : []
    } catch(e) {
        return []
    }
}

// Save times to localStorage
const saveTimes = (times) => {
    localStorage.setItem('times', JSON.stringify(times))
}

// stop watch function
const stopWatch = () => {
    seconds++

    // icrement next value
    if(seconds / 60 === 1) {
        seconds = 0
        minutes++

        if(minutes / 60 === 1) {
            minutes = 0
            hours++
        }
    }

    // hours/minutes/seconds are 1-9, add 0 infront of digit
    if(seconds < 10) {
        displaySeconds = '0' + seconds.toString()
    } else {
        displaySeconds = seconds
    }

    if(minutes < 10) {
        displayMinutes = '0' + minutes.toString()
    } else {
        displayMinutes = minutes
    }

    if(hours < 10) {
        displayHours = '0' + hours.toString()
    } else {
        displayHours = hours
    }

    // display updated time
    document.querySelector('.stopwatch').innerHTML = displayHours + ' : ' + displayMinutes + ' : ' + displaySeconds

}

// function to start the stopwatch
const start = () => {

    // set Interval
    if(status === false) {
        interval = window.setInterval(stopWatch, 1000)
        status = true
    }

    // create the time stamp list
    stampList = document.createElement('li')
    document.querySelector('.list').appendChild(stampList)

    // create the time stamp list itme - start time
    const now = new Date()
    let time = null;

    if(now.getHours() < 10 && now.getMinutes() < 10){
        time = '0' + now.getHours() + ':' + '0' + now.getMinutes()
    } else if(now.getHours() < 10){
        time = '0' + now.getHours() + ':' + now.getMinutes()
    } else if(now.getMinutes() < 10){
        time = now.getHours() + ':' + '0' + now.getMinutes()
    } else{
        time = now.getHours() + ':' + now.getMinutes()
    }

    const startTime = document.createElement('span')
    startTime.innerHTML = time + '<p>to</p>'
    stampList.appendChild(startTime)
}

// function to reset the stopwatch
const reset = () => {

    // clear Interval
    if(status === true) {
        window.clearInterval(interval)
        status = false
    }

    // reset the stop watch
    seconds = 0
    minutes = 0
    hours = 0
    document.querySelector('.stopwatch').innerHTML = "00 : 00 : 00"

    // create the time stamp list itme - finish time
    const now = new Date()
    let time = null;

    if(now.getHours() < 10 && now.getMinutes() < 10){
        time = '0' + now.getHours() + ':' + '0' + now.getMinutes()
    } else if(now.getHours() < 10){
        time = '0' + now.getHours() + ':' + now.getMinutes()
    } else if(now.getMinutes() < 10){
        time = now.getHours() + ':' + '0' + now.getMinutes()
    } else{
        time = now.getHours() + ':' + now.getMinutes()
    }

    const resetTime = document.createElement('span')
    resetTime.innerHTML = time + '<p>for</p>'
    stampList.appendChild(resetTime)
}

// create lap time stamp
const lapTime = () => {
    const lapTime = document.createElement('span')
    lapTime.classList.add('total-time')

    if(status === false) {

        if(displayHours.innerHTML = '00') {
            lapTime.innerHTML = displayMinutes + 'min ' + displaySeconds + 'sec'
            stampList.appendChild(lapTime)
        }

        if(Number(displayHours) > 0) {
            lapTime.innerHTML = displayHours + 'hr ' + displayMinutes + 'min'
            stampList.appendChild(lapTime)
        }
    }
}

// create 
const summary = () => {
    const summary = getSavedTimes()
    let hoursArr = []
    let minutesArr = []
    let secondsArr = []

    // push each key's values to array
    for(let i=0; i<summary.length; i++) {
        hoursArr.push(summary[i].hours)
        minutesArr.push(summary[i].minutes)
        secondsArr.push(summary[i].seconds)
    }
    
    // get accumulate values of each array 
    let hoursSum = hoursArr.reduce((a, b) => a + b)
    let minutesSum = minutesArr.reduce((a, b) => a + b)
    let secondsSum = secondsArr.reduce((a, b) => a + b)

    // increment next value
    if(secondsSum / 60 >= 1) {
        let s = Math.floor(secondsSum / 60)

        secondsSum = secondsSum - (60 * s)
        minutesSum = minutesSum + s

        if(minutesSum / 60 >= 1) {
            let m = Math.floor(minutesSum / 60)

            minutesSum = minutesSum - (60 * m)
            hoursSum = hoursSum + m
        }
    }

    // display the summary 
    if(hoursSum >= 1) {
        document.querySelector('.summary').innerHTML = 'You\'ve done ' + '<span>'+ hoursSum + ' hour ' + minutesSum + ' min</span> so far !'
    } else {
        document.querySelector('.summary').innerHTML = 'You\'ve done ' + '<span>'+ minutesSum + ' min ' + secondsSum + ' sec</span> so far !'
    }

}

// clear the local storage when page's reload
if(window.location.reload) {
    window.localStorage.clear()
}