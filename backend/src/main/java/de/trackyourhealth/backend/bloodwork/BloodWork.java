package de.trackyourhealth.backend.bloodwork;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("bloodWork")
@With
public record BloodWork(
        String id,
        Instant dateTime,
        Short gfr,
        Short crp

) {
}
