package de.trackyourhealth.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("api/blood-pressure")
public class PressureReadingController {
    private final PressureReadingService pressureReadingService;



    @GetMapping
    List<PressureReading> getAllReading(){
        return pressureReadingService.findAllReadings();
    }
}
