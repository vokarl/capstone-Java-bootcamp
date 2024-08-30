package de.trackyourhealth.backend;

import lombok.With;

@With
public record NewPressureReading(
        String date,
        String time,
        int systolic,
        int diastolic,
        int bpm
) {
}
