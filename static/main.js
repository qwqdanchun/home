var currentEditingNote="";
var currentNotes="";
var maximumNoteNumber="";
var currentNoteIsNew=true;
var currentTime="";
window.oncontextmenu=function(){return false;};
window.onload=function(){
    ua = navigator.userAgent;
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    bgPreference = "Bing";
    bgbox.style.backgroundImage = "url(/static/bing.php)";
        bgbox.style.opacity="1";
    if(isMobile){
        form0.action="http://m.baidu.com/s";
        bgbox.style.backgroundSize="auto 100%";
        bgbox.style.backgroundPosition="center";
    }
    loadNotes();
};
function Input_KeyDown(event) {
    if (event.keyCode == 13) {
        var str = input0.value;
        var finalStr = str.replace("翻译：", "");
        if (/^[a-z]+:\/\/[a-z0-9_\-\/.#?=%]+$/i.test(str)) {
            open(str);
            Input_Blur();
            return false;
        } else if (str.indexOf("翻译：") != -1) {
            form0.action = "https://fanyi.baidu.com/#en/zh/" + finalStr;
            input0.name = "";
        } else {
            form0.action = "https://www.baidu.com/s";
                input0.name = "word";
        }
        setTimeout(() => Input_Blur(), 50);
    }
}
function Input_Focus()
{
    quotebox.style.opacity="1";
    ua = navigator.userAgent;
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    if(isMobile){
        title.style.top="30px";
        input0.style.top="100px";
    }
}
function Input_Blur()
{
    //window.getSelection().empty();
    input0.value="";
    quotebox.style.opacity="0";
    if(isMobile){
        title.style.top="100px";
        input0.style.top="170px";
    }
}

function Keyword_Click() {
    setTimeout(() => Input_Blur(), 50);
}
function Title_Click(event)
{
    if($(navbox).css("display")=="none"){
        input0.style.opacity="0";
        quotebox.style.opacity="0";
        bgbox.style.transform="scale(1.1)";
        bgbox.style.filter="blur(10px)";
        navbox.style.display="block";
        setTimeout("navbox.style.opacity='1';",100);
    }else{
        Navbox_Click(event)
    }
}
function Navbox_Click(event)
{
    var obj=event.srcElement;
    if(obj.classList.contains("shouldNotFade")==false){
        input0.style.opacity="1";
        bgbox.style.transform="";
        bgbox.style.filter="";
        navbox.style.opacity="0";
        setTimeout("navbox.style.display='none';",250);
    }
    //alert(obj.id);
}
function loadNotes()
{
    if(currentNotes != "0"){
        textNote.style.left = "200px";
        textNote.style.width = "420px";
        noteListWrap.style.left = "0px";
        for(var i = 1;i < Number(maximumNoteNumber) + 1;i++){
            currentNoteTitle = localStorage.getItem("note" + i);
            currentNoteTime = localStorage.getItem("noteTime" + i);
            if(currentNoteTitle != undefined){
                var newNoteDiv = document.createElement("div");
                newNoteDiv.className = "noteItem";
                newNoteDiv.classList.add("shouldNotFade");
                newNoteDiv.id = "noteItem" + i;
                newNoteDiv.onclick = function(){
                    openNote(this);
                }
                var newNoteSpan1 = document.createElement("span");
                newNoteSpan1.className = "noteTitle";
                newNoteSpan1.classList.add("shouldNotFade");
                newNoteSpan1.id = "noteTitle" + i;
                var newNoteSpan2 = document.createElement("span");
                newNoteSpan2.className = "noteTime";
                newNoteSpan2.classList.add("shouldNotFade");
                newNoteSpan2.id = "noteTime" + i;
                newNoteDiv.appendChild(newNoteSpan1);
                newNoteDiv.appendChild(newNoteSpan2);
                noteList.appendChild(newNoteDiv);
                document.getElementById("noteTitle" + i).innerText = localStorage.getItem("note" + i);
                document.getElementById("noteTime" + i).innerText = localStorage.getItem("noteTime" + i);
            }
        }
    }
    textNote.value = "";
    pinnedNoteNum=localStorage.getItem("pinnedNoteNum");
    if(pinnedNoteNum!=undefined&&pinnedNoteNum!= ""){
        pinnedNoteContent.innerText=localStorage.getItem("note" + pinnedNoteNum);
        pinnedNoteTime.innerText=localStorage.getItem("noteTime" + pinnedNoteNum);
        showPinnedNote();
    }
}
function newNote()
{
    noteToolBar.style.display = "none";
    if(document.getElementById("noteItem" + currentEditingNote) != undefined){
        document.getElementById("noteItem" + currentEditingNote).classList.remove("current");
    }
    currentNotes = Number(currentNotes) + 1;
    currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem","")) + 1;
    currentNoteIsNew = true;
    textNote.value = "";
    textNote.focus();
    currentNotes = Number(currentNotes) - 1;
    currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem","")) - 1;
}
function openNote(obj)
{
    if(document.getElementById("noteItem" + currentEditingNote) != undefined){
        document.getElementById("noteItem" + currentEditingNote).classList.remove("current");
    }
    currentNoteIsNew = false;
    currentEditingNote = obj.id.replace("noteItem","");
    textNote.value = localStorage.getItem("note"+currentEditingNote);
    noteToolBar.style.display = "block";
    document.getElementById("noteItem" + currentEditingNote).classList.add("current");
}
function noteChanged()
{
    if(textNote.value!=""&&noteListWrap.style.left!="0px"){
        textNote.style.left="200px";
        textNote.style.width="420px";
        noteListWrap.style.left="0px";
        noteToolBar.style.display = "block";
    }
    if(textNote.value!=""&&currentNoteIsNew==true){
        currentNotes = Number(currentNotes) + 1;
        currentEditingNote = Number(noteList.lastElementChild.id.replace("noteItem","")) + 1;
        var newNoteDiv = document.createElement("div");
        newNoteDiv.className = "noteItem";
        newNoteDiv.classList.add("shouldNotFade");
        newNoteDiv.classList.add("current");
        newNoteDiv.id = "noteItem" + currentEditingNote;
        newNoteDiv.onclick = function(){
            openNote(this);
        }
        var newNoteSpan1 = document.createElement("span");
        newNoteSpan1.className = "noteTitle";
        newNoteSpan1.classList.add("shouldNotFade");
        newNoteSpan1.id = "noteTitle" + currentEditingNote;
        var newNoteSpan2 = document.createElement("span");
        newNoteSpan2.className = "noteTime";
        newNoteSpan2.classList.add("shouldNotFade");
        newNoteSpan2.id = "noteTime" + currentEditingNote;
        newNoteDiv.appendChild(newNoteSpan1);
        newNoteDiv.appendChild(newNoteSpan2);
        noteList.appendChild(newNoteDiv);
        noteList.scrollTop = noteList.clientHeight;
        localStorage.setItem("currentNotes", currentNotes);
        localStorage.setItem("maximumNoteNumber", currentEditingNote);
        currentNoteIsNew = false;
    }
    if(textNote.value==""&&currentNotes=="1"&&noteListWrap.style.left=="0px"){
        textNote.style.left="0px";
        textNote.style.width="620px";
        noteListWrap.style.left="-200px";
        noteToolBar.style.display = "none";
    }
    if(textNote.value==""){
        noteList.removeChild(document.getElementById("noteItem" + currentEditingNote));
        currentNotes = Number(currentNotes) - 1;
        currentNoteIsNew = true;
        localStorage.setItem("currentNotes", currentNotes);
        localStorage.setItem("maximumNoteNumber", Number(noteList.lastElementChild.id.replace("noteItem","")));
        noteToolBar.style.display = "none";
    }
    if(document.getElementById("noteTitle" + currentEditingNote) != undefined){
        document.getElementById("noteTitle" + currentEditingNote).innerText = textNote.value;
        document.getElementById("noteTime" + currentEditingNote).innerText = currentTime;
    }
    if(currentEditingNote==pinnedNoteNum){
        pinnedNoteContent.innerText=textNote.value;
        pinnedNoteTime.innerText=currentTime;
    }
    if(currentEditingNote==pinnedNoteNum&&textNote.value==""){
        unpinNote();
    }
}
function saveNote()
{
    noteChanged();
    if(textNote.value != ""){
        localStorage.setItem("note" + currentEditingNote, textNote.value);
        localStorage.setItem("noteTime" + currentEditingNote, currentTime);
    }else{
        localStorage.removeItem("note" + currentEditingNote);
        localStorage.removeItem("noteTime" + currentEditingNote);
    }
}
function delNote()
{
    if(confirm("删除这条便笺？")){
        textNote.value = "";
        saveNote();
    }
}
function pinNote()
{
    pinnedNoteContent.innerText=textNote.value;
    pinnedNoteTime.innerText=document.getElementById("noteTime" + currentEditingNote).innerText;
    pinnedNoteNum=currentEditingNote;
    localStorage.setItem("pinnedNoteNum", currentEditingNote);
    showPinnedNote();
}
function showPinnedNote()
{
    pinnedBox.style.display="block";
    setTimeout(function(){
        pinnedBox.style.opacity="1";
        pinnedBox.style.transform="scale(1.05)";
    },100);
    setTimeout(function(){
        pinnedBox.style.transform="scale(1)";
    },350);
}
function unpinNote()
{
    pinnedNoteNum="";
    localStorage.setItem("pinnedNoteNum", "");
    pinnedBox.style.transform="scale(1.05)";
    setTimeout(function(){
        pinnedBox.style.transform="scale(0.5)";
        pinnedBox.style.opacity="0";
    },250);
    setTimeout(function(){
        pinnedBox.style.display="none";
    },500);
}
function navboxScale0()
{
    navbox1.style.MozTransform="scale(0.9)";
    navbox1.style.WebkitTransform="scale(0.9)";
    navbox2.style.MozTransform="scale(0.9)";
    navbox2.style.WebkitTransform="scale(0.9)";
}
function navboxScale1()
{
    navbox1.style.MozTransform="scale(1)";
    navbox1.style.WebkitTransform="scale(1)";
    navbox2.style.MozTransform="scale(1)";
    navbox2.style.WebkitTransform="scale(1)";
}
function nbSwitch1_Click()
{
    if(navbox1.style.left!="0px"){
        nbSwitch2_0.classList.remove("current");
        nbSwitch1_0.classList.add("current");
        navboxScale0()
        setTimeout(function(){
            navbox1.style.left="0px";
            navbox2.style.left="100%";
        },250);
        setTimeout(function(){
            navboxScale1()
        },500);
    }
}
function nbSwitch2_Click()
{
    if(navbox2.style.left!="0px"){
        nbSwitch1_0.classList.remove("current");
        nbSwitch2_0.classList.add("current");
        navboxScale0()
        setTimeout(function(){
            navbox1.style.left="-100%";
            navbox2.style.left="0px";
        },250);
        setTimeout(function(){
            navboxScale1()
        },500);
    }
}
function Time(){
    //var vWeek,vWeek_s,vDay;
    //vWeek = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    var date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    //seconds = date.getSeconds();
    //vWeek_s = date.getDay();
    //titleText.innerText = year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes +":" + seconds + "\t" + vWeek[vWeek_s] ;
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    titleText.innerText = hours + ":" + minutes;
    currentTime = year + "年" + month + "月" + day + "日 " + hours + ":" + minutes;
};
setInterval("Time()",1000);
function pinnedNoteHover(ev,obj) 
{
    m_clientX = ev.clientX-obj.offsetLeft;
    m_clientY = ev.clientY-obj.offsetTop;
    pinnedNoteW=window.getComputedStyle(obj).width.replace("px","");
    pinnedNoteH=window.getComputedStyle(obj).height.replace("px","");
    if(m_clientX<pinnedNoteW*0.3 && m_clientY<pinnedNoteH*0.3){
        obj.style.transform="rotateX(10deg) rotateY(-5deg)";
    }
    if(m_clientX>pinnedNoteW*0.3 && m_clientX<pinnedNoteW*0.7 && m_clientY<pinnedNoteH*0.3){
        obj.style.transform="rotateX(10deg)";
    }
    if(m_clientX>pinnedNoteW*0.7 && m_clientY<pinnedNoteH*0.3){
        obj.style.transform="rotateX(10deg) rotateY(5deg)";
    }
    if(m_clientX<pinnedNoteW*0.3 && m_clientY>pinnedNoteH*0.3 && m_clientY<pinnedNoteH*0.7){
        obj.style.transform="rotateY(-5deg)";
    }
    if(m_clientX>pinnedNoteW*0.3 && m_clientX<pinnedNoteW*0.7 && m_clientY>pinnedNoteH*0.3 && m_clientY<pinnedNoteH*0.7){
        obj.style.transform="rotate3d(0,0,0,0deg)";
    }
    if(m_clientX>pinnedNoteW*0.7 && m_clientY>pinnedNoteH*0.3 && m_clientY<pinnedNoteH*0.7){
        obj.style.transform="rotateY(5deg)";
    }
    if(m_clientX<pinnedNoteW*0.3 && m_clientY>pinnedNoteH*0.7){
        obj.style.transform="rotateX(-10deg) rotateY(-5deg)";
    }
    if(m_clientX>pinnedNoteW*0.3 && m_clientX<pinnedNoteW*0.7 && m_clientY>pinnedNoteH*0.7){
        obj.style.transform="rotateX(-10deg)";
    }
    if(m_clientX>pinnedNoteW*0.7 && m_clientY>pinnedNoteH*0.7){
        obj.style.transform="rotateX(-10deg) rotateY(5deg)";
    }
            btnUnpin.style.opacity="1";
}
function pinnedNoteHover2(obj) 
{
    obj.style.transform="rotate3d(0,0,0,0deg)";
    btnUnpin.style.opacity="0";
}
