package de.trackyourhealth.backend;

import java.time.Instant;



public record PressureDTO(
        Instant dateTime,
        int systolic,
        int diastolic,
        int bpm
) {
}
