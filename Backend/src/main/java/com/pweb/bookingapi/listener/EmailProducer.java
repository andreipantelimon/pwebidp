package com.pweb.bookingapi.listener;

import com.pweb.bookingapi.domain.transfer.MailDto;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Queue;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailProducer {

    private final AmqpTemplate rabbitTemplate;
    private final Queue queue;
    private static final Logger logger = LogManager.getLogger(EmailProducer.class.toString());

    public void send(MailDto mailDto) {
        rabbitTemplate.convertAndSend(queue.getName(), mailDto);
        logger.info("Sending Message to the Queue : " + mailDto.toString());
    }
}
