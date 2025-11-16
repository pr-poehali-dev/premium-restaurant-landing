import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send booking request to manager email
    Args: event - dict with httpMethod, body containing booking data
          context - object with request_id attribute
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    date = body_data.get('date', '')
    time = body_data.get('time', '')
    guests = body_data.get('guests', '')
    message = body_data.get('message', '')
    
    email_host = os.environ.get('EMAIL_HOST')
    email_port = int(os.environ.get('EMAIL_PORT', '587'))
    email_user = os.environ.get('EMAIL_USER')
    email_password = os.environ.get('EMAIL_PASSWORD')
    
    recipient_email = os.environ.get('RECIPIENT_EMAIL', 'manager@meyhana.ru')
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая бронь от {name}'
    msg['From'] = email_user
    msg['To'] = recipient_email
    
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #8B4513;">Новая заявка на бронирование</h2>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Дата:</strong> {date}</p>
        <p><strong>Время:</strong> {time}</p>
        <p><strong>Количество гостей:</strong> {guests}</p>
        <p><strong>Пожелания:</strong> {message if message else 'Нет'}</p>
      </body>
    </html>
    '''
    
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        if email_port == 465:
            server = smtplib.SMTP_SSL(email_host, email_port, timeout=10)
        else:
            server = smtplib.SMTP(email_host, email_port, timeout=10)
            server.starttls()
        
        server.login(email_user, email_password)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)})
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
    }