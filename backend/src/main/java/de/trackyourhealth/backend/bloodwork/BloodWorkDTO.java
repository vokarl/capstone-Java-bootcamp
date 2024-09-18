package de.trackyourhealth.backend.bloodwork;

import java.time.Instant;

public record BloodWorkDTO(
        Instant dateTime,
        Short gfr,
        Short crp
) {
}
