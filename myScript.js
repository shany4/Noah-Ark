var direction;		//A to C:true ; C to A:false
var people=new Array(9); 
var part1Able;//determine people on the boat one or not
var part2Able;//determine people on the boat two or not
var onboatA;//who is on the boat 1
var onboatB;//who is on the boat 1
var timesold; //the time out function's constant time
var IntervalID;//the interveralid of moving from a to c
var intervalid;//the intervaralid of moving from c to a
var intervalid2;//the intervaralid of 1000 time limit
var s = 25;//the speed of boat
var A;//the side of land's div
var B;//
var movement = 0;//the recorder of step people made
var time = 300// 1000second, time count
var intervalid;//the interval id of moving boat from c to a




//All My Function In The Game Are Shows Bellow!!!!! haha


//part 1: time & pedometer
//here is my time function when the time is 0 the alert come and very thing back to the beginning page.
function timeout(){
	if(time == 0){
		alert("time is up, a new game will be start, try again");
		window.location = window.location;	
	}
	//here is the time counting, the time is counting by second.
	else{
	document.getElementById("timeout").innerHTML = "";
	document.getElementById("timeout").innerHTML = "<h1 align = center>" + "time"+" "+ "left:"+time + "s" + "      "+ "total steps:"+ movement +"</h1>";
	time = time - 1;
	}
}//time out function close here

//here is the function of set time, so its totally 1000 second. 
function settime(){
	time = 300;
	movement = 0;//pedometer
	intervalid2 = setInterval(timeout, 1000);
}//set time funtion close here 




//part 2: the initialization of the game, set the rule of the game and define the function of the game will be used
//this is the main function of the game it invloves the people in A side and B side and the boat and the move event
function init(){
//I build a function here called init, refresh the game start the new game, called when page is loading
settime();//set the time counter and the step counter
    var peopleA=document.getElementById("A").getElementsByTagName("div");
	var boats=document.getElementsByName("boat");
    var peopleC=document.getElementById("C").getElementsByTagName("div");
	var moveship=document.getElementById("move");
// hidden all the peope on the ARK, when all the people is visible, the game is finished
	for(var i=0,len=peopleC.length;i<len;i++){
	    peopleC[i].style.visibility="hidden";
	}
    part1Able=true;
	part2Able=true;
	direction=true;
	//make all the 8 people active
	for (var i=0;i<9;i++)
	{
		people[i]=true;
	}
	//get the numebr of people on side A
	var len=peopleA.length;
	for(var j=0;j<len;j++){
	    (function(m){
		    peopleA[m].onclick = function(){//set the function to move people to the ship
			    if(direction)
			       selectPeople(this,m+1);
			};
			peopleC[m].onclick = function(){
			    if(!direction)
			       selectPeople(this,m+10+1);
			};
		})(j);
	}
	
//setting the boat1 click event (the top of the boat, characters will stand on the boat)	
	boats[0].onclick=function(){
	    quitboat(this,onboatA);//this is the pointer to boats[0] and onboatA
	    part1Able=true;
	    onboatA=0;
	};
//setting the boat2 click event (the middle part, which is the movement contral)	
	boats[1].onclick=function(){
	    move();
	};
//setting the boat3 click event (the bottom of the boat, characters will stand on the boat)		    
	boats[2].onclick=function(){
	    quitboat(this,onboatB);//this is the pointer to boats[2]
	    part2Able=true;
	    onboatB=0;
	};
//	
	moveboat.onclick=function(){
	    move();
	};
}//the init funtion close here 



//part 3: select people, which include select people from land to boat and select people from boat to land. also define that Prof enforce worker study, employer enforce student work and prisoner hurt people when plice not with him.
//here is the function selectpeople
function selectPeople(obj,move_num){// obj represent the people
    var boats=document.getElementsByName("boat");
	if(part1Able){//setting for boat1 (top) 
	    boats[0].innerHTML=obj.innerHTML;
		obj.style.visibility="hidden";
		part1Able=false;
		onboatA=move_num;
		if(move_num>10)
			people[move_num-10]=!people[move_num-10];
		else
			people[move_num]=!people[move_num];
	}
	else if(part2Able){//setting for boat3 (botton)
	    boats[2].innerHTML=obj.innerHTML;
		obj.style.visibility="hidden";
		part2Able=false;
		onboatB=move_num;
		if(move_num>10)
			people[move_num-10]=!people[move_num-10];
		else
			people[move_num]=!people[move_num];
	}//let peole on the boat and let he people appear on the ark
	else{
	    alert("The boat is full!");
	}//the boat can only hole 2 people, is more than 2 people, the alert will come out
}
//here is the function that define the situation when characters are not on the boat 
function quitboat(obj,quitId){
    if(obj.innerHTML != ""){
	    var peopleA=document.getElementById("A").getElementsByTagName("div");
        var peopleC=document.getElementById("C").getElementsByTagName("div");
	    if(quitId > 10){
		    peopleC[quitId-10-1].style.visibility="visible";
			people[quitId-10]=!people[quitId-10];
		}
		else{
		    peopleA[quitId-1].style.visibility="visible";
			people[quitId]=!people[quitId];
		}
		obj.innerHTML="";
	}
}//delete the div on the boat
//this function define that prof enforce workA and B to study by a alert, when employer leave
function profCheck(){
    //for workerA
    if(people[1]==people[5])
	{
		if(people[4]!=people[1])
		{
			alert("Prof enforce worker to study");
			return false;
		}
	}
	//for workerB
	if(people[1]==people[6])
	{
		if(people[4]!=people[1])
		{
			alert("Prof enforce worker to study");
			return false;
		}
	}
	return true;
}
//this function define that employer enforce student to work by a alert, when prof leave
function employerCheck(){
    //for studentA
    if(people[4]==people[2])
	{
		if(people[1]!=people[4])
		{
			alert("Employer enforce student to work");
			return false;
		}
	}
	//for studentB
	if(people[4]==people[3])
	{
		if(people[1]!=people[4])
		{
			alert("Employer enforce student to work");
			return false;
		}
	}
	return true;
}
//this function define that prisoner will hurt people by a alert, when police leave
function policeCheck(){
    if(people[7]!=people[8])
	{
		for(var i=1;i<8;i++)
		{
			if(people[8]==people[i])
			{
				alert("Prisoner hurt people");
				return false;
			}
		}
	}
	return true;
}



//part4:contral the boat from the top side to the down side, which include the movenent of boat (by time) and the movement event contral
//here is the function AtoC that define the boat from top land to down land.
function AtoC(peopleId){//final step to move a to c, move people on the boat to the ark
	var peopleC=document.getElementById("C").getElementsByTagName("div");
	var boats=document.getElementsByName("boat");
	var tempId;//get the number of the people on the C side.
	if(peopleId > 10){
	    tempId = peopleId - 10 -1;
	}
	else
	    tempId = peopleId - 1;
	if(tempId >= 0)
	   peopleC[tempId].style.visibility="visible";

	for(var i=0,len=boats.length;i<len;i++){
	    boats[i].style.top = 300;//The final place of the boat on the C side
		boats[i].innerHTML = "";//delete the people on the boat, empty the boat
	}
}//when the boat from A to B the character show up in B land and disappear in A land
//here is the function CtoA that define tha boat from down land back to top land
function CtoA(peopleId){//final steps move C to A	
    var peopleA=document.getElementById("A").getElementsByTagName("div");
	var boats=document.getElementsByName("boat");
	var tempId;//same as A to C
	if(peopleId > 10){
	    tempId = peopleId - 10 -1;
	}
	else
	    tempId = peopleId - 1;
	if(tempId >= 0)
	    peopleA[tempId].style.visibility="visible";
	for(var i=0,len=boats.length;i<len;i++){
	   boats[i].style.top = 0;
	   boats[i].innerHTML = "";//delete the people on the boat, empty the boat.
	}
}//when the boat from B to A the character show up in A land and disappear in B land
//there are two function that give a movement to the boat form A to B and B to A. (by time)
//boat movement function A to C
function AtoCh(){
	var boats=document.getElementsByName("boat");
	if(s == 300){
	AtoC(A);
	AtoC(B);
	s = s + 1;//go up
	}
	if(s < 300)   {
	s = s + 25; //by 25 unit per s speed
	for(var i=0,len=boats.length;i<len;i++){//moving each part of the boat
	    boats[i].style.top = s;
	}
	}
}
//boat movement function C to A
function CtoAh(){
	var boats=document.getElementsByName("boat");
	if(s == 0){
	CtoA(A);
	CtoA(B);
	s = s - 1;//go done	
	}
	if(s > 0)   {
	s = s - 25;//by 25 units per s (speed)
	for(var i=0,len=boats.length;i<len;i++){//moving each part of the boat
	    boats[i].style.top = s;
	}
	}
}
//here is the function of movement enent contral
function move(){
    if(onboatA==1 || onboatA==4 || onboatA==7 ||
	   onboatA==11 || onboatA==14 || onboatA==17 ||
	   onboatB==1 || onboatB==4 || onboatB==7 ||
	   onboatB==11 || onboatB==14 || onboatB==17
	  )//only professer, employer and police are above to move the boat，otherwise tha alert come out.
	 {
		if (profCheck() && employerCheck() && policeCheck())
		{	
			if(direction)
			{	
				clearInterval(intervalid);
				s = 0;
				A = onboatA;
				B = onboatB;
				
				IntervalID = setInterval(AtoCh, 30);
				movement = movement + 1;
				direction=false;
			}
			else
			{
				clearInterval(IntervalID);
				s = 300;
				A = onboatA;
				B = onboatB;
				intervalid = setInterval(CtoAh, 30);
				movement = movement + 1;
				direction=true;
			}//here set the movement of pedometer
			part1Able=part2Able=true;
			onboatA=onboatB=0;
			
			setTimeout("foo()", 430);
		}//Delay implementation
	}
	else
		alert("Only Professor, Employer and Police are able to move the boat");
}


function foo(){
	var peopleC=document.getElementById("C").getElementsByTagName("div");
			var result = true;
			for(var i=0,len=peopleC.length;i<len;i++){
			   if(peopleC[i].style.visibility=="hidden"){
			       result = false;
				   break;
			   }
			}
			if(result){
			    alert("You are awesome"+"Your total step is " + movement + "Please like us on the home page");
				window.location = window.location;
			}
}
//here set that window.onload will back to function init.
window.onload = function(){
    init();    
}

//all my javascript code finished!!!!! so sweet!