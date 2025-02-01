// Typing and Deleting Animation for Secondary Info
const phrases = [
    "a Computer Science student.....",
    "a Software Developer in the making.....",
    "specializing in web design and backend systems....."
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  const introTextElement = document.getElementById('intro-typing');
  
  function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
  
    if (isDeleting) {
      introTextElement.textContent = currentPhrase.substring(0, currentCharIndex--);
    } else {
      introTextElement.textContent = currentPhrase.substring(0, currentCharIndex++);
    }
  
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      setTimeout(() => {
        isDeleting = true;
      }, 2000); // Pause at the end of the phrase
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Cycle through the phrases
    }
  
    setTimeout(typeWriter, isDeleting ? 100 : 150); // Speed of typing
  }
  
  window.onload = typeWriter;
  
document.addEventListener('DOMContentLoaded', function() {
  const text = "Software Developer | Web Designer | Student";
  const speed = 100;
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      document.getElementById("intro-typing").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  
  typeWriter();
});
  
// CV Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('cvModal');
    const btn = document.getElementById('cvButton');
    const closeBtn = document.getElementsByClassName('close-button')[0];

    btn.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});
  