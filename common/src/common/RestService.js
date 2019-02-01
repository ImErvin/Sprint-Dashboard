define(
  ['jscore/ext/net', 'common/Models'], function (net, Models) {


    function getTeams(callback, error) {
      console.log("made a call");
      net.ajax({
        url: 'http://localhost:3010/teams',
        type: 'GET',
        dataType: 'json',
        success: callback,
        error: error
      });
    };

    function putTeams(data, callback, error) {
      console.log(data);
      net.ajax({
        url: 'http://localhost:3010/teams',
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: callback,
        error: error
      })
    }

    function postTeam(data, callback, error) {
      console.log(data);
      net.ajax({
        url: 'http://localhost:3010/teams',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: callback,
        error: error
      })
    }

    return {
      getTeams: getTeams,
      putTeams: putTeams,
      postTeam: postTeam
    };

  }

);