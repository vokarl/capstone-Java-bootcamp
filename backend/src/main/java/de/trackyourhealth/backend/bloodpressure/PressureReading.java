package de.trackyourhealth.backend.bloodpressure;
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
