define(
['jscore/ext/net','common/Models'], function(net,Models){


     function getTeams(callback,error){

         net.ajax({
            url: 'http://localhost:3010/teams',
            type: 'GET',
            dataType: 'json',
            success: callback,
            error: error
         });
     };


     return {
       getTeams: getTeams
     };

}

);