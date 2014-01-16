$(function(){
    $('.calendar').click(function(){
        $.get('https://www.googleapis.com/calendar/v3/calendars/'+$(this).attr('id')+'/events',
        {key:'AIzaSyDaXnRtQWz2WzB1sUDEACAm52aQzFYuJpI',
        maxResults:5,
        fields:'items(description,end,id,start,summary),nextPageToken'},function(data){
            var events = data.items;
            $('#eventList').empty();
            for(var i=0; i<events.length; i++)
            {
                if(events[i].start.dateTime && events[i].end.dateTime)
                {
                    var start = new Date(events[i].start.dateTime);
                    var end = new Date(events[i].end.dateTime);
                    start = start.toLocaleString();
                    end = end.toLocaleString();
                    
                }
                else if(events[i].start.date && events[i].end.date)
                {
                    var start = new Date(events[i].start.date);
                    var end = new Date(events[i].end.date);
                    start = start.toLocaleDateString();
                    end = end.toLocaleDateString();
                }
                

                $('#eventList').append('<h3>'+events[i].summary+' '+events[i].id+'</h3><h4><em>Start: </em>'+start+'</h4><h4><em>End: </em>'+end+'</h4><p>'+events[i].description.replace(/\n/g, '<br>')+'</p>');
                
            }
        }).fail(function(){
            $('#eventList').empty().append('<p>Этот календарь не является публичным или не существует</p>');
        });
    });
    $('li').mouseover(function(){
        $(this).find('.ui-icon-pencil').css('display','inline');
    });
    $('li').mouseout(function(){
        $(this).find('.ui-icon-pencil').css('display','none');
    });
    var value = '';
    $('.ui-icon-pencil').click(function(){
        var calName = $(this).prev('span');
        value = calName.html();
        if($(this).prev().find('input').length==1)
            value = $(this).prev().find('input').val();
        calName.html('<input style="width:300px; float:left; margin:6px" type="text" value="'+value+'"><span class="ui-icon ui-icon-check"></span><span class="ui-icon ui-icon-close"></span>');
    });
    
    $('body').on('click', '.ui-icon-close', function(){
        $(this).parent().html(value);

    });
    $('body').on('click', '.ui-icon-check', function(){
        var newName = $(this).prev().val();
        var button = $(this);
        $.get('index.php', {cmd:'updateCalendarName', name:newName, id:button.parent().parent().attr('id')},function(){
            button.parent().html(newName);
        });
    });
});