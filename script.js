$(function(){
    $('.calendar').click(function(){
        $.get('https://www.googleapis.com/calendar/v3/calendars/'+$(this).attr('id')+'/events',
        {key:'AIzaSyDaXnRtQWz2WzB1sUDEACAm52aQzFYuJpI',
        maxResults:5,
        fields:'items(description,end,id,start,summary),nextPageToken'},function(data){
            var events = data.items;
            console.log(events);
            $('#eventList').empty();
            for(var i=0; i<events.length; i++)
            {
                $('#eventList').append('<h3>'+events[i].summary+' '+events[i].id+'</h3><h4><em>Start: </em>'+events[i].start.date+'</h4><h4><em>End: </em>'+events[i].end.date+'</h4><p>'+events[i].description.replace(/\n/g, '<br>')+'</p>');
                
            }
        });
    });
});