A chrome extension to send scheduled emails/reminders

Available options: 

-	Birthday reminder: pick a message and schedule email
-	Read later: An email would be sent at a specified time with URL of current page
-  A plain reminder email




curl -X POST -v --user 'api:key-63466f101367740c78726160f8725dc3' \
    https://api.mailgun.net/v2/sandboxa4e6b947eb7b47568c17482c8618e9d5.mailgun.org/messages \
    -F from='krishna.carsearch@gmail.com' \
    -F to='krishna <damarla.kk@gmail.com>'\
    -F subject='Hello krishna' \
    -F text='Congratulations krishna, you just sent an email with Mailgun!  You are truly awesome!'\
    -F o:deliverytime='Tue, 27 Jan 2015 01:15:00 GMT'
    