package de.trackyourhealth.backend;

public record PressureDTO(
        String date,
        String time,
        int systolic,
        int diastolic,
        int bpm
) {
}
