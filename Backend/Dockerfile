FROM python:3.11-slim

WORKDIR /memory_places

COPY . /memory_places/

RUN pip install djangorestframework django-cors-headers djangorestframework-simplejwt django-smtp-ssl python-dotenv pillow

EXPOSE 8000

CMD ["./startupfile.sh"]