Functional Requirements

1. Business Listing Page
   Create a page that displays a Business Listing in table format.
   Columns
   ● ID
   ● Business Name
   ● Address
   ● Phone
   ● Email
   ● Actions (Add / Edit / Delete)
   ● Average Rating (Raty)
2. Business CRUD Operations
   Requirements
   Candidates must implement:
   ➜ Add Business
   ● Use Bootstrap Modal
   ● Submit via AJAX
   ● Save in database
   ● Table should update dynamically
   ● Page must NOT refresh
   ➜ Update Business
   ● Use Bootstrap Modal
   ● Pre-fill existing data
   ● Submit via AJAX
   ● Update table dynamically
   ● No refresh
   ➜ Delete Business
   ● Confirmation dialog
   ● Delete using AJAX
   ● Remove row dynamically
   ● No refresh
3. Rating System (Raty Plugin)
   Display
   ● Last column shows Average Rating
   ● Use Raty plugin (read-only mode)
   On Click
   Clicking rating should:
   ● Open Rating Modal
   ● Allow user to submit rating
4. Rating Modal
   Fields Required
   ● Name
   ● Email
   ● Phone
   ● Rating (Raty plugin)
   Rating Features
   ● Half star support (.5 rating allowed)
   ● Rating scale: 0–5
5. Rating Logic
   Save Logic
   When submitting rating:
   Rule 1
   If Email OR Phone already exists for that business:
   → Update/overwrite existing rating
   Rule 2
   If new user:
   → Insert new rating
6. Real-Time Update (Important)
   After rating submission:
   ● Recalculate average rating
   ● Update table immediately
   ● No page refresh allowed
   Database Structure (Suggested)
   businesses
   ● id (PK)
   ● name
   ● address
   ● phone
   ● email
   ● created_at
   ratings
   ● id (PK)
   ● business_id (FK)
   ● name
   ● email
   ● phone
   ● rating
   ● created_at
