console.log("In script.js");

$(document).ready(onReady);

function onReady() {
    console.log("Ready to roll");
    // Set up event handler for adding an employee
    $('#submitButton').on('click', addEmployee)
}

// Set initial employee list object to empty
var employeeList = [];

// Set initial total salary to 0
var totalCost = 0;

function addEmployee(e, complete) {
    console.log("In addEmployee")
    // Check to make sure all fields are completed
    if ($('#firstName').val() === "" || $('#lastName').val() === "" ||
        $('#idNumber').val() === "" || $('#jobTitle').val() === "" || $('#annualSalary').val() === "") {
        alert("Please fill out form completely!");
        return null
    }
    else {
        // Add a new employee object to the employeeList array, call each
        // value from the input boxes and set to appropriate keys
        employeeList.push({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            idNumber: $('#idNumber').val(),
            jobTitle: $('#jobTitle').val(),
            annualSalary: $('#annualSalary').val()
        })
        // Adjust total cost to reflect salary just entered
        totalCost += Number($('#annualSalary').val());
        // Replace old total cost with updated total cost
        $("#monthlyCost").replaceWith("<p id='monthlyCost'> Monthly Company Cost: $" + (totalCost / 12).toFixed(2) + "</p>");
        // Add new employee to the table, can reference last item in the
        // array since it is the one we just added
        $('#salaryTBody').append(
            "<tr>" +
            "<td>" + employeeList[employeeList.length - 1].firstName + "</td>" +
            "<td>" + employeeList[employeeList.length - 1].lastName + "</td>" +
            "<td>" + employeeList[employeeList.length - 1].idNumber + "</td>" +
            "<td>" + employeeList[employeeList.length - 1].jobTitle + "</td>" +
            "<td>" + employeeList[employeeList.length - 1].annualSalary + "</td>" +
            "<td> <button class='deleteButton'> Delete </button> </td>" +
            "</tr>"
        )
        // Reset input fields to empty
        document.getElementById("firstName").value = ""
        document.getElementById("lastName").value = ""
        document.getElementById("idNumber").value = ""
        document.getElementById("jobTitle").value = ""
        document.getElementById("annualSalary").value = ""
        // Add dynamic event handler to deleteEmployee button just created
        // having problems with multiple click handlers, trying last()
        $('.deleteButton').last().on('click', deleteEmployee)
    }
}

function deleteEmployee(e, complete) {
    console.log("delete was clicked!");
    // Need to adjust salary before we delete the row
    var currentRow = $(this).closest('tr');
    var currentSalary = Number(currentRow.find("td:eq(4)").text()); // get current salary
    var currentID = currentRow.find("td:eq(2)").text(); // get current ID
    // Adjust totalCost down for deleted employee
    console.log("currentSalary here is:" + currentSalary)
    console.log("totalCost before subtraction is" + totalCost)
    totalCost = totalCost - currentSalary
    console.log("totalCost after subtraction is" + totalCost)
    //update statement on total cost at top of page
    $("#monthlyCost").replaceWith("<p id='monthlyCost'> Monthly Company Cost: $" + (totalCost / 12).toFixed(2) + "</p>");
    $(this).closest('tr').remove();
    // delete employee item from array using employee ID
    var removeIndex = employeeList.map(function (item) { return item.idNumber; }).indexOf(currentID);
    employeeList.splice(removeIndex, 1);

    return totalCost;
}


// Live Solve with Dev Notes
// Step 0: Setup interface, source scripts, onClick working
// // Step 1: get inputs for employee obj, push employee into global array
// // Step 2: calculations, clear inputs

// Note: So in my code, I created a global variable to hold total cost, I did not do a for loop, but this is how to set up a for loop
// for this purpose:

// function calculateSalaries() {
    //loop through employees array
    //convert each salary to number
    //add salary to total salaries
    // var totalSalaries = 0;
    //for(var i=0; i<employeeList.length; i++){
        //console.log(Number(employeeList[i].salary));
        //totalSalaries += Number(employeeList[i].salary);
        //var monthlySalary Cost = totalSalaries/12
        //}
    //console.log(totalSalaries)
    //displayOutput(totalSalaries, monthlySalaries);
// }


// // Step 3: Append to DOM

// function displayOutput(salaries, monthly){   note: the paramaeters get sent 
//     console.log('in displayOutput');
//     total calculateSalaries
//     $('#totalSalaryOut').empty('');
//     $('#totalSalaryOut').append('Total Salaries: $(salaries.toFixed(2));
//     monthly salary cost
//     all employees

// Pro tip: Make some generic css's you can drop into a given file

// OK, so when I set up the delete buttons I could have used a 'data-index' value to set an id to the buttons
// For example:
// <button data-index=" ' + i + ' " class="removeButton">Remove</button>
// Note: could be data-hotDog, data-cat, just data-something for assigning the identifier to the button


// function onReady() {
//     console.log("Ready to roll");
//     // Set up event handler for adding an employee
// //     $('#submitButton').on('click', addEmployee)
//         $(document).on('click', '.deleteButton', function(){
            // var myIndex = $(this).data('index');
            // employeeList.splice (myIndex, 1);
// }
//         Note: this works because you are adding the click handler to the whole document, which accounts
//         for the whole document including new instances of a button that are created dynamically
// // }

// // End Live Solve