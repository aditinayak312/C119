quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye"];
timercounter=0;
timercheck="";
drawn_sketch="";
ansHolder="";
score=0;
randomNumber=Math.floor((Math.random()*quick_draw_data_set.length)+1);

sketch=quick_draw_data_set[randomNumber];

document.getElementById("drawsketch").innerHTML="Sketch to be Drawn "+ sketch;

function updateCanvas(){
    background("white");
    randomNumber=Math.floor((Math.random()*quick_draw_data_set.length)+1);

    sketch=quick_draw_data_set[randomNumber];

    document.getElementById("drawsketch").innerHTML="Sketch to be Drawn "+ sketch;
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    checkSketch();
    if(drawn_sketch==sketch){
        score++;
        ansHolder="set";
        document.getElementById("score").innerHTML=score;
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error();
    }
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById("yoursketch").innerHTML=drawn_sketch;
    document.getElementById("confidence").innerHTML=Math.round(results[0].confidence*100)+"%";
}

function checkSketch(){
    timercounter++;
    document.getElementById("time").innerHTML=timercounter;
    if(timercounter>400){
        timercounter=0;
        timercheck="completed";
    }
    if(timercheck=="completed"|| ansHolder=="set"){
       ansHolder="";
       timercheck="";
        updateCanvas();
    }
}