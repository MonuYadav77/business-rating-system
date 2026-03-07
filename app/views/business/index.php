<div class="container mt-5">

    <div class="d-flex justify-content-between mb-3">
        <h3>Business Listing</h3>

        <button class="btn btn-primary" id="addBusinessBtn">
            Add Business
        </button>
    </div>

    <table class="table table-bordered" id="businessTable">

        <thead>

            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
                <th>Average Rating</th>
            </tr>

        </thead>

        <tbody></tbody>

    </table>

</div>

<!-- Add Business Modal -->
<div class= "modal fade" id = "addBusinessModal">
    <div class = "modal-dialog">
        <div class = "modal-content">
            <div class = "modal-header">
                <h5 class = "modal-title">Add Business</h5>
                <button class = "btn-close" data-bs-dismiss = "modal"></button>
            </div>

            <div class = "modal-body">
                <form id = "addBusinessForm">
                    <input type="hidden" id="business_id" name="business_id">
                    <div class = "mb-3">
                        <label for = "name" class = "form-label">Name</label>
                        <input type = "text" class = "form-control" id = "name" name = "name" required>
                    </div>

                    <div class = "mb-3">
                        <label for = "address" class = "form-label">Address</label>
                        <input type = "text" class = "form-control" id = "address" name = "address" required>
                    </div>

                    <div class = "mb-3">
                        <label for = "phone" class = "form-label">Phone</label>
                        <input type="tel" class="form-control" id="phone" name="phone" pattern="[0-9]{10}" maxlength="10" required>
                    </div>

                    <div class = "mb-3">
                        <label for = "email" class = "form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"required>
                    </div>

                    <button type="submit" class="btn btn-primary">Add Business</button>

                </form>
            </div>
        </div>
    </div>
</div>