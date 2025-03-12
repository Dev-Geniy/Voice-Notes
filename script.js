// Переключение темы

const toggleButton = document.getElementById('theme-toggle');

const body = document.body;

const icon = toggleButton.querySelector('.icon');

// Загрузка сохраненной темы

const savedTheme = localStorage.getItem('theme') || 'light';

body.setAttribute('data-theme', savedTheme);

icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Обработчик переключения

toggleButton.addEventListener('click', () => {

    const currentTheme = body.getAttribute('data-theme');

    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);

    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';

});

// Логика голосовых заметок

const startButton = document.getElementById('start-recording');

const stopButton = document.getElementById('stop-recording');

const playButton = document.getElementById('play-recording');

const status = document.getElementById('recording-status');

const downloadLink = document.getElementById('download-link');

let mediaRecorder;

let audioChunks = [];

startButton.addEventListener('click', async () => {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);

        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {

            audioChunks.push(event.data);

        };

        mediaRecorder.onstop = () => {

            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

            const audioUrl = URL.createObjectURL(audioBlob);

            playButton.disabled = false;

            downloadLink.href = audioUrl;

            downloadLink.style.display = 'inline';

            playButton.onclick = () => {

                const audio = new Audio(audioUrl);

                audio.play();

            };

        };

        mediaRecorder.start();

        startButton.disabled = true;

        stopButton.disabled = false;

        status.textContent = 'Recording...';

    } catch (err) {

        status.textContent = 'Error: Microphone access denied';

        console.error('Failed to start recording: ', err);

    }

});

stopButton.addEventListener('click', () => {

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {

        mediaRecorder.stop();

        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        startButton.disabled = false;

        stopButton.disabled = true;

        status.textContent = 'Recording stopped';

    }

});

// Копирование Bitcoin-адреса

const copyBtcButton = document.querySelector('.btc-address .copy-btn');

copyBtcButton.addEventListener('click', () => {

    const btcCode = document.getElementById('btc-code').textContent;

    navigator.clipboard.writeText(btcCode).then(() => {

        copyBtcButton.textContent = 'Copied!';

        setTimeout(() => {

            copyBtcButton.textContent = 'Copy';

        }, 2000);

    }).catch(err => {

        console.error('Failed to copy: ', err);

    });

});
