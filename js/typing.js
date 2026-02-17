const typingElement=document.getElementById("typing");
const text="Moses Mwangi – IT Technician / Web Developer";
let index=0;

function type(){
  if(index<text.length){
    typingElement.innerHTML+=text.charAt(index);
    index++;
    setTimeout(type,100);
  } else{
    setInterval(()=>{typingElement.classList.toggle("blink");},500);
  }
}

type();
