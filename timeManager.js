export class TimeManager {
    isTimeToUnlock(unlockDateTime) {
        const now = new Date();
        const unlockDate = new Date(unlockDateTime);
        return now >= unlockDate;
    }

    getTimeRemaining(unlockDateTime) {
        const total = new Date(unlockDateTime) - new Date();
        
        if (total <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    formatTimeRemaining(timeRemaining) {
        return `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`;
    }
}