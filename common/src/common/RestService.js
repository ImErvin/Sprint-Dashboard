define(
['jscore/ext/net','common/Models'], function(net,Models){

     function getTeams(callback){

         net.ajax({
            url: '/teams',
            type: 'GET',
            dataType: 'json',
            success: callback,
            error: callback
         });
     };


     return {
       getTeams: getTeams
     };

}

);