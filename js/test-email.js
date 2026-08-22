document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    if (form) {
        const formData = new FormData(form);
        formData.append('service_id', 'service_wnh7o0q');
        formData.append('template_id', 'template_gwuni8g');
        formData.append('user_id', 'F0fdWC6WNW1TkrSA1');

        fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
            method: 'POST',
            body: formData
        }).then(res => {
            console.log(res.status, res.statusText);
            return res.text();
        }).then(text => console.log(text));
    }
});
