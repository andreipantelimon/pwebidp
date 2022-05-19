package com.pweb.bookingapi.listener;

import com.pweb.bookingapi.domain.transfer.MailDto;
import com.pweb.bookingapi.service.MailService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@RabbitListener(queues = "email_queue", id = "listener")
public class EmailListener {

    private final MailService mailService;

    private static final Logger logger = LogManager.getLogger(EmailListener.class.toString());

    @RabbitHandler
    public void receiver(MailDto mailDto) {
        logger.info("MenuOrder listener invoked - Consuming Message with MenuOrder Identifier : ");
        mailService.sendSimpleMessage(mailDto.getTo(), mailDto.getSubject(), mailDto.getContent());
    }
}
