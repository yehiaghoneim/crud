//Load Data in Table when documents is ready  
$(document).ready(function () {  
    loadData();  
});  
  
//Load Data function  
function loadData() {  
    $.ajax({  
        url: "/Home/List",  
        type: "GET",  
        contentType: "application/json;charset=utf-8",  
        dataType: "json",  
        success: function (result) {  
            var html = '';  
            $.each(result, function (key, item) {  
                html += '<tr>';  
                html += '<td>' + item.Employee_id + '</td>';
                html += '<td>' + item.Name + '</td>';  
                html += '<td>' + item.age + '</td>';  
                html += '<td>' + item.state + '</td>';  
                html += '<td>' + item.Country + '</td>';
                html += '<td>' + item.DepartmentName + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Employee_id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Employee_id + ')">Delete</a></td>';
                html += '</tr>';  
            });
            $('.tbody').html(html);  
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
}  
  
//Add Data Function   
function Add() {  
    var res = validate();  
    if (res == false) {  
        return false;  
    }  
    var empObj = {  
        Employee_id: $('#Employee_id').val(),
        Name: $('#Name').val(),  
        Age: $('#Age').val(),  
        state: $('#State').val(),  
        country: $('#Country').val(),
        Department: $('#countrySelect').val()
    };  
    $.ajax({  
        url: "/Home/Add",  
        data: JSON.stringify(empObj),  
        type: "POST",  
        contentType: "application/json;charset=utf-8",  
        dataType: "json",  
        success: function (result) {  
            loadData();  
            $('#myModal').modal('hide');
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
}


$.ajax({
        url: "/Home/Selectalldepartment",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json"

    })
    .success(function(data) {
        DisplayCategories(data);

    });




function DisplayCategories(response) {
    var getData = response;

        var categoriesHtml = "";
        for (var i = 0; i < getData.length; i++) {
            $('#countrySelect').append($("<option ></option> ").val(getData[i].DepartmentID)
                .html((getData[i].DepartmentName)));
        };
        
    }






//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {  
    $('#Name').css('border-color', 'lightgrey');  
    $('#Age').css('border-color', 'lightgrey');  
    $('#State').css('border-color', 'lightgrey');  
    $('#Country').css('border-color', 'lightgrey');  
    $.ajax({  
        url: "/Home/getbyID/" + EmpID,  
        typr: "GET",  
        contentType: "application/json;charset=UTF-8",  
        dataType: "json",  
        success: function (result) {  
            $('#Employee_id').val(result.Employee_id);
            $('#Name').val(result.Name);  
            $('#Age').val(result.age);  
            $('#State').val(result.state);  
            $('#Country').val(result.Country);  
            $('#countrySelect').val(result.Department);


            $('#myModal').modal('show');  
            $('#btnUpdate').show();  
            $('#btnAdd').hide();  
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
    return false;  
}  
  
//function for updating employee's record  
function Update() {  
    var res = validate();  
    if (res == false) {  
        return false;  
    }  
    var empObj = {  
        Employee_id: $('#Employee_id').val(),
        Name: $('#Name').val(),  
        age: $('#Age').val(),  
        state: $('#State').val(),  
        Country: $('#Country').val(),
        Department: $('#countrySelect').val()
    };  
    $.ajax({  
        url: "/Home/Update",  
        data: JSON.stringify(empObj),  
        type: "POST",  
        contentType: "application/json;charset=utf-8",  
        dataType: "json",  
        success: function (result) {  
            loadData();  
            $('#myModal').modal('hide');  
            $('#Employee_id').val("");
            $('#Name').val("");  
            $('#Age').val("");  
            $('#State').val("");  
            $('#Country').val("");
            $('#countrySelect').val("Select You Department");
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
}  
  
//function for deleting employee's record  
function Delele(id) {
    var ans = confirm("Are you sure you want to delete this Record?");  
    if (ans) {  
        $.ajax({  
            url: "/Home/Delete/" + id,
            type: "POST",  
            contentType: "application/json;charset=UTF-8",  
            dataType: "json",  
            success: function (result) {  
                loadData();  
            },  
            error: function (errormessage) {  
                alert(errormessage.responseText);  
            }  
        });  
    }  
}  
  
//Function for clearing the textboxes  
function clearTextBox() {  
    $('#Employee_id').val("");
    $('#Name').val("");  
    $('#Age').val("");  
    $('#State').val("");  
    $('#Country').val("");
    $('#countrySelect').val("Select Your Department"),
    $('#btnUpdate').hide();  
    $('#btnAdd').show();  
    $('#Name').css('border-color', 'lightgrey');  
    $('#age').css('border-color', 'lightgrey');  
    $('#state').css('border-color', 'lightgrey');  
    $('#country').css('border-color', 'lightgrey');  
}  
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() === "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim()<=0) {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() == "") {
        $('#State').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() == "") {
        $('#Country').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Country').css('border-color', 'lightgrey');
    }
    if ($('#countrySelect').val().trim() == "Select Your Department") {
        $('#countrySelect').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#countrySelect').css('border-color', 'lightgrey');
    }
    return isValid;
}