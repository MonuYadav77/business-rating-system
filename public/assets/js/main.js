

document.getElementById("addBusinessBtn").addEventListener("click", function () {
    const modal = new bootstrap.Modal(document.getElementById("addBusinessModal"));
    modal.show();
});

// Handle form submission for adding a new business
$(document).on("submit","#addBusinessForm",function(e){
    
    e.preventDefault();
    
    let formData = $(this).serialize(); //serialize means to convert form data into a query string format (key=value&key2=value2)
    let id = $("#business_id").val();

    if(id){
        formData += "&action=update";
    }else{
        formData += "&action=add";
    }
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    $.ajax({

        url:"../app/controllers/BusinessController.php",
        method:"POST",
        data:formData,
        dataType:"json",

        success:function(response){
        console.log("Response from server:", response);

        if(response.status=="success"){
            alert("Business Added Successfully");
            $("#addBusinessModal").modal("hide");
            $("#addBusinessForm")[0].reset();
            loadBusinesses();
        }else{
            
            alert("Error Adding Business");
        }
    },

    error:function(xhr,status,error){
        console.log("AJAX Error:", error);
        console.log(xhr.responseText);
    }

    });

});

//handle edit button click
$(document).on("click",".edit-btn",function(){

    let id = $(this).data("id");

    $.ajax({
        url:"../app/controllers/BusinessController.php",
        method:"GET",
        data:{
            action:"get",
            id:id
        },
        dataType:"json",

        success:function(data){

            $("#name").val(data.name);
            $("#address").val(data.address);
            $("#phone").val(data.phone);
            $("#email").val(data.email);

            $("#business_id").val(data.id);

            $("#addBusinessModal").modal("show");
        }
    });

});

function loadBusinesses(){
    $.ajax({
        url : "../app/controllers/BusinessController.php",
        method : "GET",
        data:{ action:"list" },
        dataType :"json",

        success : function(response){
            let rows = "";
            response.forEach(function(b){
                rows += `
                <tr>
                    <td>${b.id}</td>
                    <td>${b.name}</td>
                    <td>${b.address}</td>
                    <td>${b.phone}</td>
                    <td>${b.email}</td>

                    <td>
                        <button class="btn btn-sm btn-warning edit-btn" data-id="${b.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${b.id}">Delete</button>
                    </td>

                    <td>
                        <div class="rating" data-score="${b.avg_rating}" data-id="${b.id}"></div>
                    </td>
                </tr>
                `;
            })
            $("#businessTable tbody").html(rows); // update table body with new rows
        }
    })
}

$(document).ready(function(){
    console.log("App Loaded Successfully");
    loadBusinesses();

});