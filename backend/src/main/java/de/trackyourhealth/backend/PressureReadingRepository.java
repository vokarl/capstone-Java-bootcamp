package de.trackyourhealth.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PressureReadingRepository extends MongoRepository <PressureReading, String>{
}
