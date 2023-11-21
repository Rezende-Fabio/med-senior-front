self.addEventListener('push', function(event) {
    const text = event.target.data?.text() ?? '';
    
    event.waitUntil(
        self.registration.showNotification('MedSenior', {
            body: text
        })
    )
})