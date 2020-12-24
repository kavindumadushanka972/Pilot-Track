$(document).ready(function(){

    $('#add_user').submit(function(event){
        alert("Data inserted successfully");
    });
    
    //method to update user data in the database
    $('#update_user').submit(function(event){
        event.preventDefault(); //change the default behaviour
        // console.log("hi");
        var unindexed_array = $(this).serializeArray(); //get all the data in the form to an array
        var data = {}

        $.map(unindexed_array, function(n, i){
            data[n['name']] = n['value']
        })
        
        console.log(data);

        var request = {
            "url":`/api/users/${data.findFactor}`,
            //"url": window.location.protocol + window.location.host + `/api/users/${data.id}`,
            "method": "PUT",
            "data": data
        }
        console.log(request);
        $.ajax(request).done(function(response){
            alert("Data updated successfully");
        })

        // function foo() {
        //     var httpRequest = new XMLHttpRequest();
        //     httpRequest.open('PUT', `/api/users/${data.service_number}`);
        //     httpRequest.send();
        //     return httpRequest.responseText;
        // }
        // var result = foo(); // always ends up being 'undefined'
        // console.log(result);

//         $.putJSON( `/api/users/${data.service_number}`, data)
//   .done( function(resp){
//     // handle response here
// }).fail(function(){
//    alert('Oooops');
// });
        // $.ajax({
        //     type: "put",
        //     url: `/api/users/${data.service_number}`,
        //     success: function(response){
        //         alert("Data updated successfully");
        //     }
        // });

    }) 
    


})

