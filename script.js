console.log("In script.js");

$(document).ready(onReady);

function onReady(){
    console.log("Ready to roll");
    // Set up event handler for adding an employee
    $('#submitButton').on('click', addEmployee)
}

// Set initial employee list object to empty
var employeeList=[];

// Set initial total salary to 0
var totalCost=0;

function addEmployee(e, complete){
    console.log("In addEmployee")
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
    totalCost+= Number($('#annualSalary').val());
    // Replace old total cost with updated total cost
    $("#annualCost").replaceWith("<p id='annualCost'> Annual Company Cost: $"+ totalCost + "</p>");
    // Add new employee to the table, can reference last item in the
    // array since it is the one we just added
    $('#salaryTBody').append(
        "<tr>" +
        "<td>"+ employeeList[employeeList.length-1].firstName +"</td>" +
        "<td>"+ employeeList[employeeList.length-1].lastName +"</td>" +
        "<td>"+ employeeList[employeeList.length-1].idNumber +"</td>" +
        "<td>"+ employeeList[employeeList.length-1].jobTitle +"</td>" +
        "<td>"+ employeeList[employeeList.length-1].annualSalary +"</td>" +
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

function deleteEmployee(e, complete){
    console.log("delete was clicked!");
    // Need to adjust salary before we delete the row
    var currentRow = $(this).closest('tr');
    var currentSalary=Number(currentRow.find("td:eq(4)").text()); // get current salary
    // Adjust totalCost down for deleted employee
    console.log("currentSalary here is:"+currentSalary)
    console.log("totalCost before subtraction is"+totalCost)
    totalCost= totalCost - currentSalary
    console.log("totalCost after subtraction is"+totalCost)
    //update statement on total cost at top of page
    $("#annualCost").replaceWith("<p id='annualCost'> Annual Company Cost: $"+ totalCost + "</p>");
    $(this).closest('tr').remove();
    return totalCost;
}
