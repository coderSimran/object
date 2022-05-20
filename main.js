objects=[];
status="";

function preload(){
    video=createVideo("video.mp4");
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}

function modelLoaded(){
    console.log(modelLoaded);
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status:objects detected";  
            document.getElementById("number of objects").innerHTML="number of objects detected are:"+objects.length;

            fill("skyblue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +   " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("plum");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}