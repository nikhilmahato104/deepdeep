self.addEventListener('push', function(event) {
    let options = {
        body: event.data.text(),
        icon: '/path/to/icon.png',  // Add an icon here
        badge: '/path/to/badge.png',  // Optional badge
    };

    event.waitUntil(
        self.registration.showNotification('New Booking Added', options)
    );
});

// Optionally, handle click events on the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Handle click on the notification, like navigating to a page
    event.waitUntil(
        clients.openWindow('https://freelancerpro.in')  // Customize the URL
    );
});
