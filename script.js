function ShowSpecial(){
    document.getElementById('Special').style.display='flex';
}

function ChangeAlign(){
    align=document.getElementsByTagName("h1")[0].style.textAlign;
    
    if(align=="left"){
        align="center";
    }else if(align=="center"){
        align="right";
    }else if(align=="right"){
        align="left";
    }else{
        align="center";
    }
    length=document.getElementsByTagName("h1").length;
    for(i=0;i<length;i++){
        document.getElementsByTagName("h1")[i].style.textAlign=align;
    }
    
}

function AddHobby(){
    newHobby=prompt("What is my new hobby?");
    if (newHobby==""){

    }else{
        let div=document.createElement("div");
        div.className="m-2 p-3 bg-danger";
        let node=document.createTextNode(newHobby);
        div.appendChild(node);


        document.querySelectorAll("div")[4].appendChild(div);
    }
    
}

function ShowScrollBar(){
    if(document.getElementById('Scroll').style.display=="none"){
        document.getElementById('Scroll').style.display='flex';
    }else{
        document.getElementById('Scroll').style.display='none';
    }
    
}

setInterval(()=>{
    y=window.scrollY;
    let w=0;
    let val=0;
    if(y>=document.body.clientHeight-window.innerHeight+48){
        w="100%"
        val="100";
    }else if(y>=(document.body.clientHeight-window.innerHeight+48)*0.75){
        w="75%"
        val="75";
    }else if(y>=(document.body.clientHeight-window.innerHeight+48)*0.50){
        w="50%"
        val="50";
    }else if(y>=(document.body.clientHeight-window.innerHeight+48)*0.25){
        w="25%"
        val="25";
    }else if(y>=(document.body.clientHeight-window.innerHeight+48)*0){
        w="0%"
        val="0";
    }
    document.getElementById('ScrollBar').ariaValueNow=val;
    document.getElementById('ScrollBar').style.width=w;


},100)

setInterval(()=>{

    if(!(document.querySelector("form").elements[0].validity.typeMismatch==true||
        document.querySelector("form").elements[0].validity.valueMissing==true)){
            document.getElementById("new-email").classList.remove("is-invalid");
    }
    if(document.querySelectorAll("input[name=new-color]:checked").length!=0){
        for(let i=0;i<4;i++){
            document.getElementsByClassName("form-check-input")[i].classList.remove("is-invalid");
        }
    }
    if(document.querySelector("form").elements[1].validity.valueMissing==false){
        document.getElementById("new-comment").classList.remove("is-invalid");
    }

},100)

function ProcessForm(){
    let pass=1;
    let email=document.getElementById("new-email").value;
    
    if(document.querySelector("form").elements[0].validity.typeMismatch==true||
        document.querySelector("form").elements[0].validity.valueMissing==true){
            document.getElementById("new-email").classList.add("is-invalid")
            pass=0;
    }

    let comment=document.getElementById("new-comment").value;
    if(document.querySelector("form").elements[1].validity.valueMissing==true){
        document.getElementById("new-comment").classList.add("is-invalid");
        pass=0;
    }
    let color=0;
    if(document.querySelectorAll("input[name=new-color]:checked").length==0){
        for(let i=0;i<4;i++){
            document.getElementsByClassName("form-check-input")[i].classList.add("is-invalid");
        }
        pass=0;
    }else{
        color=document.querySelectorAll("input[name=new-color]:checked")[0].value;
    }
    if(pass==1){
        PrintComment(email,comment,color);
        SaveComment(email,comment,color);
        document.querySelector("form").reset();
    }
    
}

function PrintComment(email,comment,color){
    let newComment=document.createElement("div");
        let element="<div class='flex-shrink-0'>"+
                        "<svg height='100' width='100'>"+
                            "<circle cx='50' cy='50' r='40'></circle>"+
                        "</svg>"+
                    "</div>"+
                    "<div class='flex-grow-1'>"+
                        "<h5></h5>"+
                        "<p></p>"+
                    "</div>"
        //class
        newComment.innerHTML=element;
        newComment.className="d-flex";
        //id
        let lastComment=document.querySelector("#comments").lastElementChild;
        newComment.id='c'+(Number(lastComment.id.substr(1)) + 1);
        //fill data
        newComment.querySelector("h5").innerHTML=email;
        newComment.querySelector("p").innerHTML=comment;
        //color
        newComment.querySelector("circle").setAttribute("fill", color);
        //add comment
        document.getElementById("comments").appendChild(newComment);
        
}


function LoadComment(){


    fetch('comments.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        let oldComment=myJson;
        for(let i=0;i<oldComment.length;i++){
            PrintComment(oldComment[i].email,oldComment[i].comment,oldComment[i].color);
        }
    });
}




function SaveComment(){
    noOfComment=document.querySelector("#comments").childElementCount;
    const data=[];
    for(let i=0;i<noOfComment;i++){
        child=document.querySelector("#comments").children[i];
        let email=child.querySelector("h5").innerHTML;
        let comment=child.querySelector("p").innerHTML;
        let color=child.querySelector("circle").attributes.fill.value;
        if(i!=0)data[i-1]={ "email": email, "comment": comment, "color":color };
        
    }

    fetch('comments.json', {
        method: 'PUT', 
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
    }).then(response => console.log(response))
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}