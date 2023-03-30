import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

def send_email(sender_email, receiver_email, password, subject, message, image_path=None):
    # Create message object
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Add message to the body
    msg.attach(MIMEText(message, 'plain'))

    # Attach image to the email if image_path is provided
    if image_path:
        with open(image_path, 'rb') as f:
            img_data = f.read()
            image = MIMEImage(img_data, name='image.png')
            msg.attach(image)

    # Send email
    with smtplib.SMTP('smtp.office365.com', 587) as smtp:
        smtp.starttls()
        smtp.login(sender_email, password)
        smtp.sendmail(sender_email, receiver_email, msg.as_string())
