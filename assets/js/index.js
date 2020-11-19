$('#add_user').submit(function(event){
    alert("Data inserted successfully");
});


//method to update user data in the database
$('#update_user').submit(function(event){
    event.preventDefault(); //change the default behaviour

    var unindexed_array = $(this).serializeArray(); //get all the data in the form to an array
    var data = {}
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
    console.log(data);

    var request = {
        "url":`/api/users/${data.id}`,
        //"url": window.location.protocol + window.location.host + `/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })

}) 

if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr('data-id')

        var request = {
            "url":`/api/users/${id}`,
            //"url": window.location.protocol + window.location.host + `/api/users/${data.id}`,
            "method": "DELETE"
        }

        if(confirm("Are you sure?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully");
                location.reload()
            })
        }
    })
}