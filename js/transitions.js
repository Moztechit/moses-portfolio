/* LOADER */
window.addEventListener("load",()=>{
  document.body.classList.add("loaded");
  document.getElementById("loader").style.display="none";
});

/* PAGE TRANSITIONS */
document.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",function(e){
    if(this.hostname===window.location.hostname){
      e.preventDefault();
      document.body.style.opacity="0";
      setTimeout(()=>{window.location=this.href;},500);
    }
  });
});

/* CUSTOM CURSOR */
const cursor=document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});
