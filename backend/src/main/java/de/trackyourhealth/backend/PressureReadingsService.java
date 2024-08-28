package de.trackyourhealth.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PressureReadingsService {
    private final PressureReadingsRepository pressureReadingsRepository;

    public List<PressureReadings> findAllReadings() {
        return pressureReadingsRepository.findAll();
    }
}
