FROM docker.elastic.co/beats/filebeat:7.4.2

COPY filebeat.yml /usr/share/filebeat/filebeat.yml
USER root

RUN bash -c 'chmod 777 /usr/share/filebeat/filebeat.yml'

RUN mkdir /var/log/server
RUN chown -R root /usr/share/filebeat