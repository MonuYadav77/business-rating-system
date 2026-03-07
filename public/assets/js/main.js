

document.getElementById("addBusinessBtn").addEventListener("click", function () {
    const modal = new bootstrap.Modal(document.getElementById("addBusinessModal"));
    modal.show();
});

// Handle form submission for adding a new business
$(document).on("submit","#addBusinessForm",function(e){
    
    e.preventDefault();
    
    let formData = $(this).serialize();
    formData += "&action=add";
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
function loadBusinesses(){
    $.ajax({
        url : "../app/controllers/BusinessController.php",
        method : "GET",
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