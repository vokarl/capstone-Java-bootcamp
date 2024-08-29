package de.trackyourhealth.backend;


public record PressureReading(
        String date,
        String time,
        int systolic,
        int diastolic,
        int bpm
) {
}
