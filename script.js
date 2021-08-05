function scan() {
	let unweightedGPA = 0
	let weightedGPA = 0
	let credits = 0
	//get the gpa from current gpa area
	credits = parseFloat(document.getElementById("CurrentCredits").value)
	unweightedGPA = parseFloat(document.getElementById("CurrentGPAUn").value * credits)
	weightedGPA = parseFloat(document.getElementById("CurrentGPAW").value * credits)

	//get the gpa calcuations from the Class area
	classGradesElems = document.getElementsByClassName("classGrade")
	classCreditsElems = document.getElementsByClassName("classCredits")
	classTypeElems = document.getElementsByClassName("classType")

	for(let i = 0; i < classGradesElems.length; i++){
		unweightedGPA += parseFloat(classGradesElems[i].value * classCreditsElems[i].value)
		weightedGPA += (parseFloat(classGradesElems[i].value)+parseFloat(classTypeElems[i].value)) * parseFloat(classCreditsElems[i].value)
		credits += parseFloat(classCreditsElems[i].value)
		// console.log(classGradesElems[i].value)
		// console.log(classCreditsElems[i].value)
		// console.log(classTypeElems[i].value)
	}

	//get gpa calcuations from grade sections
	gradeViewInputs = document.getElementsByClassName("gradeViewInputs")
	for(let i = 0; i < gradeViewInputs.length; i++){
		weightedGPA += parseFloat(gradeViewInputs[i].getAttribute("data-gradeWorth")) * parseFloat(gradeViewInputs[i].value)
		unweightedGPA += parseFloat(gradeViewInputs[i].getAttribute("data-gradeWorth")) * parseFloat(gradeViewInputs[i].value)
		credits += parseFloat(gradeViewInputs[i].value)
		// console.log(gradeViewInputs[i].getAttribute("data-gradeWorth"))
		// console.log(gradeViewInputs[i].value)
	}

	//set the GPAs	
	// console.log(unweightedGPA)
	document.getElementById("unweightedGPARes").innerText = (unweightedGPA/credits).toString().slice(0,6)
	// console.log(weightedGPA)
	document.getElementById("weightedGPAres").innerText = (weightedGPA/credits).toString().slice(0,6)
}

// add event Listener so that it updates automaticly
function addEventlists(){
	let inputs = document.getElementsByTagName("input")
	for (let i = 0; i < inputs.length; i++) {
		// console.log(inputs[key])
		inputs[i].addEventListener("change", scan);
	}
	let selects = document.getElementsByTagName("select")
	for (let i = 0; i < selects.length; i++) {
		// console.log(inputs[key])
		selects[i].addEventListener("change", scan);
	}
}

function addClassButton() {
	var outterTr = document.createElement('tr');
	outterTr.className = "classes";
	outterTr.innerHTML = '<tr class="classes"><th><input type="text" class="className" name="className"></th><th><select class="classGrade" name="classGrade"><option value="4">A/A+</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3.0">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2.0">C</option><option value="1.7">C-</option><option value="1.3">D+</option><option value="1.0">D</option><option value="0">F</option></select></th><th><input type="number" class="classCredits" name="classCredits" value="0" ></th><th><select  class="classType" name="classType"><option value="0">Regular</option><option value=".5">Honors (+.5)</option><option value="1">AP (+1)</option></select></th><th><button type="button" onclick="removeClassTb(this)">Remove Class</button> </th></tr>';
	
	document.getElementById("classTable").appendChild(outterTr);

	addEventlists()
}

function removeClassTb(elem) {
	elem.parentElement.parentElement.remove()
}

addEventlists()