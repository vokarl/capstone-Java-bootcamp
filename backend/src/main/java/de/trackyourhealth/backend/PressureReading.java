package de.trackyourhealth.backend;

import lombok.With;

@With
public record PressureReading(
        String id,
        String date,
        String time,
        int systolic,
        int diastolic,
        int bpm
) {
}
