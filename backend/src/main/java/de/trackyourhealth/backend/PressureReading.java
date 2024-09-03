package de.trackyourhealth.backend;


public record PressureReading(
        String id,
        String date,
        String time,
        int systolic,
        int diastolic,
        int bpm
) {
}
