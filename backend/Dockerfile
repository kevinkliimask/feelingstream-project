FROM python:3.12-slim


ENV WORKING_DIR=/home/flask_app

WORKDIR ${WORKING_DIR}
COPY . .

RUN pip install --upgrade -r requirements.txt

EXPOSE 5000

RUN ["chmod", "+x", "./startup.sh"]
CMD ["/bin/bash", "-c", "./startup.sh"]
