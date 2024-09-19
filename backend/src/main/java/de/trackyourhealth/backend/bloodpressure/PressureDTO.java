package de.trackyourhealth.backend.bloodpressure;

import java.time.Instant;



public record PressureDTO(
        Instant dateTime,
        int systolic,
        int diastolic,
        int bpm
) {
}
