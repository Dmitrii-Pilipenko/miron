document.addEventListener('DOMContentLoaded', () => {
    let mouth = document.getElementById('mironMouth');
    let face = document.getElementById('mironFace');
    let introSound = 'assets/audios/intro.ogg';
    let idkSound = 'assets/audios/idontknow.ogg'

    let favouriteMusic = document.getElementById('favouriteMusic');
    let favouriteFood = document.getElementById('favouriteFood');
    let howAreYou = document.getElementById('howAreYou');
    

    let hasGreeted = false;

    let sounds = [
        'assets/audios/ai1.ogg',
        'assets/audios/ai2.ogg',
        'assets/audios/ai3.ogg',
        'assets/audios/ai4.ogg'
    ];

    let eaterEggSound = 'assets/audios/shaman-ja-russkijj.mp3';
    let easterEgg = document.getElementById('easterEgg');

    let audioContext = new (window.AudioContext)();
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    let dataArray = new Uint8Array(analyser.frequencyBinCount);

    let audio = new Audio();
    audio.crossOrigin = "anonymous";

    let source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    let isPlaying = false;

    easterEgg.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) return;

        audio.pause();
        audio.currentTime = 0;

        if (!hasGreeted) {
            audio.src = introSound;
            hasGreeted = true;
        } else {
            audio.src = eaterEggSound;
        }

        audio.play();
        isPlaying = true;
        animateMouth();
    });
    
    face.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) return;

        audio.pause();
        audio.currentTime = 0;

        if (!hasGreeted) {
            audio.src = introSound;
            hasGreeted = true;
        } else {
            audio.src = sounds[Math.floor(Math.random() * sounds.length)];
        }

        audio.play();
        isPlaying = true;
        animateMouth();
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        mouth.style.transform = 'translateY(0)';

        if (hasGreeted) {
            favouriteFood.classList.remove('hidden');
            favouriteMusic.classList.remove('hidden');
            howAreYou.classList.remove('hidden');

        }
    });

    favouriteMusic.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) return;

        audio.pause();
        audio.currentTime = 0;

        audio.src = idkSound;
        audio.play();
        isPlaying = true;
        animateMouth();
    });

    howAreYou.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) return;

        audio.pause();
        audio.currentTime = 0;

        audio.src = idkSound;
        audio.play();
        isPlaying = true;
        animateMouth();
    })

    favouriteFood.addEventListener('click', async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        if (isPlaying) return;

        audio.pause();
        audio.currentTime = 0;

        audio.src = idkSound;
        audio.play();
        isPlaying = true;
        animateMouth();
    })

    function animateMouth() {
        if (!isPlaying) return;

        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }

        let volume = sum / dataArray.length;
        let mouthOpen = Math.min(volume / 5, 25);

        mouth.style.transform = `translateY(${mouthOpen}px)`;

        requestAnimationFrame(animateMouth);
    }

});
