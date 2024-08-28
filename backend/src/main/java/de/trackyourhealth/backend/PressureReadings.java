package de.trackyourhealth.backend;

import java.time.LocalDateTime;

public record PressureReadings(
        LocalDateTime pressureTimestamp,
        int systolic,
        int diastolic,
        int bpm
) {
}
