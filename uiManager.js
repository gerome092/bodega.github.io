export class UIManager {
    constructor(safeManager, timeManager) {
        this.safeManager = safeManager;
        this.timeManager = timeManager;
        this.countdownInterval = null;
    }

    initialize() {
        this.setupEventListeners();
        this.checkExistingSecret();
    }

    setupEventListeners() {
        document.getElementById('saveButton').addEventListener('click', () => this.handleSave());
        document.getElementById('newSecretButton').addEventListener('click', () => this.handleNewSecret());
    }

    checkExistingSecret() {
        if (this.safeManager.hasSecret()) {
            this.showViewSection();
            this.updateLockStatus();
            this.startCountdown();
        }
    }

    handleSave() {
        const message = document.getElementById('secretMessage').value.trim();
        const unlockDateTime = document.getElementById('unlockDateTime').value;

        if (!message || !unlockDateTime) {
            alert('Por favor completa todos los campos');
            return;
        }

        if (new Date(unlockDateTime) <= new Date()) {
            alert('La fecha de apertura debe ser en el futuro');
            return;
        }

        this.safeManager.saveSecret(message, unlockDateTime);
        this.showViewSection();
        this.updateLockStatus();
        this.startCountdown();
    }

    handleNewSecret() {
        this.safeManager.clearSecret();
        this.stopCountdown();
        this.showCreateSection();
    }

    showCreateSection() {
        document.getElementById('createSection').classList.remove('hidden');
        document.getElementById('viewSection').classList.add('hidden');
    }

    showViewSection() {
        document.getElementById('createSection').classList.add('hidden');
        document.getElementById('viewSection').classList.remove('hidden');
    }

    updateLockStatus() {
        const unlockDateTime = this.safeManager.getUnlockDateTime();
        const isUnlocked = this.timeManager.isTimeToUnlock(unlockDateTime);
        const statusElement = document.getElementById('lockStatus');
        const statusTextElement = document.getElementById('statusText');
        const secretContent = document.getElementById('secretContent');
        const newSecretButton = document.getElementById('newSecretButton');

        if (isUnlocked) {
            statusElement.classList.add('status-unlocked');
            statusTextElement.textContent = 'DESBLOQUEADO';
            secretContent.classList.remove('hidden');
            newSecretButton.classList.remove('hidden');
            document.getElementById('savedMessage').textContent = this.safeManager.getSecret();
            document.getElementById('countdown').textContent = '';
        } else {
            statusElement.classList.remove('status-unlocked');
            statusTextElement.textContent = 'BLOQUEADO';
            secretContent.classList.add('hidden');
            newSecretButton.classList.add('hidden');
        }
    }

    startCountdown() {
        this.stopCountdown();
        
        const updateCountdown = () => {
            const unlockDateTime = this.safeManager.getUnlockDateTime();
            const timeRemaining = this.timeManager.getTimeRemaining(unlockDateTime);

            if (timeRemaining.total <= 0) {
                this.stopCountdown();
                this.updateLockStatus();
            } else {
                document.getElementById('countdown').textContent = 
                    this.timeManager.formatTimeRemaining(timeRemaining);
            }
        };

        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }

    stopCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }
}