package de.trackyourhealth.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PressureReadingService {
    private final PressureReadingRepository pressureReadingRepository;
    private final IdService idService;

    public List<PressureReading> findAllReadings() {
        return pressureReadingRepository.findAll();
    }
    public PressureReading savePressureReading(NewPressureReading newPressureReading) {
        PressureReading pressureReading = new PressureReading(idService.randomId(), newPressureReading.date(), newPressureReading.time(), newPressureReading.systolic(), newPressureReading.diastolic(), newPressureReading.bpm());

        return pressureReadingRepository.save(pressureReading);
    }
}
