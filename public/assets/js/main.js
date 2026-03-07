

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

$(document).ready(function(){

    loadBusinesses();

    // ⭐ Initialize rating stars inside modal
    $('#userRating').raty({
    score:0,
    path:"https://cdnjs.cloudflare.com/ajax/libs/raty/2.7.1/images",
    click:function(score){
        $("#userRating").data("rating",score);
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
//handle delete button click
$(document).on("click",".delete-btn",function(){

    let id = $(this).data("id");

    if(confirm("Are you sure you want to delete this business?")){

        $.ajax({

            url:"../app/controllers/BusinessController.php",
            method:"POST",
            data:{
                action:"delete",
                id:id
            },
            dataType:"json",

            success:function(response){

                if(response.status=="success"){

                    alert("Business Deleted Successfully");

                    loadBusinesses();
                }
                else{
                    alert("Error deleting business");
                }

            }

        });

    }

});
//handle rating button click
$(document).on("click",".rating-btn",function(){

    let business_id = $(this).data("id");

    $("#ratingBusinessId").val(business_id);

    $("#ratingModal").modal("show");

});


//handle rating form submission
$(document).on("click","#submitRatingBtn",function(){

    console.log("Submit rating clicked");

    let business_id = $("#ratingBusinessId").val();
    let rating = $("#userRating").data("rating");

    console.log("Business ID:", business_id);
    console.log("Rating:", rating);

    if(!rating){
        alert("Please select a rating");
        return;
    }

    $.ajax({

        url:"../app/controllers/RatingController.php",
        method:"POST",

        data:{
    action:"rate",
    business_id: business_id,
    name: $("#ratingName").val(),
    email: $("#ratingEmail").val(),
    phone: $("#ratingPhone").val(),
    rating: rating
},

        dataType:"json",

        success:function(res){
            console.log("Rating Response:", res);

            if(res.status=="success"){

                alert("Rating submitted successfully");

                $("#ratingModal").modal("hide");

                loadBusinesses();

            }else{
                console.error("Server returned error:", res);
                alert("Failed to submit rating");
            }
        },

        error:function(xhr, status, error){

            console.error("AJAX Error:");
            console.error("Status:", status);
            console.error("Error:", error);
            console.error("Response:", xhr.responseText);

            alert("Something went wrong. Check console.");

        },

        complete:function(){
            console.log("Rating AJAX request finished");
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

                    <td class="rating-btn" data-id="${b.id}">
        <div class="rating" data-score="${b.avg_rating}"></div>
    </td>
                </tr>
                `;
            })
            $("#businessTable tbody").html(rows); // update table body with new rows
            $(".rating").each(function(){

    let score = $(this).data("score");

    $(this).raty({
        score: score,
        readOnly: true,
        path: "https://cdnjs.cloudflare.com/ajax/libs/raty/2.7.1/images"
    });

});
        }
    })
}

function submitRating(business_id,rating){

    $.ajax({

        url:"../app/controllers/RatingController.php",

        method:"POST",

        data:{
            business_id:business_id,
            rating:rating,
            action:"rate"
        },

        dataType:"json",

        success:function(response){

            if(response.status=="success"){

                loadBusinesses();

            }

        }

    });

}

$(document).ready(function(){
    console.log("App Loaded Successfully");
    loadBusinesses();

});