package de.trackyourhealth.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("api/blood-pressure")
public class PressureReadingsController {
    private final PressureReadingsService pressureReadingsService;



    @GetMapping
    List<PressureReadings> getAllReadings(){
        return pressureReadingsService.findAllReadings();
    }
}
