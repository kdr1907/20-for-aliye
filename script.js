// ==========================
// ELEMANLAR
// ==========================

const loading = document.getElementById("loading");
const story = document.getElementById("story");
const openGift = document.getElementById("openGift");
const music = document.getElementById("music");
const letter = document.getElementById("letter");

const slides = document.querySelectorAll(".slide");

// ==========================
// MEKTUP
// ==========================

const text = `Sevgilim ❤️

Bugün tam 20 yaşına giriyorsun.

Belki sana dünyanın en pahalı hediyesini veremedim.

Ama sana emek vererek hazırladığım bu küçük sürprizin her satırında sevgim var.

Gülüşünle,
bakışınla,
yanımda oluşunla hayatımı güzelleştirdiğin için teşekkür ederim.

Umarım bundan sonraki doğum günlerinde de yanında olur,
birlikte nice güzel anılar biriktiririz.

İyi ki doğdun.

İyi ki varsın.

İyi ki ALİYEM.
Seni çok seviyorum. ❤️`;

let i = 0;

function typeWriter(){

    if(i < text.length){

        letter.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,40);

    }

}

// ==========================
// SLAYT SİSTEMİ
// ==========================

let currentSlide = 0;
let autoSlide;

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

    if(slides[index].classList.contains("letter") && i===0){

        typeWriter();

    }

    if(slides[index].classList.contains("final")){

        startFinalConfetti();

    }

}

function nextSlide(){

    // Mektup sayfasındaysa ve yazı bitmediyse geçme
    if(slides[currentSlide].classList.contains("letter") && i < text.length){
        return;
    }

    if(currentSlide < slides.length-1){

        currentSlide++;

        showSlide(currentSlide);

    }

}

function startAutoSlide(){

    autoSlide = setInterval(()=>{

        nextSlide();

    },7000);

}

// ==========================
// KUTU
// ==========================

openGift.onclick = ()=>{

    music.play();

    confetti({

        particleCount:250,

        spread:180,

        origin:{y:.6}

    });

    confetti({

        particleCount:120,

        angle:60,

        spread:80,

        origin:{x:0}

    });

    confetti({

        particleCount:120,

        angle:120,

        spread:80,

        origin:{x:1}

    });

    loading.animate(

        [

            {opacity:1},

            {opacity:0}

        ],

        {

            duration:1000,

            fill:"forwards"

        }

    );

    setTimeout(()=>{

        loading.style.display="none";

        story.classList.remove("hidden");

        showSlide(0);

        startAutoSlide();

    },900);

};

// ==========================
// TIKLAYINCA GEÇ
// ==========================

document.addEventListener("click",()=>{

    if(loading.style.display==="none"){

        nextSlide();

    }

});

// ==========================
// TELEFON DOKUNMA
// ==========================

document.addEventListener("touchstart",()=>{

    if(loading.style.display==="none"){

        nextSlide();

    }

});

// ==========================
// FİNAL KONFETİ
// ==========================

let finalPlayed = false;

function startFinalConfetti(){

    if(finalPlayed) return;

    finalPlayed = true;

    const interval = setInterval(()=>{

        confetti({

            particleCount:15,

            spread:100,

            startVelocity:35,

            origin:{

                x:Math.random(),

                y:Math.random()-0.2

            }

        });

    },180);

    setTimeout(()=>{

        clearInterval(interval);

    },5000);

    const restartBtn = document.getElementById("restartBtn");

restartBtn.onclick = ()=>{

    location.reload();

}

}
