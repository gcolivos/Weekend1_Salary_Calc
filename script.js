console.log("In script.js");



$(document).ready(onReady);

    // $('.container').append('<button id="submitButton">Submit!</button>');
    // $('#submitButton').on('click', compareNumbers)



function onReady(){
    console.log("Ready to roll");
    $('#submitButton').on('click', addEmployee)
}

var employeeList=[];
var totalCost=0;

function addEmployee(e, complete){
    console.log("In addEmployee")
    employeeList.push({
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNumber: $('#idNumber').val(),
        jobTitle: $('#jobTitle').val(),
        annualSalary: $('#annualSalary').val()
    })
    totalCost+= Number($('#annualSalary').val());
    $("#annualCost").replaceWith("<p id='annualCost'> Annual Company Cost: "+ totalCost + "</p>");
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
    document.getElementById("firstName").value = ""
    document.getElementById("lastName").value = ""
    document.getElementById("idNumber").value = ""
    document.getElementById("jobTitle").value = ""
    document.getElementById("annualSalary").value = ""
    $('.deleteButton').on('click', deleteEmployee)

    console.log(employeeList[employeeList.length-1]);
}

function deleteEmployee(e, complete){
    console.log("delete was clicked!");
    $(this).closest('tr').remove();
}
