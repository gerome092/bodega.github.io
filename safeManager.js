export class SafeManager {
    constructor() {
        this.storage = localStorage;
        this.SECRET_KEY = 'timeLockedSecret';
        this.DATE_KEY = 'unlockDateTime';
    }

    saveSecret(message, unlockDateTime) {
        this.storage.setItem(this.SECRET_KEY, message);
        this.storage.setItem(this.DATE_KEY, unlockDateTime);
    }

    getSecret() {
        return this.storage.getItem(this.SECRET_KEY);
    }

    getUnlockDateTime() {
        return this.storage.getItem(this.DATE_KEY);
    }

    hasSecret() {
        return this.storage.getItem(this.SECRET_KEY) !== null;
    }

    clearSecret() {
        this.storage.removeItem(this.SECRET_KEY);
        this.storage.removeItem(this.DATE_KEY);
    }
}