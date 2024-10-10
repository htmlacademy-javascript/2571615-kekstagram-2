function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function meetingFitsInWorkday(startOfDay, endOfDay, meetingStart, meetingDuration) {
  const startDay = timeToMinutes(startOfDay);
  const endDay = timeToMinutes(endOfDay);
  const meetingStartTime = timeToMinutes(meetingStart);
  const meetingEndTime = meetingStartTime + meetingDuration;

  return startDay <= meetingStartTime && meetingEndTime <= endDay;
}

// Тестируем:
const startOfDay = '9:00';
const endOfDay = '17:00';
const meetingStart = '10:30';
const meetingDuration = 60; // в минутах

console.log(meetingFitsInWorkday(startOfDay, endOfDay, meetingStart, meetingDuration)); // true
