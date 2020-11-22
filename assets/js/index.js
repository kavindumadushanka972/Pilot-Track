
$(document).ready(function(){

    $('#add_user').submit(function(event){
        alert("Data inserted successfully");
    });
    
    //method to update user data in the database
    $('#update_user').submit(function(event){
        event.preventDefault(); //change the default behaviour
        var distance = document.getElementById("dis_update").value.trim();
        var turns = document.getElementById("turns_update").value.trim();
        var accidents = document.getElementById("acc_update").value.trim();
        var regFloat =  /^\d+(\.\d{0,2})?$/;
        var regInt = /^\d+$/

        if(regFloat.test(distance) && regInt.test(accidents) && regInt.test(turns)){
            var unindexed_array = $(this).serializeArray(); //get all the data in the form to an array
            var data = {}
            $.map(unindexed_array, function(n, i){
                data[n['name']] = n['value']
            })
        
            console.log(data);
    
            var request = {
                "url":`/api/users/${data.id}`,
                "method": "PUT",
                "data": data
            }
            $.ajax(request).done(function(response){
                alert("Data updated successfully");
                location.reload();
            })
        }else{
            alert("Check Values You Entered Again!");
            location.reload();
        }
    }) 
    
    
        $ondelete = $(".table tbody td a.delete");
        $ondelete.click(function(){
            var id = $(this).attr('data-id')
    
            var request = {
                "url":`/api/users/${id}`,
                "method": "DELETE"
            }
    
            if(confirm("Are you sure?This will delete the details about Driver Permenantly!")){
                $.ajax(request).done(function(response){
                    alert("Data deleted successfully");
                    location.reload()
                })
            }
        })
    
    
    $('#resetbtn').click(function(event){
            event.preventDefault(); //change the default behaviour
    
            var request = {
                "url":`/api/users/reset`,
                "method": "GET"
            }
            if(confirm("Are you sure?This will reset all the records permanently!")){
                $.ajax(request).done(function(response){
                    alert("Data Reset successfull");
                    location.reload();
                })
            }
    })

    // $("#savebutton").click(function(){
    //     var distance = document.getElementById("dis_update").value;
    //     alert(distance);
        
    // })
    

})

