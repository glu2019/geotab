FROM python:3.8.0b1-stretch
LABEL maintainer="Guangwen Lu <luguangwen2018@gmail.com>"

RUN apt-get update
EXPOSE 8080
RUN mkdir /usr/local/geotab
RUN mkdir /usr/local/geotab/backend/
WORKDIR /usr/local/geotab/backend/

COPY requirements.txt /usr/local/geotab/backend/
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . /usr/local/geotab/backend/
ENTRYPOINT ["sh", "/usr/local/geotab/backend/entrypoint.sh"]
