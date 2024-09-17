package de.trackyourhealth.backend;

import lombok.With;

import java.time.Instant;



@With
public record PressureReading(
        String id,
        Instant dateTime,
        int systolic,
        int diastolic,
        int bpm
) {
}
