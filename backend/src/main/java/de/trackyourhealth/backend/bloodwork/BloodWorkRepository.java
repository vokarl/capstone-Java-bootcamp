package de.trackyourhealth.backend.bloodwork;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BloodWorkRepository  extends MongoRepository<BloodWork, String> {
}
