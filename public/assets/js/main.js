
$(document).ready(function(){
    console.log("App Loaded Successfully");
    loadBusinesses();

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