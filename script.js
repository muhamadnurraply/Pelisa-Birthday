/* ==========================================================
   LUXURY BIRTHDAY WEBSITE
   Version 3.0
========================================================== */

"use strict";

const App = {

    /* ==========================================
       STATE
    ========================================== */

    isEnvelopeOpened: false,

    isMusicPlaying: false,

    litCandles: 0,

    revealObserver: null,

    /* ==========================================
       INITIALIZE
    ========================================== */

    init(){

        this.cacheDOM();

        this.lockScroll();

        this.initPetals();

        this.initEnvelope();

        this.initSpotify();

        this.initReveal();

        this.initCandles();

        this.initMobilePlayer();

        this.initPerformance();

    },

    /* ==========================================
       CACHE DOM
    ========================================== */

    cacheDOM(){

        this.body = document.body;

        /* Envelope */

        this.envelope = document.getElementById("envelope");

        this.envelopeScreen = document.getElementById("envelopeScreen");

        this.waxSeal = document.getElementById("waxSeal");

        /* Background */

        this.petalLayer = document.getElementById("petalLayer");

        /* Spotify */

        this.spotifyPlayer = document.getElementById("spotifyPlayer");

        this.bgMusic = document.getElementById("bgMusic");

        this.musicToggle = document.getElementById("musicToggle");

        this.albumCover = document.getElementById("albumCover");

        this.equalizer = document.querySelector(".equalizer");

        this.progress = document.getElementById("progress");

        this.currentTime = document.getElementById("currentTime");

        this.duration = document.getElementById("duration");

        /* Candles */

        this.candles = document.querySelectorAll(".candle");

        this.secretMessage = document.getElementById("secretMessage");

        this.secretText = document.getElementById("secretText");

        this.finalReveal = document.getElementById("finalReveal");

        /* Reveal */

        this.revealItems = document.querySelectorAll(

            ".hero, .section"

        );

    },

    /* ==========================================
       SCROLL
    ========================================== */

    lockScroll(){

        this.body.style.overflow = "hidden";

    },

    unlockScroll(){

        this.body.style.overflow = "";

    },

    /* ==========================================
       UTILITIES
    ========================================== */

    random(min,max){

        return Math.random() * (max-min) + min;

    },

    sleep(ms){

        return new Promise(resolve=>{

            setTimeout(resolve,ms);

        });

    },

    formatTime(time){

        if(isNaN(time)) return "0:00";

        const minutes = Math.floor(time/60);

        const seconds = Math.floor(time%60);

        return `${minutes}:${seconds.toString().padStart(2,"0")}`;

    },

    isMobile(){

        return window.matchMedia(

            "(max-width:768px)"

        ).matches;

    },

    addClass(element,className){

        if(element){

            element.classList.add(className);

        }

    },

    removeClass(element,className){

        if(element){

            element.classList.remove(className);

        }

    },

    toggleClass(element,className){

        if(element){

            element.classList.toggle(className);

        }

    },
        /* ==========================================
       FLOATING PETALS
    ========================================== */

    initPetals(){

        if(!this.petalLayer) return;

        const colors = [

            "#D88AA5",

            "#F4D58D",

            "#F6D8E4"

        ];

        const totalPetals = this.isMobile()

            ? 8

            : 14;

        for(let i = 0; i < totalPetals; i++){

            this.createPetal(colors);

        }

    },

    createPetal(colors){

        const petal = document.createElement("div");

        const size = this.random(8,16);

        petal.className = "petal";

        petal.style.width = `${size}px`;

        petal.style.height = `${size * .75}px`;

        petal.style.left = `${this.random(0,100)}%`;

        petal.style.background =

            colors[

                Math.floor(

                    Math.random()*colors.length

                )

            ];

        petal.style.opacity =

            this.random(.3,.8);

        petal.style.animationDuration =

            `${this.random(10,18)}s`;

        petal.style.animationDelay =

            `${this.random(0,12)}s`;

        petal.style.transform =

            `rotate(${this.random(0,360)}deg)`;

        this.petalLayer.appendChild(petal);

    },    /* ==========================================
       ENVELOPE
    ========================================== */

    initEnvelope(){

        if(!this.envelope) return;

        this.ENVELOPE = {

            PRESS_DURATION : 260,

            MUSIC_DELAY : 600,

            OPEN_DELAY : 350

        };

        this.envelope.addEventListener(

            "click",

            ()=>this.handleEnvelopeClick()

        );

    },

    /* ==========================================
       HANDLE CLICK
    ========================================== */

    handleEnvelopeClick(){

        if(this.isEnvelopeOpened) return;

        this.isEnvelopeOpened = true;

        this.openEnvelope();

    },

    /* ==========================================
       OPEN
    ========================================== */

    async openEnvelope(){

        this.envelope.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(.96)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:this.ENVELOPE.PRESS_DURATION,

                easing:"ease-out"

            }

        );

        this.addClass(

            this.envelope,

            "open"

        );

        await this.sleep(

            this.ENVELOPE.MUSIC_DELAY

        );

        this.playMusic();

        await this.sleep(

            this.ENVELOPE.OPEN_DELAY

        );

        this.addClass(

            this.envelopeScreen,

            "opened"

        );

        this.unlockScroll();

    },
        /* ==========================================
       SPOTIFY
    ========================================== */

    initSpotify(){

        if(!this.bgMusic) return;

        this.SPOTIFY = {

            DEFAULT_VOLUME : .6

        };

        this.bindSpotifyEvents();

    },

    /* ==========================================
       BIND EVENTS
    ========================================== */

    bindSpotifyEvents(){

        this.musicToggle?.addEventListener(

            "click",

            ()=>this.handleMusicToggle()

        );

        this.bgMusic.addEventListener(

            "loadedmetadata",

            ()=>this.updateDuration()

        );

        this.bgMusic.addEventListener(

            "timeupdate",

            ()=>this.updateProgress()

        );

        this.bgMusic.addEventListener(

            "ended",

            ()=>this.pauseMusic()

        );

    },

    /* ==========================================
       HANDLE TOGGLE
    ========================================== */

    handleMusicToggle(){

        if(this.bgMusic.paused){

            this.playMusic();

        }else{

            this.pauseMusic();

        }

    },

    /* ==========================================
       PLAY
    ========================================== */

    async playMusic(){

        try{

            this.bgMusic.volume =

                this.SPOTIFY.DEFAULT_VOLUME;

            await this.bgMusic.play();

            this.isMusicPlaying = true;

            this.musicToggle.textContent = "❚❚";

            this.addClass(

                this.albumCover,

                "playing"

            );

            this.addClass(

                this.equalizer,

                "playing"

            );

        }

        catch(error){

            console.warn(

                "Music autoplay blocked.",

                error

            );

            this.musicToggle.textContent = "▶";

        }

    },

    /* ==========================================
       PAUSE
    ========================================== */

    pauseMusic(){

        this.bgMusic.pause();

        this.isMusicPlaying = false;

        this.musicToggle.textContent = "▶";

        this.removeClass(

            this.albumCover,

            "playing"

        );

        this.removeClass(

            this.equalizer,

            "playing"

        );

    },

    /* ==========================================
       UPDATE DURATION
    ========================================== */

    updateDuration(){

        this.duration.textContent =

            this.formatTime(

                this.bgMusic.duration

            );

    },

    /* ==========================================
       UPDATE PROGRESS
    ========================================== */

    updateProgress(){

        if(!this.bgMusic.duration) return;

        const percent =

            (this.bgMusic.currentTime /

            this.bgMusic.duration) * 100;

        this.progress.style.width =

            `${percent}%`;

        this.currentTime.textContent =

            this.formatTime(

                this.bgMusic.currentTime

            );

    },
        /* ==========================================
       SCROLL REVEAL
    ========================================== */

    initReveal(){

        if(!this.revealItems.length) return;

        this.REVEAL = {

            THRESHOLD : 0.15,

            ROOT_MARGIN : "0px 0px -80px 0px"

        };

        this.setupReveal();

    },

    /* ==========================================
       SETUP OBSERVER
    ========================================== */

    setupReveal(){

        this.revealItems.forEach(element=>{

            this.addClass(

                element,

                "fade-up"

            );

        });

        this.revealObserver =

            new IntersectionObserver(

                this.handleReveal.bind(this),

                {

                    threshold:

                        this.REVEAL.THRESHOLD,

                    root:null,

                    rootMargin:

                        this.REVEAL.ROOT_MARGIN

                }

            );

        this.revealItems.forEach(element=>{

            this.revealObserver.observe(element);

        });

    },

    /* ==========================================
       HANDLE REVEAL
    ========================================== */

    handleReveal(entries){

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            this.showReveal(

                entry.target

            );

        });

    },

    /* ==========================================
       SHOW REVEAL
    ========================================== */

    showReveal(element){

        this.addClass(

            element,

            "show"

        );

        this.revealObserver.unobserve(

            element

        );

    },
        /* ==========================================
       CANDLES
    ========================================== */

    initCandles(){

        if(!this.candles.length) return;

        this.candles.forEach(candle=>{

            candle.addEventListener(

                "click",

                ()=>this.handleCandleClick(candle)

            );

        });

    },

    /* ==========================================
       HANDLE CLICK
    ========================================== */

    handleCandleClick(candle){

        if(candle.classList.contains("lit")) return;

        this.lightCandle(candle);

        this.showMessage(

            candle.dataset.msg

        );

        this.checkCompletion();

    },

    /* ==========================================
       LIGHT CANDLE
    ========================================== */

    lightCandle(candle){

        this.addClass(

            candle,

            "lit"

        );

        this.litCandles++;

    },

    /* ==========================================
       SHOW MESSAGE
    ========================================== */

    showMessage(message){

        if(!this.secretText) return;

        this.secretText.textContent = message;

        this.removeClass(

            this.secretText,

            "show"

        );

        void this.secretText.offsetWidth;

        this.addClass(

            this.secretText,

            "show"

        );

        this.addClass(

            this.secretMessage,

            "show"

        );

    },

    /* ==========================================
       CHECK COMPLETION
    ========================================== */

    checkCompletion(){

        if(

            this.litCandles <

            this.candles.length

        ) return;

        setTimeout(

            ()=>this.showFinalReveal(),

            700

        );

    },

    /* ==========================================
       FINAL REVEAL
    ========================================== */

    showFinalReveal(){

        this.addClass(

            this.finalReveal,

            "show"

        );

    },
        /* ==========================================
       MOBILE PLAYER
    ========================================== */

    initMobilePlayer(){

        if(!this.spotifyPlayer) return;

        this.bindMobilePlayerEvents();

    },

    /* ==========================================
       BIND EVENTS
    ========================================== */

    bindMobilePlayerEvents(){

        this.spotifyPlayer.addEventListener(

            "click",

            this.handlePlayerClick.bind(this)

        );

    },

    /* ==========================================
       HANDLE CLICK
    ========================================== */

    handlePlayerClick(event){

        if(!this.isMobile()) return;

        if(event.target.closest("button")) return;

        this.togglePlayer();

    },

    /* ==========================================
       TOGGLE PLAYER
    ========================================== */

    togglePlayer(){

        if(

            this.spotifyPlayer.classList.contains(

                "expanded"

            )

        ){

            this.collapsePlayer();

            return;

        }

        this.expandPlayer();

    },

    /* ==========================================
       EXPAND
    ========================================== */

    expandPlayer(){

        this.addClass(

            this.spotifyPlayer,

            "expanded"

        );

    },

    /* ==========================================
       COLLAPSE
    ========================================== */

    collapsePlayer(){

        this.removeClass(

            this.spotifyPlayer,

            "expanded"

        );

    },
        /* ==========================================
       PERFORMANCE
    ========================================== */

    initPerformance(){

        document.addEventListener(

            "visibilitychange",

            this.handleVisibility.bind(this)

        );

    },

    /* ==========================================
       HANDLE VISIBILITY
    ========================================== */

    handleVisibility(){

        if(

            document.hidden &&

            this.isMusicPlaying

        ){

            this.bgMusic.pause();

        }

    }

};
/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);
