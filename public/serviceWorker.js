self.addEventListener('push', function(event) {
    const text = event.data.text();
    
    event.waitUntil(
        self.registration.showNotification('MedSenior', {
            body: text
        })
    );
});